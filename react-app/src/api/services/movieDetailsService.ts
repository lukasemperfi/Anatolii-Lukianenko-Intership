import { MovieDetailsResponse } from "../../store/movieDetailsSlice/models/MovieDetailsResponse";
import { httpApi } from "../http";
import { Category } from "./tmbd";

class MovieDetails {
  public getMovieDetails = async (id: string, params?: any) => {
    const url = Category.movie + "/" + id;

    const response = await httpApi.get<MovieDetailsResponse>(url, {
      params: {
        ...params,
      },
    });

    return response;
  };
}

export const movieDetailsService = new MovieDetails();
