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

  update(id, updateData) {
    return apiService.put(`/api/private/restrictions/${id}`, updateData)
      .then(({ data }) => data)
  }

  create(createData) {
    return apiService.post('/api/private/restrictions', createData)
      .then(({ data }) => data)
  }
}

export default new RestrictionService()
