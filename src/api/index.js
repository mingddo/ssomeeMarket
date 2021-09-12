import axios from 'axios';
const API_BASE_URL = 'https://mock-api.ssomee.com/';



function createInstance() {
  const instance = axios.create({
    baseURL: API_BASE_URL,
  });
  return instance;
}


export {createInstance};
