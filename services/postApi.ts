import { baseQueryWithReauth } from './baseApi';
import { createApi } from '@reduxjs/toolkit/query/react';
import { PostStatus } from '~/enums';
import { GetPostRespone } from '~/types/post.type';

export const postApi = createApi({
  baseQuery: baseQueryWithReauth,
  refetchOnMountOrArgChange: true,
  tagTypes: ['post', 'wallet'],
  endpoints: (builder) => ({
    getPosts: builder.query<
      ApiResponse<PaggingResponse<GetPostRespone>>,
      PaggingRequest<PostStatus>
    >({
      query: (para) => ({
        url: `api/posts/get-all-posts-by-status?status=${para.data}&pageIndex=${para.pageIndex}&pageSize=${para.pageSize}`,
      }),
      providesTags: ['post'],
    }),
    applyPost: builder.mutation<
      ApiResponse<PaggingResponse<GetPostRespone>>,
      PaggingRequest<PostStatus>
    >({
      query: (para) => ({
        url: `api/posts/apply-post/20?connectorId=c4bbfb04-4c49-4092-820e-85ea85ca95df`,
      }),
    }),
  }),
  reducerPath: 'postApi',
});
export const { useGetPostsQuery } = postApi;
