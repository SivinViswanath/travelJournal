export interface User {
  _id: string;
  name?: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface Trip {
  _id: string;
  title: string;
  destination: string;
  description: string;
  startDate: string;
  endDate: string;
  userId: string;
  images?: string[];
  coverImage?: string;
  location?: {
    type: string;
    coordinates: [number, number];
  };
  tags?: string[];
  rating?: number;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}
