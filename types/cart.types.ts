import { TProduct } from "./product.types";

export type TCartItem = {
  _id: string;
  product: TProduct;
  quantity: number;
};

export type TCart = {
  _id: string;
  user: string;
  items: TCartItem[];
};