import { defineStore } from "pinia";
import { useGenreStore} from "@/stores/genre"
const genres = useGenreStore()

export const useGenreDate = defineStore("dateAndGenre", () => {


  function getGenreName(id) {
    if (genres.genres.length !== 0) {
      const genero = genres.genres.find((genre) => genre.id === id);
      return genero ? genero.name : "Desconhecido";
    }
    return "Desconhecido";
  }

  function formatDate(date) {
    return new Date(date).toLocaleDateString('pt-BR');
  }

  return {
    genres,
    getGenreName,
    formatDate
  };
});
