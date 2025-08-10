import { User, UserInput } from '../types/User';

const API_BASE = 'http://localhost:3000/api/users';

export const fetchUsers = async (): Promise<User[]> => {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
};

export const createUser = async (user: UserInput): Promise<User> => {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error('Failed to create user');
  return res.json();
};
