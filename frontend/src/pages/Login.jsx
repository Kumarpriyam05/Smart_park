import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Mail, Lock, Eye, EyeOff, Car, ArrowRight, CheckCircle, XCircle } from "lucide-react";

export default function Login() {
  const API_URL =  "http://localhost:4000/api";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(API_URL);

    try {
      const res = await axios.post(`${API_URL}/user/login`, {
        email,
        password
      }, {
        withCredentials: true // send/receive cookies if backend uses them
      });
      setUser(res.data.user);

      setMsg("Login successful ✅");
      setTimeout(() => {
        navigate("/");
      }, 1000);
      console.log(res.data); // You can redirect or store user info here
    } catch (error) {
      setMsg(error.response?.data?.msg || "Login failed ❌");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white/60 flex items-center justify-center px-4 py-12">
      {/* Subtle decorative background shapes */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-gradient-to-tr from-indigo-100 to-amber-100 opacity-40 blur-3xl animate-[pulse_6s_infinite]"></div>
        <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-gradient-to-br from-pink-100 to-amber-200 opacity-30 blur-2xl animate-[pulse_8s_infinite]"></div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="rounded-3xl bg-white shadow-xl border border-gray-100 p-8 transform transition-all duration-300 hover:scale-[1.01]">
          
          {/* Header */}
          <div className="text-center mb-6">
            <div className="mx-auto inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-600 to-cyan-500 rounded-2xl mb-4 shadow-lg transform transition-transform duration-300 hover:-translate-y-1">
              <Car className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-1">Welcome Back</h2>
            <p className="text-sm text-slate-500">Sign in to your parking account</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            
            {/* Email Field */}
            <div className="relative">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-600">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl bg-white text-slate-900 placeholder:text-slate-400 focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100 outline-none transition-shadow duration-200"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="relative">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-600">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl bg-white text-slate-900 placeholder:text-slate-400 focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100 outline-none transition-shadow duration-200"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-indigo-600 transition-colors duration-200"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-5 py-3 text-white font-semibold shadow-md hover:scale-[1.02] transition-transform duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Login</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Message Display */}
          {msg && (
            <div className={`mt-5 flex items-center gap-3 rounded-lg px-4 py-3 border ${
              msg.toLowerCase().includes("successful") 
                ? "bg-green-50 border-green-200 text-green-700" 
                : "bg-red-50 border-red-200 text-red-700"
            }`}>
              {msg.toLowerCase().includes("successful") ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <XCircle className="w-5 h-5" />
              )}
              <p className="text-sm font-medium">{msg}</p>
            </div>
          )}

          {/* Footer Links */}
          <div className="mt-6 text-sm text-center">
            <p className="text-slate-600">
              Don't have an account?{" "}
              <a href="/register" className="font-medium text-indigo-600 hover:underline">
                Sign up here
              </a>
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-4 -left-4 w-8 h-8 bg-amber-200 rounded-lg opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-amber-200 rounded-full opacity-30 animate-pulse delay-1000"></div>
      </div>
    </div>
  );
}
