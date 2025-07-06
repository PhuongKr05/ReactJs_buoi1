import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const checkout = createAsyncThunk(
  'cart/checkout',
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:4000/api/checkout', payload);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Checkout error');
    }
  }
);

const initialState = {
  items: [],
  checkoutStatus: 'idle', 
  checkoutError: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity } = action.payload;
      const existingItem = state.items.find(item => item.productId === product.productId);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ ...product, quantity });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.productId !== action.payload);
    },
    increaseQuantity: (state, action) => {
      const item = state.items.find(item => item.productId === action.payload);
      if (item && item.quantity < 99) {
        item.quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.items.find(item => item.productId === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkout.pending, (state) => {
        state.checkoutStatus = 'loading';
        state.checkoutError = null;
      })
      .addCase(checkout.fulfilled, (state) => {
        state.checkoutStatus = 'succeeded';
        state.items = [];
      })
      .addCase(checkout.rejected, (state, action) => {
        state.checkoutStatus = 'failed';
        state.checkoutError = action.payload;
      });
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
