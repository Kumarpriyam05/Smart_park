import axios from "axios";
import React, { useState, useEffect,} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Car, Menu, X, Home, MapPin, Plus, Eye, Settings, LogIn, UserPlus, LogOut, User, Shield, Ticket } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const logout = async () => {
    try {
      await axios("http://localhost:4000/api/user/logout", {
        withCredentials: true,
      });
      setUser(null); // clear user from context
      navigate("/login");
    } catch (error) {
      console.log(error.response?.msg || error.message);
    }
  };

  const navLinks = [
    { to: "/", label: "Home", icon: Home, public: true },
    { to: "/lotsByCity", label: "Lots", icon: MapPin, public: true },
  ];

  const userLinks = [
    { to: "/ticket-history", label: "My Tickets", icon: Ticket },
  ];

  const adminLinks = [
    { to: "/addLot", label: "Add Lot", icon: Plus },
    { to: "/viewLot", label: "View Lot", icon: Eye },
    { to: "/manage", label: "Manage", icon: Settings },
  ];

  const authLinks = [
    { to: "/login", label: "Login", icon: LogIn },
    { to: "/register", label: "Register", icon: UserPlus },
  ];

  return (
    <>
      {/* Main Navbar */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/80 backdrop-blur-md shadow-md' 
            : 'bg-white/10 backdrop-blur-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo Section */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className={`${scrolled ? 'p-2 bg-indigo-600' : 'p-2 bg-indigo-600'} rounded-lg group-hover:rotate-12 transition-transform duration-300`}>
                  <Car className={`w-5 h-5 text-white`} />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full animate-pulse"></div>
              </div>
              <div className={`${scrolled ? 'text-slate-900' : 'text-slate-800'}`}>
                <h1 className="text-lg font-semibold group-hover:text-indigo-600 transition-colors duration-300">
                  Smart Parking
                </h1>
                <div className="text-xs text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Find. Book. Park.
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              
              {/* Public Links */}
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`group flex items-center space-x-2 px-3 py-2 rounded-xl transition-all duration-200 ${
                      scrolled ? 'text-slate-700 hover:bg-indigo-50' : 'text-slate-700 hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-4 h-4 transform transition-transform duration-200 group-hover:scale-110" />
                    <span className="font-medium text-sm">{link.label}</span>
                  </Link>
                );
              })}

              {/* User Links (for logged-in users) */}
              {user && (
                <div className={`flex items-center space-x-1 ml-2 pl-2 border-l ${scrolled ? 'border-slate-200' : 'border-white/20'}`}>
                  {userLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.to}
                        to={link.to}
                        className={`group flex items-center space-x-2 px-3 py-2 rounded-xl transition-all duration-200 ${
                          scrolled ? 'text-slate-700 hover:text-indigo-600 hover:bg-indigo-50' : 'text-slate-700 hover:text-amber-300 hover:bg-white/5'
                        }`}
                      >
                        <Icon className="w-4 h-4 transform transition-transform duration-200 group-hover:scale-110" />
                        <span className="font-medium text-sm">{link.label}</span>
                      </Link>
                    );
                  })}
                </div>
              )}

              {/* Admin Links */}
              {user?.role === "admin" && (
                <div className={`flex items-center space-x-1 ml-2 pl-2 border-l ${scrolled ? 'border-slate-200' : 'border-white/20'}`}>
                  {adminLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.to}
                        to={link.to}
                        className={`group flex items-center space-x-2 px-3 py-2 rounded-xl transition-all duration-200 ${
                          scrolled ? 'text-slate-700 hover:text-indigo-600 hover:bg-indigo-50' : 'text-slate-700 hover:text-amber-300 hover:bg-white/5'
                        }`}
                      >
                        <Icon className="w-4 h-4 transform transition-transform duration-200 group-hover:scale-110" />
                        <span className="font-medium text-sm">{link.label}</span>
                      </Link>
                    );
                  })}
                </div>
              )}

              {/* User Section */}
              <div className={`flex items-center space-x-3 ml-4 pl-4 border-l ${scrolled ? 'border-slate-200' : 'border-white/20'}`}>
                {!user ? (
                  // Not logged in
                  <div className="flex items-center space-x-2">
                    {authLinks.map((link) => {
                      const Icon = link.icon;
                      return (
                        <Link
                          key={link.to}
                          to={link.to}
                          className={`group flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                            link.label === "Login"
                              ? `${scrolled ? 'text-slate-700 border border-slate-200 hover:bg-slate-100 hover:text-black' : 'text-slate-700 border border-white/20 hover:bg-white/10'}`
                              : `${scrolled ? 'bg-amber-400 text-black hover:bg-amber-500' : 'bg-amber-400 text-black hover:bg-amber-500'}`
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span>{link.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  // Logged in
                  <div className="flex items-center space-x-3">
                    {/* User Info */}
                    <div className="flex items-center space-x-2 px-3 py-2 bg-white/90 rounded-xl border border-white/10">
                      <div className="p-1 bg-amber-400 rounded-lg">
                        {user.role === "admin" ? (
                          <Shield className="w-4 h-4 text-black" />
                        ) : (
                          <User className="w-4 h-4 text-black" />
                        )}
                      </div>
                      <div>
                        <div className={`${scrolled ? 'text-slate-700' : 'text-slate-800'} text-sm font-medium`}>Welcome</div>
                        <div className="text-amber-400 text-xs capitalize">{user.role}</div>
                      </div>
                    </div>
                    
                    {/* Logout Button */}
                    <button
                      onClick={logout}
                      className={`group flex items-center space-x-2 px-3 py-2 rounded-xl transition-all duration-200 ${
                        scrolled ? 'text-slate-700 hover:bg-red-50' : 'text-slate-700 hover:bg-red-500/10'
                      }`}
                    >
                      <LogOut className="w-4 h-4 transform transition-transform duration-200 group-hover:scale-110" />
                      <span className="font-medium text-sm">Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`md:hidden p-2 rounded-xl transition-colors duration-200 ${
                scrolled ? 'text-slate-700 bg-white/0 hover:bg-slate-100' : 'text-slate-800 hover:bg-white/10'
              }`}
              aria-label="Toggle navigation"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`md:hidden transition-[max-height,opacity] duration-300 ease-in-out overflow-hidden ${
            isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className={`px-4 py-6 ${scrolled ? 'bg-white/95' : 'bg-indigo-700/95'} backdrop-blur-md border-t ${scrolled ? 'border-slate-200' : 'border-white/20'}`}>
            
            {/* Mobile Navigation Links */}
            <div className="space-y-2 mb-6">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 text-slate-700 bg-white/30"
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{link.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* User Links Mobile (for logged-in users) */}
            {user && (
              <div className="space-y-2 mb-6 pt-4 border-t border-white/20">
                <div className="px-4 mb-3">
                  <span className="text-amber-400 text-sm font-semibold uppercase tracking-wide">My Account</span>
                </div>
                {userLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 text-slate-700 bg-white/30"
                      onClick={() => setIsOpen(false)}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{link.label}</span>
                    </Link>
                  );
                })}
              </div>
            )}

            {/* Admin Links Mobile */}
            {user?.role === "admin" && (
              <div className="space-y-2 mb-6 pt-4 border-t border-white/20">
                <div className="px-4 mb-3">
                  <span className="text-amber-400 text-sm font-semibold uppercase tracking-wide">Admin Panel</span>
                </div>
                {adminLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 text-slate-700 bg-white/30"
                      onClick={() => setIsOpen(false)}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{link.label}</span>
                    </Link>
                  );
                })}
              </div>
            )}

            {/* Mobile Auth Section */}
            <div className="pt-4 border-t border-white/20">
              {!user ? (
                <div className="space-y-3">
                  {authLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.to}
                        to={link.to}
                        className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                          link.label === "Login"
                            ? 'text-slate-700 bg-white/30 hover:bg-white/40'
                            : 'bg-amber-400 text-black hover:bg-amber-500'
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{link.label}</span>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-3">
                  {/* User Info Mobile */}
                  <div className="flex items-center space-x-3 px-4 py-3 bg-white/30 rounded-xl border border-white/10">
                    <div className="p-2 bg-amber-400 rounded-lg">
                      {user.role === "admin" ? (
                        <Shield className="w-5 h-5 text-black" />
                      ) : (
                        <User className="w-5 h-5 text-black" />
                      )}
                    </div>
                    <div>
                      <div className="text-slate-900 font-medium">Welcome</div>
                      <div className="text-amber-400 text-sm capitalize">{user.role}</div>
                    </div>
                  </div>
                  
                  {/* Logout Button Mobile */}
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl text-white bg-red-500/70 hover:bg-red-500 transition-all duration-200"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-16"></div>
    </>
  );
}
