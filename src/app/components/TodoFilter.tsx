import React from 'react';

interface TodoFilterProps {
  filter: 'all' | 'active' | 'completed';
  onFilterChange: (filter: 'all' | 'active' | 'completed') => void;
}

const TodoFilter: React.FC<TodoFilterProps> = ({ filter, onFilterChange }) => {
  return (
    <div className="flex space-x-4 mb-6">
      <button
        onClick={() => onFilterChange('all')}
        className={`px-4 py-2 rounded-lg ${
          filter === 'all'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
        }`}
      >
        Alle
      </button>
      <button
        onClick={() => onFilterChange('active')}
        className={`px-4 py-2 rounded-lg ${
          filter === 'active'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
        }`}
      >
        Aktiv
      </button>
      <button
        onClick={() => onFilterChange('completed')}
        className={`px-4 py-2 rounded-lg ${
          filter === 'completed'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
        }`}
      >
        Erledigt
      </button>
    </div>
  );
};

export default TodoFilter;