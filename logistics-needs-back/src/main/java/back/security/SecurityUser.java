package back.security;


import back.entity.UserEntity;
import back.entity.enumerations.Status;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.HashSet;
import java.util.List;

@Getter @Setter
@AllArgsConstructor
public class SecurityUser {

    private final String password;
    private final List<SimpleGrantedAuthority> authorities;

    public static UserDetails getUser(final UserEntity user) {
        return new User(user.getEmail(), user.getPassword(),
                user.getStatus().equals(Status.ACTIVE),
                user.getStatus().equals(Status.ACTIVE),
                user.getStatus().equals(Status.ACTIVE),
                user.getStatus().equals(Status.ACTIVE),
                new HashSet<>());
    }
}
