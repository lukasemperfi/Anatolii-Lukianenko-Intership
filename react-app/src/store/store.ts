import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { creditsSlice } from "./creditsSlice/creditsSlice";
import { favoriteSlice } from "./favoriteSlice/favoriteSlice";
import { movieDetailsSlice } from "./movieDetailsSlice/movieDetailsSlice";
import { moviesSlice } from "./moviesSlice/moviesSlice";
import { RootReducers } from "./rootReducers";

const rootReducer = combineReducers({
  [RootReducers.movies]: moviesSlice,
  [RootReducers.favorite]: favoriteSlice,
  [RootReducers.credits]: creditsSlice,
  [RootReducers.movieDetails]: movieDetailsSlice,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: [RootReducers.favorite],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

export const persistor = persistStore(store);
