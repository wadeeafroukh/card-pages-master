import { Address } from "./Address";

export interface Card {
  title: string;
  subtitle: string;
  web: string;
  description: string;
  email: string;
  phone: string;
  address: {
    state: string;
    country: string;
    city: string;
    street: string;
    houseNumber: number;
    zip: number;
  };
  bizNumber: number;
  userId?: string;
  likes?: string[];
  isLiked?: boolean;
  _id?: string;
  image?: {
    url: string;
    alt: string;
    _id?: string;
  };
}
