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

  // TODO
  // checkAuthentication() {
  //   return apiService.get('/login')
  //     .then(({ data }) => {
  //       console.log('### checkAuthentication data', data)
  //       user = data
  //       isAuthenticated = true
  //     })
  // }

  /*
    auth:
    {
      username: '',
      password: '',
    }
  */
  login(auth) {
    return apiService.get('/login', { auth })
      .then(({ data }) => {
        user = data
        isAuthenticated = true
      })
  }

  logout() {
    return apiService.get('/logout')
      .then(({ data }) => {
        user = null
        isAuthenticated = false
      })
  }
}

export default new LoginService()
