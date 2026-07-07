// 🎨 Design Type
export interface TattooDesign {
  id: string;
  title: string;
  category: 'Blackwork / Black and Gray' | 'Realism' | 'Traditional' | 'Fontwork and Linework' | 'Minimalist' | 'Colorwork and New School' | 'Mandala , Dot Work and Geomatrical' | 'Cover up' | 'Color Realism' | 'Other';
  imageUrl: string;
  isFeatured: boolean; // Added for homepage control
  createdAt: number;
}

// 📅 Booking Type (Enhanced for Rescheduling/Rejection)
export interface BookingRequest {
  id: string;
  name: string;
  contactNumber: string;
  email: string;
  description?: string;
  designType: 'existing' | 'custom';
  selectedDesignId?: string;
  status: 'PENDING' | 'CONFIRMED' | 'REJECTED' | 'RESCHEDULED'; // Statuses for Admin logic
  scheduledAt: string | Date; // Exact date and time for the appointment
  createdAt: number;
}

// ✍️ Blog/Post Type
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  image?: string;
  published: boolean;
  createdAt: number;
}

// 👤 User Roles
export enum UserRole {
  GUEST = 'guest',
  ADMIN = 'admin',
}