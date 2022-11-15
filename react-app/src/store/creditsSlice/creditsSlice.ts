import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { creditsService } from "../../api/services/creditsService";
import { RootReducers } from "../rootReducers";
import { RootState } from "../store";
import { Cast } from "./models/Cast";

interface initialStateProps {
  cast: Cast[];
  errorMessage?: string;
  isLoading: boolean;
}

const initialState: initialStateProps = {
  cast: [],
  errorMessage: "",
  isLoading: false,
};

export const getCast = createAsyncThunk<
  Cast[],
  number,
  { rejectValue: string }
>(`${RootReducers.movies}/getCast`, async (id, { rejectWithValue }) => {
  try {
    const response = await creditsService.getCredits(id);

    return response.data.cast;
  } catch (error: any) {
    return rejectWithValue(error.message as string);
  }
});

const credits = createSlice({
  name: RootReducers.credits,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCast.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getCast.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.cast = payload;
    });

    builder.addCase(getCast.rejected, (state, { payload }) => {
      state.errorMessage = payload;
      state.isLoading = false;
    });
  },
});

export const selectCast = (state: RootState) => state?.credits?.cast;

export const creditsSlice = credits.reducer;
