package academia.controller;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
public class LoginController {

    @RequestMapping("/login")
    public User login(Principal principal) {
        UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken) principal;
        if (token == null) {
            return null;
        }
        return (User) token.getPrincipal();
    }

    @RequestMapping("/api/check")
    public User check(Principal principal) {
        UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken) principal;
        if (token == null) {
            return null;
        }
        return (User) token.getPrincipal();
    }
}
