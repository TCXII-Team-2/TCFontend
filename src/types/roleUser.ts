import { Type } from "lucide-react";

export const ROLES = {
  ADMIN: "admin",
  AGENT: "agent",
  CLIENT: "client",
};

export type Role = (typeof ROLES)[keyof typeof ROLES];
