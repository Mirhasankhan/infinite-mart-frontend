import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/create-account",
        method: "POST",
        body: userInfo,
      }),
    }),
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login-account",
        method: "POST",
        body: userInfo,
      }),
    }),
    update: builder.mutation({
      query: ({ email, role }) => ({
        url: `/users/${email}/updateRole`,
        method: "PUT",
        body: { role },
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useUpdateMutation } =
  authApi;
