import { MovieInfo } from "./MovieInfo";

export interface MoviesResponse {
  page: number;
  results: MovieInfo[];
  total_pages: number;
  total_results: number;
}
