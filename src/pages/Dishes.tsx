import { useEffect, useState } from 'react';
import { fetchDishes, createDish, deleteDish, updateDish } from '../api/dishes';
import { Dish } from '../types/Dish';
import '../css/styles.css';

const Dishes = () => {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    available: true,
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({
    name: '',
    description: '',
    price: '',
    available: true,
  });


  useEffect(() => {
    fetchDishes()
      .then(data => {
        const sanitized = data.map((dish: any) => ({
          ...dish,
          price: Number(dish.price),
        }));
        setDishes(sanitized);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    const newValue =
      type === 'checkbox'
        ? (e.target as HTMLInputElement).checked
        : value;

    setForm(prev => ({
      ...prev,
      [name]: newValue,
    }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newDish = await createDish({
        name: form.name,
        description: form.description,
        price: parseFloat(form.price),
        available: form.available,
      });

      setDishes(prev => [
        ...prev,
        { ...newDish, price: Number(newDish.price) },
      ]);

      setForm({ name: '', description: '', price: '', available: true });
    } catch (err) {
      console.error(err);
      alert('Failed to create dish');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteDish(id);
      setDishes(prev => prev.filter(d => d.id !== id));
    } catch (err) {
      console.error(err);
      alert('Failed to delete dish');
    }
  };
  const startEditing = (dish: Dish) => {
    setEditingId(dish.id);
    setEditForm({
      name: dish.name,
      description: dish.description,
      price: dish.price.toString(),
      available: dish.available,
    });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setEditForm(prev => ({ ...prev, [name]: newValue }));
  };

  const handleUpdate = async (id: number, updatedData: Partial<Dish>) => {
    try {
      await updateDish(id, updatedData);
      const updatedList = await fetchDishes(); // ✅ get updated data
      const sanitized = updatedList.map((dish: any) => ({
        ...dish,
        price: Number(dish.price),
      }));
      setDishes(sanitized); // ✅ update UI
    } catch (err) {
      console.error(err);
      alert('Failed to update dish');
    }
  };


  return (
    <div style={{ padding: '2rem' }}>
      <h1> Dishes</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {dishes.map(dish => (
            <li key={dish.id}>
              <strong>{dish.name}</strong> - ${dish.price.toFixed(2)}<br />
              <em>{dish.description}</em><br />
              {dish.available ? '✅ Available' : '❌ Unavailable'}<br />
              <button className="delete" onClick={() => handleDelete(dish.id)}>🗑️ Delete</button>
              <button className="edit" onClick={() => startEditing(dish)}>✏️ Edit</button>
              {editingId === dish.id && (
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    handleUpdate(dish.id, {
                      name: editForm.name,
                      description: editForm.description,
                      price: parseFloat(editForm.price),
                      available: editForm.available,
                    });
                    setEditingId(null); // ✅ Optional: close the edit form after saving
                  }}
                  style={{ marginTop: '1rem' }}
                >

                  <input name="name" value={editForm.name} onChange={handleEditChange} />
                  <textarea name="description" value={editForm.description} onChange={handleEditChange} />
                  <input name="price" value={editForm.price} onChange={handleEditChange} type="number" step="0.01" />
                  <label>
                    <input name="available" type="checkbox" checked={editForm.available} onChange={handleEditChange} />
                    Available
                  </label>
                  <button type="submit">💾 Save</button>
                  <button type="button" onClick={() => setEditingId(null)}>❌ Cancel</button>
                </form>
              )}
            </li>
          ))}


        </ul>
      )}

      <h2 style={{ marginTop: '2rem' }}>Add New Dish</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" required />
        <input name="price" value={form.price} onChange={handleChange} placeholder="Price" type="number" step="0.01" required />
        <label>
          <input name="available" type="checkbox" checked={form.available} onChange={handleChange} />
          Available
        </label>
        <button type="submit">Create Dish</button>
      </form>
    </div>
  );
};

export default Dishes;
