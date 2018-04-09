package academia.business.account;

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
        String name = activity.getName();
        if (name == null || name.isEmpty()) {
            throw new ValidationException("Atividade deve ter um nome");
        }
        String description = activity.getDescription();
        if (description == null || description.isEmpty()) {
            throw new ValidationException("Atividade deve ter uma descrição");
        }

        Activity toSave = new Activity(activity.getName(), activity.getDescription(), activity.getTrainer());

        return activityRepository.save(toSave);
    }
}
