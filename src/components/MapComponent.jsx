import React, { useMemo, useRef, useState, useEffect } from 'react';
import Map, { Source, Layer, NavigationControl, ScaleControl, Popup } from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { layersConfig } from '../config/layers';
import { basemaps } from '../config/basemaps';

const MapComponent = ({ activeLayers, activeBasemap, searchQuery }) => {
  const mapRef = useRef();
  const [popupInfo, setPopupInfo] = useState(null);
  
  // Convert active layers into Source/Layer components (Lazy Loading via React mapping)
  const activeLayerConfigs = useMemo(() => {
    return layersConfig.filter(layer => activeLayers.includes(layer.id));
  }, [activeLayers]);

  // Handle Search Query filtering and FlyTo logic (Simulated for this version)
  // In a real app, we'd query the geojson data to get the bounding box of the searched municipality.
  useEffect(() => {
    if (searchQuery && mapRef.current) {
      // Basic filtering on the map visual (highlighting) could be done here.
      // A more robust implementation would fetch the bounding box.
      console.log("Busca de município:", searchQuery);
    }
  }, [searchQuery]);

  const mapStyle = useMemo(() => {
    return basemaps[activeBasemap]?.style || basemaps['urbano'].style;
  }, [activeBasemap]);

  const onClick = (event) => {
    const feature = event.features && event.features[0];
    if (feature) {
      // Find which layer config corresponds to the clicked feature
      const layerId = feature.layer.id;
      const configLayer = layersConfig.find(l => l.id === layerId);
      
      if (configLayer && configLayer.popupFields && configLayer.popupFields.length > 0) {
        setPopupInfo({
          lngLat: event.lngLat,
          feature: feature,
          config: configLayer
        });
      } else {
        setPopupInfo(null);
      }
    } else {
      setPopupInfo(null);
    }
  };

  return (
    <Map
      ref={mapRef}
      initialViewState={{
        longitude: -42.5,
        latitude: -22.2,
        zoom: 7.5
      }}
      mapStyle={mapStyle}
      interactiveLayerIds={activeLayerConfigs.map(l => l.id)}
      onClick={onClick}
      cursor="pointer"
    >
      <NavigationControl position="top-right" />
      <ScaleControl position="bottom-right" />

      {/* Render active layers (Lazy Loading: Source fetches URL only when mounted here) */}
      {activeLayerConfigs.map(layer => {
        if (layer.sourceType === 'geojson') {
          return (
            <Source 
              key={`src-${layer.id}`} 
              id={`src-${layer.id}`} 
              type="geojson" 
              data={layer.url}
              generateId={true} // helps with hovering state if needed
            >
              <Layer 
                id={layer.id} 
                type={layer.type} 
                paint={layer.paint}
                filter={layer.filter || undefined}
              />
            </Source>
          );
        }
        return null;
      })}

      {/* Popups */}
      {popupInfo && (
        <Popup
          longitude={popupInfo.lngLat.lng}
          latitude={popupInfo.lngLat.lat}
          anchor="bottom"
          onClose={() => setPopupInfo(null)}
          closeButton={true}
          closeOnClick={false}
          maxWidth="300px"
        >
          <div style={{ padding: '4px' }}>
            <h4 style={{ margin: '0 0 8px 0', borderBottom: '1px solid #ddd', paddingBottom: '4px' }}>
              {popupInfo.config.name}
            </h4>
            {popupInfo.config.popupFields.map((field, idx) => (
              <div key={idx} style={{ marginBottom: '4px', fontSize: '0.85rem' }}>
                <strong>{field.label}:</strong> {popupInfo.feature.properties[field.field] ?? 'N/A'}
              </div>
            ))}
          </div>
        </Popup>
      )}
      
      {/* Legend Component - dynamic based on active layers */}
      <Legend activeLayerConfigs={activeLayerConfigs} />
    </Map>
  );
};

// Simple Legend component to show colors defined in the config
const Legend = ({ activeLayerConfigs }) => {
  const legendLayers = activeLayerConfigs.filter(l => l.paint && (l.paint['fill-color'] || l.paint['line-color']));
  
  if (legendLayers.length === 0) return null;
  
  return (
    <div className="legend-panel">
      {legendLayers.map(layer => {
        let colorExpr = layer.paint['fill-color'] || layer.paint['line-color'];
        let color = '#ccc';
        let isCategorical = Array.isArray(colorExpr) && colorExpr[0] === 'match';
        
        return (
          <div key={layer.id} style={{ marginBottom: '10px' }}>
            <h4>{layer.name}</h4>
            {isCategorical ? (
              // Extract match categories (simplistic extraction for this specific config)
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {colorExpr.slice(2, -1).reduce((result, value, index, array) => {
                  if (index % 2 === 0) {
                    result.push({ label: value, color: array[index + 1] });
                  }
                  return result;
                }, []).map((item, i) => (
                   <div key={i} className="legend-item">
                     <div className="legend-color" style={{ backgroundColor: item.color }}></div>
                     <span>{item.label}</span>
                   </div>
                ))}
              </div>
            ) : (
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: typeof colorExpr === 'string' ? colorExpr : '#333' }}></div>
                <span>Feição</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MapComponent;
