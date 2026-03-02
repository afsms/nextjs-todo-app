"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Flag } from "lucide-react";

interface AddTodoProps {
  onAdd: (title: string, priority: "low" | "medium" | "high") => void;
}

const priorities = [
  { value: "low" as const, label: "Niedrig", color: "bg-emerald-500" },
  { value: "medium" as const, label: "Mittel", color: "bg-amber-500" },
  { value: "high" as const, label: "Hoch", color: "bg-rose-500" },
];

export function AddTodo({ onAdd }: AddTodoProps) {
  const [title, setTitle] = useState("");
  const [selectedPriority, setSelectedPriority] = useState<"low" | "medium" | "high">("medium");
  const [isFocused, setIsFocused] = useState(false);
  const [showPriorityMenu, setShowPriorityMenu] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title.trim(), selectedPriority);
      setTitle("");
    }
  };

  const selectedPriorityConfig = priorities.find((p) => p.value === selectedPriority)!;

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <motion.div
        animate={{
          boxShadow: isFocused
            ? "0 0 0 3px rgba(99, 102, 241, 0.2), 0 10px 40px -10px rgba(99, 102, 241, 0.3)"
            : "0 4px 20px -5px rgba(0, 0, 0, 0.1)",
        }}
        transition={{ duration: 0.2 }}
        className="
          relative flex items-center gap-3 
          bg-white dark:bg-slate-800 
          rounded-2xl 
          border border-slate-200 dark:border-slate-700
          p-2 pl-4
        "
      >
        {/* Priority Selector */}
        <div className="relative">
          <motion.button
            type="button"
            onClick={() => setShowPriorityMenu(!showPriorityMenu)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
              flex items-center gap-2 px-3 py-2 rounded-xl
              bg-slate-50 dark:bg-slate-700/50
              border border-slate-200 dark:border-slate-600
              hover:border-slate-300 dark:hover:border-slate-500
              transition-colors duration-200
            `}
          >
            <Flag className={`w-4 h-4 ${selectedPriorityConfig.color}`} />
            <span className="text-sm text-slate-600 dark:text-slate-300">
              {selectedPriorityConfig.label}
            </span>
          </motion.button>

          {/* Priority Dropdown */}
          <AnimatePresence>
            {showPriorityMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="
                  absolute bottom-full left-0 mb-2
                  bg-white dark:bg-slate-800
                  rounded-xl border border-slate-200 dark:border-slate-700
                  shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50
                  p-1.5 min-w-[140px]
                  z-50
                "
              >
                {priorities.map((priority) => (
                  <button
                    key={priority.value}
                    type="button"
                    onClick={() => {
                      setSelectedPriority(priority.value);
                      setShowPriorityMenu(false);
                    }}
                    className={`
                      w-full flex items-center gap-3 px-3 py-2 rounded-lg
                      text-sm transition-colors duration-150
                      ${
                        selectedPriority === priority.value
                          ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
                          : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                      }
                    `}
                  >
                    <span className={`w-2.5 h-2.5 rounded-full ${priority.color}`} />
                    {priority.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Neue Aufgabe hinzufügen..."
          className="
            flex-1 
            bg-transparent 
            text-slate-700 dark:text-slate-200 
            placeholder:text-slate-400 dark:placeholder:text-slate-500
            outline-none
            text-base
            py-2
          "
        />

        {/* Add Button */}
        <motion.button
          type="submit"
          disabled={!title.trim()}
          whileHover={{ scale: title.trim() ? 1.05 : 1 }}
          whileTap={{ scale: title.trim() ? 0.95 : 1 }}
          className={`
            flex items-center justify-center
            w-12 h-12 rounded-xl
            transition-all duration-300
            ${
              title.trim()
                ? "bg-gradient-to-br from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 shadow-lg shadow-indigo-500/30"
                : "bg-slate-100 dark:bg-slate-700 cursor-not-allowed"
            }
          `}
        >
          <Plus
            className={`
              w-5 h-5 transition-colors duration-300
              ${title.trim() ? "text-white" : "text-slate-400 dark:text-slate-500"}
            `}
          />
        </motion.button>
      </motion.div>

      {/* Click outside handler for priority menu */}
      {showPriorityMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowPriorityMenu(false)}
        />
      )}
    </form>
  );
}
