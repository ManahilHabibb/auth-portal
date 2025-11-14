import React, { useState } from "react";
import { useCreatePostMutation } from "../app/apiSlice";

export default function PostForm() {
  const [createPost] = useCreatePostMutation();

  const [form, setForm] = useState({
    title: "",
    content: ""
  });

  const submit = async () => {
    await createPost(form);
    setForm({ title: "", content: "" });
  };

  return (
    <div className="bg-white p-4 shadow rounded mb-5">
      <h2 className="text-xl font-bold mb-4">Create New Post</h2>

      <input
        type="text"
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        className="border p-2 w-full mb-3"
      />

      <textarea
        placeholder="Content"
        value={form.content}
        onChange={(e) => setForm({ ...form, content: e.target.value })}
        className="border p-2 w-full mb-3"
      />

      <button className="bg-green-600 px-4 py-2 text-white rounded" onClick={submit}>
        Add Post
      </button>
    </div>
  );
}
