import { UserButton } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function Nav() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="
        bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600
        shadow-lg sticky top-0 z-50
        backdrop-blur-lg bg-opacity-95
      "
    >
      <div className="max-w-7xl mx-auto py-4 px-6 flex justify-between items-center">
        
        {/* Logo Section */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-3 cursor-pointer"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-8 h-8 text-yellow-300" />
          </motion.div>

          <h1 className="text-2xl font-bold text-white">
            RTK Dashboard
          </h1>
        </motion.div>

        {/* User Button with Glow */}
        <motion.div
          whileHover={{ scale: 1.08 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="
            p-1 rounded-full 
            bg-white/20 hover:bg-white/30 
            backdrop-blur-xl 
            shadow-md border border-white/30
          "
        >
          <UserButton 
            appearance={{
              elements: {
                avatarBox: "shadow-lg border-2 border-white/50",
              },
            }}
          />
        </motion.div>
      </div>
    </motion.nav>
  );
}
