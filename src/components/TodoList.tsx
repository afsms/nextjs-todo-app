"use client";

import { TodoItem } from "./TodoItem";
import { EmptyState } from "./EmptyState";
import { motion, AnimatePresence } from "framer-motion";

interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  priority?: "low" | "medium" | "high";
}

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  filter?: "all" | "active" | "completed";
}

export function TodoList({
  todos,
  onToggle,
  onDelete,
  filter = "all",
}: TodoListProps) {
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  if (todos.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="w-full space-y-3">
      {/* Filter indicator */}
      {filter !== "all" && (
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-slate-500 dark:text-slate-400">
            {filteredTodos.length} {filteredTodos.length === 1 ? "Aufgabe" : "Aufgaben"} {filter === "active" ? "offen" : "erledigt"}
          </span>
        </div>
      )}

      {/* Todo Items with animation */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {filteredTodos.map((todo, index) => (
            <motion.div
              key={todo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{
                duration: 0.3,
                delay: index * 0.05,
                ease: [0.4, 0, 0.2, 1],
              }}
              layout
            >
              <TodoItem
                id={todo.id}
                title={todo.title}
                completed={todo.completed}
                createdAt={todo.createdAt}
                priority={todo.priority}
                onToggle={onToggle}
                onDelete={onDelete}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty state for filtered view */}
      {filteredTodos.length === 0 && todos.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12"
        >
          <p className="text-slate-400 dark:text-slate-500">
            {filter === "active"
              ? "Keine offenen Aufgaben! 🎉"
              : "Noch keine erledigten Aufgaben"}
          </p>
        </motion.div>
      )}
    </div>
  );
}
