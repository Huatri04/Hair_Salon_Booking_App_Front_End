import axios from "axios";
// Set config defaults when creating the instance
const api = axios.create({
<<<<<<< Updated upstream
    baseURL: 'http://localhost:8080/api/'
  });
=======
    baseURL: 'http://localhost:8080/api'
  });

  const handleBefore = (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  };
  
  const handleError = (error) => {
    console.log(error);
  }
  
  api.interceptors.request.use(handleBefore, handleError);
>>>>>>> Stashed changes
  
  export default api;