import { AuthService } from "@/services/auth";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
  }),
});

export const {
  useSignUpMutation,
  useOtpVerificationMutation,
  useSignInMutation,
} = authApi;
