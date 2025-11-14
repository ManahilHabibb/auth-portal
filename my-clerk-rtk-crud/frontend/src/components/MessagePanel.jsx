import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, MessageCircle, Sparkles } from "lucide-react";
import { useSendMessageMutation } from "../app/apiSlice";

export default function MessagePanel() {
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const [sendMessage] = useSendMessageMutation();

  const send = async () => {
    if (!msg.trim()) return;

    // send to backend
    await sendMessage({ message: msg });

    // add locally
    setMessages([
      ...messages,
      { text: msg, time: new Date().toLocaleTimeString() },
    ]);

    setMsg("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 p-6 rounded-3xl shadow-xl border border-purple-200 backdrop-blur-xl"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 rounded-xl bg-white shadow-md">
          <MessageCircle className="w-6 h-6 text-purple-600" />
        </div>

        <h2 className="text-xl font-bold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent">
          Quick Messages
        </h2>

        <Sparkles className="w-5 h-5 text-yellow-500 ml-auto" />
      </div>

      {/* Messages List */}
      <div className="space-y-2 mb-4 max-h-44 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-purple-300">
        <AnimatePresence>
          {messages.map((m, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-white p-3 rounded-xl shadow flex flex-col border border-purple-100"
            >
              <p className="text-sm text-gray-700">{m.text}</p>
              <span className="text-xs text-gray-400 mt-1">{m.time}</span>
            </motion.div>
          ))}
        </AnimatePresence>

        {messages.length === 0 && (
          <p className="text-center text-gray-400 text-sm">
            No messages yet... ✨
          </p>
        )}
      </div>

      {/* Input + Send */}
      <div className="flex gap-2">
        <motion.input
          type="text"
          value={msg}
          placeholder="Type your message..."
          onChange={(e) => setMsg(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          whileFocus={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="
            flex-1 p-4 rounded-xl 
            backdrop-blur-xl bg-white/70 
            border-2 border-purple-200 
            focus:border-purple-500 
            focus:ring-4 focus:ring-purple-100 
            outline-none transition-all shadow-sm
          "
        />

        <motion.button
          onClick={send}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          disabled={!msg.trim()}
          className="
            p-4 rounded-xl 
            bg-gradient-to-r from-purple-600 to-pink-600 
            text-white shadow-lg 
            hover:from-purple-700 hover:to-pink-700 
            disabled:opacity-40 disabled:cursor-not-allowed
          "
        >
          <Send className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  );
}
