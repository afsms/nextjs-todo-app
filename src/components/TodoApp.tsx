"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Moon, Sun, CheckSquare } from "lucide-react";
import { TodoList } from "./TodoList";
import { AddTodo } from "./AddTodo";
import { ProgressStats } from "./ProgressStats";

interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  priority: "low" | "medium" | "high";
}

type FilterType = "all" | "active" | "completed";

export function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");
  const [isDark, setIsDark] = useState(false);

  // Load todos from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("todos");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setTodos(
          parsed.map((todo: Todo) => ({
            ...todo,
            createdAt: new Date(todo.createdAt),
          }))
        );
      } catch (e) {
        console.error("Failed to load todos", e);
      }
    }

    // Check system preference for dark mode
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Save todos to localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  const addTodo = (title: string, priority: "low" | "medium" | "high") => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      createdAt: new Date(),
      priority,
    };
    setTodos([newTodo, ...todos]);
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const completedCount = todos.filter((t) => t.completed).length;

  const filterButtons: { type: FilterType; label: string }[] = [
    { type: "all", label: "Alle" },
    { type: "active", label: "Offen" },
    { type: "completed", label: "Erledigt" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-indigo-100/50 to-violet-100/50 dark:from-indigo-900/10 dark:to-violet-900/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-fuchsia-100/50 to-indigo-100/50 dark:from-fuchsia-900/10 dark:to-indigo-900/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-2xl mx-auto px-4 py-8 sm:py-12">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-3">
            <div
              className="
              w-12 h-12 rounded-2xl
              bg-gradient-to-br from-indigo-500 to-violet-600
              flex items-center justify-center
              shadow-lg shadow-indigo-500/30
            "
            >
              <CheckSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                Meine Aufgaben
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Organisiere deinen Tag
              </p>
            </div>
          </div>

          {/* Dark mode toggle */}
          <motion.button
            onClick={toggleDarkMode}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="
              p-3 rounded-2xl
              bg-white dark:bg-slate-800
              border border-slate-200 dark:border-slate-700
              shadow-sm
              text-slate-600 dark:text-slate-300
              hover:bg-slate-50 dark:hover:bg-slate-700
              transition-colors duration-200
            "
          >
            {isDark ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </motion.button>
        </motion.header>

        {/* Progress Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <ProgressStats total={todos.length} completed={completedCount} />
        </motion.div>

        {/* Add Todo Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <AddTodo onAdd={addTodo} />
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex gap-1 mb-6"
        >
          {filterButtons.map(({ type, label }) => (
            <motion.button
              key={type}
              onClick={() => setFilter(type)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                relative flex-1 py-2.5 px-4 rounded-xl
                text-sm font-medium
                transition-all duration-200
                ${
                  filter === type
                    ? "text-white"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                }
              `}
            >
              {filter === type && (
                <motion.div
                  layoutId="activeFilter"
                  className="
                    absolute inset-0
                    bg-gradient-to-r from-indigo-500 to-violet-600
                    rounded-xl
                    shadow-lg shadow-indigo-500/30
                  "
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Todo List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <TodoList
            todos={todos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            filter={filter}
          />
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-slate-400 dark:text-slate-500">
            Tippe auf das ✓ um eine Aufgabe zu erledigen
          </p>
        </motion.footer>
      </div>
    </div>
  );
}
