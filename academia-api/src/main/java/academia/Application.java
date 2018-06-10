package academia;

import academia.business.account.AccountRepository;
import academia.business.account.AccountService;
import academia.business.activity.ActivityRepository;
import academia.business.activity.ActivityService;
import academia.business.appointment.AppointmentService;
import academia.business.restriction.RestrictionService;
import academia.domain.AccountType;
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
    public CommandLineRunner demo(
            AccountService accountService,
            AccountRepository accountRepository,
            ActivityService activityService,
            ActivityRepository activityRepository,
            RestrictionService restrictionService,
            AppointmentService appointmentService) {
        return (args) -> {
            String adminUsernameAndPassword = "admin";
            Account admin = accountRepository.findByUsername(adminUsernameAndPassword);
            if (admin == null) {
                accountService.create(new Account("Administrador da Academia", adminUsernameAndPassword, adminUsernameAndPassword, AccountType.ADMIN));
            }

            String userUsernameAndPassword = "user";
            Account user = accountRepository.findByUsername(userUsernameAndPassword);
            if (user == null) {
                accountService.create(new Account("Usuário da Silva", userUsernameAndPassword, userUsernameAndPassword));
            }

            String trainerUsernameAndPassword = "trainer";
            Account trainer = accountRepository.findByUsername(trainerUsernameAndPassword);
            if (trainer == null) {
                Account account = new Account("Treinador 1", trainerUsernameAndPassword, trainerUsernameAndPassword, AccountType.TRAINER);
                trainer = accountService.create(account);
            }
//
//            Activity activity = activityRepository.findByName("exercicio1");
//            if (activity == null) {
//                activity = new Activity("exercicio1", "exercicio1descr", trainer);
//                activity.setBeginDate(new Date(2018, 1, 1));
//                activity.setEndDate(new Date(2018, 12, 31));
//
//                Restriction restriction = new Restriction();
//                restriction.setName("restriction1");
//                restriction = restrictionService.create(restriction);
//
//                List<Restriction> restrictions = new ArrayList<>();
//
//                restrictions.add(restriction);
//
//                activity.setRestrictions(restrictions);
//                activity = activityService.create(activity);
//
//            }
//
//            Appointment appointment = new Appointment();
//            appointment.setActivity(activity);
//            appointment.setDate(new Date(2018, 1, 1));
//            appointment.setVagas(10);
//            appointmentService.create(appointment);
        };
    }
}