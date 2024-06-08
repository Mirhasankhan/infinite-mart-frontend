import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProdct: builder.mutation({
      query: (productInfo) => ({
        url: "product/create-product",
        method: "POST",
        body: productInfo,
      }),
      invalidatesTags: ["products"],
    }),
    products: builder.query({
      query: () => ({
        url: `product/allProducts`,
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
  useCreateProdctMutation,
  useProductsQuery,
  useDeleteMutation,
  useSingleSupplyQuery,
  useUpdateSupplyStatusMutation,
} = productApi;
