package academia.business.activity;

import academia.model.Account;
import academia.model.Activity;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mockito;
import org.springframework.test.util.ReflectionTestUtils;

import javax.validation.ValidationException;

public class ActivityUnitTests {

    protected ActivityServiceImpl activityServiceImpl;

    protected ActivityRepository activityRepository;

    @Before
    public void setup() {
        activityServiceImpl = new ActivityServiceImpl( );
        activityRepository  = Mockito.mock(ActivityRepository.class);

        // injeta dependências
        ReflectionTestUtils.setField(activityServiceImpl, "activityRepository", activityRepository);
    }

    @Test
    public void create_activity_all_attributes_valid() {

        Activity activity = new Activity( );
        Account trainer = new Account( );
        activity.setName( "PF" );
        activity.setDescription( "Preparador Físico" );
        trainer.setType( Account.AccountType.TRAINER );
        activity.setTrainer( trainer );

        try {
            activityServiceImpl.create(activity);
        } catch ( Exception e ){
            Assert.fail("Não deve falhar pois tem todos atributos");
        }
    }

    @Test
    public void name_is_mandatory( ){
        Activity activity = new Activity( );
        Account trainer = new Account( );
        activity.setDescription( "Preparador Físico" );
        trainer.setType( Account.AccountType.TRAINER );
        activity.setTrainer( trainer );

        try {
            activityServiceImpl.create(activity);
            Assert.fail("Deve cair no catch, pois falhou");
        } catch ( ValidationException e ){
            Assert.assertEquals(e.getMessage(), "Atividade deve ter um nome");
        }
    }

    @Test
    public void description_is_mandatory( ){
        Activity activity = new Activity( );
        Account trainer = new Account( );
        activity.setName( "PF" );
        trainer.setType( Account.AccountType.TRAINER );
        activity.setTrainer( trainer );

        try {
            activityServiceImpl.create(activity);
            Assert.fail("Deve cair no catch, pois falhou");
        } catch ( ValidationException e ){
            Assert.assertEquals(e.getMessage(), "Atividade deve ter uma descrição");
        }
    }

    @Test
    public void activity_is_mandatory( ){
        Activity activity = new Activity( );
        Account trainer = new Account( );
        activity.setName( "PF" );
        activity.setDescription( "Preparador Físico" );
        trainer.setType( Account.AccountType.TRAINER );

        try {
            activityServiceImpl.create(activity);
            Assert.fail("Deve cair no catch, pois falhou");
        } catch ( ValidationException e ){
            Assert.assertEquals(e.getMessage(), "Atividade deve ter um treinador");
        }
    }

    @Test
    public void trainer_is_mandatory( ){
        Activity activity = new Activity( );
        Account trainer = new Account( );
        activity.setName( "PF" );
        activity.setDescription( "Preparador Físico" );
        trainer.setName( "Jonas" );
        activity.setTrainer( trainer );
        trainer.setType( Account.AccountType.NORMAL );

        try {
            activityServiceImpl.create(activity);
            Assert.fail("Deve cair no catch, pois falhou");
        } catch ( ValidationException e ){
            Assert.assertEquals(e.getMessage(), "Usuário atrelado a atividade deve ser um treinador");
        }
    }


}
