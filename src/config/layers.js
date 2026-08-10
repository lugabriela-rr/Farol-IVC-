export const layersConfig = [
  {
    id: 'ivc_geral',
    name: 'IVC Geral',
    category: 'ÍNDICE DE VULNERABILIDADE COSTEIRA',
    group: 'Índices',
    status: 'Em desenvolvimento',
    sourceType: null,
    url: null
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
        'Praia Arenosa', '#f2d64b',
        'Costão Rochoso', '#7b4ab8',
        'Mangue', '#2f9e63',
        'Tecnógeno', '#d64c4c',
        '#b8bec8'
      ]
    },
    legend: [
      { label: 'Praia Arenosa', color: '#f2d64b' },
      { label: 'Costão Rochoso', color: '#7b4ab8' },
      { label: 'Mangue', color: '#2f9e63' },
      { label: 'Tecnógeno', color: '#d64c4c' }
    ],
    popupFields: [
      { field: 'tipo_legen', label: 'Tipologia' },
      { field: 'km', label: 'Extensão (km)', decimals: 2 }
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
        'step',
        ['get', 'I_Ond_norm'],
        '#159c6b',
        0.18, '#a8cf45',
        0.43, '#f1d447',
        0.59, '#f39b2f',
        0.76, '#e43d30'
      ]
    },
    legend: [
      { label: '0,08 – 0,17', color: '#159c6b' },
      { label: '0,18 – 0,42', color: '#a8cf45' },
      { label: '0,43 – 0,58', color: '#f1d447' },
      { label: '0,59 – 0,75', color: '#f39b2f' },
      { label: '0,76 – 1,00', color: '#e43d30' }
    ],
    popupFields: [
      { field: 'I_Ond_norm', label: 'Índice normalizado', decimals: 2 },
      { field: 'Ind_Ondas', label: 'Indicador de ondas', decimals: 2 },
      { field: 'classe_exp', label: 'Classe de exposição' }
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
        '#7a2e12',
        -3, '#e53935',
        -1, '#f39c12',
        -0.5, '#d7ef36',
        0.5, '#42c92f'
      ],
      'fill-opacity': 0.82,
      'fill-outline-color': 'rgba(0,0,0,0.12)'
    },
    legend: [
      { label: 'Erosão extrema (< -3 m/ano)', color: '#7a2e12' },
      { label: 'Erosão severa (-3 a -1)', color: '#e53935' },
      { label: 'Erosão (-1 a -0,5)', color: '#f39c12' },
      { label: 'Estabilidade (-0,5 a +0,5)', color: '#d7ef36' },
      { label: 'Acreção (> +0,5)', color: '#42c92f' }
    ],
    popupFields: [
      { field: 'TransectId', label: 'Transecto' },
      { field: 'LRR', label: 'LRR (m/ano)', decimals: 2 },
      { field: 'tipo_legen', label: 'Tipologia' },
      { field: 'LR2', label: 'R²', decimals: 2 },
      { field: 'LCI', label: 'Intervalo de confiança', decimals: 2 }
    ]
  },
  {
    id: 'var_social_placeholder',
    name: 'Dados em desenvolvimento',
    category: 'VARIÁVEIS',
    group: 'Sociais',
    status: 'Em desenvolvimento',
    sourceType: null,
    url: null
  },

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
      'fill-color': '#4b91c7',
      'fill-opacity': 0.14,
      'fill-outline-color': '#2b6e9e'
    },
    legend: [{ label: 'Regiões Hidrográficas', color: '#4b91c7' }],
    popupFields: [
      { field: 'rh', label: 'Código' },
      { field: 'nome_rh', label: 'Região Hidrográfica' },
      { field: 'areakm2', label: 'Área (km²)', decimals: 1 }
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
      'fill-color': '#42b883',
      'fill-opacity': 0.19,
      'fill-outline-color': '#238861'
    },
    legend: [{ label: 'CBA Biofísica', color: '#42b883' }],
    popupFields: [
      { field: 'Classe', label: 'Classe' },
      { field: 'Area_km2', label: 'Área (km²)', decimals: 1 }
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
      'fill-color': '#e3bd35',
      'fill-opacity': 0.2,
      'fill-outline-color': '#b99312'
    },
    legend: [{ label: 'CBA Social', color: '#e3bd35' }],
    popupFields: [{ field: 'areakm2', label: 'Área (km²)', decimals: 1 }]
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
      'fill-color': '#8f63c6',
      'fill-opacity': 0.12,
      'fill-outline-color': '#7447ad'
    },
    legend: [{ label: 'Zona Costeira', color: '#8f63c6' }],
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
      'fill-color': '#d98b48',
      'fill-opacity': 0.15,
      'fill-outline-color': '#ac6427'
    },
    legend: [{ label: 'Área de Influência Continental', color: '#d98b48' }],
    popupFields: [
      { field: 'rh', label: 'Código da RH' },
      { field: 'nome_rh', label: 'Região Hidrográfica' },
      { field: 'area_km', label: 'Área (km²)', decimals: 1 }
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
    filter: ['==', 'mun_zc', 1],
    type: 'fill',
    paint: {
      'fill-color': '#35b9a4',
      'fill-opacity': 0.18,
      'fill-outline-color': '#148a79'
    },
    legend: [{ label: 'Municípios da Zona Costeira', color: '#35b9a4' }],
    popupFields: [
      { field: 'municn', label: 'Município' },
      { field: 'reggov', label: 'Região de Governo' },
      { field: 'area_km2', label: 'Área (km²)', decimals: 1 }
    ]
  },

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
      'line-color': '#6f7884',
      'line-opacity': 0.72
    },
    legend: [{ label: 'Limites municipais', color: '#6f7884' }],
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
      'fill-color': '#70b6dc',
      'fill-opacity': 0.48,
      'fill-outline-color': '#3b8db9'
    },
    legend: [{ label: 'Massa d’água', color: '#70b6dc' }],
    popupFields: [
      { field: 'NOME', label: 'Nome' },
      { field: 'TIPOTRECHO', label: 'Tipo' },
      { field: 'SALINIDADE', label: 'Salinidade' },
      { field: 'REGIME', label: 'Regime' }
    ]
  },
  {
    id: 'bc_mde',
    name: 'MDE (Modelo Digital de Elevação)',
    category: 'BASES CARTOGRÁFICAS',
    group: 'Bases Cartográficas',
    status: 'Em preparação para web',
    sourceType: null,
    url: null
  }
];
