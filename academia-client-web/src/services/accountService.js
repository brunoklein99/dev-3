import apiService from './apiService'

class AccountService {
  all() {
    return apiService.get('/api/accounts')
      .then(({ data }) => data)
  }

  get(id) {
    return apiService.get(`/api/accounts/${id}`)
      .then(({ data }) => data)
  }

  update(id, data) {
    return apiService.put(`/api/accounts/${id}`, data)
  }

  create(data) {
    return apiService.post('/api/accounts', data)
  }
}

export default new AccountService()
