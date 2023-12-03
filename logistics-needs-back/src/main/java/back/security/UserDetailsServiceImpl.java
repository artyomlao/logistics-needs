package back.security;

import back.entity.UserEntity;
import back.exception.UserNotFoundException;
import back.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service("userDetailsServiceImpl")
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    @Autowired
    public UserDetailsServiceImpl(final UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(final String username) throws UsernameNotFoundException {
        final Optional<UserEntity> byEmail = userRepository.findFirstByEmail(username);
        final UserEntity user = byEmail.orElseThrow(
                () -> new UserNotFoundException("User with such login doesn't exist"));

        return SecurityUser.getUser(user);
    }
}
