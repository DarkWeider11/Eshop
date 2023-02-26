import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface CartState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  cartItems: CartResponse[] | null;
}

interface CartResponse {
  id: number;
  user: User;
  date: string;
  produs: string;
}

interface User {
  id: number;
  password: string;
  last_login: any;
  is_superuser: boolean;
  username: string;
  is_staff: boolean;
  is_active: boolean;
  date_joined: string;
  email: string;
  joinded_date: string;
  groups: any[];
  user_permissions: any[];
}

const initialState: CartState = {
  status: "idle",
  error: null,
  cartItems: null,
};

export const createCart = createAsyncThunk(
  "cart/create",
  async (cartData: CartResponse) => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartData),
    });
    const data = await response.json();
    return data;
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      state.cartItems?.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cartItems = action.payload;
      })
      .addCase(createCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong.";
      });
  },
});

export const { addToCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
