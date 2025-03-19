import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function ProductCard({ product, index = 0, onEdit }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const { isAuthenticated } = useAuth();
  const nextImage = (e) => {
    e.stopPropagation();
    if (product.images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    }
  };

  const prevImage = (e) => {
    e.stopPropagation();
    if (product.images.length > 1) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? product.images.length - 1 : prev - 1
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: index * 0.1 },
      }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="bg-white w-80 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 flex flex-col"
    >
      {/* Image Slider */}
      <div className="relative h-48 bg-gray-100">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            src={product.images[currentImageIndex] || "/placeholder.svg"}
            alt={`${product.name} - ${currentImageIndex + 1}`}
            className="w-full h-full object-cover p-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          />
        </AnimatePresence>

        {product.images.length > 1 && (
          <>
            <motion.div
              className="absolute inset-0 flex items-center justify-between px-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={prevImage}
                className="w-7 h-7 rounded-full bg-white/80 flex items-center justify-center shadow hover:bg-white transition"
              >
                <ChevronLeft className="w-4 h-4 text-gray-700" />
              </button>
              <button
                onClick={nextImage}
                className="w-7 h-7 rounded-full bg-white/80 flex items-center justify-center shadow hover:bg-white transition"
              >
                <ChevronRight className="w-4 h-4 text-gray-700" />
              </button>
            </motion.div>

            {/* Pagination Dots */}
            <div className="absolute bottom-1 left-0 right-0 flex justify-center gap-1">
              {product.images.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(i);
                  }}
                  className={`w-2 h-2 rounded-full ${
                    i === currentImageIndex ? "bg-primary" : "bg-gray-300"
                  }`}
                  whileHover={{ scale: 1.3 }}
                />
              ))}
            </div>
          </>
        )}

        {/* Edit Button */}
        {isAuthenticated && (
          <button
            className="absolute top-2 right-2 p-1 rounded-md bg-white text-gray-700 hover:bg-gray-100 transition-colors"
            onClick={() => onEdit(product)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 tracking-tight">
          {product.name}
        </h3>

        <div className="space-y-2  text-sm text-gray-700 flex-grow">
          <DetailRow
            label="MRP:"
            value={`₹${product.mrp}`}
            highlight
            color={"text-red-700"}
          />
          <DetailRow label="Type:" value={product.type} />
          <DetailRow
            label="Division:"
            value={product.division}
            highlight
            color={"text-blue-700"}
          />
          {product.composition && (
            <div className="">
              <span className="text-gray-500 font-medium w-24">
                Composition:
              </span>
              <div className="text-green-700 font-semibold max-h-20 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 rounded p-1">
                {product.composition}
              </div>
            </div>
          )}

          {product.description && (
            <div>
              <p className="text-gray-500 font-medium mb-1">Description:</p>
              <div className="text-gray-700 leading-relaxed text-sm bg-gray-50 p-2 rounded-md shadow-sm max-h-20 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {product.description}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

const DetailRow = ({ label, value, highlight = false, color }) => {
  const valueClass = color
    ? `${color} font-semibold`
    : highlight
    ? "text-primary-600 font-semibold"
    : "text-gray-800";

  return (
    <div className="flex items-start gap-1">
      <span className="text-gray-500 font-medium w-24">{label}</span>
      <span className={valueClass}>{value}</span>
    </div>
  );
};
