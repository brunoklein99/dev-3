package academia;

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
    public CommandLineRunner demo(AccountService accountService) {
        return (args) -> {
            accountService.create(new Account("Administrador da Academia", "admin", "admin", true));
            accountService.create(new Account("Usuário da Silva", "user", "user", false));
        };
    }
}