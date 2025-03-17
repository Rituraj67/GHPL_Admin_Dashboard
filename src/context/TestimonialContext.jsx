import { createContext, useContext, useEffect, useState } from "react";
import axios from "../config/axiosInstance.js";

const TestimonialContext = createContext(null);

export function TestimonialProvider({ children }) {
  const [isLoadingTestimonial, setIsLoading] = useState(false);
  const [testimonials, setTestimonials] = useState([]);

  const getAllTestimonials = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("/api/testimonial/");
      setTestimonials(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllTestimonials();
  }, []);

  const addTestimonial = (newTestimonial) => {
    setTestimonials((prev) => [newTestimonial, ...prev ]);
  };

  const updateTestimonial = (updated) => {
    setTestimonials((prev) =>
      prev.map((item) => (item.id === updated.id ? updated : item))
    );
  };

  const removeTestimonial = (id) => {
    setTestimonials((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <TestimonialContext.Provider
      value={{
        testimonials,
        isLoadingTestimonial,
        addTestimonial,
        updateTestimonial,
        removeTestimonial,
      }}
    >
      {children}
    </TestimonialContext.Provider>
  );
}

export function useTestimonials() {
  const context = useContext(TestimonialContext);
  if (!context) {
    throw new Error("useTestimonials must be used within a TestimonialProvider");
  }
  return context;
}
