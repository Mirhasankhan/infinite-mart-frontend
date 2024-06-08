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
    singleSupply: builder.query({
      query: (id) => ({
        url: `/supplies/${id}`,
        method: "GET",
      }),
    }),
    updateSupplyStatus: builder.mutation({
      query: ({ id, isApplied }) => ({
        url: `/supplies/${id}`,
        method: "PUT",
        body: { isApplied },
      }),
      invalidatesTags: ["products"],
    }),
    delete: builder.mutation({
      query: (id) => ({
        url: `/supplies/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["products"],
    }),
  }),
});

export const {
  useAddToCartMutation,
  useCartsQuery,
  useDeleteMutation,
  useSingleSupplyQuery,
  useUpdateSupplyStatusMutation,
} = cartApi;
