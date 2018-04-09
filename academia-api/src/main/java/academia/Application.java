package academia;

import academia.business.account.AccountRepository;
import academia.business.account.AccountService;
import academia.model.Account;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }


    @Bean
    public CommandLineRunner demo(AccountService accountService, AccountRepository accountRepository) {
        return (args) -> {
            String adminUsernameAndPassword = "admin";
            Account admin = accountRepository.findByUsername(adminUsernameAndPassword);
            if (admin == null) {
                accountService.create(new Account("Administrador da Academia", adminUsernameAndPassword, adminUsernameAndPassword, true));
            }

            String userUsernameAndPassword = "user";
            Account user = accountRepository.findByUsername(userUsernameAndPassword);
            if (user == null) {
                accountService.create(new Account("Usuário da Silva", userUsernameAndPassword, userUsernameAndPassword, false));
            }
        };
    }
}