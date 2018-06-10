import apiService from './apiService'

class ActivityService {
  all() {
    return apiService.get('/api/private/activities')
      .then(({ data }) => data)
  }

  get(id) {
    return apiService.get(`/api/private/activities/${id}`)
      .then(({ data }) => data)
  }

  update(id, data) {
    return apiService.put(`/api/private/activities/${id}`, data)
  }

  create(data) {
    return apiService.post('/api/private/activities', data)
  }
}

export default new ActivityService()
