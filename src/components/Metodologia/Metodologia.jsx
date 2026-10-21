import React from 'react';
import { Instagram, Mail } from 'lucide-react';

// Conteúdo da página. Para atualizar o texto oficial, edite apenas este array:
// cada seção tem um título e uma lista de parágrafos.
const sections = [
  {
    title: 'O Projeto Farol IVC',
    paragraphs: [
      'O Farol IVC é um geoportal dedicado ao Índice de Vulnerabilidade Costeira (IVC) da Zona Costeira do Estado do Rio de Janeiro. O objetivo é reunir, organizar e disponibilizar em ambiente web as informações espaciais utilizadas na avaliação da vulnerabilidade do litoral fluminense, apoiando a gestão costeira, o planejamento territorial e a pesquisa científica.'
    ]
  },
  {
    title: 'Índice de Vulnerabilidade Costeira',
    paragraphs: [
      'O IVC integra variáveis de natureza biofísica e social em um índice síntese. O Componente Biofísico expressa a suscetibilidade física da linha de costa aos processos costeiros, enquanto o Componente Social expressa a capacidade da população e do território de enfrentar e se recuperar desses processos.',
      'Cada variável é classificada em uma escala comum, o que permite combiná-las e comparar diferentes trechos do litoral.'
    ]
  },
  {
    title: 'Variáveis Biofísicas',
    paragraphs: [
      'Tipologia da Linha de Costa: classificação do litoral em praias arenosas, costões rochosos, manguezais e estruturas tecnógenas.',
      'Exposição às Ondas: grau de exposição de cada trecho da costa à energia das ondas, representado em cinco classes.',
      'Dinâmica / Erosão da Linha de Costa: taxa de variação da posição da linha de costa (LRR, em m/ano), indicando trechos em erosão, estáveis ou em acreção.'
    ]
  },
  {
    title: 'Áreas de Estudo',
    paragraphs: [
      'As análises são organizadas sobre recortes territoriais que incluem as Regiões Hidrográficas, as Células de Base de Análise (CBA) biofísica e social, a Zona Costeira, a Área de Influência Continental e os Municípios da Zona Costeira.'
    ]
  },
  {
    title: 'Como usar o geoportal',
    paragraphs: [
      'Análise Geral: ative e combine camadas, pesquise municípios e consulte os atributos clicando sobre as feições do mapa.',
      'Construtor de Mapas: escolha um município da Zona Costeira, defina um título, selecione e ordene as variáveis e exporte o resultado em PNG, com legenda, seta norte e escala.',
      'Metodologia: esta página, com a descrição do projeto e dos dados.'
    ]
  }
];

const Metodologia = () => (
  <div className="metodologia">
    <article className="metodologia-card">
      <header className="metodologia-header">
        <img src="/assets/logo_sem_fundo_ivc.png" alt="Farol IVC" />
        <div>
          <h1>Metodologia</h1>
          <p>Índice de Vulnerabilidade Costeira do Estado do Rio de Janeiro</p>
        </div>
      </header>

      {sections.map((section) => (
        <section key={section.title} className="metodologia-section">
          <h2>{section.title}</h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </section>
      ))}

      <footer className="metodologia-footer">
        <div className="metodologia-partners">
          <img src="/assets/Logo_UFF_(blue).svg.png" alt="UFF" />
          <img src="/assets/lagef_sem_fundo.png" alt="LAGEF" />
          <img src="/assets/gida_sem_fundo.png" alt="GIDA" />
          <img src="/assets/cnpq-logo-7.png" alt="CNPq" />
        </div>
        <div className="metodologia-contacts">
          <a href="https://www.instagram.com/projeto.farol.ivc/" target="_blank" rel="noopener noreferrer" className="contact-link">
            <Instagram size={15} strokeWidth={1.7} />
            <span>@projeto.farol.ivc</span>
          </a>
          <a href="mailto:farol.ivc.uff@gmail.com" className="contact-link">
            <Mail size={15} strokeWidth={1.7} />
            <span>farol.ivc.uff@gmail.com</span>
          </a>
        </div>
      </footer>
    </article>
  </div>
);

export default Metodologia;
