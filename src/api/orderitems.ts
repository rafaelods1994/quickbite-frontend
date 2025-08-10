import { OrderItem, OrderItemInput } from "../types/OrderItem";

const API_BASE = 'http://localhost:3000/api/order-items';

export const fetchOrderItems = async (): Promise<OrderItem[]> => {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error('Failed to fetch order items');
  return res.json();
};

export const createOrderItem = async (input: OrderItemInput): Promise<OrderItem> => {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error('Failed to create order item');
  return res.json();
};

export const deleteOrderItem = async (id: number): Promise<void> => {
  const res = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete order item');
};
