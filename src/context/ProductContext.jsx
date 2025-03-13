import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import axios from 'axios';
const ProductContext= createContext(null);

export function ProductProvider({children}){

    const [products, setproducts] = useState([]);
    const getProducts= async()=>{
        try {
            console.log(import.meta.env.VITE_BASE_ADDRESS);
            const res= await axios.get(`${import.meta.env.VITE_BASE_ADDRESS}/api/products/`);
            console.log(res);
            setproducts(res.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
      getProducts();
    }, []);


    const addProduct= async(product)=>{
        setproducts([...products, product]);
    }


    const updateProduct = (updatedProduct) => {
        setproducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === updatedProduct.id ? updatedProduct : product
          )
        );
      };
      

    const removeProduct= async(id)=>{
        let ml= products.filter(e => e.id != id);
        setproducts(ml);
    }
    

    return(
        <ProductContext.Provider value={{products, addProduct, updateProduct, removeProduct}} >{children}</ProductContext.Provider>
    )
}

export function useProduct(){
    const context= useContext(ProductContext);
    if(!context){
        throw new Error("useProduct must be used within an AuthProvider")
    }
    return context
}

