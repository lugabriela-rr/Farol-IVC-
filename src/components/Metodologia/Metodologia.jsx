import React from 'react';
import { Instagram, Mail } from 'lucide-react';

const Variable = ({ title, children }) => (
  <section className="metodologia-variable">
    <h3>{title}</h3>
    {children}
  </section>
);

const Metodologia = () => (
  <div className="metodologia">
    <article className="metodologia-card">
      <header className="metodologia-header">
        <img src="/assets/logo_sem_fundo_ivc.png" alt="Farol IVC" />
        <h1>Metodologia — Projeto Farol IVC</h1>
      </header>

      <section className="metodologia-section">
        <p>
          O <strong>Projeto Farol IVC</strong> — Índice de Vulnerabilidade Costeira para avaliação dos impactos das
          mudanças climáticas no litoral do estado do Rio de Janeiro — é desenvolvido no LAGEF-UFF e financiado pelo
          CNPq (Chamada CNPq/MCTI/FNDCT nº 59/2022). Sua justificativa está em dois processos já em curso: a elevação
          do nível médio do mar, de cerca de 0,20 m entre 1901 e 2018, com taxas entre 1,3 e 5,1 mm/ano registradas na
          rede maregráfica brasileira, e o aumento da altura das ondas de tempestade associadas a ciclones
          extratropicais (IPCC, 2023; IBGE, 2021; Eguchi e Klumb-Oliveira, 2023). Esses processos atingem de forma
          desigual um litoral de cerca de 1.580 km, formado por praias, costões rochosos, manguezais, lagoas e
          restingas, parte protegida por Unidades de Conservação e parte fragmentada pela expansão urbana. O objetivo
          do projeto é construir um índice, em ambiente SIG, que identifique os setores do litoral fluminense mais
          vulneráveis à erosão, ao impacto de ondas e à inundação, combinando uma componente biofísica e outra
          socioeconômica para subsidiar o planejamento e a gestão costeira.
        </p>
      </section>

      <section className="metodologia-section">
        <h2>Recortes espaciais</h2>
        <p>
          O índice parte da delimitação do Sistema Costeiro proposta por Barragán e Andrés (2015) e adaptada ao Rio de
          Janeiro por Rocha et al. (2024), que separa a <strong>Costa de Baixa Altitude (CBA)</strong>, a{' '}
          <strong>Zona Costeira</strong> legal e a <strong>Área de Influência Continental</strong> (Regiões
          Hidrográficas). As variáveis da orla são calculadas na faixa terrestre de 200 m a partir da linha de costa,
          critério do Projeto Orla. A CBA, delimitada pela cota de 10 m da base do IBGE (1:25.000), concentra
          manguezais, restingas, lagoas, dunas e praias e ocupa 6.881,75 km², 15,73% do estado. Para a componente
          social, a CBA foi cruzada com os setores censitários do IBGE (2022) e ajustada manualmente para evitar
          vazios e fragmentações, formando a <strong>CBA Social</strong>: 18.724 setores em 34 municípios e 12.406,99
          km², 28,35% do estado.
        </p>
      </section>

      <section className="metodologia-section">
        <h2>Componente biofísica</h2>

        <Variable title="Tipologia de paisagem da linha de costa">
          <p>
            A linha de costa do INEA (1:25.000) foi classificada por interpretação visual de imagens de alta resolução
            em quatro tipologias: praia arenosa, costão rochoso, manguezal e tecnógeno (aterros, portos, píers,
            espigões, muros e enrocamentos). Dos cerca de 1.540 km mapeados, 45,5% são praias arenosas, 35% costões
            rochosos, 10,4% setores tecnógenos e 9% manguezais (Rezende et al., 2026). O teste com a Coleção 2 Beta do
            MapBiomas (10 m) mostrou correspondência alta para tecnógeno (75,10%) e manguezal (72,02%), intermediária
            para praia (61,35%) e quase nula para costão rochoso (0,14%); o produto serve de apoio, mas não substitui o
            mapeamento manual.
          </p>
        </Variable>

        <Variable title="Grau de exposição à ação das ondas">
          <p>
            Os segmentos da linha de costa foram vetorizados em três classes, segundo o Projeto Orla: abrigada (fundos
            de baía ou protegida por cabos, promontórios e ilhas), semi-exposta (transição entre baías e oceano) e
            exposta (sem obstáculo às ondas oceânicas) (Rocha et al., 2026). A proporção de orla exposta cresce da RH I
            para a RH IX, acompanhando o afastamento da Serra do Mar da linha de costa. O setor de orientação L-W, entre
            a Ilha do Cabo Frio e o Sul Fluminense, é o mais exposto às ondas de tempestade vindas de sul.
          </p>
        </Variable>

        <Variable title="Dinâmica da linha de costa">
          <p>
            A linha de costa foi extraída automaticamente de imagens Landsat de 1985 a 2024, no Google Earth Engine,
            com filtro de nuvens e um filtro de maré baseado no SisBaHiA, para comparar apenas cenas em condições de
            maré equivalentes (Simões et al., 2025). A água foi classificada pelo MNDWI com limiar Multi-Otsu, e as
            linhas resultantes foram analisadas no DSAS v6.0 pela taxa de regressão linear (LRR), classificada segundo
            Luijendijk et al. (2018). Nos 2.681 transectos predominou a estabilidade (67,93% nas praias arenosas, que
            têm cerca de 18% em erosão), com acreção expressiva nos manguezais (26,75%), sobretudo na Baía de Sepetiba.
          </p>
        </Variable>

        <Variable title="Urbanização da orla">
          <p>
            Corresponde ao percentual da faixa de 200 m ocupado pela classe “área urbanizada” da Coleção 2 Beta do
            MapBiomas (2023, 10 m). Cerca de 18% da orla fluminense é urbanizada, com máximo na RH V – Baía de
            Guanabara (41,54%), seguida das RH VIII (31,34%) e VI (23,9%) (Rocha et al., 2026). A variável indica onde
            há edificações expostas e onde a infraestrutura impede a migração de praias e manguezais para o continente
            (<em>coastal squeeze</em>).
          </p>
        </Variable>

        <Variable title="Áreas protegidas">
          <p>
            Corresponde ao percentual da orla inserido em Unidades de Conservação de Proteção Integral e de Uso
            Sustentável, a partir das bases estaduais e municipais do INEA (1:20.000) e federais do ICMBio (1:25.000).
            Entra no índice como fator atenuante, porque restringe a ocupação e preserva espaço para a adaptação dos
            ecossistemas. No estado, 42,53% da orla está em UCs, com destaque para a RH VI (64,64%) e a RH I (47,31%)
            (Rocha et al., 2026).
          </p>
        </Variable>
      </section>

      <section className="metodologia-section">
        <h2>Componente social</h2>

        <Variable title="Indicadores socioeconômicos">
          <p>
            Os indicadores foram selecionados a partir de 16 artigos sobre índices de vulnerabilidade, que somaram 180
            parâmetros; renda (17,9%) e infraestrutura pública (16,0%) foram os temas mais frequentes. Esses parâmetros
            foram agrupados e compatibilizados com o Censo Demográfico 2022 do IBGE, por setor censitário da CBA
            Social, resultando em 16 parâmetros e 24 indicadores, entre eles rendimento do responsável pelo domicílio,
            densidade demográfica, população rural, condições de moradia e saneamento, população dependente, gênero,
            alfabetização e PIB. A renda per capita não está disponível no Censo 2022 e o PIB aguarda atualização;
            normalização, ponderação e agregação são as próximas etapas.
          </p>
        </Variable>
      </section>

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
