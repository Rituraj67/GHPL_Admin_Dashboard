import PublicLayout from "../components/layouts/PublicLayout";
import banner from "../assets/homebanner.png";
import { useProduct } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";

export default function HomePage() {
  const { products } = useProduct();
  const topThreeProducts = [...products]
    .sort((a, b) => b.mrp - a.mrp)
    .slice(0, 3);

  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Welcome to Genoviq Healthcare
            </h1>
            <p className="text-lg mb-8 text-gray-600">
              Leading the way in pharmaceutical innovation and healthcare
              solutions. Our commitment to quality and research drives our
              mission to improve lives.
            </p>
            <div className="flex gap-4">
              <a
                href="#about"
                className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition-colors"
              >
                Learn More
              </a>
              <a
                href="#products"
                className="border border-primary text-primary px-6 py-3 rounded-md hover:bg-primary/10 transition-colors"
              >
                Our Products
              </a>
            </div>
          </div>
          <div className="flex-1">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/20 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/30 rounded-full animate-pulse delay-700"></div>
              <img
                src={banner}
                alt="Banner"
                className="rounded-lg shadow-lg relative z-10 w-full"
              />
            </div>
          </div>
        </div>

        <section id="about" className="py-16">
          <h2 className="text-3xl font-bold mb-8 text-center">About Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
              <p className="text-gray-600">
                To provide innovative pharmaceutical solutions that improve the
                quality of life for patients worldwide.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">
                Research & Development
              </h3>
              <p className="text-gray-600">
                Our state-of-the-art R&D facilities are dedicated to discovering
                breakthrough treatments.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Global Presence</h3>
              <p className="text-gray-600">
                With operations in over 50 countries, we're committed to serving
                healthcare needs globally.
              </p>
            </div>
          </div>
        </section>

        <section id="products" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">
              🌟 Featured Products
            </h2>

            {products.length > 0 ? (
              <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                {topThreeProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-lg font-medium text-gray-600">
                  🚫 Currently there are no products to feature.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </PublicLayout>
  );
}
