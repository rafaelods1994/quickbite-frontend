export interface OrderItem {
  id: number;
  orderId: number;
  dishId: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItemInput {
  orderId: number;
  dishId: number;
  quantity: number;
}
