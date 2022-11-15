import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { moviesService } from "../../api/services/moviesService";
import { MovieType, PaginationLimit } from "../../api/services/tmbd";
import { RootReducers } from "../rootReducers";
import { RootState } from "../store";
import { MovieInfo } from "./models/MovieInfo";
import { MoviesResponse } from "./models/MovieResponse";

const uniqueMovies = (
  stateMovies: MovieInfo[],
  responseMovies: MovieInfo[]
) => {
  const hasMovie = (id: number) => stateMovies.find((movie) => id === movie.id);
  const uniqueResponseMovie = responseMovies.filter((obj) => !hasMovie(obj.id));

  return [...stateMovies, ...uniqueResponseMovie];
};

interface initialStateProps {
  movies: MovieInfo[];
  errorMessage?: string;
  isLoading: boolean;
  isMoreLoading: boolean;
  pagination: {
    page: number | null;
    totalResults: number;
    totalPages: number;
    isListEnd: boolean;
    pageLimit: number;
    perPageLimit: number;
  };
}

const initialState: initialStateProps = {
  movies: [],
  errorMessage: "",
  isLoading: false,
  isMoreLoading: false,
  pagination: {
    page: null,
    totalResults: 0,
    totalPages: 0,
    isListEnd: false,
    pageLimit: PaginationLimit.pageLimit,
    perPageLimit: PaginationLimit.perPageLimit,
  },
};

export const getMovies = createAsyncThunk<
  MoviesResponse,
  number,
  { rejectValue: string }
>(
  `${RootReducers.movies}/getMovies`,
  async (currentPage = 1, { rejectWithValue }) => {
    try {
      const response = await moviesService.getMoviesList(MovieType.popular, {
        page: currentPage,
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message as string);
    }
  }
);

const movies = createSlice({
  name: RootReducers.movies,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMovies.pending, (state) => {
      state.isLoading = true;
      state.isMoreLoading = true;
    });

    builder.addCase(getMovies.fulfilled, (state, { payload }) => {
      const hasMore =
        payload.page >= state.pagination.pageLimit ||
        payload.page >= payload.total_pages;

      state.movies = uniqueMovies(state.movies, payload.results);
      state.isLoading = false;
      state.isMoreLoading = false;
      state.errorMessage = "";
      state.pagination.page = payload.page;
      state.pagination.totalPages = payload.total_pages;
      state.pagination.totalResults = payload.total_results;
      state.pagination.isListEnd = hasMore;
    });

    builder.addCase(getMovies.rejected, (state, { payload }) => {
      state.errorMessage = payload;
      state.isLoading = false;
      state.isMoreLoading = false;
    });
  },
});

export const selectMoviesState = (state: RootState) => state?.movies;

export const selectMovies = (state: RootState) => state?.movies?.movies;

export const moviesSlice = movies.reducer;
