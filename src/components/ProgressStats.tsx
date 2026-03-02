"use client";

import { motion, useSpring, useTransform } from "framer-motion";
import { CheckCircle2, Circle, Zap, Target } from "lucide-react";
import { useEffect } from "react";

interface ProgressStatsProps {
  total: number;
  completed: number;
}

export function ProgressStats({ total, completed }: ProgressStatsProps) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  const remaining = total - completed;

  // Animated progress
  const progress = useSpring(0, {
    stiffness: 100,
    damping: 30,
  });
  const progressWidth = useTransform(progress, [0, 100], ["0%", "100%"]);

  useEffect(() => {
    progress.set(percentage);
  }, [percentage, progress]);

  const getMotivation = () => {
    if (percentage === 100) return "Alles erledigt! 🎉";
    if (percentage >= 75) return "Fast geschafft! 💪";
    if (percentage >= 50) return "Guter Fortschritt! 🚀";
    if (percentage >= 25) return "Mach weiter so! ⭐";
    return "Fang an! 🎯";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="
        w-full
        bg-gradient-to-br from-white to-indigo-50/50
        dark:from-slate-800 dark:to-slate-800/80
        rounded-3xl
        border border-slate-200 dark:border-slate-700
        p-6
        shadow-lg shadow-slate-200/50 dark:shadow-none
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
            Fortschritt
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {getMotivation()}
          </p>
        </div>
        <motion.div
          key={percentage}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="
            w-16 h-16 rounded-2xl
            bg-gradient-to-br from-indigo-500 to-violet-600
            flex items-center justify-center
            shadow-lg shadow-indigo-500/30
          "
        >
          <span className="text-xl font-bold text-white">{percentage}%</span>
        </motion.div>
      </div>

      {/* Progress Bar */}
      <div className="relative h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mb-6">
        <motion.div
          style={{ width: progressWidth }}
          className="
            absolute inset-y-0 left-0
            bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500
            rounded-full
          "
        />
        {/* Shine effect */}
        <motion.div
          animate={{ x: ["-100%", "200%"] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1,
            ease: "easeInOut",
          }}
          className="
            absolute inset-y-0 w-1/3
            bg-gradient-to-r from-transparent via-white/30 to-transparent
            rounded-full
          "
        />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4">
        {/* Total */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="
            flex flex-col items-center p-4
            bg-white dark:bg-slate-700/50
            rounded-2xl
            border border-slate-100 dark:border-slate-600
            shadow-sm
          "
        >
          <Target className="w-5 h-5 text-indigo-500 mb-2" />
          <span className="text-2xl font-bold text-slate-700 dark:text-slate-200">
            {total}
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Gesamt
          </span>
        </motion.div>

        {/* Completed */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="
            flex flex-col items-center p-4
            bg-emerald-50 dark:bg-emerald-900/20
            rounded-2xl
            border border-emerald-100 dark:border-emerald-800
            shadow-sm
          "
        >
          <CheckCircle2 className="w-5 h-5 text-emerald-500 mb-2" />
          <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            {completed}
          </span>
          <span className="text-xs text-emerald-600/70 dark:text-emerald-400/70">
            Erledigt
          </span>
        </motion.div>

        {/* Remaining */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="
            flex flex-col items-center p-4
            bg-amber-50 dark:bg-amber-900/20
            rounded-2xl
            border border-amber-100 dark:border-amber-800
            shadow-sm
          "
        >
          <Circle className="w-5 h-5 text-amber-500 mb-2" />
          <span className="text-2xl font-bold text-amber-600 dark:text-amber-400">
            {remaining}
          </span>
          <span className="text-xs text-amber-600/70 dark:text-amber-400/70">
            Offen
          </span>
        </motion.div>
      </div>

      {/* Quick tip */}
      {remaining > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="
            mt-4 flex items-center gap-2
            text-xs text-slate-500 dark:text-slate-400
            bg-slate-50 dark:bg-slate-700/30
            rounded-xl px-3 py-2
          "
        >
          <Zap className="w-3.5 h-3.5 text-amber-500" />
          <span>
            {remaining === 1
              ? "Noch eine Aufgabe, du schaffst das!"
              : `Noch ${remaining} Aufgaben übrig`}
          </span>
        </motion.div>
      )}
    </motion.div>
  );
}
