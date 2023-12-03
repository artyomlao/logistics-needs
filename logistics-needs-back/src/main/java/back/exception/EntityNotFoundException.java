package back.exception;

public class EntityNotFoundException extends RuntimeException {

    final Class clazz;

    public EntityNotFoundException(final Class clazz, final String message) {
        super(message);
        this.clazz = clazz;
    }
}
