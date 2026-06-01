const whatsapp =
  "https://wa.me/5527999850434?text=Ol%C3%A1,%20quero%20conhecer%20a%20BenThec.";

const trailSteps = ["Entenda", "Assista", "Leia", "Pratique", "Revise", "Conclua"];

const areas = [
  {
    title: "Operacionais",
    desc: "Auxiliar de Serviços Gerais, Merendeira, Motorista e Operador de Máquinas.",
  },
  {
    title: "Saúde",
    desc: "Técnico em Enfermagem com saúde pública, fundamentos, procedimentos e ética.",
  },
  {
    title: "Magistério",
    desc: "Conhecimentos pedagógicos, Educação Infantil, Séries Iniciais, AEE e Sala de Recursos.",
  },
];

const method = [
  "Diagnóstico",
  "Planejamento",
  "Execução",
  "Revisão",
  "Acompanhamento",
  "Aprovação",
];

export default function HomePage() {
  return (
    <main className="page">
      <style>{`
        :root {
          --bg: #f8fafc;
          --card: #ffffff;
          --dark: #111827;
          --dark2: #1f2937;
          --muted: #667085;
          --line: #e5e7eb;
          --accent: #c58b00;
          --accent2: #946700;
          --green: #15803d;
        }

        * { box-sizing: border-box; }

        body {
          margin: 0;
          background: var(--bg);
          color: var(--dark);
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        a { color: inherit; text-decoration: none; }

        .page {
          min-height: 100vh;
          background:
            radial-gradient(circle at 8% 4%, rgba(197,139,0,.13), transparent 26%),
            radial-gradient(circle at 92% 14%, rgba(21,128,61,.08), transparent 24%),
            linear-gradient(180deg, #ffffff 0%, #f8fafc 48%, #eef2f7 100%);
        }

        .shell {
          width: min(1160px, calc(100% - 32px));
          margin: 0 auto;
        }

        .header {
          position: sticky;
          top: 0;
          z-index: 30;
          background: rgba(255,255,255,.88);
          backdrop-filter: blur(18px);
          border-bottom: 1px solid rgba(17,24,39,.08);
        }

        .nav {
          min-height: 76px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
          font-weight: 950;
          letter-spacing: -.04em;
        }

        .brandMark {
          width: 50px;
          height: 50px;
          border-radius: 18px;
          display: grid;
          place-items: center;
          background: var(--dark);
          color: #f5c542;
          box-shadow: 0 16px 34px rgba(17,24,39,.18);
          font-weight: 950;
        }

        .brandText {
          display: grid;
          gap: 2px;
        }

        .brandText small {
          color: var(--muted);
          font-weight: 700;
          letter-spacing: 0;
          font-size: 12px;
        }

        .menu {
          display: flex;
          align-items: center;
          gap: 22px;
          color: var(--muted);
          font-size: 14px;
          font-weight: 800;
        }

        .btn {
          min-height: 50px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0 22px;
          border-radius: 999px;
          font-weight: 950;
          border: 1px solid transparent;
          transition: transform .15s ease, box-shadow .15s ease, background .15s ease;
        }

        .btn:hover { transform: translateY(-1px); }

        .btnDark {
          background: var(--dark);
          color: #fff;
          box-shadow: 0 14px 34px rgba(17,24,39,.18);
        }

        .btnAccent {
          background: linear-gradient(135deg, var(--accent), var(--accent2));
          color: #fff;
          box-shadow: 0 18px 36px rgba(197,139,0,.24);
        }

        .btnLight {
          background: #fff;
          color: var(--dark);
          border-color: var(--line);
        }

        .hero {
          padding: 54px 0 66px;
          display: grid;
          grid-template-columns: .88fr 1.12fr;
          gap: 42px;
          align-items: center;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          min-height: 34px;
          padding: 0 14px;
          border-radius: 999px;
          background: rgba(197,139,0,.12);
          color: #7a5400;
          border: 1px solid rgba(197,139,0,.22);
          font-size: 12px;
          font-weight: 950;
          letter-spacing: .055em;
          text-transform: uppercase;
        }

        h1, h2, h3, p { margin-top: 0; }

        h1 {
          margin: 22px 0 18px;
          max-width: 610px;
          font-size: clamp(44px, 5.9vw, 72px);
          line-height: 1;
          letter-spacing: -.062em;
        }

        h2 {
          margin: 0 0 14px;
          font-size: clamp(32px, 4vw, 52px);
          line-height: 1.02;
          letter-spacing: -.05em;
        }

        h3 {
          margin: 0 0 9px;
          font-size: 20px;
          letter-spacing: -.025em;
        }

        p {
          color: var(--muted);
          line-height: 1.65;
        }

        .lead {
          max-width: 620px;
          color: #344054;
          font-size: 18px;
        }

        .actions {
          margin-top: 28px;
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }

        .trust {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-top: 22px;
        }

        .trust span {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          min-height: 34px;
          padding: 0 12px;
          border-radius: 999px;
          background: #fff;
          border: 1px solid var(--line);
          color: #475467;
          font-size: 13px;
          font-weight: 800;
        }

        .trust span::before {
          content: "";
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--green);
        }

        .appMock {
          border-radius: 38px;
          padding: 16px;
          background: linear-gradient(145deg, #111827, #202b3d);
          color: #fff;
          box-shadow: 0 34px 90px rgba(17,24,39,.25);
          border: 1px solid rgba(255,255,255,.1);
        }

        .mockTop {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 16px;
          padding: 10px 10px 18px;
        }

        .mockTop strong {
          display: block;
          font-size: 18px;
        }

        .mockTop span {
          display: block;
          margin-top: 4px;
          color: #cbd5e1;
          font-size: 13px;
        }

        .status {
          white-space: nowrap;
          padding: 9px 12px;
          border-radius: 999px;
          background: rgba(21,128,61,.18);
          color: #bbf7d0;
          font-size: 12px;
          font-weight: 950;
        }

        .mockBody {
          display: grid;
          grid-template-columns: 170px 1fr;
          gap: 14px;
        }

        .mockMenu {
          display: grid;
          gap: 8px;
          align-content: start;
          padding: 12px;
          border-radius: 24px;
          background: rgba(255,255,255,.06);
          border: 1px solid rgba(255,255,255,.08);
        }

        .mockMenu span {
          padding: 12px;
          border-radius: 15px;
          color: #d1d5db;
          font-size: 13px;
          font-weight: 850;
        }

        .mockMenu span.active {
          background: linear-gradient(135deg, var(--accent), var(--accent2));
          color: #fff;
        }

        .mockContent {
          display: grid;
          gap: 14px;
        }

        .lessonCard {
          background: #fff;
          color: var(--dark);
          border-radius: 26px;
          padding: 22px;
        }

        .lessonHead {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          margin-bottom: 16px;
        }

        .percent {
          width: 76px;
          height: 76px;
          border-radius: 24px;
          display: grid;
          place-items: center;
          background: var(--dark);
          color: #f5c542;
          font-size: 22px;
          font-weight: 950;
        }

        .stepList {
          display: grid;
          gap: 10px;
        }

        .stepList span {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          padding: 12px 14px;
          border-radius: 15px;
          background: #f3f4f6;
          color: #374151;
          font-size: 14px;
          font-weight: 850;
        }

        .stepList b { color: var(--green); }

        .miniGrid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 10px;
        }

        .mini {
          min-height: 72px;
          display: grid;
          place-items: center;
          text-align: center;
          padding: 12px;
          border-radius: 20px;
          background: rgba(255,255,255,.96);
          color: var(--dark);
          font-size: 13px;
          font-weight: 950;
        }

        section { padding: 72px 0; }

        .sectionHead {
          max-width: 780px;
          margin-bottom: 28px;
        }

        .flowGrid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 14px;
        }

        .flowCard, .card {
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 26px;
          box-shadow: 0 14px 34px rgba(17,24,39,.055);
        }

        .flowCard {
          padding: 20px;
          text-align: center;
          font-weight: 950;
        }

        .num {
          width: 42px;
          height: 42px;
          margin: 0 auto 12px;
          border-radius: 15px;
          display: grid;
          place-items: center;
          background: rgba(197,139,0,.12);
          color: var(--accent);
          font-weight: 950;
        }

        .areaGrid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .card {
          padding: 26px;
        }

        .cardIcon {
          width: 46px;
          height: 46px;
          margin-bottom: 16px;
          border-radius: 16px;
          display: grid;
          place-items: center;
          background: var(--dark);
          color: #f5c542;
          font-weight: 950;
        }

        .darkBand {
          border-radius: 38px;
          padding: 44px;
          background: linear-gradient(135deg, #111827, #1f2937);
          color: #fff;
          box-shadow: 0 34px 90px rgba(17,24,39,.22);
        }

        .darkBand p { color: #cbd5e1; }

        .methodGrid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 14px;
          margin-top: 28px;
        }

        .methodCard {
          padding: 18px;
          border-radius: 22px;
          background: rgba(255,255,255,.07);
          border: 1px solid rgba(255,255,255,.1);
          text-align: center;
        }

        .cta {
          text-align: center;
          border-radius: 38px;
          padding: 48px 28px;
          background:
            radial-gradient(circle at 20% 0%, rgba(197,139,0,.2), transparent 32%),
            linear-gradient(135deg, #111827, #1f2937);
          color: #fff;
          box-shadow: 0 34px 90px rgba(17,24,39,.22);
        }

        .cta p {
          color: #cbd5e1;
          max-width: 640px;
          margin: 0 auto;
        }

        .mobileBar { display: none; }

        @media (max-width: 980px) {
          body { padding-bottom: 88px; }

          .menu, .nav > .btn { display: none; }

          .hero {
            grid-template-columns: 1fr;
            padding: 34px 0 48px;
          }

          h1 {
            font-size: clamp(40px, 12vw, 60px);
            letter-spacing: -.055em;
          }

          .mockBody, .areaGrid, .flowGrid, .methodGrid {
            grid-template-columns: 1fr;
          }

          .mockMenu {
            grid-template-columns: repeat(2, 1fr);
          }

          .miniGrid {
            grid-template-columns: repeat(2, 1fr);
          }

          .lessonHead {
            align-items: flex-start;
          }

          .appMock {
            border-radius: 30px;
            padding: 12px;
          }

          .darkBand, .cta {
            border-radius: 30px;
            padding: 28px;
          }

          .btn {
            width: 100%;
          }

          .mobileBar {
            position: fixed;
            left: 12px;
            right: 12px;
            bottom: 12px;
            z-index: 80;
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 8px;
            padding: 10px;
            border-radius: 24px;
            background: rgba(17,24,39,.94);
            backdrop-filter: blur(18px);
            box-shadow: 0 20px 54px rgba(17,24,39,.32);
          }

          .mobileBar a {
            min-height: 48px;
            display: grid;
            place-items: center;
            border-radius: 16px;
            color: #d1d5db;
            font-size: 12px;
            font-weight: 950;
          }

          .mobileBar a:first-child {
            background: linear-gradient(135deg, var(--accent), var(--accent2));
            color: #fff;
          }
        }
      `}</style>

      <header className="header">
        <div className="shell nav">
          <a className="brand" href="#top">
            <span className="brandMark">BT</span>
            <span className="brandText">
              <span>BenThec</span>
              <small>Preparação acompanhada</small>
            </span>
          </a>

          <nav className="menu">
            <a href="#trilhas">Trilhas</a>
            <a href="#agua-doce">Aprova Água Doce</a>
            <a href="#metodo">Método</a>
            <a href="#contato">Contato</a>
          </nav>

          <a className="btn btnDark" href={whatsapp} target="_blank" rel="noreferrer">
            Falar com a equipe
          </a>
        </div>
      </header>

      <div className="shell hero" id="top">
        <div>
          <span className="badge">Plataforma de preparação acompanhada</span>
          <h1>Sua aprovação começa com direção.</h1>
          <p className="lead">
            A BenThec organiza sua preparação com trilhas de aprendizagem,
            acompanhamento próximo, questões, revisões e recursos inteligentes
            para transformar esforço em aprovação.
          </p>

          <div className="actions">
            <a className="btn btnAccent" href={whatsapp} target="_blank" rel="noreferrer">
              Quero organizar meus estudos
            </a>
            <a className="btn btnLight" href="#trilhas">
              Conhecer a plataforma
            </a>
          </div>

          <div className="trust">
            <span>Aprova Água Doce</span>
            <span>Trilhas guiadas</span>
            <span>Mobile-first</span>
          </div>
        </div>

        <div className="appMock">
          <div className="mockTop">
            <div>
              <strong>Continue sua trilha</strong>
              <span>Aprova Água Doce · Português</span>
            </div>
            <div className="status">Acompanhamento ativo</div>
          </div>

          <div className="mockBody">
            <aside className="mockMenu">
              <span className="active">Meu Plano</span>
              <span>Minhas Trilhas</span>
              <span>Questões</span>
              <span>Simulados</span>
              <span>Atendimento</span>
            </aside>

            <div className="mockContent">
              <article className="lessonCard">
                <div className="lessonHead">
                  <div>
                    <h3>Português</h3>
                    <p>Etapa 3 de 6 · Pratique com questões</p>
                  </div>
                  <strong className="percent">42%</strong>
                </div>

                <div className="stepList">
                  <span>Entenda <b>feito</b></span>
                  <span>Assista <b>feito</b></span>
                  <span>Leia <b>feito</b></span>
                  <span>Pratique <b>agora</b></span>
                  <span>Revise <b>próximo</b></span>
                </div>
              </article>

              <div className="miniGrid">
                <div className="mini">Plano</div>
                <div className="mini">Trilhas</div>
                <div className="mini">Questões</div>
                <div className="mini">Simulados</div>
                <div className="mini">Suporte</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section id="trilhas">
        <div className="shell">
          <div className="sectionHead">
            <span className="badge">Trilhas de Aprendizagem</span>
            <h2>Menos excesso de conteúdo. Mais próximo passo.</h2>
            <p>
              O aluno não precisa escolher entre dezenas de aulas soltas. Cada
              conteúdo vira uma jornada curta, guiada e acompanhada.
            </p>
          </div>

          <div className="flowGrid">
            {trailSteps.map((step, index) => (
              <article className="flowCard" key={step}>
                <div className="num">{index + 1}</div>
                {step}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="agua-doce">
        <div className="shell">
          <div className="sectionHead">
            <span className="badge">Produto principal</span>
            <h2>Aprova Água Doce</h2>
            <p>
              Um produto organizado por áreas, cargos e trilhas específicas,
              começando pelos conteúdos mais estratégicos do edital.
            </p>
          </div>

          <div className="areaGrid">
            {areas.map((area, index) => (
              <article className="card" key={area.title}>
                <div className="cardIcon">{index + 1}</div>
                <h3>{area.title}</h3>
                <p>{area.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="metodo">
        <div className="shell">
          <div className="darkBand">
            <span className="badge">Método BenThec</span>
            <h2>Método, acompanhamento e tecnologia para sua aprovação.</h2>
            <p>
              A tecnologia organiza a jornada. O acompanhamento mantém direção.
              A trilha transforma conteúdo em rotina de estudo.
            </p>

            <div className="methodGrid">
              {method.map((item, index) => (
                <article className="methodCard" key={item}>
                  <div className="num">{index + 1}</div>
                  <strong>{item}</strong>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contato">
        <div className="shell">
          <div className="cta">
            <span className="badge">Próximo passo</span>
            <h2>Comece sua preparação com mais direção.</h2>
            <p>
              Fale com a equipe e entenda como a BenThec pode organizar sua
              rotina de estudos para o Aprova Água Doce.
            </p>

            <div className="actions" style={{ justifyContent: "center" }}>
              <a className="btn btnAccent" href={whatsapp} target="_blank" rel="noreferrer">
                Falar com a equipe
              </a>
            </div>
          </div>
        </div>
      </section>

      <nav className="mobileBar">
        <a href="#top">Início</a>
        <a href="#trilhas">Trilhas</a>
        <a href="#agua-doce">Cursos</a>
        <a href={whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
      </nav>
    </main>
  );
}
