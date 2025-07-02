import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPhotos } from '../services/api';

export const getPhotos = createAsyncThunk(
  'photos/getPhotos',
  async ({ albumId, page }, thunkAPI) => {
    try {
      const res = await fetchPhotos({
        albumId,
        _start: page * 12,
        _limit: 12,
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const photoSlice = createSlice({
  name: 'photos',
  initialState: {
    list: [],
    page: 0,
    loading: false,
    error: null,
    albumId: '',
  },
  reducers: {
    setAlbumId: (state, action) => {
      state.albumId = action.payload;
    },
    resetPhotos: (state) => {
      state.list = [];
      state.page = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPhotos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPhotos.fulfilled, (state, action) => {
        state.loading = false;
        state.list = [...state.list, ...action.payload];
        state.page += 1;
      })
      .addCase(getPhotos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setAlbumId, resetPhotos } = photoSlice.actions;
export default photoSlice.reducer;
