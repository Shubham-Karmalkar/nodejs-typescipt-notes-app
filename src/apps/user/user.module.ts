import { Providers } from "./types";

export interface User {
  _id: string;
  name: string;
  email: string;
  imageUrl: string;
  createAt: number;
  updatedAt: number;
  providerId: Providers;
  phoneNumber: number;
}
