export type IImage= {
    _id: string;
    path: string;
    public_id: string

}

export type TCategory = {
    _id:string;
    name: string;
    category: string;
    description?: string;
    image: IImage
}


