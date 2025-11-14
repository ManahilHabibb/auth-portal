import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import { motion } from "framer-motion";
import { LineChart } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="max-w-5xl mx-auto mt-10 px-6">

      {/* Title Section */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="p-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md"
          >
            <LineChart className="w-6 h-6 text-white" />
          </motion.div>

          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
            Dashboard
          </h1>
        </div>

        <p className="text-gray-600 mt-2 text-lg">
          Welcome back! Here's what's happening today.
        </p>
      </motion.div>

      {/* Post Form */}
      <PostForm />

      {/* Posts List */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-10"
      >
        <h2 className="flex items-center gap-2 text-2xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
          📈 Recent Posts
        </h2>

        <PostList />
      </motion.div>
    </div>
  );
}
