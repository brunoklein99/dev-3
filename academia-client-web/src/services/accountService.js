import apiService from './apiService'

class AccountService {
  all() {
    return apiService.get('/api/private/accounts')
      .then(({ data }) => data)
  }

  get(id) {
    return apiService.get(`/api/private/accounts/${id}`)
      .then(({ data }) => data)
  }

  update(id, data) {
    return apiService.put(`/api/private/accounts/${id}`, data)
  }

  create(data) {
    return apiService.post('/api/private/accounts', data)
  }
}

export default new AccountService()
