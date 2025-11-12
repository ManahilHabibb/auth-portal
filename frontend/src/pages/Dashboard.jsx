import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, MessageSquare } from "lucide-react";
import { fetchMessages, postMessage } from "../api/messageApi";

export default function Dashboard() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchMessages();
      setMessages(data);
    } catch (err) {
      setError(err.message || "Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (!text) return;
    setLoading(true);
    setError(null);
    try {
      const newMsg = await postMessage(text);
      setMessages((prev) => [...prev, newMsg]);
      setText("");
    } catch (err) {
      setError(err.message || "Failed to post message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-violet-900 to-indigo-900 flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <MessageSquare className="text-pink-400" /> Dashboard
          </h1>
          <button
            onClick={load}
            className="text-sm px-3 py-1.5 bg-white/10 text-white rounded-lg hover:bg-white/20 transition"
          >
            Refresh
          </button>
        </div>

        <form onSubmit={submit} className="flex mb-6">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500 border border-white/20"
          />
          <button
            type="submit"
            disabled={loading}
            className="ml-3 px-5 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-violet-600 text-white font-semibold shadow-lg hover:scale-105 transition-all disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Send size={18} />}
            Send
          </button>
        </form>

        {error && (
          <p className="text-red-400 text-sm mb-4">{error}</p>
        )}

        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
          <AnimatePresence>
            {messages.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-4 rounded-xl bg-white/10 border border-white/10 text-white hover:bg-white/20 transition"
              >
                <div>{m.text}</div>
                <div className="text-xs text-white/60 mt-1">
                  {new Date(m.createdAt).toLocaleString()}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
