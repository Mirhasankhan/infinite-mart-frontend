import { baseApi } from "../../api/baseApi";

const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addToCart: builder.mutation({
      query: (cartInfo) => ({
        url: "cart/add-cart",
        method: "POST",
        body: cartInfo,
      }),
      invalidatesTags: ["products"],
    }),
    carts: builder.query({
      query: (email) => ({
        url: `cart/allCart?email=${email}`,
        method: "GET",
      }),
      providesTags: ["products"],
    }),
    updateQuantity: builder.mutation({
      query: (data) => ({
        url: `/cart/update-quantity`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["products"],
    }),
    deleteCart: builder.mutation({
      query: (id) => ({
        url: `cart/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["products"],
    }),
  }),
});

export const {
  useAddToCartMutation,
  useCartsQuery,
  useDeleteCartMutation,
  useUpdateQuantityMutation,
} = cartApi;
