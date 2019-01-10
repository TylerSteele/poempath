import axios from 'axios'

const API_URL = 'https://api.github.com/repos/steeletyler/poetry-collection-api/contents/collection/Robert%20Frost/After%20Apple-Picking.json'


export class PoetryAPI {
  constructor() {

  }

  getPoem() {
    alert('API Request!')
    // API request for poem from my GitHub. Header allows access to the plain text of the file
    return axios
      .get(API_URL, {headers: {Accept: "application/vnd.github.3.raw"}})
      .then(response => response.data)
  }
}