import React, { useMemo, useRef, useState, useEffect, useCallback } from 'react';
import Map, { Source, Layer, NavigationControl, ScaleControl, Popup } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { layersConfig } from '../config/layers';
import { basemaps } from '../config/basemaps';

const MapComponent = ({ activeLayers, activeBasemap, selectedMunicipality }) => {
  const mapRef = useRef(null);
  const [popupInfo, setPopupInfo] = useState(null);
  const [mapError, setMapError] = useState('');

  const activeLayerConfigs = useMemo(() => {
    const selected = layersConfig.filter(
      (layer) => activeLayers.includes(layer.id) && layer.sourceType === 'geojson'
    );

    // Renderiza polígonos primeiro e linhas por cima. Isso evita que áreas
    // semitransparentes escondam Tipologia e Exposição às Ondas.
    const priority = { fill: 0, line: 1, circle: 2, symbol: 3 };
    return [...selected].sort(
      (a, b) => (priority[a.type] ?? 10) - (priority[b.type] ?? 10)
    );
  }, [activeLayers]);

  const mapStyle = useMemo(
    () => basemaps[activeBasemap]?.style || basemaps.urbano.style,
    [activeBasemap]
  );

  useEffect(() => {
    if (!selectedMunicipality?.bbox || !mapRef.current) return;

    const [minLng, minLat, maxLng, maxLat] = selectedMunicipality.bbox;
    mapRef.current.fitBounds(
      [[minLng, minLat], [maxLng, maxLat]],
      { padding: 80, duration: 900, maxZoom: 11 }
    );
  }, [selectedMunicipality]);

  const handleLoad = useCallback(() => {
    setMapError('');
    window.setTimeout(() => mapRef.current?.resize(), 50);
  }, []);

  const handleError = useCallback((event) => {
    const message = event?.error?.message || 'Falha ao carregar o mapa.';
    console.error('MapLibre error:', event?.error || event);
    setMapError(message);
  }, []);

  const onClick = (event) => {
    const feature = event.features?.[0];
    if (!feature) {
      setPopupInfo(null);
      return;
    }

    const configLayer = layersConfig.find((layer) => layer.id === feature.layer.id);
    if (!configLayer?.popupFields?.length) {
      setPopupInfo(null);
      return;
    }

    setPopupInfo({
      lngLat: event.lngLat,
      feature,
      config: configLayer
    });
  };

  return (
    <div className="map-shell">
      <Map
        ref={mapRef}
        initialViewState={{ longitude: -42.5, latitude: -22.25, zoom: 7.2 }}
        mapStyle={mapStyle}
        style={{ width: '100%', height: '100%' }}
        interactiveLayerIds={activeLayerConfigs.filter((layer) => layer.popupFields?.length).map((layer) => layer.id)}
        onClick={onClick}
        onLoad={handleLoad}
        onError={handleError}
        cursor={activeLayerConfigs.length ? 'pointer' : 'grab'}
        attributionControl={true}
      >
        <NavigationControl position="top-right" showCompass={false} />
        <ScaleControl position="bottom-right" unit="metric" />

        {activeLayerConfigs.map((layer) => {
          return (
            <Source
              key={`src-${layer.id}`}
              id={`src-${layer.id}`}
              type="geojson"
              data={layer.url}
              generateId
            >
              <Layer
                id={layer.id}
                type={layer.type}
                paint={layer.paint}
                {...(layer.layout ? { layout: layer.layout } : {})}
                {...(Array.isArray(layer.filter) ? { filter: layer.filter } : {})}
              />
            </Source>
          );
        })}

        {popupInfo && (
          <Popup
            longitude={popupInfo.lngLat.lng}
            latitude={popupInfo.lngLat.lat}
            anchor="bottom"
            onClose={() => setPopupInfo(null)}
            closeButton
            closeOnClick={false}
            maxWidth="320px"
          >
            <div className="popup-content">
              <h4>{popupInfo.config.name}</h4>
              {popupInfo.config.popupFields.map((field) => (
                <div key={field.field} className="popup-row">
                  <span>{field.label}</span>
                  <strong>{formatValue(popupInfo.feature.properties[field.field], field)}</strong>
                </div>
              ))}
            </div>
          </Popup>
        )}
      </Map>

      {mapError && (
        <div className="map-error" role="alert">
          <strong>O mapa encontrou um erro de renderização.</strong>
          <span>{mapError}</span>
        </div>
      )}

      <Legend activeLayerConfigs={activeLayerConfigs} />
    </div>
  );
};

const formatValue = (value, field) => {
  if (value === null || value === undefined || value === '') return '—';
  if (typeof value === 'number') {
    const decimals = field.decimals ?? 2;
    return new Intl.NumberFormat('pt-BR', { maximumFractionDigits: decimals }).format(value);
  }
  return String(value);
};

const Legend = ({ activeLayerConfigs }) => {
  const legendLayers = activeLayerConfigs.filter((layer) => layer.legend?.length);
  if (!legendLayers.length) return null;

  return (
    <div className="legend-panel">
      {legendLayers.map((layer) => (
        <section className="legend-section" key={layer.id}>
          <h4>{layer.name}</h4>
          <div className="legend-items">
            {layer.legend.map((item) => (
              <div className="legend-item" key={`${layer.id}-${item.label}`}>
                <span
                  className={`legend-swatch ${layer.type === 'line' ? 'line' : ''}`}
                  style={{ backgroundColor: item.color }}
                />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default MapComponent;
