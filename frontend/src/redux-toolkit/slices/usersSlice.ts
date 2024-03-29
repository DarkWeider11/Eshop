import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface LoginResponse {
  success: any;
  user_id: number;
  username: string;
  access_token: string;
  email: string;
  password: string;
  loginStatus: boolean;
}
interface LoginRequest {
  usernameOrEmail: string;
  password: string;
}

interface RegUser {
  email: string;
  username: string;
  password: string;
  confirm_password: string;
}

interface ResetPassword {
  username: string;
}

interface ChangePassword {
  old_password: string;
  new_password: string;
  confirm_new_password: string;
}
// Define a type for the slice state
// interface CounterState {
//   value: number;
// }
export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_URL}/authen`,
  }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    loginUsers: builder.mutation<LoginResponse, LoginResponse>({
      query: (user) => {
        console.log(user);

        return {
          url: "/login",
          method: "POST",
          body: user,
        };
      },
      invalidatesTags: ["Users"],
    }),

    registerUsers: builder.mutation<RegUser, RegUser>({
      query: (user) => {
        return {
          url: "/register",
          method: "POST",
          body: user,
        };
      },
      invalidatesTags: ["Users"],
    }),

    getUsersById: builder.mutation<any, number>({
      query: (id: number) => {
        return `users/${id}`;
      },
      invalidatesTags: ["Users"],
    }),
    resetPassword: builder.mutation<ResetPassword, ResetPassword>({
      query: ({ username }) => {
        return {
          url: "/reset-password",
          method: "POST",
          body: { username },
        };
      },
      invalidatesTags: ["Users"],
    }),
    changePassword: builder.mutation<void, ChangePassword>({
      query: (changePasswordData) => ({
        url: "/change-password",
        method: "PATCH",
        body: { changePasswordData },
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});
export const {
  useLoginUsersMutation,
  useRegisterUsersMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  // useGetUsersQuery,
  // useLazyGetUsersQuery,
  useGetUsersByIdMutation,
} = usersApi;
// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
// Define the initial state using that type

// const initialState: CounterState = {
//   value: 0,
// };
const initialState: LoginResponse = {
  user_id: 0,
  username: "",
  access_token: "",
  password: "",
  email: "",
  success: "",
  loginStatus: false,
};

const initialRegState: RegUser = {
  email: "",
  username: "",
  password: "",
  confirm_password: "",
};
const initialResetState: ResetPassword = {
  username: "",
};

const initialChangeState: ChangePassword = {
  old_password: "",
  new_password: "",
  confirm_new_password: "",
};

export const loginSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logout: (state) => {
      state.access_token = "";
      sessionStorage.removeItem("token");
      state.loginStatus = false;
    },
    setLoginStatus: (state, action: PayloadAction<boolean>) => {
      state.loginStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      usersApi.endpoints.loginUsers.matchFulfilled,
      (state, { payload }) => {
        console.log(payload.access_token);
        if (payload.access_token) {
          state.access_token = payload.access_token;
          sessionStorage.setItem("token", payload.access_token);
          state.loginStatus = true;
        }
      }
    );
  },
});

export const registerSlice = createSlice({
  name: "register",
  initialState: initialRegState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      usersApi.endpoints.registerUsers.matchFulfilled,
      (state, { payload }) => {
        console.log(payload, state);
        state.username = payload.username;
        state.email = payload.email;
      }
    );
  },
});

export const resetPasswordSlice = createSlice({
  name: "reset",
  initialState: initialResetState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    reset: (state) => {
      state.username = "";
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      usersApi.endpoints.resetPassword.matchFulfilled,
      (state, { payload }) => {
        console.log(payload);
        state.username = payload.username;
      }
    );
  },
});

// export const changePasswordSlice = createSlice({
//   name: "change",
//   initialState: initialChangeState,
//   reducers: {
//     resetChangePasswordState: (state) => {
//       state.old_password = "";
//       state.new_password = "";
//       state.confirm_new_password = "";
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addMatcher(
//       usersApi.endpoints.changePassword.matchFulfilled,
//       (state, { payload }) => {
//         console.log(payload);
//         state.old_password = payload.old_password;
//         state.new_password = payload.new_password;
//         state.confirm_new_password = payload.confirm_new_password;
//       }
//     );
//   },
// });

export const { logout, setLoginStatus } = loginSlice.actions;
// export const changeReducer = changePasswordSlice.reducer;
export const resetReducer = resetPasswordSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export const loginReducer = loginSlice.reducer;
export const registerReducer = registerSlice.reducer;
