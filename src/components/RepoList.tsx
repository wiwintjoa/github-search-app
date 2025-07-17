// src/components/RepoList.tsx
import React from 'react';
import type { Repo } from '../types/github';

interface RepoListProps {
  repos: Repo[];
}

const RepoList: React.FC<RepoListProps> = ({ repos }) => {
  if (repos.length === 0) {
    return <p className="text-gray-500">No repositories found.</p>;
  }

  return (
    <ul className="space-y-4 mt-2">
      {repos.map((repo) => (
        <li key={repo.id} className="border rounded p-4 hover:shadow transition-shadow">
          <h3 className="text-lg font-bold text-purple-700">{repo.name}</h3>
          <p className="text-gray-600">{repo.description || 'No description provided.'}</p>
          <div className="text-sm text-gray-500 mt-2">
            ⭐ Stars: {repo.stargazers_count} | 🛠 Language: {repo.language || 'N/A'}
          </div>
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline text-sm mt-2 inline-block"
          >
            View on GitHub →
          </a>
        </li>
      ))}
    </ul>
  );
};

export default RepoList;