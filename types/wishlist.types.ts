import { TProduct } from "./product.types";

export type TWishlistItem = {
    _id: string,
    user: string,
    product_id: TProduct;
    createdAt: string,
    updatedAt: string,
}

export type TWishlistResponse = {
    wishListCount : number;
    wishList: TWishlistItem[];
};

export type TToggleWishlistResponse = {
    wishListes: boolean,
    productId: string,
    wishlistItem?: string, 
}