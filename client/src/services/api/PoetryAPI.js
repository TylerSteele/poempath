import axios from 'axios'

const API_URL = 'https://api.poempath.com/randomPoem'


export class PoetryAPI {
  constructor() {

  }

  static getPoem() {
    // API request for a random poem from my local collection
    return axios
      .get(API_URL)
      .then(response => response.data)
  }
}