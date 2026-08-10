import React, { useMemo, useState } from 'react';
import { ChevronDown, ChevronRight, PanelLeftClose, PanelLeftOpen, Search } from 'lucide-react';
import { basemaps } from '../config/basemaps';

const Sidebar = ({
  categories,
  activeLayers,
  toggleLayer,
  activeBasemap,
  setActiveBasemap,
  municipalities,
  onSelectMunicipality
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [query, setQuery] = useState('');
  const [openCategories, setOpenCategories] = useState(() =>
    Object.fromEntries(Object.keys(categories).map((key) => [key, true]))
  );

  const suggestions = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase('pt-BR');
    if (normalized.length < 2) return [];
    return municipalities
      .filter((item) => item.name.toLocaleLowerCase('pt-BR').includes(normalized))
      .slice(0, 7);
  }, [query, municipalities]);

  const selectMunicipality = (municipality) => {
    setQuery(municipality.name);
    onSelectMunicipality(municipality);
  };

  const toggleCategory = (category) => {
    setOpenCategories((current) => ({ ...current, [category]: !current[category] }));
  };

  return (
    <>
      <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <img src="/assets/logo_sem_fundo_ivc.png" alt="Farol IVC" />
          <div className="sidebar-title">
            <h1>FAROL IVC</h1>
            <p>Índice de Vulnerabilidade Costeira</p>
          </div>
        </div>

        <div className="sidebar-content">
          <div className="search-wrap">
            <div className="search-box">
              <Search className="search-icon" size={15} />
              <input
                type="search"
                value={query}
                placeholder="Pesquisar município..."
                onChange={(event) => setQuery(event.target.value)}
                aria-label="Pesquisar município"
              />
            </div>

            {!!suggestions.length && (
              <div className="search-results">
                {suggestions.map((municipality) => (
                  <button key={municipality.code} onClick={() => selectMunicipality(municipality)}>
                    <span>{municipality.name}</span>
                    {municipality.mun_zc === 1 && <small>Zona Costeira</small>}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="basemap-block">
            <span className="eyebrow">Mapa-base</span>
            <div className="basemap-selector">
              {Object.values(basemaps).map((basemap) => (
                <button
                  key={basemap.id}
                  className={`basemap-btn ${activeBasemap === basemap.id ? 'active' : ''}`}
                  onClick={() => setActiveBasemap(basemap.id)}
                  title={basemap.description}
                >
                  {basemap.shortName || basemap.name}
                </button>
              ))}
            </div>
          </div>

          <div className="layers-list">
            {Object.entries(categories).map(([categoryName, groups]) => {
              const isOpen = openCategories[categoryName] !== false;
              return (
                <section key={categoryName} className="layer-group">
                  <button className="group-title" onClick={() => toggleCategory(categoryName)}>
                    <span>{categoryName}</span>
                    {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  </button>

                  {isOpen && Object.entries(groups).map(([groupName, layers]) => (
                    <div key={groupName} className="layer-group-sub">
                      {groupName !== categoryName && <h3>{groupName}</h3>}
                      {layers.map((layer) => {
                        const isDisabled = layer.sourceType === null;
                        const isActive = activeLayers.includes(layer.id);
                        return (
                          <button
                            key={layer.id}
                            className={`layer-item ${isDisabled ? 'disabled' : ''}`}
                            onClick={() => !isDisabled && toggleLayer(layer.id)}
                            disabled={isDisabled}
                          >
                            <span className={`toggle-switch ${isActive ? 'active' : ''}`} aria-hidden="true">
                              <span />
                            </span>
                            <span className="layer-item-info">
                              <span className="layer-item-name">{layer.name}</span>
                              {isDisabled && <span className="layer-item-status">{layer.status}</span>}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </section>
              );
            })}
          </div>
        </div>
      </aside>

      <button
        className={`sidebar-toggle ${collapsed ? 'collapsed' : ''}`}
        onClick={() => setCollapsed((value) => !value)}
        aria-label={collapsed ? 'Abrir painel de camadas' : 'Recolher painel de camadas'}
        title={collapsed ? 'Abrir camadas' : 'Recolher camadas'}
      >
        {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
      </button>
    </>
  );
};

export default Sidebar;
