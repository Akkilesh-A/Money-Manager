import { AuthService } from "@/services/auth";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TRANSACTION_ROUTER, USER_ROUTER } from "../constants";

export const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:8000/api/v1`,
  }),
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (body) => ({
        url: "/auth/signup",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      }),
    }),
    otpVerification: builder.mutation({
      query: ({ otp }) => ({
        url: "/auth/verify-otp",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: AuthService.getAuthHeader(),
        },
        body: {
          otp,
        },
      }),
    }),
    signIn: builder.mutation({
      query: (body) => ({
        url: "/auth/signin",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: AuthService.getAuthHeader(),
        },
        body,
      }),
    }),
    getUserData: builder.query({
      query: () => ({
        url: `${USER_ROUTER}/get-profile`,
        headers: {
          "Content-Type": "application/json",
          Authorization: AuthService.getAuthHeader(),
        },
      }),
    }),
    addMoney: builder.mutation({
      query: (body) => ({
        url: `${TRANSACTION_ROUTER}/add-money`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: AuthService.getAuthHeader(),
        },
        body,
      }),
    }),
    withdrawMoney: builder.mutation({
      query: (body) => ({
        url: `${TRANSACTION_ROUTER}/withdraw-money`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: AuthService.getAuthHeader(),
        },
        body,
      }),
    }),
    setBudget: builder.mutation({
      query: (body) => ({
        url: `${TRANSACTION_ROUTER}/set-budget`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: AuthService.getAuthHeader(),
        },
        body,
      }),
    }),
  }),
});

export const {
  useSignUpMutation,
  useOtpVerificationMutation,
  useSignInMutation,
  useGetUserDataQuery,
  useAddMoneyMutation,
  useWithdrawMoneyMutation,
  useSetBudgetMutation,
} = authApi;
