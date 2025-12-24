import axios from "axios";

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    Authorization: 'Bearer MANDANDO PRO GIT SEM CHAVE DE API'
  },
},);

export default api;
