import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Map, { Layer, NavigationControl, ScaleControl, Source } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import html2canvas from 'html2canvas';
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Download, GripVertical, Loader2 } from 'lucide-react';
import { layersConfig } from '../../config/layers';
import { basemaps } from '../../config/basemaps';

const availableLayers = layersConfig.filter((layer) => layer.sourceType === 'geojson');
const layerById = Object.fromEntries(availableLayers.map((layer) => [layer.id, layer]));

const RJ_VIEW = { longitude: -42.5, latitude: -22.25, zoom: 7.2 };

const ConstrutorMapas = ({ municipalities }) => {
  const mapRef = useRef(null);
  const exportRef = useRef(null);
  const [title, setTitle] = useState('Mapa da Zona Costeira do RJ');
  const [municipalityCode, setMunicipalityCode] = useState('');
  const [basemapId, setBasemapId] = useState('claro');
  const [isExporting, setIsExporting] = useState(false);
  // A ordem da lista define a ordem de desenho: o primeiro item fica por cima.
  const [variables, setVariables] = useState(() =>
    availableLayers.map((layer) => ({ id: layer.id, visible: layer.id === 'var_tipologia' }))
  );

  const coastalMunicipalities = useMemo(
    () =>
      municipalities
        .filter((item) => item.mun_zc === 1)
        .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR')),
    [municipalities]
  );

  const coastalBounds = useMemo(() => {
    if (!coastalMunicipalities.length) return null;
    return coastalMunicipalities.reduce(
      ([minLng, minLat, maxLng, maxLat], { bbox }) => [
        Math.min(minLng, bbox[0]),
        Math.min(minLat, bbox[1]),
        Math.max(maxLng, bbox[2]),
        Math.max(maxLat, bbox[3])
      ],
      [Infinity, Infinity, -Infinity, -Infinity]
    );
  }, [coastalMunicipalities]);

  const selectedMunicipality = coastalMunicipalities.find((item) => item.code === municipalityCode);
  const visibleLayers = variables.filter((item) => item.visible).map((item) => layerById[item.id]);

  useEffect(() => {
    const bbox = selectedMunicipality?.bbox || coastalBounds;
    if (!bbox || !mapRef.current) return;
    const [minLng, minLat, maxLng, maxLat] = bbox;
    mapRef.current.fitBounds(
      [[minLng, minLat], [maxLng, maxLat]],
      { padding: 60, duration: 900, maxZoom: 12 }
    );
  }, [selectedMunicipality, coastalBounds]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return;
    setVariables((current) => {
      const from = current.findIndex((item) => item.id === active.id);
      const to = current.findIndex((item) => item.id === over.id);
      return arrayMove(current, from, to);
    });
  };

  const toggleVariable = (id) => {
    setVariables((current) =>
      current.map((item) => (item.id === id ? { ...item, visible: !item.visible } : item))
    );
  };

  const handleLoad = useCallback(() => {
    window.setTimeout(() => mapRef.current?.resize(), 50);
  }, []);

  const exportPng = async () => {
    if (!exportRef.current) return;
    setIsExporting(true);
    try {
      const canvas = await html2canvas(exportRef.current, {
        useCORS: true,
        backgroundColor: '#ffffff',
        scale: 2,
        ignoreElements: (element) =>
          element.dataset?.exportIgnore === 'true' ||
          element.classList?.contains('maplibregl-ctrl-top-right')
      });
      const link = document.createElement('a');
      link.download = `${slugify(title) || 'mapa-farol-ivc'}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Falha ao exportar o mapa:', error);
      window.alert('Não foi possível exportar o mapa. Tente novamente.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="construtor">
      <aside className="sidebar construtor-sidebar">
        <div className="sidebar-content">
          <div className="cm-field">
            <label className="eyebrow" htmlFor="cm-municipio">Município da Zona Costeira</label>
            <select
              id="cm-municipio"
              className="cm-input"
              value={municipalityCode}
              onChange={(event) => setMunicipalityCode(event.target.value)}
            >
              <option value="">Toda a Zona Costeira</option>
              {coastalMunicipalities.map((municipality) => (
                <option key={municipality.code} value={municipality.code}>
                  {municipality.name}
                </option>
              ))}
            </select>
          </div>

          <div className="cm-field">
            <label className="eyebrow" htmlFor="cm-titulo">Título do mapa</label>
            <input
              id="cm-titulo"
              className="cm-input"
              type="text"
              value={title}
              maxLength={90}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>

          <div className="cm-field">
            <span className="eyebrow">Mapa-base</span>
            <div className="basemap-selector">
              {Object.values(basemaps).map((basemap) => (
                <button
                  key={basemap.id}
                  className={`basemap-btn ${basemapId === basemap.id ? 'active' : ''}`}
                  onClick={() => setBasemapId(basemap.id)}
                  title={basemap.description}
                >
                  {basemap.shortName || basemap.name}
                </button>
              ))}
            </div>
          </div>

          <div className="cm-field">
            <span className="eyebrow">Variáveis (arraste para ordenar)</span>
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={variables.map((item) => item.id)} strategy={verticalListSortingStrategy}>
                <ul className="cm-variable-list">
                  {variables.map((item) => (
                    <SortableVariable
                      key={item.id}
                      layer={layerById[item.id]}
                      visible={item.visible}
                      onToggle={() => toggleVariable(item.id)}
                    />
                  ))}
                </ul>
              </SortableContext>
            </DndContext>
          </div>
        </div>
      </aside>

      <section className="cm-stage">
        <div className="cm-frame" ref={exportRef}>
          <Map
            ref={mapRef}
            initialViewState={RJ_VIEW}
            mapStyle={basemaps[basemapId]?.style || basemaps.claro.style}
            style={{ width: '100%', height: '100%' }}
            onLoad={handleLoad}
            preserveDrawingBuffer
            attributionControl={true}
          >
            <NavigationControl position="top-right" showCompass={false} />
            <ScaleControl position="bottom-right" unit="metric" />

            {visibleLayers.map((layer, index) => {
              // Cada camada é inserida logo abaixo da camada visível acima dela na
              // lista, mantendo a ordem de desenho igual à ordem da sidebar.
              const above = visibleLayers[index - 1];
              const beforeId = above ? (above.outline ? `${above.id}-outline` : above.id) : undefined;
              const filterProps = Array.isArray(layer.filter) ? { filter: layer.filter } : {};
              return (
                <Source key={`cm-src-${layer.id}`} id={`cm-src-${layer.id}`} type="geojson" data={layer.url}>
                  <Layer
                    id={layer.id}
                    type={layer.type}
                    paint={layer.paint}
                    beforeId={beforeId}
                    {...(layer.layout ? { layout: layer.layout } : {})}
                    {...filterProps}
                  />
                  {layer.outline && (
                    <Layer
                      id={`${layer.id}-outline`}
                      type="line"
                      paint={layer.outline}
                      beforeId={beforeId}
                      {...filterProps}
                    />
                  )}
                </Source>
              );
            })}
          </Map>

          <div className="cm-title">
            <h2>{title || 'Sem título'}</h2>
            {selectedMunicipality && <p>{selectedMunicipality.name} — RJ</p>}
          </div>

          <div className="cm-north" aria-label="Norte">
            <svg viewBox="0 0 40 52" width="32" height="42" aria-hidden="true">
              <text x="20" y="11" textAnchor="middle" fontSize="11" fontWeight="700" fill="#183041">N</text>
              <polygon points="20,14 30,46 20,39" fill="#183041" />
              <polygon points="20,14 10,46 20,39" fill="#ffffff" stroke="#183041" strokeWidth="1.2" />
            </svg>
          </div>

          {!!visibleLayers.length && (
            <div className="cm-legend">
              <h4>Legenda</h4>
              {visibleLayers.map((layer) => (
                <div key={layer.id} className="cm-legend-section">
                  <strong>{layer.name}</strong>
                  {getLegendItems(layer).map((item) => (
                    <div className="cm-legend-item" key={`${layer.id}-${item.label}`}>
                      <span
                        className={`cm-legend-swatch ${layer.type === 'line' || item.line ? 'line' : ''}`}
                        style={{ backgroundColor: item.color }}
                      />
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          <div className="cm-credits">Projeto Farol IVC · {new Date().toLocaleDateString('pt-BR')}</div>

          <button
            className="cm-export-btn"
            data-export-ignore="true"
            onClick={exportPng}
            disabled={isExporting}
          >
            {isExporting ? <Loader2 size={16} className="spin" /> : <Download size={16} />}
            <span>{isExporting ? 'A exportar…' : 'Exportar PNG'}</span>
          </button>
        </div>
      </section>
    </div>
  );
};

const SortableVariable = ({ layer, visible, onToggle }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: layer.id });

  return (
    <li
      ref={setNodeRef}
      className={`cm-variable ${isDragging ? 'dragging' : ''}`}
      style={{ transform: CSS.Transform.toString(transform), transition }}
    >
      <button className="cm-drag-handle" aria-label={`Reordenar ${layer.name}`} {...attributes} {...listeners}>
        <GripVertical size={15} />
      </button>
      <label className="cm-variable-label">
        <input type="checkbox" checked={visible} onChange={onToggle} />
        <span className="layer-item-info">
          <span className="layer-item-name">{layer.name}</span>
          <span className="layer-item-status">{layer.group}</span>
        </span>
      </label>
    </li>
  );
};

const getLegendItems = (layer) => {
  if (layer.legend?.length) return layer.legend;
  const color = layer.paint?.['fill-color'] ?? layer.paint?.['line-color'] ?? layer.paint?.['circle-color'];
  const outlineColor = layer.outline?.['line-color'];
  const swatch = typeof color === 'string' ? color : typeof outlineColor === 'string' ? outlineColor : '#8a99a6';
  return [{ label: layer.name, color: swatch }];
};

const slugify = (text) =>
  text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export default ConstrutorMapas;
