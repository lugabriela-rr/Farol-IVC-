const cartoAttribution = '&copy; OpenStreetMap contributors &copy; CARTO';

export const basemaps = {
  claro: {
    id: 'claro',
    name: 'Claro (CARTO Positron)',
    shortName: 'Claro',
    description: 'Base clara e neutra, ideal para destacar as camadas temáticas (CARTO Positron).',
    attribution: cartoAttribution,
    style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json'
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
