'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { TattooDesign, BookingRequest, UserRole } from '../types';

interface StoreContextType {
  designs: TattooDesign[];
  addDesign: (design: Omit<TattooDesign, 'id' | 'createdAt'>) => void;
  deleteDesign: (id: string) => void;
  role: UserRole;
  login: (password: string) => boolean;
  logout: () => void;
  submitBooking: (booking: Omit<BookingRequest, 'id' | 'status' | 'date'>) => Promise<boolean>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

// Initial Seed Data
const INITIAL_DESIGNS: TattooDesign[] = [
  { id: '1', title: 'Dragon Back Piece', category: 'Japanese', imageUrl: 'https://picsum.photos/id/101/800/1000', createdAt: Date.now() },
  { id: '2', title: 'Geometric Wolf', category: 'Blackwork', imageUrl: 'https://picsum.photos/id/102/800/800', createdAt: Date.now() },
  { id: '3', title: 'Floral Sleeve', category: 'Realism', imageUrl: 'https://picsum.photos/id/103/600/900', createdAt: Date.now() },
  { id: '4', title: 'Traditional Dagger', category: 'Traditional', imageUrl: 'https://picsum.photos/id/104/800/800', createdAt: Date.now() },
  { id: '5', title: 'Minimalist Line Art', category: 'Minimalist', imageUrl: 'https://picsum.photos/id/106/800/800', createdAt: Date.now() },
  { id: '6', title: 'Koi Fish', category: 'Japanese', imageUrl: 'https://picsum.photos/id/108/800/1000', createdAt: Date.now() },
];

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [designs, setDesigns] = useState<TattooDesign[]>(INITIAL_DESIGNS);
  const [role, setRole] = useState<UserRole>(UserRole.GUEST);

  // Load from local storage if available (Persist data simulation)
  useEffect(() => {
    const stored = localStorage.getItem('anjit-designs');
    if (stored) {
      try {
        setDesigns(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse stored designs");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('anjit-designs', JSON.stringify(designs));
  }, [designs]);

  const addDesign = (design: Omit<TattooDesign, 'id' | 'createdAt'>) => {
    const newDesign: TattooDesign = {
      ...design,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: Date.now(),
    };
    setDesigns(prev => [newDesign, ...prev]);
  };

  const deleteDesign = (id: string) => {
    setDesigns(prev => prev.filter(d => d.id !== id));
  };

  const login = (password: string) => {
    // Mock authentication
    if (password === 'admin123') {
      setRole(UserRole.ADMIN);
      return true;
    }
    return false;
  };

  const logout = () => {
    setRole(UserRole.GUEST);
  };

  const submitBooking = async (booking: Omit<BookingRequest, 'id' | 'status' | 'date'>) => {
    // Simulate API Call and Email Sending
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        console.log("--- EMAIL SIMULATION ---");
        console.log("To: anjit@tattoo.com");
        console.log("Subject: New Booking Request from " + booking.name);
        console.log("Details:", booking);
        if (booking.customDesignFile) {
          console.log("Attachment: [User Uploaded File]");
        } else if (booking.selectedDesignId) {
           const selected = designs.find(d => d.id === booking.selectedDesignId);
           console.log("Selected Design:", selected?.title, selected?.imageUrl);
        }
        console.log("------------------------");
        resolve(true);
      }, 1500);
    });
  };

  return (
    <StoreContext.Provider value={{ designs, addDesign, deleteDesign, role, login, logout, submitBooking }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within StoreProvider");
  return context;
};