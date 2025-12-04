import React, { useState } from "react";
import { MapPin, Search, AlertCircle, Car, Navigation, ArrowRight, Zap } from "lucide-react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Lots() {
  const [city, setCity] = useState("");
  const [lots, setLots] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Mock navigate function - replace with actual useNavigate() hook
  const navigate = useNavigate();

  const handleFetchLots = async () => {
    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:4000/api/lot/getLotsByCity",
        { city: city.trim() },
        { withCredentials: true }
      );
      setLots(res.data.lotsCity || []);
      setError("");
    } catch (err) {
      setError("Failed to fetch lots.");
      setLots([]);
    } finally{
        setIsLoading(false);
    }
  };

  const handleLotClick = (lotId) => {
    navigate(`/slots/${lotId}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleFetchLots();
    }
  };

  return (
    <div className="min-h-screen bg-white/60 flex items-start justify-center py-12 px-4">
      {/* Decorative background shapes */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 -left-32 w-72 h-72 rounded-full bg-gradient-to-tr from-indigo-100 to-amber-100 opacity-40 blur-3xl animate-[pulse_8s_infinite]"></div>
        <div className="absolute -bottom-36 -right-32 w-80 h-80 rounded-full bg-gradient-to-br from-pink-100 to-cyan-100 opacity-30 blur-2xl animate-[pulse_9s_infinite]"></div>
      </div>

      <div className="relative z-10 w-full max-w-5xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-600 to-cyan-500 rounded-2xl mb-4 shadow-lg">
            <Car className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2">Find Parking Lots by City</h1>
          <p className="text-sm sm:text-base text-slate-600">Discover available parking spaces in your desired location</p>
        </div>

        {/* Search Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-6 mb-8">
          {/* Search Section */}
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500">
                <Navigation className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="Enter city name (e.g., New York, London)"
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-shadow"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
            
            <button
              onClick={handleFetchLots}
              disabled={isLoading}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-indigo-600 to-cyan-500 px-5 py-3 text-white font-semibold shadow hover:scale-[1.02] transition-transform disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/60 border-t-white rounded-full animate-spin" />
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>Search</span>
                </>
              )}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-100 rounded-lg flex items-center gap-3 text-red-600">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}
        </div>

        {/* Results */}
        {lots.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-6">
            
            {/* Results Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-indigo-50 rounded-lg">
                <MapPin className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Available Parking Lots</h2>
                <p className="text-sm text-slate-500">Found {lots.length} parking {lots.length === 1 ? 'lot' : 'lots'} in {city}</p>
              </div>
            </div>

            {/* Lots List */}
            <div className="space-y-4">
              {lots.map((lot, index) => (
                <div
                  key={lot._id || index}
                  className="group bg-white border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer flex items-center justify-between gap-4"
                  onClick={() => handleLotClick(lot._id)}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-start gap-4 flex-1">
                    {/* Lot Icon */}
                    <div className="flex items-center justify-center w-12 h-12 bg-indigo-50 rounded-lg">
                      <Car className="w-6 h-6 text-indigo-600" />
                    </div>

                    {/* Lot Details */}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">{lot.name}</h3>
                      
                      <div className="mt-1 flex flex-col sm:flex-row sm:items-center sm:gap-6 text-sm text-slate-500">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-indigo-400" />
                          <span>{lot.city}</span>
                        </div>
                        {lot.address && <div className="mt-1 sm:mt-0">{lot.address}</div>}
                      </div>

                      {/* Additional Info */}
                      <div className="mt-3 flex items-center gap-4 text-sm">
                        {lot.totalSpaces && (
                          <div className="flex items-center gap-2 text-indigo-600">
                            <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                            <span className="font-medium">{lot.totalSpaces} spaces</span>
                          </div>
                        )}
                        
                        {lot.pricePerHour && (
                          <div className="flex items-center gap-2 text-green-600">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <span className="font-medium">${lot.pricePerHour}/hr</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="flex items-center gap-3">
                    <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-indigo-50 rounded-lg text-indigo-600 text-sm">
                      <Zap className="w-4 h-4" />
                      <span>Available</span>
                    </div>

                    <ArrowRight className="w-6 h-6 text-indigo-500 transform transition-transform duration-200 group-hover:translate-x-1" />
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-gray-100 text-center">
              <p className="text-sm text-slate-500">
                Click on any parking lot to view available slots and book your space
              </p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {lots.length === 0 && !error && city && !isLoading && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-6 text-center">
            <div className="mx-auto w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No Parking Lots Found</h3>
            <p className="text-sm text-slate-500">Try searching for a different city or check your spelling.</p>
          </div>
        )}
      </div>
    </div>
  );
}
