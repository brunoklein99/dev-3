package academia;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.GlobalAuthenticationConfigurerAdapter;

/**
 * Created by rafael on 3/17/18.
 */
@Configuration
public class AuthenticationConfigurerAdapter extends GlobalAuthenticationConfigurerAdapter {

//    @Autowired
//    AccountRepository accountRepository;

    @Autowired
    private AuthenticationProvider authenticationProvider;

    @Override
    public void init(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(authenticationProvider);

//        auth.userDetailsService(userDetailsService());
    }

//    @Bean
//    UserDetailsService userDetailsService() {
//        return new UserDetailsService() {
//
//            @Override
//            public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//                System.out.println();
//
//                return new UserDetails();
//
////                return null;
////                Account account = accountRepository.findByUsername(username);
////                if(account != null) {
////                    return new User(account.getUsername(), account.getPassword(), true, true, true, true,
////                            AuthorityUtils.createAuthorityList("USER"));
////                } else {
////                    throw new UsernameNotFoundException("could not find the user '"
////                            + username + "'");
////                }
//            }
//
//        };
//    }

}
