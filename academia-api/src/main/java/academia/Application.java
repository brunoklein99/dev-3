package academia;

import academia.business.account.AccountRepository;
import academia.business.account.AccountService;
import academia.business.activity.ActivityRepository;
import academia.business.activity.ActivityService;
import academia.business.restriction.RestrictionRepository;
import academia.business.restriction.RestrictionService;
import academia.model.Account;
import academia.model.Activity;
import academia.model.Restriction;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.ArrayList;
import java.util.Date;

@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }


    @Bean
    public CommandLineRunner demo(
            AccountService accountService,
            AccountRepository accountRepository,
            ActivityService activityService,
            ActivityRepository activityRepository,
            RestrictionService restrictionService,
            RestrictionRepository restrictionRepository) {
        return (args) -> {
            String adminUsernameAndPassword = "admin";
            Account admin = accountRepository.findByUsername(adminUsernameAndPassword);
            if (admin == null) {
                accountService.create(new Account("Administrador da Academia", adminUsernameAndPassword, adminUsernameAndPassword, Account.AccountType.ADMIN));
            }

            String userUsernameAndPassword = "user";
            Account user = accountRepository.findByUsername(userUsernameAndPassword);
            if (user == null) {
                accountService.create(new Account("Usuário da Silva", userUsernameAndPassword, userUsernameAndPassword));
            }

            String trainerUsernameAndPassword = "trainer";
            Account trainer = accountRepository.findByUsername(trainerUsernameAndPassword);
            if (trainer == null) {
                Account account = new Account("Treinador 1", trainerUsernameAndPassword, trainerUsernameAndPassword, Account.AccountType.TRAINER);
                trainer = accountService.create(account);
            }

            Activity activity = activityRepository.findByName("exercicio1");
            if (activity == null) {
                activity = new Activity("exercicio1", "exercicio1descr", trainer);
                activity.setBeginDate(new Date(2018, 1, 1));
                activity.setEndDate(new Date(2018, 12, 31));
                activity = activityService.create(activity);
            }

            Restriction restriction = restrictionRepository.findByName("restriction1");
            if (restriction == null) {
                restriction = new Restriction();
                restriction.setName("restriction1");
                if (restriction.getActivities() == null) {
                    restriction.setActivities(new ArrayList<>());
                }
                restriction.getActivities().add(activity);
                restriction = restrictionService.create(restriction);
            }
        };
    }
}