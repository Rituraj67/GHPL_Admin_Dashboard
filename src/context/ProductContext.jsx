import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import axios from "../config/axiosInstance.js"

const ProductContext= createContext(null);

export function ProductProvider({children}){
  const [isLoading2, setIsLoading] = useState(false);

    const [products, setproducts] = useState([]);
    const getProducts= async()=>{
        try {
            setIsLoading(true)
            const res= await axios.get('/api/products/');
            
            setproducts(res.data);
        } catch (error) {
            console.log(error);
        }finally{
            setIsLoading(false)
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
        <ProductContext.Provider value={{products, addProduct, isLoading2, updateProduct, removeProduct}} >{children}</ProductContext.Provider>
    )
}

export function useProduct(){
    const context= useContext(ProductContext);
    if(!context){
        throw new Error("useProduct must be used within an AuthProvider")
    }
    return context
}

