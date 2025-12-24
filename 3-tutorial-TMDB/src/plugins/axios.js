import axios from "axios";

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    Authorization: 'Bearer INSIRA_SEU_TOKEN_AQUI'
  }
});
export default api;
