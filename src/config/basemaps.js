const esriAttribution = 'Esri, HERE, Garmin, USGS, NGA, EPA, USDA, NPS';

export const basemaps = {
  relevo: {
    id: 'relevo',
    name: 'Relevo / Altimetria',
    shortName: 'Relevo',
    description: 'Mapa topográfico com relevo sombreado, cores hipsométricas e curvas de nível (OpenTopoMap).',
    style: {
      version: 8,
      sources: {
        opentopomap: {
          type: 'raster',
          tiles: [
            'https://a.tile.opentopomap.org/{z}/{x}/{y}.png',
            'https://b.tile.opentopomap.org/{z}/{x}/{y}.png',
            'https://c.tile.opentopomap.org/{z}/{x}/{y}.png'
          ],
          tileSize: 256,
          maxzoom: 17,
          attribution: 'Dados: &copy; OpenStreetMap contributors, SRTM | Estilo: &copy; OpenTopoMap (CC-BY-SA)'
        }
      },
      layers: [{ id: 'opentopomap-layer', type: 'raster', source: 'opentopomap' }]
    }
  },
  satelite: {
    id: 'satelite',
    name: 'Satélite',
    shortName: 'Satélite',
    description: 'Imagem de satélite para contextualização visual.',
    style: {
      version: 8,
      sources: {
        'esri-imagery': {
          type: 'raster',
          tiles: ['https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'],
          tileSize: 256,
          attribution: 'Esri, Maxar, Earthstar Geographics, and the GIS User Community'
        }
      },
      layers: [{ id: 'esri-imagery-layer', type: 'raster', source: 'esri-imagery' }]
    }
  },
  urbano: {
    id: 'urbano',
    name: 'Urbano / Viário',
    shortName: 'Urbano',
    description: 'Base com localidades, ruas e rodovias (Esri World Street Map).',
    style: {
      version: 8,
      sources: {
        'esri-streets': {
          type: 'raster',
          tiles: ['https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}'],
          tileSize: 256,
          attribution: esriAttribution
        }
      },
      layers: [{ id: 'esri-streets-layer', type: 'raster', source: 'esri-streets' }]
    }
  }
};
