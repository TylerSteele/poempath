import axios from 'axios'

const API_URL = 'https://api.poempath.com'


export class PoetryAPI {
  constructor() {

  }

  static getPoem() {
    // API request for a random poem from my local collection
    return axios
      .get(API_URL + '/randomPoem')
      .then(response => response.data)
  }
  static async ratePoem(username, poemID, rating) {
    // API request to like/dislike a poem and return the newly recommended poem
    if(rating === 'like'){
      return await axios.post(API_URL + '/like', {username: username, poemID: poemID}, {
        // Reject only if the status code is greater than or equal to 500
        validateStatus: function (status) {
          return status < 500
        }
      })
        .then(response => response.data)
    }
    if(rating === 'dislike'){
      return await axios.post(API_URL + '/dislike', {username: username, poemID: poemID}, {
        // Reject only if the status code is greater than or equal to 500
        validateStatus: function (status) {
          return status < 500
        }
      })
        .then(response => response.data)
    }
    return {title: 'Invalid rating', author: 'Sorry for the inconvenience', text: ['']}

  }

  static async getStats(){
    return await axios
      .get(API_URL + '/stats')
      .then(response => response.data)
  }
}