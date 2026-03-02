"use client";

import { motion } from "framer-motion";
import { ClipboardList } from "lucide-react";

export function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      {/* Illustration Container */}
      <motion.div
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative mb-6"
      >
        {/* Background glow */}
        <div className="absolute inset-0 bg-indigo-200 dark:bg-indigo-900/40 rounded-full blur-3xl opacity-50 scale-150" />
        
        {/* Icon container */}
        <div
          className="
            relative w-24 h-24 
            bg-gradient-to-br from-indigo-100 to-violet-100 
            dark:from-indigo-900/50 dark:to-violet-900/50
            rounded-3xl 
            flex items-center justify-center
            shadow-lg shadow-indigo-200/50 dark:shadow-indigo-900/30
            border border-indigo-200 dark:border-indigo-700
          "
        >
          <ClipboardList className="w-10 h-10 text-indigo-500 dark:text-indigo-400" />
        </div>

        {/* Floating elements */}
        <motion.div
          animate={{
            y: [0, -4, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.2,
          }}
          className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-400/80 dark:bg-emerald-500/60 rounded-full backdrop-blur-sm"
        />
        <motion.div
          animate={{
            y: [0, 4, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="absolute -bottom-1 -left-3 w-6 h-6 bg-violet-400/80 dark:bg-violet-500/60 rounded-full backdrop-blur-sm"
        />
      </motion.div>

      {/* Text content */}
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-2"
      >
        Noch keine Aufgaben
      </motion.h3>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center text-slate-500 dark:text-slate-400 max-w-xs"
      >
        Füge deine erste Aufgabe hinzu und starte produktiv in den Tag!
      </motion.p>

      {/* CTA hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-6 flex items-center gap-2 text-sm text-indigo-500 dark:text-indigo-400"
      >
        <span className="w-6 h-px bg-indigo-300 dark:bg-indigo-600" />
        <span>Gib unten etwas ein</span>
        <span className="w-6 h-px bg-indigo-300 dark:bg-indigo-600" />
      </motion.div>
    </motion.div>
  );
}
