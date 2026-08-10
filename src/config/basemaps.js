const osmAttribution = '&copy; OpenStreetMap contributors';
const cartoAttribution = `${osmAttribution} &copy; CARTO`;

export const basemaps = {
  terreno: {
    id: 'terreno',
    name: 'Terreno / MDE',
    shortName: 'Terreno',
    description: 'Base neutra provisória enquanto o MDE do projeto é preparado para web.',
    style: {
      version: 8,
      sources: {
        'carto-light': {
          type: 'raster',
          tiles: [
            'https://a.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
            'https://b.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
            'https://c.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png'
          ],
          tileSize: 256,
          attribution: cartoAttribution
        }
      },
      layers: [{ id: 'carto-light-layer', type: 'raster', source: 'carto-light' }]
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
    description: 'Base com localidades, ruas e rodovias.',
    style: {
      version: 8,
      sources: {
        'carto-voyager': {
          type: 'raster',
          tiles: [
            'https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png',
            'https://b.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png',
            'https://c.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png'
          ],
          tileSize: 256,
          attribution: cartoAttribution
        }
      },
      layers: [{ id: 'carto-voyager-layer', type: 'raster', source: 'carto-voyager' }]
    }
  }
};
