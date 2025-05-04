// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/sections/Home';
import About from './components/sections/About';

import { useEffect } from 'react';
import { config } from './constants/config';
import Chatbot from './components/sections/Chatbot';
import PriceMatch from './components/sections/PriceMatch';
import FindCheapGroceries from './components/sections/FindCheapGroceries';
import RecipeFinder from './components/sections/RecipeFinder';
import AdditionalFeatures from './components/sections/AdditionalFeatures';

export default function App() {
  useEffect(() => {
    document.title = config.html.title;
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/price-match" element={<PriceMatch />} />
        <Route path="/cheap-groceries" element={<FindCheapGroceries />} />
        <Route path="/recipe-finder" element={<RecipeFinder />} />
        <Route path="/add-features" element={<AdditionalFeatures />} />
        <Route path="*" element={<div className="p-8">Page not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
