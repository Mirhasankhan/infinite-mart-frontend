import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// https://infinite-mart-server.vercel.app

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1",
  }),
  tagTypes: ["products", "wishlist", "cart"],
  endpoints: () => ({}),
});
