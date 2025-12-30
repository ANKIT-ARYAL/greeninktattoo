'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [creds, setCreds] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(creds),
    });

    if (res.ok) {
      router.push('/admin/dashboard'); 
      router.refresh();
    } else {
      setError('Wrong username or password.');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <form onSubmit={handleLogin} className="max-w-md w-full bg-neutral-900 p-8 rounded-3xl border border-white/5 space-y-6">
        <h1 className="text-white text-2xl font-bold italic uppercase tracking-tighter">Admin Access</h1>
        {error && <p className="text-red-500 text-xs font-bold uppercase">{error}</p>}
        <input 
          type="text" 
          placeholder="Username" 
          className="w-full bg-black p-4 rounded-xl text-white outline-none border border-white/5 focus:border-emerald-500"
          onChange={(e) => setCreds({...creds, username: e.target.value})}
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="w-full bg-black p-4 rounded-xl text-white outline-none border border-white/5 focus:border-emerald-500"
          onChange={(e) => setCreds({...creds, password: e.target.value})}
        />
        <button className="w-full bg-white text-black py-4 rounded-xl font-bold uppercase tracking-widest">Enter</button>
      </form>
    </div>
  );
}