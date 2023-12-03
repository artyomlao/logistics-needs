package back.service;


import back.entity.UserEntity;
import back.entity.enumerations.Role;
import back.entity.enumerations.Status;
import back.exception.UserAlreadyExistsException;
import back.exception.UserNotFoundException;
import back.model.AuthenticationRequestModel;
import back.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(final UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserEntity signUp(final AuthenticationRequestModel userDto) {
        if (userRepository.findFirstByEmail(userDto.getEmail()).isPresent()) {
            throw new UserAlreadyExistsException("User with such login already exists. Choose another one");
        }

        return userRepository.save(new UserEntity().setEmail(userDto.getEmail())
                .setName(userDto.getName())
                .setPassword(new BCryptPasswordEncoder(12).encode(userDto.getPassword()))
                .setRegistrationTime(LocalDateTime.now())
                .setRole(Role.USER)
                .setStatus(Status.ACTIVE));
    }

    public UserEntity findByEmail(final String email) {
        return userRepository.findFirstByEmail(email).orElseThrow(
                () -> new UserNotFoundException("User with such login doesn't exist"));
    }
}
