import axios from 'axios'

const API_URL = 'http://localhost:3000'


export class UserAPI {
  constructor() {

  }

  validateUser(username, password) {
    // API request to validate a user's credentials
    return axios
      .post(API_URL + '/validate', {username: username, password: password}, {
        // Reject only if the status code is greater than or equal to 500
        validateStatus: function (status) {
          return status < 500;
        }
      })
      .then(response => response.data)
  }

  createUser(username, password) {
    // API request to create a user
    return axios
      .post(API_URL + '/signUp', {username: username, password: password}, {
        // Reject only if the status code is greater than or equal to 500
        validateStatus: function (status) {
          return status < 500;
        }
      })
      .then(response => response.data)
  }
}