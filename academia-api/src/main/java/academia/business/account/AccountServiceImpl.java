package academia.business.account;

import academia.model.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AccountRepository accountRepository;

    @Override
    public Account save(Account account) {
        // TODO validar se username já existe
        // TODO tracar casos em que não queremos atualizar o password
        Account toSave = new Account(account.getUsername(), passwordEncoder.encode(account.getPassword()), account.getAdmin());

        return accountRepository.save(toSave);
    }

}
