import React, { useEffect, useMemo, useState } from 'react';
import MapComponent from './components/MapComponent';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import ConstrutorMapas from './components/ConstrutorMapas/ConstrutorMapas';
import Metodologia from './components/Metodologia/Metodologia';
import { layersConfig } from './config/layers';

function App() {
  const [activeTab, setActiveTab] = useState('analise');
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
      <TopBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode((value) => !value)}
      />

      <main className="app-main">
        {activeTab === 'analise' && (
          <>
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
          </>
        )}

        {activeTab === 'construtor' && <ConstrutorMapas municipalities={municipalities} />}

        {activeTab === 'metodologia' && <Metodologia />}
      </main>
    </div>
  );
}

export default App;
