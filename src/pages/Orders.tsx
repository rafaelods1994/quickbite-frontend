import { useEffect, useState } from 'react';
import { fetchOrders, createOrder, updateOrderStatus } from '../api/orders';
import { Order, OrderStatus } from '../types/Order';
import { fetchUsers } from '../api/users';
import { User } from '../types/User';
import { fetchDishes } from '../api/dishes';
import { Dish } from '../types/Dish';

const Orders = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [dishes, setDishes] = useState<Dish[]>([]);

    const [form, setForm] = useState({
        userId: 0,
        status: 'pending' as OrderStatus,
    });

    const [newItem, setNewItem] = useState({ dishId: 0, quantity: 1 });
    const [items, setItems] = useState<{ dishId: number; quantity: number }[]>([]);

    useEffect(() => {
        fetchOrders().then(setOrders).catch(console.error);
        fetchUsers().then(setUsers).catch(console.error);
        fetchDishes().then(setDishes).catch(console.error);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: name === 'userId' ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (items.length === 0) {
            alert('Please add at least one dish to the order.');
            return;
        }

        try {
            const payload = { ...form, items };
            await createOrder(payload);
            const updatedOrders = await fetchOrders();
            setOrders(updatedOrders);
            setForm({ userId: 0, status: 'pending' });
            setItems([]);
        } catch (err) {
            console.error(err);
            alert('Failed to create order');
        }
    };


    const handleStatusUpdate = async (id: number, status: OrderStatus) => {
        try {
            await updateOrderStatus(id, status);
            const updated = await fetchOrders();
            setOrders(updated);
        } catch (err) {
            console.error(err);
            alert('Failed to update status');
        }
    };

    const sortedOrders = [...orders].sort((a, b) => b.id - a.id);

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Orders</h1>
            <ul>
                {sortedOrders.map(order => (
                    <li key={order.id}>
                        <strong>Order #{order.id}</strong><br />
                        User: {order.userId}<br />
                        Status: {order.status}<br />
                        <select
                            value={order.status}
                            onChange={e => handleStatusUpdate(order.id, e.target.value as OrderStatus)}
                        >
                            {['pending', 'confirmed', 'preparing', 'delivered', 'cancelled'].map(status => (
                                <option key={`${order.id}-${status}`} value={status}>{status}</option>
                            ))}
                        </select>
                    </li>
                ))}
            </ul>

            <h2 style={{ marginTop: '2rem' }}>Create New Order</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '500px' }}>
                <select name="userId" value={form.userId} onChange={handleChange} required>
                    <option value="">Select a user</option>
                    {users.map(user => (
                        <option key={user.id} value={user.id}>
                            {user.name} ({user.email})
                        </option>
                    ))}
                </select>

                <select name="status" value={form.status} onChange={handleChange}>
                    {['pending', 'confirmed', 'preparing', 'delivered', 'cancelled'].map(status => (
                        <option key={`form-status-${status}`} value={status}>{status}</option>
                    ))}
                </select>

                <h3>Add Items</h3>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <select
                        value={newItem.dishId}
                        onChange={e => setNewItem({ ...newItem, dishId: +e.target.value })}
                    >
                        <option value="">Select a dish</option>
                        {dishes.map(d => (
                            <option key={d.id} value={d.id}>
                                {d.name} (${d.price})
                            </option>
                        ))}
                    </select>
                    <input
                        type="number"
                        value={newItem.quantity}
                        onChange={e => setNewItem({ ...newItem, quantity: +e.target.value })}
                        min={1}
                        placeholder="Quantity"
                    />
                    <button
                        type="button"
                        onClick={() => {
                            if (newItem.dishId && newItem.quantity > 0) {
                                setItems(prev => [...prev, newItem]);
                                setNewItem({ dishId: 0, quantity: 1 });
                            }
                        }}
                    >
                        Add
                    </button>
                </div>

                <ul>
                    {items.map((item, index) => {
                        const dish = dishes.find(d => d.id === item.dishId);
                        return (
                            <li key={`item-${item.dishId}-${item.quantity}-${index}`}>
                                {dish?.name ?? `Dish #${item.dishId}`} × {item.quantity}
                                <button
                                    type="button"
                                    onClick={() => setItems(prev => prev.filter((_, i) => i !== index))}
                                    style={{ marginLeft: '1rem' }}
                                >
                                    Remove
                                </button>
                            </li>
                        );
                    })}
                </ul>

                <button type="submit">Create Order</button>
            </form>
        </div>
    );
};

export default Orders;
