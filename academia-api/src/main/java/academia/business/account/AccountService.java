package academia.business.account;

import academia.model.Account;

public interface AccountService {

    Account create(Account account);

    Account update(Account account);
}
