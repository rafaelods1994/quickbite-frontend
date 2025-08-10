import { Order, OrderInput, OrderStatus } from '../types/Order';

const API_BASE = 'http://localhost:3000/api/orders';

export const fetchOrders = async (): Promise<Order[]> => {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error('Failed to fetch orders');
  return res.json();
};

export const createOrder = async (order: OrderInput): Promise<Order> => {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order),
  });
  if (!res.ok) throw new Error('Failed to create order');
  return res.json();
};

export const updateOrderStatus = async (
  id: number,
  status: OrderStatus
): Promise<void> => {
  const res = await fetch(`${API_BASE}/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error('Failed to update order status');
};
