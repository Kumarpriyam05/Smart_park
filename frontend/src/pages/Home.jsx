// /mnt/data/SmartPark-main/frontend/src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import { Car, MapPin, Clock, Shield, ArrowRight, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: MapPin,
      title: "Find Nearby Lots",
      description: "Discover parking spaces close to your destination with real-time availability.",
      route: "/lotsByCity"
    },
    {
      icon: Clock,
      title: "Instant Booking",
      description: "Reserve your spot in seconds with our streamlined booking process.",
      route: "/lots"
    },
    {
      icon: Shield,
      title: "Secure Payment",
      description: "Pay safely with our encrypted payment system and get instant confirmation.",
      route: "/ticket-history"
    }
  ];

  // navigate handler (used by cards)
  const handleNavigate = (route) => {
    if (!route) return;
    navigate(route);
  };

  // keyboard accessibility handler for cards
  const handleCardKey = (e, route) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleNavigate(route);
    }
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Decorative background shapes */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-gradient-to-tr from-indigo-200 to-teal-200 opacity-40 blur-3xl animate-[pulse_6s_infinite]"></div>
        <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-gradient-to-br from-pink-100 to-amber-200 opacity-30 blur-2xl animate-[pulse_7s_infinite]"></div>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-44 h-44 rounded-full bg-gradient-to-r from-indigo-100 to-cyan-100 opacity-30 blur-2xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-12">
        {/* Hero Section */}
        <div
          className={`max-w-4xl w-full text-center transform transition-all duration-700 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          {/* Badge */}
          <div className="mx-auto inline-flex items-center gap-3 rounded-full bg-white/60 border border-white/30 px-4 py-2 shadow-sm backdrop-blur">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-medium text-slate-700">Smart Parking Revolution</span>
          </div>

          {/* Main Title */}
          <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-slate-900">
            Welcome to
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-cyan-500 to-amber-400">
              Smart Parking
            </span>
          </h1>

          {/* Car Icon */}
          <div className="flex justify-center my-6">
            <div className="relative inline-flex items-center justify-center">
              <div className="rounded-full bg-white shadow-md p-3 transform transition-transform duration-500 hover:-translate-y-2">
                <Car className="w-10 h-10 text-indigo-600" />
              </div>
              <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-amber-400 opacity-80 animate-ping"></div>
            </div>
          </div>

          {/* Subtitle */}
          <p className="mx-auto max-w-2xl text-lg text-slate-700 leading-relaxed">
            Find and book premium parking spots in your city with{" "}
            <span className="font-semibold text-indigo-600">lightning speed</span> and absolute ease.
          </p>

          {/* Action Buttons */}
          <div className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/lotsByCity"
              className="relative inline-flex items-center overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-6 py-3 text-base font-semibold text-white shadow-lg transition-transform duration-300 hover:scale-105"
            >
              <span className="mr-3 flex items-center gap-2">
                View Available Lots
                <ArrowRight className="w-4 h-4" />
              </span>
              <span className="absolute -left-6 top-0 h-full w-16 bg-white/10 blur-sm" />
            </Link>

            <Link
              to="/login"
              className="inline-flex items-center rounded-2xl border border-slate-200 bg-white px-6 py-3 text-base font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:scale-105"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="inline-flex items-center rounded-2xl border border-indigo-600 bg-white/90 px-6 py-3 text-base font-semibold text-indigo-700 shadow-sm transition-all duration-200 hover:bg-indigo-50 hover:scale-105"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div
          className={`mt-16 w-full max-w-6xl transform transition-all duration-700 delay-150 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <h2 className="text-center text-2xl sm:text-3xl font-bold text-slate-900 mb-10">
            Why Choose <span className="text-indigo-600">Smart Parking</span>?
          </h2>

          <div className="grid gap-8 md:grid-cols-3 px-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isHovered = hoveredCard === index;
              return (
                <div
                  key={index}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleNavigate(feature.route)}
                  onKeyDown={(e) => handleCardKey(e, feature.route)}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`relative rounded-2xl border bg-white p-6 shadow transition-transform duration-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 cursor-pointer select-none ${
                    isHovered ? " -translate-y-2 ring-2 ring-amber-200" : ""
                  }`}
                  aria-label={feature.title}
                >
                  <div className="absolute -inset-x-3 -top-6 h-4 bg-gradient-to-r from-indigo-200 to-cyan-200 rounded-t-2xl opacity-80"></div>

                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-indigo-50 p-3">
                      <Icon className="h-7 w-7 text-indigo-600" />
                    </div>

                    <h3 className="mb-3 text-lg font-semibold text-slate-900">{feature.title}</h3>

                    <p className="text-sm text-slate-600">{feature.description}</p>

                    <div className="mt-4">
                      <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-sm text-indigo-700 font-medium">
                        Learn more
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* How it Works Section */}
        <div
          className={`mt-16 w-full max-w-3xl transform transition-all duration-700 delay-300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <div className="rounded-2xl bg-white p-8 shadow-md">
            <h2 className="text-center text-2xl font-bold text-slate-900 mb-6">
              How It <span className="text-indigo-600">Works</span>
            </h2>

            <div className="space-y-4">
              {[
                "Create your account or sign in to get started",
                "Search for available parking lots in your city",
                "Book your perfect spot and park with confidence!"
              ].map((step, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-white font-semibold">
                    {index + 1}
                  </div>
                  <p className="text-slate-700">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Floating CTA (bottom-right) */}
        <div className="fixed bottom-6 right-6 z-50">
          <Link
            to="/lotsByCity"
            className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-white shadow-2xl transition-transform duration-300 hover:scale-110"
            aria-label="Quick access to lots"
          >
            <Car className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </div>
  );
}
