import React, { useEffect, useMemo, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import MapComponent from './components/MapComponent';
import Sidebar from './components/Sidebar';
import { layersConfig } from './config/layers';

function App() {
  const [activeLayers, setActiveLayers] = useState([]);
  const [activeBasemap, setActiveBasemap] = useState('urbano');
  const [municipalities, setMunicipalities] = useState([]);
  const [selectedMunicipality, setSelectedMunicipality] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
  });

  useEffect(() => {
    document.documentElement.dataset.theme = isDarkMode ? 'dark' : 'light';
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    fetch('/data/municipios_index.json')
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then(setMunicipalities)
      .catch((error) => console.error('Falha ao carregar índice municipal:', error));
  }, []);

  const categories = useMemo(() => {
    const cats = {};
    layersConfig.forEach((layer) => {
      cats[layer.category] ??= {};
      cats[layer.category][layer.group] ??= [];
      cats[layer.category][layer.group].push(layer);
    });
    return cats;
  }, []);

  const toggleLayer = (layerId) => {
    setActiveLayers((current) =>
      current.includes(layerId)
        ? current.filter((id) => id !== layerId)
        : [...current, layerId]
    );
  };

  return (
    <div className="app-container">
      <div className="map-container">
        <MapComponent
          activeLayers={activeLayers}
          activeBasemap={activeBasemap}
          selectedMunicipality={selectedMunicipality}
        />
      </div>

      <Sidebar
        categories={categories}
        activeLayers={activeLayers}
        toggleLayer={toggleLayer}
        activeBasemap={activeBasemap}
        setActiveBasemap={setActiveBasemap}
        municipalities={municipalities}
        onSelectMunicipality={setSelectedMunicipality}
      />

      <div className="app-header">
        <button
          className="theme-toggle"
          onClick={() => setIsDarkMode((value) => !value)}
          aria-label={isDarkMode ? 'Ativar tema claro' : 'Ativar tema escuro'}
          title={isDarkMode ? 'Tema claro' : 'Tema escuro'}
        >
          {isDarkMode ? <Sun size={17} strokeWidth={1.8} /> : <Moon size={17} strokeWidth={1.8} />}
        </button>
      </div>
    </div>
  );
}

export default App;
