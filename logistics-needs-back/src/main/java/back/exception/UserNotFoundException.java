package back.exception;

public class UserNotFoundException extends EntityNotFoundException {

    public UserNotFoundException(final String message) {
        super(UserNotFoundException.class, message);
    }
}
