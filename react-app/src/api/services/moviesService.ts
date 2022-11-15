import { MoviesResponse } from "../../store/moviesSlice/models/MovieResponse";
import { httpApi } from "../http";
import { Category, MovieType } from "./tmbd";

class Movies {
  public getMoviesList = async (type: MovieType, params?: any) => {
    const url = Category.movie + "/" + MovieType[type];

    const response = await httpApi.get<MoviesResponse>(url, {
      params: {
        ...params,
      },
    });

    return response;
  };
}

export const moviesService = new Movies();
