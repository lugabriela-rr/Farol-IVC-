export const layersConfig = [
  // ---------------------------------------------------------
  // ÍNDICE DE VULNERABILIDADE COSTEIRA
  // ---------------------------------------------------------
  {
    id: 'ivc_geral',
    name: 'IVC Geral',
    category: 'ÍNDICE DE VULNERABILIDADE COSTEIRA',
    group: 'Índices',
    status: 'Em desenvolvimento',
    sourceType: null,
    url: null,
    metadata: { description: 'Índice de Vulnerabilidade Costeira consolidado.' }
  },
  {
    id: 'ivc_biofisico',
    name: 'Componente Biofísico',
    category: 'ÍNDICE DE VULNERABILIDADE COSTEIRA',
    group: 'Índices',
    status: 'Em desenvolvimento',
    sourceType: null,
    url: null
  },
  {
    id: 'ivc_social',
    name: 'Componente Social',
    category: 'ÍNDICE DE VULNERABILIDADE COSTEIRA',
    group: 'Índices',
    status: 'Em desenvolvimento',
    sourceType: null,
    url: null
  },

  // ---------------------------------------------------------
  // VARIÁVEIS - Biofísicas
  // ---------------------------------------------------------
  {
    id: 'var_tipologia',
    name: 'Tipologia da Linha de Costa',
    category: 'VARIÁVEIS',
    group: 'Biofísicas',
    status: 'Concluído',
    sourceType: 'geojson',
    url: '/data/web_tipologia.geojson',
    type: 'line',
    paint: {
      'line-width': 4,
      'line-color': [
        'match',
        ['get', 'tipo_legen'],
        'Praia Arenosa', '#f1c40f', // Amarelo
        'Costão Rochoso', '#7f8c8d', // Cinza escuro
        'Mangue', '#27ae60', // Verde
        'Tecnógeno', '#c0392b', // Vermelho
        /* default */ '#bdc3c7'
      ]
    },
    popupFields: [
      { field: 'tipo_legen', label: 'Tipologia' },
      { field: 'km', label: 'Extensão (km)' }
    ]
  },
  {
    id: 'var_exposicao',
    name: 'Exposição às Ondas',
    category: 'VARIÁVEIS',
    group: 'Biofísicas',
    status: 'Concluído',
    sourceType: 'geojson',
    url: '/data/web_ondas.geojson',
    type: 'line',
    paint: {
      'line-width': 4,
      'line-color': [
        'match',
        ['get', 'classe_exp'],
        1, '#2ecc71', // Baixa (Verde)
        2, '#f1c40f', // Média (Amarelo)
        3, '#e74c3c', // Alta (Vermelho)
        /* default */ '#95a5a6'
      ]
    },
    popupFields: [
      { field: 'classe_exp', label: 'Classe de Exposição (1-3)' },
      { field: 'Class_altu', label: 'Altura' },
      { field: 'Ind_Ondas', label: 'Índice Numérico' }
    ]
  },
  {
    id: 'var_erosao',
    name: 'Dinâmica / Erosão da Linha de Costa',
    category: 'VARIÁVEIS',
    group: 'Biofísicas',
    status: 'Concluído',
    sourceType: 'geojson',
    url: '/data/web_erosao_lc.geojson',
    type: 'fill',
    paint: {
      'fill-color': [
        'step',
        ['get', 'LRR'],
        '#d7191c', // Erosão alta (< -1)
        -1, '#fdae61', // Erosão moderada (-1 a -0.2)
        -0.2, '#ffffbf', // Estável (-0.2 a 0.2)
        0.2, '#a6d96a', // Acreção moderada (0.2 a 1)
        1, '#1a9641' // Acreção alta (> 1)
      ],
      'fill-opacity': 0.8
    },
    popupFields: [
      { field: 'LRR', label: 'Taxa LRR (m/ano)' },
      { field: 'EPR', label: 'Taxa EPR (m/ano)' },
      { field: 'SCE', label: 'Variação SCE (m)' },
      { field: 'NSM', label: 'Variação NSM (m)' }
    ]
  },

  // ---------------------------------------------------------
  // VARIÁVEIS - Sociais
  // ---------------------------------------------------------
  {
    id: 'var_social_placeholder',
    name: 'Dados em desenvolvimento',
    category: 'VARIÁVEIS',
    group: 'Sociais',
    status: 'Em desenvolvimento',
    sourceType: null,
    url: null
  },

  // ---------------------------------------------------------
  // ÁREAS DE ESTUDO
  // ---------------------------------------------------------
  {
    id: 'ae_rh',
    name: 'Regiões Hidrográficas',
    category: 'ÁREAS DE ESTUDO',
    group: 'Áreas de Estudo',
    status: 'Concluído',
    sourceType: 'geojson',
    url: '/data/web_regioes_hidrograficas.geojson',
    type: 'fill',
    paint: {
      'fill-color': '#3498db',
      'fill-opacity': 0.2,
      'fill-outline-color': '#2980b9'
    },
    popupFields: [
      { field: 'nome_rh', label: 'Região Hidrográfica' },
      { field: 'areakm2', label: 'Área (km²)' }
    ]
  },
  {
    id: 'ae_cba_biofisica',
    name: 'CBA Biofísica',
    category: 'ÁREAS DE ESTUDO',
    group: 'Áreas de Estudo',
    status: 'Concluído',
    sourceType: 'geojson',
    url: '/data/web_CBA_biofisica.geojson',
    type: 'fill',
    paint: {
      'fill-color': '#2ecc71',
      'fill-opacity': 0.3,
      'fill-outline-color': '#27ae60'
    },
    popupFields: [
      { field: 'Classe', label: 'Classe' },
      { field: 'Area_km2', label: 'Área (km²)' }
    ]
  },
  {
    id: 'ae_cba_social',
    name: 'CBA Social',
    category: 'ÁREAS DE ESTUDO',
    group: 'Áreas de Estudo',
    status: 'Concluído',
    sourceType: 'geojson',
    url: '/data/web_CBA_social.geojson',
    type: 'fill',
    paint: {
      'fill-color': '#f1c40f',
      'fill-opacity': 0.3,
      'fill-outline-color': '#f39c12'
    },
    popupFields: [
      { field: 'areakm2', label: 'Área (km²)' }
    ]
  },
  {
    id: 'ae_zona_costeira',
    name: 'Zona Costeira',
    category: 'ÁREAS DE ESTUDO',
    group: 'Áreas de Estudo',
    status: 'Concluído',
    sourceType: 'geojson',
    url: '/data/web_municipios_zona_costeira.geojson',
    type: 'fill',
    paint: {
      'fill-color': '#9b59b6',
      'fill-opacity': 0.2,
      'fill-outline-color': '#8e44ad'
    },
    popupFields: []
  },
  {
    id: 'ae_aic',
    name: 'Área de Influência Continental',
    category: 'ÁREAS DE ESTUDO',
    group: 'Áreas de Estudo',
    status: 'Concluído',
    sourceType: 'geojson',
    url: '/data/web_area_influencia_contiental.geojson',
    type: 'fill',
    paint: {
      'fill-color': '#e67e22',
      'fill-opacity': 0.2,
      'fill-outline-color': '#d35400'
    },
    popupFields: [
      { field: 'nome_rh', label: 'Região Hidrográfica' },
      { field: 'area_km', label: 'Área (km²)' }
    ]
  },
  {
    id: 'ae_mun_costeiros',
    name: 'Municípios da Zona Costeira',
    category: 'ÁREAS DE ESTUDO',
    group: 'Áreas de Estudo',
    status: 'Concluído',
    sourceType: 'geojson',
    url: '/data/web_municipios.geojson',
    filter: ['==', 'mun', 1],
    type: 'fill',
    paint: {
      'fill-color': '#1abc9c',
      'fill-opacity': 0.3,
      'fill-outline-color': '#16a085'
    },
    popupFields: [
      { field: 'municn', label: 'Município' },
      { field: 'reggov', label: 'Região de Governo' },
      { field: 'area_km2', label: 'Área (km²)' }
    ]
  },

  // ---------------------------------------------------------
  // BASES CARTOGRÁFICAS
  // ---------------------------------------------------------
  {
    id: 'bc_municipios',
    name: 'Municípios do RJ',
    category: 'BASES CARTOGRÁFICAS',
    group: 'Bases Cartográficas',
    status: 'Concluído',
    sourceType: 'geojson',
    url: '/data/web_municipios.geojson',
    type: 'line',
    paint: {
      'line-width': 1,
      'line-color': '#7f8c8d'
    },
    popupFields: [
      { field: 'municn', label: 'Município' },
      { field: 'reggov', label: 'Região de Governo' }
    ]
  },
  {
    id: 'bc_agua',
    name: 'Massa d’água',
    category: 'BASES CARTOGRÁFICAS',
    group: 'Bases Cartográficas',
    status: 'Concluído',
    sourceType: 'geojson',
    url: '/data/web_massa_dagua.geojson',
    type: 'fill',
    paint: {
      'fill-color': '#85c1e9',
      'fill-opacity': 0.6,
      'fill-outline-color': '#3498db'
    },
    popupFields: [
      { field: 'NOME', label: 'Nome' },
      { field: 'TIPOTRECHO', label: 'Tipo' },
      { field: 'SALINIDADE', label: 'Salinidade' }
    ]
  },
  {
    id: 'bc_mde',
    name: 'MDE (Modelo Digital de Elevação)',
    category: 'BASES CARTOGRÁFICAS',
    group: 'Bases Cartográficas',
    status: 'Preparado para configuração',
    sourceType: null,
    url: null,
    metadata: { description: 'Aguardando processamento XYZ/COG.' }
  }
];
