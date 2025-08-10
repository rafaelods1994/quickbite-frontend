import { Dish } from '../types/Dish';

const API_BASE = 'http://localhost:3000/api/dishes';

export const fetchDishes = async (): Promise<Dish[]> => {
  const res = await fetch(`${API_BASE}`);
  if (!res.ok) throw new Error('Failed to fetch dishes');
  return res.json();
};

export const createDish = async (dish: {
  name: string;
  description: string;
  price: number;
  available: boolean;
}) => {
  const res = await fetch(`${API_BASE}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dish),
  });

  if (!res.ok) throw new Error('Failed to create dish');
  return res.json();
};

export const deleteDish = async (id: number) => {
  const res = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete dish');
  return true;
};

export const updateDish = async (id: number, updatedData: Partial<Dish>) => {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedData),
  });

  if (!res.ok) throw new Error('Failed to update dish');

  // ✅ Only parse JSON if there's content
  if (res.status === 204) return null;

  try {
    return await res.json();
  } catch {
    return null;
  }
};
