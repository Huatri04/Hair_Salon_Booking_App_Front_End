import axios from "axios";
// Set config defaults when creating the instance
const api = axios.create({
    baseURL: 'http://localhost:8080/api/'
  });
  
  export default api;