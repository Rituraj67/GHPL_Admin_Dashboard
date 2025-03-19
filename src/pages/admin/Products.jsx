"use client";

import { useState } from "react";
import AdminLayout from "../../components/layouts/AdminLayout";
import ProductForm from "../../components/ProductForm";
import ProductCard from "../../components/ProductCard";
import { useProduct } from "../../context/ProductContext";

export default function AdminProducts() {
  const { products } = useProduct();
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const handleAddProduct = (newProduct) => {
    if (!newProduct) {
      setIsAddFormVisible(false);
      return;
    }

    setIsAddFormVisible(false);
  };

  const handleEditProduct = (updatedProduct) => {
    if (!updatedProduct) {
      setIsEditFormVisible(false);
      setCurrentProduct(null);
      return;
    }

    setIsEditFormVisible(false);
    setCurrentProduct(null);
  };

  const openEditForm = (product) => {
    setIsAddFormVisible(false); // 🔒 Ensure Add Form is closed
    setCurrentProduct(product);
    setIsEditFormVisible(true); // ✅ Open Edit Form

    // Delay scroll until form is rendered
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 100); // Adjust timing if needed
  };

  const openAddForm = () => {
    setIsEditFormVisible(false); // 🔒 Ensure Edit Form is closed
    setCurrentProduct(null); // Reset any selected product
    setIsAddFormVisible(true); // ✅ Open Add Form
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Products</h1>
          <button
            onClick={openAddForm}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add Product
          </button>
        </div>

        {/* Add Product Form */}
        {isAddFormVisible && (
          <div className="mb-8 bg-white p-6 rounded-lg shadow border">
            <h2 className="text-xl font-bold mb-4">Add New Product</h2>
            <ProductForm
              onSubmit={handleAddProduct}
              onCancel={() => setIsAddFormVisible(false)}
            />
          </div>
        )}

        {/* Edit Product Form */}
        {isEditFormVisible && currentProduct && (
          <div className="mb-8 bg-white p-6 rounded-lg shadow border">
            <h2 className="text-xl font-bold mb-4">Edit Product</h2>
            <ProductForm
              initialData={currentProduct}
              onSubmit={handleEditProduct}
              isEditing={true}
              onCancel={() => {
                setIsEditFormVisible(false);
                setCurrentProduct(null);
              }}
            />
          </div>
        )}

        <div className="max-w-screen-2xl mx-auto px-4 py-6">
          <div className="flex flex-wrap gap-8 justify-start">
            {products.map((product, index) => (
              <ProductCard
                key={product.id}
                index={index}
                product={product}
                onEdit={openEditForm}
              />
            ))}
          </div>
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No products found. Add your first product!
            </p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
