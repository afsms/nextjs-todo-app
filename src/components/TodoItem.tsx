"use client";

import { motion } from "framer-motion";
import { Check, Trash2, Calendar } from "lucide-react";
import { format } from "date-fns";
import { de } from "date-fns/locale";

interface TodoItemProps {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  priority?: "low" | "medium" | "high";
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const priorityConfig = {
  low: {
    label: "Niedrig",
    color: "bg-emerald-100 text-emerald-700 border-emerald-200",
    darkColor: "dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800",
    dot: "bg-emerald-500",
  },
  medium: {
    label: "Mittel",
    color: "bg-amber-100 text-amber-700 border-amber-200",
    darkColor: "dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800",
    dot: "bg-amber-500",
  },
  high: {
    label: "Hoch",
    color: "bg-rose-100 text-rose-700 border-rose-200",
    darkColor: "dark:bg-rose-900/30 dark:text-rose-300 dark:border-rose-800",
    dot: "bg-rose-500",
  },
};

export function TodoItem({
  id,
  title,
  completed,
  createdAt,
  priority = "medium",
  onToggle,
  onDelete,
}: TodoItemProps) {
  const priorityStyle = priorityConfig[priority];

  return (
    <motion.div
      layout
      whileHover={{ scale: 1.01 }}
      className={`
        group relative flex items-center gap-4 p-4 
        bg-white dark:bg-slate-800
        rounded-2xl border border-slate-200 dark:border-slate-700
        shadow-sm hover:shadow-md
        transition-all duration-300 ease-out
        ${completed ? "opacity-60" : "opacity-100"}
      `}
    >
      {/* Animated Checkbox */}
      <motion.button
        onClick={() => onToggle(id)}
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
        className={`
          relative flex-shrink-0 w-6 h-6 rounded-full
          border-2 transition-all duration-300
          ${
            completed
              ? "bg-indigo-500 border-indigo-500 dark:bg-indigo-400 dark:border-indigo-400"
              : "border-slate-300 dark:border-slate-500 hover:border-indigo-400"
          }
        `}
      >
        <motion.div
          initial={false}
          animate={{
            scale: completed ? 1 : 0,
            opacity: completed ? 1 : 0,
          }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
        </motion.div>
      </motion.button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p
          className={`
            text-base font-medium transition-all duration-300
            ${
              completed
                ? "text-slate-400 dark:text-slate-500 line-through"
                : "text-slate-700 dark:text-slate-200"
            }
          `}
        >
          {title}
        </p>
        
        {/* Meta info */}
        <div className="flex items-center gap-3 mt-1">
          <span className="flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
            <Calendar className="w-3 h-3" />
            {format(new Date(createdAt), "dd. MMM", { locale: de })}
          </span>
          
          {/* Priority Badge */}
          <span
            className={`
              inline-flex items-center gap-1 px-2 py-0.5 rounded-full
              text-xs font-medium border
              ${priorityStyle.color} ${priorityStyle.darkColor}
            `}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${priorityStyle.dot}`} />
            {priorityStyle.label}
          </span>
        </div>
      </div>

      {/* Delete Button - appears on hover */}
      <motion.button
        onClick={() => onDelete(id)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`
          flex-shrink-0 p-2 rounded-xl
          text-slate-400 hover:text-rose-500
          hover:bg-rose-50 dark:hover:bg-rose-900/20
          transition-all duration-200
          opacity-0 group-hover:opacity-100
          focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-rose-500/30
        `}
        aria-label="Todo löschen"
      >
        <Trash2 className="w-4 h-4" />
      </motion.button>
    </motion.div>
  );
}
