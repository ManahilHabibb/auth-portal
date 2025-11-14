import React, { useState } from "react";
import { useSendMessageMutation, useGetMessagesQuery } from "../app/apiSlice";

export default function MessagePanel() {
  const { data } = useGetMessagesQuery();
  const [sendMessage] = useSendMessageMutation();
  const [text, setText] = useState("");

  const send = async () => {
    await sendMessage({ text });
    setText("");
  };

  return (
    <div className="bg-white p-4 shadow rounded">
      <h2 className="text-xl font-bold mb-3">Messages</h2>

      <div className="mb-4 max-h-40 overflow-y-auto">
        {data?.map((msg) => (
          <p key={msg._id} className="bg-gray-200 p-2 rounded mb-2">
            {msg.text}
          </p>
        ))}
      </div>

      <input
        type="text"
        className="border p-2 w-full mb-2"
        placeholder="Send a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={send}>
        Send
      </button>
    </div>
  );
}
