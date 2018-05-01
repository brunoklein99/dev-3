package academia.controller;

import academia.business.account.AccountRepository;
import academia.business.account.AccountService;
import academia.business.restriction.RestrictionRepository;
import academia.model.Account;
import academia.model.Activity;
import academia.model.Restriction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Validation;
import javax.xml.bind.ValidationException;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/private/activites/schedule")
public class ScheduleActivityController {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private AccountService accountService;

    @Autowired
    private RestrictionRepository restrictionRepository;

    @RequestMapping(method = RequestMethod.POST, path = "")
    public boolean create(@RequestBody ActivitySchedule schedule) throws ValidationException {

        validateRestrictions(schedule.getAccount(), schedule.getActivity());

        return true;
    }

    private void validateRestrictions(Account account, Activity activity) throws ValidationException {
        List<Restriction> accountRestrictions = account.getRestrictions();

        List<Restriction> activityRestrictions = restrictionRepository.findByActivity(activity);

        for (Restriction accountRestriction : accountRestrictions) {
            for (Restriction activityRestriction : activityRestrictions) {
                if (accountRestriction.getId().equals(activityRestriction.getId())) {
                    throw new ValidationException("Usuário possui restrição " + accountRestriction.getName());
                }
            }
        }
    }

    public class ActivitySchedule {
        private Activity activity;
        private Account account;
        private Date date;

        public Account getAccount() {
            return account;
        }

        public Activity getActivity() {
            return activity;
        }

        public Date getDate() {
            return date;
        }

        public void setAccount(Account account) {
            this.account = account;
        }

        public void setActivity(Activity activity) {
            this.activity = activity;
        }

        public void setDate(Date date) {
            this.date = date;
        }
    }
}
