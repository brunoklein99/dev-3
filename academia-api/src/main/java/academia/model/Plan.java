package academia.model;

import javax.persistence.*;
import java.util.List;

@Entity
public class Plan {

    public Plan(){

    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    @OneToMany
    private List<Activity> activities;

    public Long getId() {
        return id;
    }

    public List<Activity> getActivities() {
        return activities;
    }

    public String getName() {
        return name;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setActivities(List<Activity> activities) {
        this.activities = activities;
    }

    public void setName(String name) {
        this.name = name;
    }
}
