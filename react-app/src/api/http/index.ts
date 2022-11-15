import axios from "axios";

import { TmdbPath } from "../services/tmbd";

export const httpApi = axios.create({
  baseURL: TmdbPath.baseUrl,
  params: {
    api_key: process.env.REACT_APP_TMDB_API_KEY,
  },
});
