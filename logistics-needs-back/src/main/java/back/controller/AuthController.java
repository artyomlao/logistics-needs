package back.controller;

import back.entity.UserEntity;
import back.model.AuthenticationRequestModel;
import back.security.JwtAuthenticationException;
import back.security.JwtTokenProvider;
import back.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final JwtTokenProvider jwtTokenProvider;

    public AuthController(
            final AuthenticationManager authenticationManager,
            final UserService userService,
            final JwtTokenProvider jwtTokenProvider) {

        this.authenticationManager = authenticationManager;
        this.userService = userService;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(final @RequestBody AuthenticationRequestModel request) {
        final Map<Object, Object> response = new HashMap<>();

        try {
            final UserEntity user = userService.findByEmail(request.getEmail());

            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

            final String token = jwtTokenProvider.generateToken(request.getEmail(), user.getRole().name());

            response.put("email", request.getEmail());
            response.put("token", token);
            response.put("role", user.getRole());

            return ResponseEntity.ok(response);
        } catch (final AuthenticationException e) {
            e.printStackTrace();
            response.put("message", "Invalid password");
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
    }

    @GetMapping("/validate")
    public ResponseEntity<?> validateToken(final @RequestParam String token) {
        try {
            return ResponseEntity.ok(jwtTokenProvider.validateToken(token));
        } catch (final JwtAuthenticationException e) {
            return ResponseEntity.ok(false);
        }
    }

    @PostMapping("/registration")
    public ResponseEntity<?> registration(final @RequestBody AuthenticationRequestModel user) {
        return ResponseEntity.ok(userService.signUp(user));
    }

    @GetMapping("/myself")
    public ResponseEntity<?> getMe(final Principal principal) {
        return ResponseEntity.ok(userService.findByEmail(principal.getName()));
    }
}
