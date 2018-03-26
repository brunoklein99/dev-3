package academia.business.account;

import academia.model.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.validation.ValidationException;

// TODO implementar as validações adequadas nessa classe, assinaladas com TODO específico e outras necessárias
@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AccountRepository accountRepository;

    @Override
    public Account create(Account account) {
        String password = account.getPassword();

        // TODO
        if (password == null || password.isEmpty()) {
            throw new ValidationException("Senha deve ser preenchida");
        }

        // TODO verificar uniqueness do username
        Account toSave = new Account(account.getName(), account.getUsername(), passwordEncoder.encode(account.getPassword()), account.getAdmin());

        return accountRepository.save(toSave);
    }

    @Override
    public Account update(Account account) {
        String password = account.getPassword();

        /*
            TODO tratar casos em que não queremos atualizar o password,
            provavelmente fazer uma rota separada só para isso e na rota default de update não atualizar,
            fazer 2 formulários diferentes no client-side etc
          */
        if (password == null || password.isEmpty()) {
            throw new ValidationException("Senha deve ser preenchida");
        }

        // TODO verificar uniqueness do username
        Account toSave = new Account(account.getName(), account.getUsername(), passwordEncoder.encode(account.getPassword()), account.getAdmin());
        return accountRepository.save(toSave);
    }
}
