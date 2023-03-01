import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query";

interface CartState {
  cartTotalAmount: number;
  images: [];
  cartQuantity: number;
  price: number;
  name: string;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  cartItems: CartResponse[];
}

interface CartResponse {
  cartQuantity: number;
  cartTotalAmount: number;
  price: number;
  name: string;
  images: [];
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
  name: "",
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems") ?? "[]")
    : [],
  images: [],
  price: 0,
  cartQuantity: 0,
  cartTotalAmount: 0,
};

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_URL}/`,
  }),
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    cart: builder.mutation<CartResponse, CartResponse>({
      query: (cart) => {
        console.log(cart);
        return {
          url: "cart/",
          method: "POST",
          body: cart,
        };
      },
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

      console.log(action);
      // state.cartItems = [...state.cartItems, action.payload];
      // state.cartItems.push(tempProduct);
    },
    removeFromCart(state, action) {
      const { id } = action.payload;
      const index = state.cartItems.findIndex((item) => item.id === id);
      if (index !== -1) {
        return {
          ...state,
          cartItems: [
            ...state.cartItems.slice(0, index),
            ...state.cartItems.slice(index + 1),
          ],
        };
      }
      return state;
    },
  },
  extraReducers: (builder) => {
    // builder
    //   .addCase(createCart.pending, (state) => {
    //     state.status = "loading";
    //   })
    //   .addCase(createCart.fulfilled, (state, action) => {
    //     state.status = "succeeded";
    //     state.cartItems = action.payload;
    //   })
    //   .addCase(createCart.rejected, (state, action) => {
    //     state.status = "failed";
    //     state.error = action.error.message ?? "Something went wrong.";
    //   });
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
