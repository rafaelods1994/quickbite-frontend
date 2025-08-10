import { OrderItem } from '../types/OrderItem';
import { Dish } from '../types/Dish';

export const groupOrderItemsByOrderId = (items: OrderItem[]) => {
  return items.reduce((acc, item) => {
    if (!acc[item.orderId]) acc[item.orderId] = [];
    acc[item.orderId].push(item);
    return acc;
  }, {} as Record<number, OrderItem[]>);
};

export const groupDishesWithinOrder = (orderItems: OrderItem[]) => {
  const dishMap = new Map<number, { dishId: number; quantity: number }>();

  for (const item of orderItems) {
    const existing = dishMap.get(item.dishId);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      dishMap.set(item.dishId, { dishId: item.dishId, quantity: item.quantity });
    }
  }

  return Array.from(dishMap.values());
};

export const getOrderTotal = (
  groupedItems: { dishId: number; quantity: number }[],
  dishes: Dish[]
) => {
  return groupedItems.reduce((sum, item) => {
    const dish = dishes.find(d => d.id === item.dishId);
    return sum + (dish?.price ?? 0) * item.quantity;
  }, 0);
};
