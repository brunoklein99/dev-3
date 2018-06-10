import apiService from './apiService'

class RestrictionService {
  all() {
    return apiService.get('/api/private/restrictions')
      .then(({ data }) => data)
  }

  get(id) {
    return apiService.get(`/api/private/restrictions/${id}`)
      .then(({ data }) => data)
  }

  update(id, data) {
    return apiService.put(`/api/private/restrictions/${id}`, data)
  }

  create(data) {
    return apiService.post('/api/private/restrictions', data)
  }
}

export default new RestrictionService()
