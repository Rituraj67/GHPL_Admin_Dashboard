import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PublicLayout from "../components/layouts/PublicLayout";

import { mytoast } from "../App";
import axios from "../config/axiosInstance";

export default function LoginPage() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("email"); // email | otp
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin");
    }
  }, [isAuthenticated, navigate]);

  // Handle resend OTP timer countdown
  useEffect(() => {
    let timer;
    if (step === "otp" && resendTimer > 0) {
      timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendTimer, step]);

  // Simulate sending OTP (replace with API)
  const sendOtpToEmail = async () => {
    setIsLoading(true);
    setError("");
    try {
      const res = await axios.post(`/api/auth/send-otp`, {
        email,
      });
      if (res.status == 200) {
        mytoast(res.data.message);
        setStep("otp");
        setResendTimer(60);
      }
    } catch (err) {
      setError("Failed to send OTP. Try again.");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const res = await axios.post(`/api/auth/verify-otp`, {
        email,
        otp,
      });
      
      if (res.status == 200) {
        await login(res.data.name, res.data.count );
        mytoast("Logged in successfully!");
        navigate("/admin");
      }
    } catch (error) {
      setError("Invalid OTP. Please try again.");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = () => {
    sendOtpToEmail();
  };

  const handleChangeEmail = () => {
    setStep("email");
    setOtp("");

    setError("");
  };

  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <div className="w-full max-w-md">
          <div className="bg-white shadow-md rounded-lg overflow-hidden border">
            <div className="p-6">
              <h1 className="text-2xl font-bold mb-6 text-center">
                Administrator Login
              </h1>
              <p className="text-sm text-gray-500 mb-6 text-center">
                {step === "email" ? (
                  "Enter your email to receive OTP"
                ) : (
                  <>
                    <span>OTP sent to</span>
                    <span className=" text-red-900"> {email}</span>
                  </>
                )}
              </p>

              {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 mt-0.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                  <span>{error}</span>
                </div>
              )}

              {step === "email" && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    sendOtpToEmail();
                  }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="admin@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50"
                  >
                    {isLoading ? "Sending OTP..." : "Send OTP"}
                  </button>
                </form>
              )}

              {step === "otp" && (
                <>
                  <form onSubmit={handleOtpSubmit} className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="otp"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Enter OTP
                      </label>
                      <input
                        id="otp"
                        type="text"
                        placeholder="Enter 6-digit OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                        maxLength={6}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50"
                      disabled={isLoading}
                    >
                      {isLoading ? "Verifying OTP..." : "Verify & Login"}
                    </button>
                  </form>

                  <div className="mt-4 text-center text-sm text-gray-600">
                    Didn’t get the OTP?{" "}
                    <button
                      onClick={handleResendOtp}
                      disabled={resendTimer > 0}
                      className={`underline ${
                        resendTimer > 0
                          ? "opacity-50 cursor-not-allowed"
                          : "text-primary"
                      }`}
                    >
                      Resend OTP {resendTimer > 0 ? `in ${resendTimer}s` : ""}
                    </button>
                  </div>

                  <div className="mt-3 text-center">
                    <button
                      onClick={handleChangeEmail}
                      className="text-sm text-blue-600 underline"
                    >
                      Change Email
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
