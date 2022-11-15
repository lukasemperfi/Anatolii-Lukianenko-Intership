import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { movieDetailsService } from "../../api/services/movieDetailsService";

import { RootReducers } from "../rootReducers";
import { RootState } from "../store";
import { MovieDetailsResponse } from "./models/MovieDetailsResponse";

interface initialStateProps {
  movieDetails: MovieDetailsResponse | null;
  errorMessage?: string;
  isLoading: boolean;
}

const initialState: initialStateProps = {
  movieDetails: null,
  errorMessage: "",
  isLoading: false,
};

export const getMoviesDetails = createAsyncThunk<
  MovieDetailsResponse,
  string,
  { rejectValue: string }
>(
  `${RootReducers.movies}/getMoviesDetails`,
  async (id, { rejectWithValue }) => {
    try {
      const response = await movieDetailsService.getMovieDetails(id);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message as string);
    }
  }
);

const movieDetails = createSlice({
  name: RootReducers.movieDetails,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMoviesDetails.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getMoviesDetails.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.movieDetails = payload;
    });

    builder.addCase(getMoviesDetails.rejected, (state, { payload }) => {
      state.errorMessage = payload;
      state.isLoading = false;
    });
  },
});

export const selectMovieDetails = (state: RootState) =>
  state?.movieDetails?.movieDetails;

export const movieDetailsSlice = movieDetails.reducer;
