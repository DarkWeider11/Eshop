import { imagesReducer, productsApi } from "./../slices/productSlice";
import { logout, registerReducer } from "./../slices/usersSlice";
// import { counterReducer } from "../slices/countslice";
import { configureStore } from "@reduxjs/toolkit";
import { loginReducer, usersApi } from "../slices/usersSlice";
import { productsReducer } from "../slices/productSlice";

// ...

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    login: loginReducer,
    register: registerReducer,
    products: productsReducer,
    images: imagesReducer,
  },

  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      usersApi.middleware,
      productsApi.middleware,
    ]),
  // comments: commentsReducer,
  // users: usersReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
