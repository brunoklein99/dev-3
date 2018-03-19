let isAuthenticated = false

class LoginService {
  isAuthenticated() {
    console.log('#### isAuthenticated', isAuthenticated)
    return isAuthenticated
  }

  login() {
    isAuthenticated = true
  }

  logout() {
    isAuthenticated = false
  }
}

export default new LoginService()
