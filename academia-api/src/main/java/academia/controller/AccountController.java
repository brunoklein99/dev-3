package academia.controller;

import academia.business.account.AccountRepository;
import academia.model.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class AccountController {

    @Autowired
    private AccountRepository accountRepository;

    @RequestMapping("/api/account/")
    public List<Account> all() {
        return accountRepository.findAll();
    }
}
