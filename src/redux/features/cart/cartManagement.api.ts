import { baseApi } from "../../api/baseApi";

const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addToCart: builder.mutation({
      query: (cartInfo) => ({
        url: "cart/add-cart",
        method: "POST",
        body: cartInfo,
      }),
      invalidatesTags: ["cart"],
    }),
    carts: builder.query({
      query: (email) => ({
        url: `cart/allCart?email=${email}`,
        method: "GET",
      }),
      providesTags: ["cart"],
    }),
    updateQuantity: builder.mutation({
      query: (data) => ({
        url: `/cart/update-quantity`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["cart"],
    }),
    deleteCart: builder.mutation({
      query: (id) => ({
        url: `cart/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["cart"],
    }),
  }),
});

export const {
  useAddToCartMutation,
  useCartsQuery,
  useDeleteCartMutation,
  useUpdateQuantityMutation,
} = cartApi;
