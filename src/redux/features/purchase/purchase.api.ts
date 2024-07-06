import { baseApi } from "../../api/baseApi";

const purchaseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    purchaseProduct: builder.mutation({
      query: (productInfo) => ({
        url: "purchase/purchase-product",
        method: "POST",
        body: productInfo,
      }),
      invalidatesTags: ["purchase"],
    }),
    purchasedProducts: builder.query({
      query: (email) => ({
        url: `purchase/allPurchase?email=${email}`,
        method: "GET",
      }),
      providesTags: ["purchase"],
    }),
    orderedProducts: builder.query({
      query: (email) => ({
        url: `purchase/allOrders?email=${email}`,
        method: "GET",
      }),
      providesTags: ["purchase"],
    }),
    singleSupply: builder.query({
      query: (id) => ({
        url: `/supplies/${id}`,
        method: "GET",
      }),
    }),
    updatePurchaseStatus: builder.mutation({
      query: (id) => ({
        url: `purchase/${id}/status`,
        method: "PATCH",
      }),
      invalidatesTags: ["purchase"],
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
  useUpdatePurchaseStatusMutation,
  useOrderedProductsQuery,
} = purchaseApi;
