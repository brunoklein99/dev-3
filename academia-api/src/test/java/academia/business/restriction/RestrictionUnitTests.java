package academia.business.restriction;

import java.util.ArrayList;

import javax.validation.ValidationException;

import org.junit.Before;
import org.junit.Test;
import org.mockito.Mockito;
import org.springframework.test.util.ReflectionTestUtils;

import academia.model.Activity;
import academia.model.Restriction;
import org.junit.Assert;

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

        try {
            restrictionServiceImpl.create(restriction);
        } catch ( Exception e ){
            Assert.fail("Não deve falhar pois tem todos atributos");
        }
    }

    @Test
    public void name_is_mandatory( ){
        Restriction restriction = new Restriction( );

        try {
            restrictionServiceImpl.create(restriction);
            Assert.fail("Deve cair no catch, pois falhou");
        } catch ( Exception e ){
        	Assert.assertEquals(e.getMessage(), "Restrição deve ter nome");
        }
    }

}
