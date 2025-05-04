import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { styles } from '../../constants/styles';
import { config } from '../../constants/config';
import { MapPinIcon, ShoppingBagIcon } from '@heroicons/react/24/solid';
import { GlobeAltIcon } from '@heroicons/react/24/outline';

export default function Hero() {
  const navigate = useNavigate();

  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const MAPBOX_TOKEN = "pk.eyJ1IjoiZXRoYW5yYW1vczM2NCIsImEiOiJjbWE5MHV0ODYxaHpqMmtvb3Z3aGh2aDh2In0.70s5g0LH9qss24xIKWwPwQ";

  const fetchSuggestions = async (input) => {
    if (!input) return setSuggestions([]);

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      input
    )}.json?access_token=${MAPBOX_TOKEN}&autocomplete=true&limit=5`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data && data.features) {
        setSuggestions(data.features.map((feature) => feature.place_name));
      }
    } catch (error) {
      console.error('Mapbox fetch error:', error);
      setSuggestions([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuggestions([]);
    navigate('/about');
  };

  return (
    <section className="relative w-full h-screen mx-auto overflow-hidden bg-black">
      {/* Intro */}
      <div
        className={`absolute inset-0 top-[120px] mx-auto max-w-7xl ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-red-500" />
          <div className="w-1 h-40 sm:h-80 bg-gradient-to-b from-red-600 to-red-200" />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            <span className="text-red-500">Pin</span>
            <span className="text-[brown] ml-2">Point</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            {config.hero.p[0]} <br className="hidden sm:block" />
            {config.hero.p[1]}
          </p>
        </div>
      </div>

      {/* Logo */}
      {/* Logo */}
<img
  src="/logo.png"
  alt="logo"
  className="absolute top-[25%] right-10 object-contain w-1/2 max-w-xs sm:w-1/3 sm:max-w-sm md:w-1/4 animate-bounce"
/>


      {/* Grocery Icon + Globe + Form */}
      <div className="absolute top-1/2 left-[38%] transform -translate-x-1/2 flex items-center space-x-10">
        {/* New Grocery Bag Icon */}
        <ShoppingBagIcon className="w-32 h-32 text-red-500 opacity-90" />

        {/* Globe Icon */}
        <GlobeAltIcon className="w-40 h-40 text-red-500 animate-spin-slow self-center" />

        {/* Search Form */}
        <div className="max-w-md w-full p-6 bg-white bg-opacity-20 backdrop-blur-md rounded-xl">
          <form onSubmit={handleSubmit} className="space-y-4 relative">
            <label htmlFor="location" className="block text-white font-medium">
              Location
            </label>

            <div className="flex items-center space-x-3">
              <MapPinIcon className="w-6 h-6 text-red-500" />
              <input
                type="text"
                id="location"
                name="location"
                placeholder="Enter your city or address"
                value={query}
                onChange={(e) => {
                  const val = e.target.value;
                  setQuery(val);
                  fetchSuggestions(val);
                }}
                required
                className="w-full px-3 py-2 rounded-md border border-gray-300 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-400 bg-white shadow-sm"
              />
            </div>

            {/* Suggestions Dropdown */}
            {suggestions.length > 0 && (
              <ul className="absolute z-10 w-full bg-white rounded-md border border-gray-200 mt-1 max-h-40 overflow-y-auto shadow">
                {suggestions.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setQuery(item);
                      setSuggestions([]);
                    }}
                    className="px-4 py-2 hover:bg-red-100 cursor-pointer text-black"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}

            <button
              type="submit"
              className="w-full flex justify-center px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
