import axios from 'axios'

const API_URL = 'http://localhost:3000/randomPoem'


export class PoetryAPI {
  constructor() {

  }

  getPoem() {
    // API request for a random poem from my local collection
    return axios
      .get(API_URL)
      .then(response => response.data)
  }
}