import apiService from './apiService'

class AccountService {
  all() {
    return apiService.get('/api/accounts')
  }
}

export default new AccountService()
