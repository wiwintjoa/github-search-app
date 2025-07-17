// src/components/UserAccordion.tsx
import React, { useState } from 'react';
import type { User, Repo } from '../types/github';
import { fetchUserRepos } from '../api/githubapi';
import RepoList from './RepoList';
import Spinner from './Spinner';

interface UserAccordionProps {
  user: User;
}

const UserAccordion: React.FC<UserAccordionProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const toggleAccordion = async () => {
    setIsOpen(!isOpen);
    if (!isOpen && repos.length === 0) {
      setLoading(true);
      setError('');
      try {
        const data = await fetchUserRepos(user.login);
        setRepos(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load repositories.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md mb-4">
      <button
        onClick={toggleAccordion}
        className="w-full text-left px-6 py-4 flex items-center justify-between hover:bg-gray-100"
      >
        <div className="flex items-center space-x-4">
          <img src={user.avatar_url} alt={user.login} className="w-10 h-10 rounded-full" />
          <span className="text-lg font-semibold text-gray-800">{user.login}</span>
        </div>
        <span className="text-gray-500">{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <div className="px-6 pb-4">
          {loading && <Spinner />}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && <RepoList repos={repos} />}
        </div>
      )}
    </div>
  );
};

export default UserAccordion;