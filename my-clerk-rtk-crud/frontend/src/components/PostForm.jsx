import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCreatePostMutation } from "../app/apiSlice";
import { Camera, Send } from "lucide-react";

export default function PostForm() {
  const [content, setContent] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [createPost] = useCreatePostMutation();

  const submitPost = async () => {
    if (!content.trim()) return;
    await createPost({ content });
    setContent("");
    setIsExpanded(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="
        bg-white p-6 rounded-3xl shadow-xl 
        border-2 border-indigo-100 
        hover:shadow-2xl transition-all duration-300
      "
    >
      {/* Header */}
      <h2 className="flex items-center gap-2 text-2xl font-bold text-indigo-700 mb-4">
        💬 Create Post
      </h2>

      {/* Profile + Textarea */}
      <div className="flex items-start gap-3 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center font-bold text-white shadow-lg">
          U
        </div>

        <motion.textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onFocus={() => setIsExpanded(true)}
          placeholder="What's on your mind today? Share something interesting..."
          className="
            w-full p-4 rounded-2xl border-2 
            border-gray-200 focus:border-indigo-500 
            focus:ring-4 focus:ring-indigo-100 
            outline-none transition-all resize-none
          "
          rows={isExpanded ? 4 : 2}
          whileFocus={{ scale: 1.01 }}
        />
      </div>

      {/* Expandable Bottom Section */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mt-2"
          >
            <div className="flex justify-between items-center mt-2">
              {/* Left Section */}
              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="
                    p-2 rounded-full bg-indigo-50 
                    hover:bg-indigo-100 text-indigo-600 transition
                  "
                >
                  <Camera className="w-5 h-5" />
                </motion.button>

                <p className="text-sm text-gray-500">{content.length} characters</p>
              </div>

              {/* Right Section */}
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsExpanded(false)}
                  className="
                    px-4 py-2 rounded-xl 
                    bg-gray-100 hover:bg-gray-200 
                    text-gray-700 transition font-medium
                  "
                >
                  Cancel
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={submitPost}
                  disabled={!content.trim()}
                  className="
                    flex items-center gap-2 
                    bg-gradient-to-r from-indigo-600 to-purple-600 
                    text-white px-6 py-2 rounded-xl 
                    hover:from-indigo-700 hover:to-purple-700 
                    transition shadow-lg 
                    disabled:opacity-50 disabled:cursor-not-allowed
                    font-medium
                  "
                >
                  <Send className="w-4 h-4" />
                  Publish
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
