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
        console.log('### then')
        isAuthenticated = true
        return data
      })
  }

  logout() {
    isAuthenticated = false
  }
}

export default new LoginService()
