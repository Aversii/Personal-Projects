import { useState } from 'react';
import { useRouter } from 'next/router';
import { styled } from 'styled-components';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const Test = styled.div`
height: 50vh;
width: 50vh;
background-color: blue;
`

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("tentou logar")
    //router.push('/');
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
        <button onClick={handleSubmit}>Login</button>
      </form>
    </div>
  );
};

export default Login;
