import { createContext, useContext, useEffect, useState } from "react";
import axios from "../config/axiosInstance.js"
const NewsContext= createContext(null);

export function NewsProvider ({children}){
    const [isLoading3, setIsLoading] = useState(false)
    const [news, setNews] = useState([]);

    const getAllNews= async()=>{
        try {
            setIsLoading(true)
            const res= await axios.get('/api/news/');
            
            setNews(res.data)
        } catch (error) {
            console.log(error);
        }finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {
      getAllNews()
    }, []);

    const addNews= async(newNews)=>{
        setNews([...news, newNews]);
    }

    const updateNews = async (updatedNews) => {
        setNews((prevNews) =>
          prevNews.map((news) =>
            news.id === updatedNews.id ? updatedNews : news
          )
        );
      };
      

    const removeNews= async(id)=>{
        let mn= news.filter(e=> e.id!==id)
        setNews(mn);
    }
    

    return (
        <NewsContext.Provider value={{news, isLoading3, addNews, updateNews, removeNews}}>{children}</NewsContext.Provider>
    )
}

export function useNews(){
    const context= useContext(NewsContext);
    if(!context){
        throw new Error("useProduct must be used within an AuthProvider")
    }
    return context
}