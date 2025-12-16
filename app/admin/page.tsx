'use client';
import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { UserRole, TattooDesign } from '../types';
import { Trash2, Plus, LogOut, Lock, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const { role, login, logout, designs, addDesign, deleteDesign } = useStore();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const router = useRouter();

  // Login View
  if (role !== UserRole.ADMIN) {
    const handleLogin = (e: React.FormEvent) => {
      e.preventDefault();
      if (login(password)) {
        setError('');
        router.push('/admin');
      } else {
        setError('Invalid password');
      }
    };

    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-4">
        <div className="bg-neutral-900 p-8 rounded-xl border border-white/10 shadow-2xl w-full max-w-md">
          <div className="flex justify-center mb-6">
            <div className="bg-white/5 p-3 rounded-full">
              <Lock className="text-white" size={32} />
            </div>
          </div>
          <h2 className="text-2xl font-display font-bold text-white text-center mb-2">Admin Access</h2>
          <p className="text-gray-400 text-center mb-6 text-sm">Enter password to manage gallery (Hint: admin123)</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-white/50"
              placeholder="Password"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 transition"
            >
              Login
            </button>
          </form>
          <button onClick={() => router.push('/')} className="w-full text-center text-gray-500 text-sm mt-4 hover:text-white">Back to Home</button>
        </div>
      </div>
    );
  }

  // Dashboard View
  return (
    <div className="min-h-screen bg-neutral-950 pt-24 px-4 sm:px-6 lg:px-8 pb-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-display font-bold text-white">Admin Dashboard</h1>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>

        <div className="bg-neutral-900 rounded-xl border border-white/10 overflow-hidden">
          <div className="p-6 border-b border-white/10 flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">Gallery Management</h2>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition"
            >
              <Plus size={18} /> Add Design
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-black/50 text-gray-400 text-sm uppercase">
                <tr>
                  <th className="px-6 py-4">Image</th>
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {designs.map((design) => (
                  <tr key={design.id} className="hover:bg-white/5 transition">
                    <td className="px-6 py-4">
                      <img src={design.imageUrl} alt={design.title} className="h-16 w-16 object-cover rounded" />
                    </td>
                    <td className="px-6 py-4 text-white font-medium">{design.title}</td>
                    <td className="px-6 py-4 text-gray-400">{design.category}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => deleteDesign(design.id)}
                        className="text-red-500 hover:text-red-400 p-2 hover:bg-red-500/10 rounded transition"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
                {designs.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                      No designs in gallery. Add one to get started.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showAddModal && <AddDesignModal onClose={() => setShowAddModal(false)} onAdd={addDesign} />}
    </div>
  );
}

// Add Design Modal Component
interface AddModalProps {
  onClose: () => void;
  onAdd: (d: Omit<TattooDesign, 'id' | 'createdAt'>) => void;
}

const AddDesignModal: React.FC<AddModalProps> = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Blackwork' as TattooDesign['category'],
    imageUrl: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // If empty URL, use placeholder
    const finalUrl = formData.imageUrl || `https://picsum.photos/seed/${Math.random()}/600/800`;
    onAdd({ ...formData, imageUrl: finalUrl });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-neutral-900 rounded-xl border border-white/10 w-full max-w-md shadow-2xl relative">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X size={24} />
        </button>
        
        <div className="p-6">
          <h2 className="text-xl font-bold text-white mb-6">Add New Design</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1">Title</label>
              <input
                type="text"
                required
                className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-white/40"
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Category</label>
              <select
                className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-white/40"
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value as any})}
              >
                <option value="Blackwork">Blackwork</option>
                <option value="Realism">Realism</option>
                <option value="Traditional">Traditional</option>
                <option value="Japanese">Japanese</option>
                <option value="Minimalist">Minimalist</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Image URL (Optional)</label>
              <input
                type="text"
                placeholder="Leave empty for random placeholder"
                className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-white/40"
                value={formData.imageUrl}
                onChange={e => setFormData({...formData, imageUrl: e.target.value})}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 transition mt-2"
            >
              Add to Gallery
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};