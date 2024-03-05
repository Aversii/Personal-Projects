import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:3003/users/getAllUsers', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch users');
          }
          return response.json();
        })
        .then((data) => {
          console.log('All users:', data);
          setUsers(data); // Armazena os dados dos usuários no estado
        })
        .catch((error) => console.error('Failed to fetch', error));
    }
  }, []); // Sem dependências para executar apenas uma vez

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3003/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token; 
        console.log('Login successful', token);
        // Armazena o token em localStorage para uso posterior
        localStorage.setItem('token', token);

        // Agora, após o login, podemos buscar a lista de usuários
        const usersResponse = await fetch('http://localhost:3003/users/getAllUsers', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
        });

        if (!usersResponse.ok) {
          throw new Error('Failed to fetch users');
        }

        const usersData = await usersResponse.json();
        console.log('All users:', usersData);
        setUsers(usersData); // Atualiza a lista de usuários no estado
      } else {
        console.error('Failed to login');
      }
    } catch (error) {
      console.error('Failed to fetch', error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
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

export default Login;
