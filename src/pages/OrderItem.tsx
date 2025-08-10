import { useEffect, useState } from 'react';
import { fetchOrderItems, createOrderItem, deleteOrderItem } from '../api/orderitems';
import { fetchOrders } from '../api/orders';
import { fetchDishes } from '../api/dishes';
import type { OrderItemInput, OrderItem } from '../types/OrderItem';
import type { Order } from '../types/Order';
import type { Dish } from '../types/Dish';
import { fetchUsers } from '../api/users';
import type { User } from '../types/User';


export default function OrderItemManager() {
    const [items, setItems] = useState<OrderItem[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [dishes, setDishes] = useState<Dish[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [form, setForm] = useState<OrderItemInput>({ orderId: 1, dishId: 1, quantity: 1 });

    useEffect(() => {
        fetchOrderItems().then(setItems).catch(console.error);
        fetchOrders().then(setOrders).catch(console.error);
        fetchDishes().then(setDishes).catch(console.error);
        fetchUsers().then(setUsers).catch(console.error);
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
                    {orders.map(order => {
                        const user = users.find(u => u.id === order.userId);
                        return (
                            <option key={order.id} value={order.id}>
                                Order #{order.id} — {user?.name ?? `User ${order.userId}`}
                            </option>
                        );
                    })}
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
                    {items.map(item => {
                        const dish = dishes.find(d => d.id === item.dishId);
                        return (
                            <li key={item.id}>
                                <strong>Order #{item.orderId}</strong> — {dish?.name ?? `Dish #${item.dishId}`} × {item.quantity}
                                <button onClick={() => handleDelete(item.id)} style={{ marginLeft: '1rem' }}>
                                    Delete
                                </button>
                            </li>
                        );
                    })}

                </ul>
            )}
        </div>
    );
}
