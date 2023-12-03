package back.security;

import org.springframework.http.HttpStatus;

import javax.naming.AuthenticationException;

public class JwtAuthenticationException extends AuthenticationException {
    private HttpStatus httpStatus;

    public JwtAuthenticationException(String message, HttpStatus httpStatus) {
        super(message);
        this.httpStatus = httpStatus;
    }

    public JwtAuthenticationException(String message) {
        super(message);
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }
}
