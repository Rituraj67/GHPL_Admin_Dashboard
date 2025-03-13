"use client";

import { useState } from "react";
import PublicLayout from "../components/layouts/PublicLayout";
import { useProduct } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";

// Mock data for public products display

// Get unique divisions for filtering

export default function ProductsPage() {
  const [selectedDivision, setSelectedDivision] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const { products } = useProduct();

  // const divisions = [...new Set(products.map((product) => product.division))]/
  const divisions = [
    "Pain Management",
    "Antibiotics",
    "Nutritional Supplements",
    "Allergy Care",
    "Gastroenterology",
    "Diabetes Care",
    "Cardiovascular",
    "Respiratory",
    "Oncology",
    "Neurology",
    "Dermatology",
    "Psychiatry",
    "Infectious Diseases",
  ];
  // Filter products by division and search query
  const filteredProducts = products.filter((product) => {
    const matchesDivision =
      selectedDivision === "All" || product.division === selectedDivision;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDivision && matchesSearch;
  });

  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-2">Our Products</h1>
        <p className="text-gray-600 mb-8">
          Discover our range of high-quality pharmaceutical products
        </p>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="w-full md:w-64">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="w-full md:w-auto flex-1">
            <div className="flex flex-wrap gap-2">
              <button
                className={`px-4 py-2 rounded-md ${
                  selectedDivision === "All"
                    ? "bg-primary text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
                onClick={() => setSelectedDivision("All")}
              >
                All
              </button>

              {divisions.map((division) => (
                <button
                  key={division}
                  className={`px-4 py-2 rounded-md ${
                    selectedDivision === division
                      ? "bg-primary text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                  onClick={() => setSelectedDivision(division)}
                >
                  {division}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className=" flex flex-wrap gap-8 justify-start">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No products found matching your criteria. Please try a different
              search or filter.
            </p>
          </div>
        )}
      </div>
    </PublicLayout>
  );
}
