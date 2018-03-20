import apiService from './apiService'

class AccountService {
  all() {
    return apiService.get('/api/account/')
  }
}

export default new AccountService()
