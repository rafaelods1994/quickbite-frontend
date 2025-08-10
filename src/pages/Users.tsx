import { useEffect, useState } from 'react';
import { fetchUsers, createUser } from '../api/users';
import { User, UserInput } from '../types/User';

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [form, setForm] = useState<UserInput>({
    name: '',
    email: '',
    password: '',
    role: 'customer',
  });

  useEffect(() => {
    fetchUsers()
      .then(setUsers)
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newUser = await createUser(form);
      setUsers(prev => [...prev, newUser]);
      setForm({ name: '', email: '', password: '', role: 'customer' });
    } catch (err) {
      console.error(err);
      alert('Failed to create user');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <strong>{user.name}</strong> ({user.email}) - {user.role}
          </li>
        ))}
      </ul>

      <h2 style={{ marginTop: '2rem' }}>Create New User</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" required />
        <input name="password" value={form.password} onChange={handleChange} placeholder="Password" type="password" required />
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="customer">customer</option>
          <option value="admin">admin</option>
        </select>
        <button type="submit">Create User</button>
      </form>
    </div>
  );
};

export default Users;
