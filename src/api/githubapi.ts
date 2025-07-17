import axios from 'axios';
import type { User, Repo } from '../types/github';

const BASE_URL = 'https://api.github.com';
const cache = new Map<string, any>();

// Create an Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    Accept: 'application/vnd.github.v3+json',
  },
});

// Generic caching wrapper
function getCachedOrFetch<T>(key: string, fetchFn: () => Promise<T>): Promise<T> {
  if (cache.has(key)) {
    return Promise.resolve(cache.get(key));
  }
  return fetchFn().then((data) => {
    cache.set(key, data);
    return data;
  });
}

// Fetch followers of a user
export async function fetchFollowers(username: string): Promise<User[]> {
  const key = `users:${username}`;
  return getCachedOrFetch(key, async () => {
    try {
      const res = await api.get(`/search/users?q=${encodeURIComponent(username)}&per_page=5`);
      return res.data.items;
    } catch (err: any) {
      console.error('Error fetching followers:', err.message);
      throw new Error('Unable to fetch followers. Please check the username.');
    }
  });
}

// Fetch detailed user info
export async function fetchUserDetails(username: string): Promise<User> {
  const key = `user:${username}`;
  return getCachedOrFetch(key, async () => {
    try {
      const res = await api.get(`/users/${username}`);
      return res.data;
    } catch (err: any) {
      console.error('Error fetching user details:', err.message);
      throw new Error('Unable to fetch user details.');
    }
  });
}

// Fetch repositories of a user
export async function fetchUserRepos(username: string): Promise<Repo[]> {
  const key = `repos:${username}`;
  return getCachedOrFetch(key, async () => {
    try {
      const res = await api.get(`/users/${username}/repos?sort=updated&per_page=50`);
      return res.data;
    } catch (err: any) {
      console.error('Error fetching repositories:', err.message);
      throw new Error('Unable to fetch repositories.');
    }
  });
}