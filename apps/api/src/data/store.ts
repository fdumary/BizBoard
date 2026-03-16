import type { Card, DocumentItem, Template, UserProfile } from "@bizboard/shared";

const now = () => new Date().toISOString();

export const users: UserProfile[] = [
  {
    id: "u1",
    name: "Demo User",
    email: "demo@bizboard.app",
    role: "user"
  }
];

export const templates: Template[] = [
  {
    id: "classic",
    name: "Classic",
    style: { primary: "#13315c", accent: "#f4d35e", font: "Georgia, serif" }
  },
  {
    id: "clean",
    name: "Clean",
    style: { primary: "#1f7a8c", accent: "#f6f7eb", font: "Verdana, sans-serif" }
  }
];

export const cards: Card[] = [
  {
    id: "c1",
    userId: "u1",
    title: "Demo Profile",
    bio: "Building my professional network with BizBoard.",
    links: ["https://github.com/example"],
    templateId: "classic",
    urlSlug: "demo-profile",
    qrCodeUrl: "",
    createdAt: now()
  }
];

export const documents: DocumentItem[] = [];
