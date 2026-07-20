import { brandSchema } from './../schema/brand.schema';
import { IImage } from "./category.types";
import { TCategory } from "./category.types";
import { TBrand } from "./brand.types";

export type TProduct = {
    _id: string,
    name: string,
    description: string,
    price: number,
    stock: number,
    cover_image: IImage,
    images: IImage[],
    category: TCategory | string,
    brand: TBrand | string,
    new_arrival: boolean,
    soldCount: number,
    createdAt: string,
    featured: boolean,
}