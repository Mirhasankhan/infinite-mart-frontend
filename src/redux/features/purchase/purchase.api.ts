import { baseApi } from "../../api/baseApi";

const purchaseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    purchaseProduct: builder.mutation({
      query: (productInfo) => ({
        url: "purchase/purchase-product",
        method: "POST",
        body: productInfo,
      }),
    }),
    purchasedProducts: builder.query({
      query: (email) => ({
        url: `purchase/allPurchase?email=${email}`,
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
  usePurchaseProductMutation,
  usePurchasedProductsQuery,
  useDeleteMutation,
  useSingleSupplyQuery,
  useUpdateSupplyStatusMutation,
} = purchaseApi;
