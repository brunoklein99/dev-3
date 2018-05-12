package academia.business.plan;

import academia.model.Plan;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlanRepository extends JpaRepository<Plan, Long> {

    Plan findByName(String name);

}
