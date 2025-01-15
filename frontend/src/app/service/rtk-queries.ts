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
      query: ({ otp, token }) => ({
        url: "/auth/verify-otp",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: {
          otp,
        },
      }),
    }),
  }),
});

export const { useSignUpMutation, useOtpVerificationMutation } = authApi;
