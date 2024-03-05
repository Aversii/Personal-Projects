import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const [users, setUsers] = useState([]);
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3003/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password,name }),
      });

    } catch (error) {
      console.error('Failed to fetch', error);
    }
  };

  return (
    <div>
      <h1>SGINUP</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

        </label>

        <label>
          name
        <input
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Login</button>
      </form>
      <h2>Users:</h2>
      <ul>
        {users.map((user: any) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Signup;
