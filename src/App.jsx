import React, { useState, useMemo, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import MapComponent from './components/MapComponent';
import Sidebar from './components/Sidebar';
import { layersConfig } from './config/layers';

function App() {
  const [activeLayers, setActiveLayers] = useState([]);
  const [activeBasemap, setActiveBasemap] = useState('urbano');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Extract all layer categories
  const categories = useMemo(() => {
    const cats = {};
    layersConfig.forEach(layer => {
      if (!cats[layer.category]) {
        cats[layer.category] = {};
      }
      if (!cats[layer.category][layer.group]) {
        cats[layer.category][layer.group] = [];
      }
      cats[layer.category][layer.group].push(layer);
    });
    return cats;
  }, []);

  const toggleLayer = (layerId) => {
    setActiveLayers(prev => 
      prev.includes(layerId) 
        ? prev.filter(id => id !== layerId)
        : [...prev, layerId]
    );
  };

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <div className="app-container">
      {/* Discreet Header */}
      <div className="app-header">
        <div className="header-controls">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Alternar tema">
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>

      <Sidebar 
        categories={categories}
        activeLayers={activeLayers}
        toggleLayer={toggleLayer}
        activeBasemap={activeBasemap}
        setActiveBasemap={setActiveBasemap}
        onSearch={(q) => setSearchQuery(q)}
      />
      <div className="map-container">
        <MapComponent 
          activeLayers={activeLayers}
          activeBasemap={activeBasemap}
          searchQuery={searchQuery}
        />
      </div>
    </div>
  );
}

export default App;
