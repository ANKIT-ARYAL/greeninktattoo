export interface TattooDesign {
  id: string;
  title: string;
  category: 'Blackwork' | 'Realism' | 'Traditional' | 'Japanese' | 'Minimalist' | 'Other';
  imageUrl: string;
  createdAt: number;
}

export interface BookingRequest {
  id: string;
  name: string;
  contactNumber: string;
  email: string;
  designType: 'existing' | 'custom';
  selectedDesignId?: string; // If existing
  customDesignFile?: File | null; // If custom upload
  customDesignPreviewUrl?: string;
  status: 'pending' | 'confirmed' | 'completed';
  date: number;
}

export enum UserRole {
  GUEST = 'guest',
  ADMIN = 'admin',
}