import React from 'react';
import ListeningTestItem from './listeningTestItems'

function ListeningTestLevel({ levelId }) {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 my-4">
      <div
        className="flex flex-wrap justify-between text-sm font-medium text-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-gray-700 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800 py-2 px-4"
        role="tablist"
      >
        <div className="font-semibold text-xl text-white dark:text-white">
          Level-{levelId}
        </div>
        <div className="text-sm text-white dark:text-white">
          You completed: 4
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 test-card-body px-2 py-4 flex items-center px-2 py-3 m-0 text-lg shadow text-gray-900 font-bold rounded-lg bg-gray-50 dark:bg-gray-600">
        <ListeningTestItem levelId={levelId} testId={1} />
        <ListeningTestItem levelId={levelId} testId={2} />
        <ListeningTestItem levelId={levelId} testId={3} />
      </div>
    </div>
  );
}

export default ListeningTestLevel;
