import { useEffect, useState } from 'react';
import { fetchOrderItems, createOrderItem, deleteOrderItem } from '../api/orderitems';
import { fetchOrders } from '../api/orders';
import { fetchDishes } from '../api/dishes';
import type { OrderItemInput, OrderItem } from '../types/OrderItem';
import type { Order } from '../types/Order';
import type { Dish } from '../types/Dish';

export default function OrderItemManager() {
    const [items, setItems] = useState<OrderItem[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [dishes, setDishes] = useState<Dish[]>([]);
    const [form, setForm] = useState<OrderItemInput>({ orderId: 1, dishId: 1, quantity: 1 });

    useEffect(() => {
        fetchOrderItems().then(setItems).catch(console.error);
        fetchOrders().then(setOrders).catch(console.error);
        fetchDishes().then(setDishes).catch(console.error);
    }, []);

    const handleCreate = async () => {
        try {
            const newItem = await createOrderItem(form);
            setItems(prev => [...prev, newItem]);
        } catch (err) {
            console.error(err);
            alert('Failed to create order item');
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteOrderItem(id);
            setItems(prev => prev.filter(item => item.id !== id));
        } catch (err) {
            console.error(err);
            alert('Failed to delete order item');
        }
    };

    return (
        <div>
            <h2>Add Order Item</h2>

            <label>
                Order
                <select
                    value={form.orderId}
                    onChange={e => setForm({ ...form, orderId: +e.target.value })}
                >
                    <option value="">Select an order</option>
                    {orders.map(order => (
                        <option key={order.id} value={order.id}>
                            Order #{order.id} — User {order.userId}
                        </option>
                    ))}
                </select>
            </label>

            <label>
                Dish
                <select
                    value={form.dishId}
                    onChange={e => setForm({ ...form, dishId: +e.target.value })}
                >
                    <option value="">Select a dish</option>
                    {dishes.map(dish => (
                        <option key={dish.id} value={dish.id}>
                            {dish.name} (${dish.price})
                        </option>
                    ))}
                </select>
            </label>

            <label>
                Quantity
                <input
                    type="number"
                    value={form.quantity}
                    onChange={e => setForm({ ...form, quantity: +e.target.value })}
                    placeholder="e.g. 2"
                    min={1}
                />
            </label>

            <button onClick={handleCreate}>Add Item</button>

            <hr />

            <h3>Current Order Items</h3>
            {items.length === 0 ? (
                <p>No items yet.</p>
            ) : (
                <ul>
                    {items.map(item => (
                        <li key={item.id}>
                            <strong>Order #{item.orderId}</strong> — Dish #{item.dishId} × {item.quantity}
                            <button onClick={() => handleDelete(item.id)} style={{ marginLeft: '1rem' }}>
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
