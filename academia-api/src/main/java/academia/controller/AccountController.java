package academia.controller;

import academia.business.account.AccountRepository;
import academia.business.account.AccountService;
import academia.model.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private AccountService accountService;

    // TODO validar roles dos usuários nesses requests, apenas role admin pode buscar todos etc...

    @RequestMapping(method = RequestMethod.GET, path = "")
    public List<Account> all() {
        return accountRepository.findAll();
    }

    @RequestMapping(method = RequestMethod.GET, path = "/{id}")
    public Account findById(@PathVariable Long id) {
        return accountRepository.findById(id).get();
    }

    @RequestMapping(method = RequestMethod.PUT, path = "/{id}")
    public Account update(@PathVariable Long id, @RequestBody Account account) {
        return accountService.update(account);
    }

    @RequestMapping(method = RequestMethod.POST, path = "")
    public Account create(@RequestBody Account account) {
        return accountService.create(account);
    }
}
