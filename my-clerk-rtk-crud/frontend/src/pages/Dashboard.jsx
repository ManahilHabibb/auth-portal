import React from "react";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import MessagePanel from "../components/MessagePanel";

export default function Dashboard() {
  return (
    <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <PostForm />
        <PostList />
      </div>

      <MessagePanel />
    </div>
  );
}
