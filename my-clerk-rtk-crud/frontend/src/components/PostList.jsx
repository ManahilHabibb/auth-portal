import { useGetPostsQuery } from "../app/apiSlice";
import { motion } from "framer-motion";
import { UserCircle2 } from "lucide-react";

export default function PostList() {
  const { data: posts = [], isLoading } = useGetPostsQuery();

  if (isLoading) return <p className="text-center text-gray-500">Loading posts...</p>;

  return (
    <div className="mt-6 space-y-5">
      {posts.map((post, index) => (
        <motion.div
          key={post._id}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.07 }}
          whileHover={{ scale: 1.02 }}
          className="
            bg-white/70 backdrop-blur-md 
            p-5 rounded-2xl shadow-lg 
            border border-indigo-200/40 
            hover:shadow-xl transition
          "
        >
          {/* TOP SECTION */}
          <div className="flex items-center gap-4">
            
            {/* Avatar */}
            <motion.div
              whileHover={{ rotate: 10, scale: 1.05 }}
              className="
                w-12 h-12 rounded-full 
                bg-gradient-to-tr from-indigo-500 to-purple-500 
                flex items-center justify-center 
                shadow-md
              "
            >
              <UserCircle2 className="w-7 h-7 text-white" />
            </motion.div>

            {/* Author Info */}
            <div>
              <p className="font-semibold text-gray-900 text-lg">
                {post.author || "Unknown User"}
              </p>
              <span className="text-xs text-gray-500">
                {post.createdAt ? new Date(post.createdAt).toLocaleString() : "Just now"}
              </span>
            </div>
          </div>

          {/* POST CONTENT */}
          <p className="mt-4 text-gray-700 leading-relaxed">
            {post.content}
          </p>

          {/* FOOTER GRADIENT LINE */}
          <div className="mt-4 h-1 w-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
        </motion.div>
      ))}
    </div>
  );
}
