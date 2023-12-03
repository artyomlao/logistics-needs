package back.entity.enumerations;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum Role {

    ADMIN("admin"), USER("user");

    private final String role;
}
