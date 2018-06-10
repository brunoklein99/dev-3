package academia.business.activity;

import academia.model.Account;
import academia.model.Activity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.validation.ValidationException;

@Service
public class ActivityServiceImpl implements ActivityService {

    @Autowired
    private ActivityRepository activityRepository;

    @Override
    public Activity create(Activity activity) {
        validate(activity);

        Activity toSave = copyActivity(activity);

        return activityRepository.save(toSave);
    }

    @Override
    public Activity update(Activity activity) {
        validate(activity);

        Activity toSave = copyActivity(activity);

        return activityRepository.save(toSave);
    }

    private static void validate(Activity activity){
        String name = activity.getName();
        if (name == null || name.isEmpty()) {
            throw new ValidationException("Atividade deve ter um nome");
        }
        String description = activity.getDescription();
        if (description == null || description.isEmpty()) {
            throw new ValidationException("Atividade deve ter uma descrição");
        }

        if (activity.getTrainer() == null) {
            throw new ValidationException("Atividade deve ter um treinador");
        }
        if (activity.getTrainer().getType() != Account.AccountType.TRAINER){
            throw new ValidationException("Usuário atrelado a atividade deve ser um treinador");
        }
    }

    private static Activity copyActivity(Activity activity){
        Activity toSave = new Activity(activity.getName(), activity.getDescription(), activity.getTrainer());
        toSave.setBeginDate(activity.getBeginDate());
        toSave.setEndDate(activity.getEndDate());
        toSave.setRestrictions(activity.getRestrictions());
        return toSave;
    }

}
