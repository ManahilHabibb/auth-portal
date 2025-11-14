import React from "react";
import { useGetPostsQuery, useDeletePostMutation } from "../app/apiSlice";

export default function PostList() {
  const { data, isLoading } = useGetPostsQuery();
  const [deletePost] = useDeletePostMutation();

  if (isLoading) return <p>Loading Posts...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">All Posts</h2>

      {data?.map((post) => (
        <div key={post._id} className="bg-white p-4 shadow rounded mb-3">
          <h3 className="font-bold">{post.title}</h3>
          <p>{post.content}</p>

          <button
            className="bg-red-500 text-white px-3 py-1 mt-2 rounded"
            onClick={() => deletePost(post._id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
