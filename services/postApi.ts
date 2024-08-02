import { baseQueryWithReauth } from './baseApi';
import { createApi } from '@reduxjs/toolkit/query/react';
import { PostStatus } from '~/enums';
import { ApplyPostRequest, GetConnectorPost, GetPostRespone } from '~/types/post.type';

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
    applyPost: builder.mutation<void, ApplyPostRequest>({
      query: (para) => ({
        url: `api/posts/apply-post/${para.postId}?connectorId=${para.connectorId}`,
        method: 'POST',
      }),
      invalidatesTags: ['post'],
    }),
    getConnectorPost: builder.query<ApiResponse<PaggingResponse<GetConnectorPost>>,string>({
      query: (para) => ({
        url: `api/jobschedules/get-job-schedule-by-connector-id/${para}?pageIndex=0&pageSize=30`,
        method: 'GET',
      }),
      providesTags: ['post'],
    }),
    
  }),
  reducerPath: 'postApi',
});
export const { useGetPostsQuery, useApplyPostMutation,useGetConnectorPostQuery } = postApi;
