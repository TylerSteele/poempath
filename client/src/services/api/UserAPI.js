import axios from 'axios'

const API_URL = 'http://localhost:3000'


export class UserAPI {
  constructor() {

  }

  static validateUser(username, password) {
    // API request to validate a user's credentials
    return axios
      .post(API_URL + '/validate', {username: username, password: password}, {
        // Reject only if the status code is greater than or equal to 500
        validateStatus: function (status) {
          return status < 500
        }
      })
      .then(response => response.data)
  }

  static createUser(username, password) {
    // API request to create a user
    return axios
      .post(API_URL + '/signUp', {username: username, password: password}, {
        // Reject only if the status code is greater than or equal to 500
        validateStatus: function (status) {
          return status < 500
        }
      })
      .then(response => response.data)
  }

  static getUser(username) {
    // API request to create a user
    return axios
      .get(API_URL + '/users?username=' + username, {
        // Reject only if the status code is greater than or equal to 500
        validateStatus: function (status) {
          return status < 500
        }
      })
      .then(response => response.data)
  }

  static updateUser(userObj) {
    // API request to update a given user
    return axios
      .put(API_URL + '/update', userObj,{
        validateStatus: function(status){
          return status < 500
        }
      })
  }

}