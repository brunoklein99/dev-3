package academia;

import academia.business.account.AccountRepository;
import academia.business.account.AccountService;
import academia.business.activity.ActivityRepository;
import academia.business.activity.ActivityService;
import academia.business.appointment.AppointmentService;
import academia.business.restriction.RestrictionRepository;
import academia.business.restriction.RestrictionService;
import academia.domain.AccountType;
import academia.model.Account;
import academia.model.Activity;
import academia.model.Restriction;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Bean
    public CommandLineRunner demo(
            AccountService accountService,
            AccountRepository accountRepository,

            RestrictionService restrictionService,
            RestrictionRepository restrictionRepository,

            ActivityService activityService,
            ActivityRepository activityRepository,

            AppointmentService appointmentService) {
        return (args) -> {
            /*
                restrictions
             */
            String restrictionName1 = "Esforço cardíaco";
            Restriction restrictionCardiaco = restrictionRepository.findByName(restrictionName1);
            if (restrictionCardiaco == null) {
                restrictionCardiaco = restrictionService.create(new Restriction(restrictionName1));
            }

            String restrictionName2 = "Impacto no joelho";
            Restriction restrictionJoelho = restrictionRepository.findByName(restrictionName2);
            if (restrictionJoelho == null) {
                restrictionJoelho = restrictionService.create(new Restriction(restrictionName2));
            }

            String restrictionName3 = "Esforço na coluna";
            Restriction restrictionColuna = restrictionRepository.findByName(restrictionName3);
            if (restrictionColuna == null) {
                restrictionColuna = restrictionService.create(new Restriction(restrictionName3));
            }

            /*
                accounts
             */
            String adminUsernameAndPassword = "admin";
            Account admin = accountRepository.findByUsername(adminUsernameAndPassword);
            if (admin == null) {
                admin = accountService.create(new Account("Administrador da Academia", adminUsernameAndPassword, adminUsernameAndPassword, AccountType.ADMIN, null));
            }

            String customerUsernameAndPassword = "customer";
            Account customer = accountRepository.findByUsername(customerUsernameAndPassword);
            if (customer == null) {
                List<Restriction> restrictions = Arrays.asList(restrictionCardiaco, restrictionJoelho);
                customer = new Account("Cliente da Silva", customerUsernameAndPassword, customerUsernameAndPassword, AccountType.CUSTOMER, restrictions);
                customer = accountService.create(customer);
            }

            String trainerUsernameAndPassword = "trainer";
            Account trainer = accountRepository.findByUsername(trainerUsernameAndPassword);
            if (trainer == null) {
                trainer = accountService.create(new Account("Treinador 1", trainerUsernameAndPassword, trainerUsernameAndPassword, AccountType.TRAINER, null));
            }

            /*
                activities
             */
            String activity1Name = "Corrida";
            Activity activity1 = activityRepository.findByName(activity1Name);
            if (activity1 == null) {
                activity1 = new Activity(activity1Name, "Corrida na esteira como treinamento cardiovascular", trainer);
                activity1.setBeginDate(new Date(2018, 1, 1));
                activity1.setEndDate(new Date(2018, 12, 31));

                List<Restriction> restrictions = Arrays.asList(restrictionJoelho);
                activity1.setRestrictions(restrictions);
                activity1 = activityService.create(activity1);
            }

//            Appointment appointment = new Appointment();
//            appointment.setActivity(activity);
//            appointment.setDate(new Date(2018, 1, 1));
//            appointment.setVagas(10);
//            appointmentService.create(appointment);
        };
    }
}