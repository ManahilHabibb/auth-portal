import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { useAuth } from "@clerk/clerk-react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: async (headers, { extra }) => {
      if (extra?.token) {
        headers.set("authorization", `Bearer ${extra.token}`);
      }
      return headers;
    }
  }),
  endpoints: (builder) => ({
    // POSTS
    getPosts: builder.query({
      query: () => "/posts",
      extraOptions: { auth: true }
    }),
    createPost: builder.mutation({
      query: (body) => ({
        url: "/posts",
        method: "POST",
        body
      }),
      extraOptions: { auth: true }
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE"
      }),
      extraOptions: { auth: true }
    }),

    // MESSAGES
    getMessages: builder.query({
      query: () => "/messages",
      extraOptions: { auth: true }
    }),

    sendMessage: builder.mutation({
      query: (body) => ({
        url: "/messages",
        method: "POST",
        body
      }),
      extraOptions: { auth: true }
    })
  })
});

// Export hooks
export const {
  useGetPostsQuery,
  useCreatePostMutation,
  useDeletePostMutation,
  useGetMessagesQuery,
  useSendMessageMutation
} = apiSlice;
