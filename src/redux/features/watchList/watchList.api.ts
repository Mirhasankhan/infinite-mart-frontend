import { baseApi } from "../../api/baseApi";

const watchListApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addToWatchList: builder.mutation({
      query: (info) => ({
        url: "watchList/add-watchlist",
        method: "POST",
        body: info,
      }),
    }),
    watchList: builder.query({
      query: (email) => ({
        url: `watchList/all-watchList?email=${email}`,
        method: "GET",
      }),
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
  useAddToWatchListMutation,
  useWatchListQuery,
  useDeleteMutation,
} = watchListApi;
