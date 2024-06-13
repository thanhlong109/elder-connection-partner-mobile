import { baseQueryWithReauth } from './baseApi';
import { createApi } from '@reduxjs/toolkit/query/react';
import { GetPostRespone } from '~/types/post.type';

export const postApi = createApi({
  baseQuery: baseQueryWithReauth,
  refetchOnMountOrArgChange: true,
  tagTypes: ['post', 'wallet'],
  endpoints: (builder) => ({
    getPosts: builder.query<ApiResponse<PaggingResponse<GetPostRespone>>, PaggingRequest<String>>({
      query: (para) => ({
        url: `api/posts/get-post-by-customer-id/6b9d3ad8-5e90-4440-abd6-8d1a8c39f182?pageIndex=${para.pageIndex}&pageSize=${para.pageSize}`,
      }),
      providesTags: ['post'],
    }),
  }),
  reducerPath: 'postApi',
});
export const { useGetPostsQuery } = postApi;
