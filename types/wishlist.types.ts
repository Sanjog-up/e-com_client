import { TProduct } from "./product.types";

export type TWishlistItem = {
    _id: string,
    user: string,
    productId: TProduct;
    createdAt: string,
    updatedAt: string,
}

export type TWishlistResponse = {
    wishListCount : number;
    wishlist: TWishlistItem[];
};

export type TToggleWishlistResponse = {
    wishlisted: boolean,
    productId: string,
    wishlistItemId?: string, 
}