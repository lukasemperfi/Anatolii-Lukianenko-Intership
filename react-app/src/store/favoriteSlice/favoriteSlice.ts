import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { MovieInfo } from "../moviesSlice/models/MovieInfo";
import { RootReducers } from "../rootReducers";
import { RootState } from "../store";
import { FavoriteMovie } from "./models/FavoriteMovie";

export const getItemExist = (favoriteMovies: FavoriteMovie[], id: number) =>
  favoriteMovies.find((obj) => obj.id === id);

interface CartState {
  favoriteMovies: MovieInfo[];
}

const initialState: CartState = {
  favoriteMovies: [],
};

const favorite = createSlice({
  name: RootReducers.favorite,
  initialState,
  reducers: {
    addFavoriteMovie: (state, action: PayloadAction<MovieInfo>) => {
      const { payload: item } = action;
      const itemExists = getItemExist(state.favoriteMovies, item.id);

      if (!itemExists) {
        state.favoriteMovies.push(item);
      }
    },
    deleteFavoriteMovie(state, action: PayloadAction<number>) {
      const { payload: id } = action;

      state.favoriteMovies = state.favoriteMovies.filter(
        (obj) => obj.id !== id
      );
    },
    clearFavorite(state) {
      state.favoriteMovies = [];
    },
  },
});

export const { addFavoriteMovie, deleteFavoriteMovie, clearFavorite } =
  favorite.actions;

export const selectFavoriteMovies = (state: RootState) =>
  state?.favorite?.favoriteMovies;

export const selectIsMovieFavorite = (state: RootState, id: number) =>
  selectFavoriteMovies(state).some((movie) => movie.id === id);

export const favoriteSlice = favorite.reducer;
