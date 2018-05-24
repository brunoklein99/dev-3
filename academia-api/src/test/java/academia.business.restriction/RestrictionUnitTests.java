package academia.business.restriction;

import academia.model.Activity;
import academia.model.Restriction;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mockito;
import org.springframework.test.util.ReflectionTestUtils;

import javax.validation.ValidationException;
import java.util.ArrayList;

public class RestrictionUnitTests {

    protected RestrictionServiceImpl restrictionServiceImpl;

    protected RestrictionRepository restrictionRepository;

    @Before
    public void setup() {
        restrictionServiceImpl = new RestrictionServiceImpl( );
        restrictionRepository  = Mockito.mock(RestrictionRepository.class);

        // injeta dependências
        ReflectionTestUtils.setField(restrictionServiceImpl, "restrictionRepository", restrictionRepository);
    }

    @Test
    public void create_restriction_all_attributes_valid() {

        Restriction restriction = new Restriction( );
        restriction.setName( "Restrição A");
        Activity activity = new Activity( );
        ArrayList<Activity> activities = new ArrayList<>();
        activities.add( activity );
        restriction.setActivities( activities );

        try {
            restrictionServiceImpl.create(restriction);
        } catch ( Exception e ){
            Assert.fail("Não deve falhar pois tem todos atributos");
        }
    }

    @Test
    public void name_is_mandatory( ){
        Restriction restriction = new Restriction( );
        Activity activity = new Activity( );
        ArrayList<Activity> activities = new ArrayList<>( );
        activities.add(activity);
        restriction.setActivities( activities );

        try {
            restrictionServiceImpl.create(restriction);
            Assert.fail("Deve cair no catch, pois falhou");
        } catch ( ValidationException e ){
            Assert.assertEquals(e.getMessage(), "Restrição deve ter nome");
        }
    }

    @Test
    public void an_restriction_is_mandatory( ){
        Restriction restriction = new Restriction( );
        restriction.setName( "Restrição A");
        ArrayList<Activity> activities = new ArrayList<>();
        restriction.setActivities( activities );

        try {
            restrictionServiceImpl.create(restriction);
            Assert.fail("Deve cair no catch, pois falhou");
        } catch ( ValidationException e ){
            Assert.assertEquals(e.getMessage(), "Restrição deve ter pelo menos uma atividade");
        }
    }

}
