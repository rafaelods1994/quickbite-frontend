export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'delivered'
  | 'cancelled';

export type Order = {
  id: number;
  userId: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
};

export type OrderInput = {
  userId: number;
  status: OrderStatus;
  items: { dishId: number; quantity: number }[];
};

