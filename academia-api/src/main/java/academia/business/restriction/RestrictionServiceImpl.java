package academia.business.restriction;

import academia.model.Activity;
import academia.model.Restriction;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ValidationException;
import java.util.List;

public class RestrictionServiceImpl implements RestrictionService {

    @Autowired
    private RestrictionRepository restrictionRepository;

    @Override
    public Restriction create(Restriction restriction) {
        validate(restriction);

        Restriction toSave = new Restriction();
        toSave.setId(restriction.getId());
        toSave.setName(restriction.getName());
        toSave.getActivities().addAll(restriction.getActivities());

        return restrictionRepository.save(toSave);
    }

    @Override
    public Restriction update(Restriction restriction) {
        validate(restriction);

        Restriction toSave = new Restriction();
        toSave.setId(restriction.getId());
        toSave.setName(restriction.getName());
        toSave.getActivities().addAll(restriction.getActivities());

        return restrictionRepository.save(toSave);
    }

    private static void validate(Restriction restriction){
        String name = restriction.getName();
        if (name == null || name.isEmpty()) {
            throw new ValidationException("Restrição deve ter nome");
        }
        List<Activity> activities = restriction.getActivities();
        if (activities == null || activities.size() == 0) {
            throw new ValidationException("Restrição deve ter pelo menos uma atividade");
        }
    }
}
