import apiService from './apiService'

let isAuthenticated = false
let user = null

class LoginService {
  isAuthenticated() {
    return isAuthenticated
  }

  getUser() {
    return user
  }

  isAdmin() {
    return user.authorities[0].authority === 'ADMIN'
  }

  checkAuthentication() {
    return apiService.get('/api/check')
      .then(({ data }) => {
        user = data
        isAuthenticated = true
      })
  }

  /*
    auth:
    {
      username: '',
      password: '',
    }
  */
  login(auth) {
    let options = {}

    if (auth) {
      options = {
        ...options,
        auth,
      }
    }

    return apiService.get('/login', options)
      .then(({ data }) => {
        user = data
        isAuthenticated = true
      })
  }

  logout() {
    return apiService.get('/logout')
      .then(() => {
        user = null
        isAuthenticated = false
      })
  }
}

export default new LoginService()
