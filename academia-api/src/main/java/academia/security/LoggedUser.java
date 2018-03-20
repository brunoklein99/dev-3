package academia.security;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

public class LoggedUser extends User implements UserDetails {
//    public Account(String username, String password, Collection<? extends GrantedAuthority> authorities) {
//        super(username, password, authorities);
//
//        this.name = username;
//    }

    private String username;

    private String password;

    public LoggedUser(String username, String password, Collection<? extends GrantedAuthority> authorities) {
        super(username, password, authorities);
    }
}