// src/components/SearchBar.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { fetchFollowers } from '../api/githubapi';
import type { User } from '../types/github';
import { Search, Loader2 } from "lucide-react";

interface SearchBarProps {
  onSearch: (users: User[]) => void;
  onError: (message: string) => void;
}

const schema = z.object({
  username: z.string().min(1, 'Username is required'),
});

type FormData = z.infer<typeof schema>;

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onError }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    onError('');
    try {
      const followers = await fetchFollowers(data.username);
      onSearch(followers.items);
    } catch (err: any) {
      onError(err.message || 'Something went wrong.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center mt-8">
      <div className="flex w-full max-w-xl">
        <input
          type="text"
          {...register('username')}
          placeholder="Enter GitHub username(e.g. wiwin, bruno, mars)"
          className="border border-gray-300 rounded-l px-4 py-2 w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-r px-4 py-2 hover:bg-blue-600"
        >
          Search
        </button>
      </div>
      {errors.username && (
        <p className="text-red-500 mt-2">{errors.username.message}</p>
      )}
    </form>
  );
};

export default SearchBar;