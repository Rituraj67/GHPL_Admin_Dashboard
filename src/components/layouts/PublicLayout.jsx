"use client"

import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import logo from "../../assets/GHPL.png"

export default function PublicLayout({ children }) {
  const { isAuthenticated, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  // Close mobile menu when changing route
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location])

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <img src={logo} alt="Genoviq Healthcare Logo" className="h-20 mr-2" />
                {/* <span className="font-bold text-xl">Genoviq Healthcare</span> */}
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/products" className="text-sm font-medium hover:text-primary transition-colors">
                Products
              </Link>
              <Link to="/newsroom" className="text-sm font-medium hover:text-primary transition-colors">
                Newsroom
              </Link>
              {/* <Link to="/contact" className="text-sm font-medium hover:text-primary transition-colors">
                Contact
              </Link> */}
              {isAuthenticated ? (
                <>
                  <Link to="/admin" className="text-sm font-medium hover:text-primary transition-colors">
                    Dashboard
                  </Link>
                  <button
                    onClick={logout}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login">
                  <button className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                    Login
                  </button>
                </Link>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button className="p-2 rounded-md hover:bg-gray-100" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t">
            <div className="container mx-auto px-4 py-3 space-y-1">
              <Link to="/" className="block py-2 text-sm font-medium hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/products" className="block py-2 text-sm font-medium hover:text-primary transition-colors">
                Products
              </Link>
              <Link to="/newsroom" className="block py-2 text-sm font-medium hover:text-primary transition-colors">
                Newsroom
              </Link>
              <Link to="/contact" className="block py-2 text-sm font-medium hover:text-primary transition-colors">
                Contact
              </Link>
              {isAuthenticated ? (
                <>
                  <Link to="/admin" className="block py-2 text-sm font-medium hover:text-primary transition-colors">
                    Dashboard
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full text-left py-2 text-sm font-medium hover:text-primary transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login" className="block py-2">
                  <button className="w-full px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                    Login
                  </button>
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="bg-muted py-12 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Genoviq Healthcare</h3>
              <p className="text-muted-foreground">
                Leading pharmaceutical company dedicated to improving lives through innovative healthcare solutions.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/products" className="text-muted-foreground hover:text-primary transition-colors">
                    Products
                  </Link>
                </li>
                <li>
                  <Link to="/newsroom" className="text-muted-foreground hover:text-primary transition-colors">
                    Newsroom
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Contact</h3>
              <address className="not-italic text-muted-foreground">
                <p>123 Pharma Street</p>
                <p>Medical District, MD 12345</p>
                <p>Email: info@pharmacorp.com</p>
                <p>Phone: (123) 456-7890</p>
              </address>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Genoviq Healthcare Pvt. Ltd. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

