import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  timeout: 10000,
  params: {
    api_key: "cf8bd23be4ac2a988327575f1b267f91",
  },
});