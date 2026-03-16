export type UserRole = "user" | "admin";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Template {
  id: string;
  name: string;
  style: {
    primary: string;
    accent: string;
    font: string;
  };
}

export interface DocumentItem {
  id: string;
  cardId: string;
  filename: string;
  mimeType: string;
  url: string;
  uploadedAt: string;
}

export interface Card {
  id: string;
  userId: string;
  title: string;
  bio: string;
  links: string[];
  templateId: string;
  urlSlug: string;
  qrCodeUrl: string;
  createdAt: string;
}

export interface ApiError {
  message: string;
}
