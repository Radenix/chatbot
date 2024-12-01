'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function LoginPage() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const { push } = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://enabled-prompt-vervet.ngrok-free.app/api/v1/auth/login',
        { phone, password },
        { withCredentials: true }  
      );

      if (response.status === 200) {
        console.log('Login successful!');
        push('/admin/users');  
      } else {
        alert('Login failed: ' + response.statusText);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed: ' + (error.response?.data?.message || 'An unknown error occurred'));
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        placeholder="phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}
