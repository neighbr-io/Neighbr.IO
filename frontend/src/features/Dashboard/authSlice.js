import { createSlice } from "@reduxjs/toolkit";
import { api } from "../../app/api";

// Session storage key
const TOKEN = "token";

/**
 * API endpoints
 */
const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    me: builder.query({
      query: () => "users/me",
      providesTags: ["Me"],
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "auth",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Me", "Transactions"],
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "users/register",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Me", "Transactions"],
    }),
    logout: builder.mutation({
      queryFn: () => ({ data: {} }),
      invalidatesTags: ["Me", "Transactions"],
    }),
  }),
});

/**
 * Stores the payload's token in both state and session storage.
 */
export function storeToken(state, { payload }) {
  state.token = payload.token;
  window.localStorage.setItem(TOKEN, payload.token);
}

/**
 * Stores token whenever login or register succeeds
 */
const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: window.localStorage.getItem(TOKEN),
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.login.matchFulfilled, storeToken);
    builder.addMatcher(authApi.endpoints.register.matchFulfilled, storeToken);
    builder.addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
      state.token = null;
      window.localStorage.removeItem(TOKEN);
    });
  },
});

export default authSlice.reducer;

export const {
  useMeQuery,
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
} = authApi;

export const selectIsAuthenticated = (state) => Boolean(state.auth.token);