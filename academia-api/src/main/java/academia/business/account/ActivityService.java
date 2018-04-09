package academia.business.account;

import academia.model.Account;
import academia.model.Activity;

public interface ActivityService {

    Activity create(Activity activity);

    Activity update(Activity activity);
}
