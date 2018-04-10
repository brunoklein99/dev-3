package academia.model;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Restriction {

    public Restriction(){
        this.activities = new ArrayList<>();
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

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Activity> getActivities() {
        return activities;
    }

    public void setActivities(List<Activity> activities) {
        this.activities = activities;
    }
}
