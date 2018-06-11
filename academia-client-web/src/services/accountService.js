import apiService from './apiService'

const PREFIX = '/api/private/accounts'

class AccountService {
  translateAccountType(accountType) {
    const map = {
      ADMIN: 'Administrador',
      CUSTOMER: 'Cliente',
      TRAINER: 'Treinador',
    }

    if (map[accountType]) {
      return map[accountType]
    }
    return '-'
  }

  settings() {
    return apiService.get(`${PREFIX}/settings`)
      .then(({ data }) => data)
  }

  all() {
    return apiService.get(PREFIX)
      .then(({ data }) => data)
  }

  get(id) {
    return apiService.get(`${PREFIX}/${id}`)
      .then(({ data }) => data)
  }

  update(id, updateData) {
    return apiService.put(`${PREFIX}/${id}`, updateData)
      .then(({ data }) => data)
  }

  updatePassword(id, updateData) {
    return apiService.put(`${PREFIX}/password/${id}`, updateData)
      .then(({ data }) => data)
  }

  create(createData) {
    return apiService.post(PREFIX, createData)
      .then(({ data }) => data)
  }
}

export default new AccountService()
