'use client';

import { createContext, useContext, useState, ReactNode } from "react";

interface Context {
    productId: string | null;
    openProduct : (id: string) => void;
    closeProduct: () => void;
}

const ProductModalContext = createContext<Context | null>(null);

export function ProductModalProvider({children}:{ children:ReactNode}){
    const [productId, setProductId] = useState<string | null>(null);

    return(
        <ProductModalContext.Provider
        value={{
            productId,
            openProduct:(id)=> setProductId(id),
            closeProduct:()=>  setProductId(null),
        }}
        >
            {children}
        </ProductModalContext.Provider>
    )
};
export function useProductModal(){
    const ctx = useContext(ProductModalContext);
    if(!ctx) throw new Error("useProductModal must be used inside ProductModalProvider");
    return ctx;
}