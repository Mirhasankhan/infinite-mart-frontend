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
      query: (email) => ({
        url: `product/allProducts?email=${email}`,
        method: "GET",
      }),
      providesTags: ["products"],
    }),
    searchedProducts: builder.query({
      query: (search) => ({
        url: `product/searchedProducts?search=${search}`,
        method: "GET",
      }),
      providesTags: ["products"],
    }),
    categoryProducts: builder.query({
      query: (category) => ({
        url: `product/categoryProduct?category=${category}`,
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
    addReview: builder.mutation({
      query: ({ id, reviewData }) => ({
        url: `/product/${id}/reviews`,
        method: "PATCH",
        body: reviewData,
      }),
      invalidatesTags: ["products"],
    }),
    updateFlash: builder.mutation({
      query: ({ _id, discountPercentage }) => ({
        url: `/product/flash`,
        method: "PATCH",
        body: { _id, discountPercentage },
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
  useCategoryProductsQuery,
  useAddReviewMutation,
  useSearchedProductsQuery,
  useUpdateFlashMutation,
} = productApi;
