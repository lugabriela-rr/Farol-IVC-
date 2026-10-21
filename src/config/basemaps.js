const cartoAttribution = '&copy; OpenStreetMap contributors &copy; CARTO';

export const basemaps = {
  relevo: {
    id: 'relevo',
    name: 'Relevo sombreado',
    shortName: 'Relevo',
    description: 'Base clara com relevo sombreado (hillshade) gerado a partir de modelo digital de elevação.',
    style: {
      version: 8,
      sources: {
        'carto-light': {
          type: 'raster',
          tiles: ['a', 'b', 'c', 'd'].map((s) => `https://${s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png`),
          tileSize: 256,
          attribution: cartoAttribution
        },
        'carto-labels': {
          type: 'raster',
          tiles: ['a', 'b', 'c', 'd'].map((s) => `https://${s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png`),
          tileSize: 256
        },
        terrain: {
          type: 'raster-dem',
          tiles: ['https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png'],
          tileSize: 256,
          maxzoom: 15,
          encoding: 'terrarium',
          attribution: 'Elevação: Mapzen Terrain Tiles (AWS Open Data)'
        }
      },
      layers: [
        { id: 'carto-light-layer', type: 'raster', source: 'carto-light' },
        {
          id: 'hillshade-layer',
          type: 'hillshade',
          source: 'terrain',
          paint: {
            'hillshade-exaggeration': 0.55,
            'hillshade-shadow-color': '#4f5f68',
            'hillshade-highlight-color': '#ffffff',
            'hillshade-accent-color': '#6f7f86'
          }
        },
        { id: 'carto-labels-layer', type: 'raster', source: 'carto-labels' }
      ]
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
    name: 'Urbano / Viário (CARTO Voyager)',
    shortName: 'Urbano',
    description: 'Base com localidades, ruas e rodovias (CARTO Voyager).',
    attribution: cartoAttribution,
    style: 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json'
  }
};
