import apiService from './apiService'

let isAuthenticated = false

class LoginService {
  isAuthenticated() {
    return isAuthenticated
  }

  login() {
    const auth = {
      username: 'user',
      password: 'user',
    }

    return apiService.get('/login', { auth })
      .then(({ data }) => {
        isAuthenticated = true
        return data
      })
  }

  logout() {
    return apiService.get('/logout')
      .then(({ data }) => {
        isAuthenticated = false
        return data
      })
  }
}

export default new LoginService()
