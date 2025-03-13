import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import toast, { Toaster } from "react-hot-toast";

// Public Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProductsPage from "./pages/ProductsPage";
import NewsroomPage from "./pages/NewsroomPage";
import ContactPage from "./pages/ContactPage";

// Admin Pages
import Dashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/Products";
import AdminNewsroom from "./pages/admin/Newsroom";
import AdminContact from "./pages/admin/Contact";
import { useProduct } from "./context/ProductContext";
import Loader from "./components/Loader";
import { useNews } from "./context/NewsContext";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {


  const {isLoading1}= useAuth();
  const {isLoading2}= useProduct();
  const {isLoading3} = useNews();

  if(isLoading1 || isLoading2 || isLoading3) return <Loader/>

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/newsroom" element={<NewsroomPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute>
              <AdminProducts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/newsroom"
          element={
            <ProtectedRoute>
              <AdminNewsroom />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/contact"
          element={
            <ProtectedRoute>
              <AdminContact />
            </ProtectedRoute>
          }
        />

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            marginTop: "72px", // Shift down from top
          },
        }}
      />
    </>
  );
}

export default App;

export const mytoast = (message) => {
  return toast.success(message, {
    style: {
      border: "1px solid #4F46E5", // Indigo-600 (Tailwind)
      padding: "16px",
      color: "#1E3A8A", // Blue-900
      background: "#EEF2FF", // Light indigo background
    },
    iconTheme: {
      primary: "#4F46E5",
      secondary: "#FFFFFF",
    },
  });
};
