import React from 'react';
import { basemaps } from '../config/basemaps';
import { Search } from 'lucide-react';

const Sidebar = ({ categories, activeLayers, toggleLayer, activeBasemap, setActiveBasemap, onSearch }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src="/assets/logo_sem_fundo_ivc.png" alt="Farol IVC Logo" />
        <div className="sidebar-title">
          <h1>FAROL IVC</h1>
          <p>Índice de Vulnerabilidade Costeira</p>
        </div>
      </div>
      
      <div className="sidebar-content">
        <div className="search-box">
          <Search className="search-icon" size={16} />
          <input 
            type="text" 
            placeholder="Pesquisar município..." 
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        <div className="basemap-selector">
          {Object.values(basemaps).map(map => (
            <button 
              key={map.id}
              className={`basemap-btn ${activeBasemap === map.id ? 'active' : ''}`}
              onClick={() => setActiveBasemap(map.id)}
            >
              {map.name}
            </button>
          ))}
        </div>

        {Object.entries(categories).map(([categoryName, groups]) => (
          <div key={categoryName} className="layer-group">
            <h2>{categoryName}</h2>
            {Object.entries(groups).map(([groupName, layers]) => (
              <div key={groupName} className="layer-group-sub">
                {groupName !== categoryName && <h3>{groupName}</h3>}
                {layers.map(layer => {
                  const isDisabled = layer.sourceType === null;
                  const isActive = activeLayers.includes(layer.id);
                  
                  return (
                    <div key={layer.id} className={`layer-item ${isDisabled ? 'disabled' : ''}`} onClick={() => !isDisabled && toggleLayer(layer.id)}>
                      <label className="toggle-switch">
                        <input 
                          type="checkbox" 
                          checked={isActive} 
                          readOnly
                          disabled={isDisabled}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                      <div className="layer-item-info">
                        <span className="layer-item-name">{layer.name}</span>
                        {isDisabled && (
                          <span className="layer-item-status">{layer.status}</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
