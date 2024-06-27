import { baseApi } from "../../api/baseApi";

const watchListApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addToWatchList: builder.mutation({
      query: (info) => ({
        url: "watchList/add-watchlist",
        method: "POST",
        body: info,
      }),
      invalidatesTags: ["wishlist"],
    }),
    watchList: builder.query({
      query: (email) => ({
        url: `watchList/all-watchList?email=${email}`,
        method: "GET",
      }),
      providesTags: ["wishlist"],
    }),

    deleteWishlist: builder.mutation({
      query: (id) => ({
        url: `/watchList/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["wishlist"],
    }),
  }),
});

export const {
  useAddToWatchListMutation,
  useWatchListQuery,
  useDeleteWishlistMutation,
} = watchListApi;
