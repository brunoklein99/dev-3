package academia.business.account;

import academia.model.Restriction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RestrictionRepository extends JpaRepository<Restriction, Long> {

    Restriction findByName(String name);

}
