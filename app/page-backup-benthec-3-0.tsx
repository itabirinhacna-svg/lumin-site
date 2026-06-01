const whatsapp =
  "https://wa.me/5527999850434?text=Ol%C3%A1,%20quero%20conhecer%20a%20BenThec.";

export default function HomePage() {
  return (
    <main className="page">
      <style>{`
        :root {
          --bg:#f8fafc;
          --card:#ffffff;
          --dark:#111827;
          --muted:#6b7280;
          --accent:#c58b00;
          --green:#15803d;
          --line:#e5e7eb;
        }

        * { box-sizing: border-box; }

        body {
          margin: 0;
          background: var(--bg);
          color: var(--dark);
          font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        .page {
          min-height: 100vh;
          background:
            radial-gradient(circle at top left, rgba(197,139,0,.12), transparent 32%),
            linear-gradient(180deg, #fff 0%, #f8fafc 45%, #eef2f7 100%);
        }

        .shell {
          width: min(1120px, calc(100% - 32px));
          margin: 0 auto;
        }

        header {
          position: sticky;
          top: 0;
          z-index: 20;
          background: rgba(255,255,255,.86);
          backdrop-filter: blur(18px);
          border-bottom: 1px solid var(--line);
        }

        .nav {
          height: 76px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
          font-weight: 900;
          letter-spacing: -.03em;
        }

        .logo {
          width: 48px;
          height: 48px;
          border-radius: 16px;
          display: grid;
          place-items: center;
          background: var(--dark);
          color: var(--accent);
          font-weight: 900;
          box-shadow: 0 14px 30px rgba(17,24,39,.18);
        }

        .menu {
          display: flex;
          gap: 22px;
          color: var(--muted);
          font-weight: 700;
          font-size: 14px;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 48px;
          padding: 0 20px;
          border-radius: 999px;
          font-weight: 900;
          border: 1px solid transparent;
        }

        .btn-primary {
          background: var(--accent);
          color: #fff;
          box-shadow: 0 16px 30px rgba(197,139,0,.24);
        }

        .btn-dark {
          background: var(--dark);
          color: #fff;
        }

        .btn-light {
          background: #fff;
          border-color: var(--line);
        }

        .hero {
          padding: 48px 0 56px;
          display: grid;
          grid-template-columns: .95fr 1.05fr;
          gap: 42px;
          align-items: center;
        }

        .badge {
          display: inline-flex;
          padding: 9px 14px;
          border-radius: 999px;
          background: rgba(197,139,0,.12);
          color: #7a5400;
          font-size: 12px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: .06em;
          border: 1px solid rgba(197,139,0,.2);
        }

        h1 {
          margin: 22px 0 18px;
          font-size: clamp(42px, 5.8vw, 68px);
          line-height: 1.02;
          letter-spacing: -.055em;
        }

        h2 {
          margin: 0 0 14px;
          font-size: clamp(30px, 4vw, 52px);
          line-height: 1;
          letter-spacing: -.045em;
        }

        h3 {
          margin: 0 0 8px;
          font-size: 20px;
        }

        p {
          color: var(--muted);
          line-height: 1.65;
          margin: 0;
        }

        .lead {
          max-width: 620px;
          font-size: 18px;
          color: #374151;
        }

        .actions {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          margin-top: 28px;
        }

        .dashboard {
          background: linear-gradient(145deg, #111827, #1f2937);
          border-radius: 34px;
          padding: 18px;
          color: #fff;
          box-shadow: 0 30px 80px rgba(17,24,39,.22);
          border: 1px solid rgba(255,255,255,.08);
        }

        .dash-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 16px;
          padding: 8px 8px 16px;
        }

        .dash-top strong {
          display: block;
          font-size: 18px;
        }

        .dash-top span {
          color: #cbd5e1;
          font-size: 13px;
        }

        .status {
          background: rgba(21,128,61,.18);
          color: #bbf7d0;
          padding: 8px 12px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 900;
          white-space: nowrap;
        }

        .dash-grid {
          display: grid;
          grid-template-columns: 170px 1fr;
          gap: 14px;
        }

        .side {
          background: rgba(255,255,255,.06);
          border: 1px solid rgba(255,255,255,.08);
          border-radius: 22px;
          padding: 12px;
          display: grid;
          gap: 8px;
          align-content: start;
        }

        .side span {
          padding: 12px;
          border-radius: 14px;
          font-size: 13px;
          color: #d1d5db;
          font-weight: 800;
        }

        .side span:first-child {
          background: var(--accent);
          color: #fff;
        }

        .panel {
          display: grid;
          gap: 14px;
        }

        .card {
          background: var(--card);
          border: 1px solid var(--line);
          border-radius: 24px;
          padding: 24px;
          box-shadow: 0 14px 34px rgba(17,24,39,.06);
        }

        .dash-card {
          color: var(--dark);
          background: #fff;
          border-radius: 22px;
          padding: 20px;
        }

        .progress-row {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          align-items: center;
          margin-bottom: 16px;
        }

        .percent {
          width: 74px;
          height: 74px;
          border-radius: 22px;
          display: grid;
          place-items: center;
          background: var(--dark);
          color: var(--accent);
          font-weight: 900;
          font-size: 22px;
        }

        .steps {
          display: grid;
          gap: 10px;
        }

        .steps span {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          padding: 12px 14px;
          border-radius: 14px;
          background: #f3f4f6;
          color: #374151;
          font-weight: 800;
          font-size: 14px;
        }

        .steps b {
          color: var(--green);
        }

        .mini-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 12px;
        }

        .mini {
          background: #fff;
          color: var(--dark);
          border-radius: 18px;
          padding: 16px;
          font-weight: 900;
          font-size: 13px;
          text-align: center;
        }

        section {
          padding: 68px 0;
        }

        .section-head {
          max-width: 760px;
          margin-bottom: 28px;
        }

        .grid-3 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .grid-6 {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 14px;
        }

        .flow-card {
          background: #fff;
          border-radius: 22px;
          padding: 20px;
          border: 1px solid var(--line);
          text-align: center;
          font-weight: 900;
        }

        .num {
          width: 40px;
          height: 40px;
          margin: 0 auto 12px;
          display: grid;
          place-items: center;
          border-radius: 14px;
          background: rgba(197,139,0,.12);
          color: var(--accent);
          font-weight: 900;
        }

        .dark-band {
          background: var(--dark);
          color: #fff;
          border-radius: 34px;
          padding: 42px;
          box-shadow: 0 30px 80px rgba(17,24,39,.18);
        }

        .dark-band p {
          color: #cbd5e1;
        }

        .method {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 14px;
          margin-top: 28px;
        }

        .method-card {
          background: rgba(255,255,255,.07);
          border: 1px solid rgba(255,255,255,.1);
          border-radius: 20px;
          padding: 18px;
        }

        .cta {
          text-align: center;
          background: linear-gradient(135deg, #111827, #1f2937);
          color: #fff;
          border-radius: 34px;
          padding: 46px 28px;
        }

        .mobile-bar {
          display: none;
        }

        @media (max-width: 900px) {
          body { padding-bottom: 84px; }

          .menu, .nav .btn { display: none; }

          .hero, .dash-grid, .grid-3, .grid-6, .method {
            grid-template-columns: 1fr;
          }

          .hero {
            padding-top: 34px;
          }

          .mini-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .dashboard {
            border-radius: 28px;
          }

          .side {
            grid-template-columns: repeat(2, 1fr);
          }

          h1 {
            font-size: clamp(42px, 13vw, 64px);
          }

          .btn {
            width: 100%;
          }

          .mobile-bar {
            position: fixed;
            left: 12px;
            right: 12px;
            bottom: 12px;
            z-index: 50;
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 8px;
            background: rgba(17,24,39,.94);
            backdrop-filter: blur(18px);
            padding: 10px;
            border-radius: 24px;
            box-shadow: 0 18px 50px rgba(17,24,39,.3);
          }

          .mobile-bar a {
            min-height: 48px;
            border-radius: 16px;
            display: grid;
            place-items: center;
            color: #d1d5db;
            font-size: 12px;
            font-weight: 900;
          }

          .mobile-bar a:first-child {
            background: var(--accent);
            color: #fff;
          }
        }
      `}</style>

      <header>
        <div className="shell nav">
          <a className="brand" href="#top">
            <span className="logo">BT</span>
            <span>BenThec</span>
          </a>

          <nav className="menu">
            <a href="#trilhas">Trilhas</a>
            <a href="#agua-doce">Aprova Ãgua Doce</a>
            <a href="#metodo">MÃ©todo</a>
            <a href="#contato">Contato</a>
          </nav>

          <a className="btn btn-dark" href={whatsapp} target="_blank">
            Falar com a equipe
          </a>
        </div>
      </header>

      <div className="shell hero" id="top">
        <div>
          <span className="badge">Plataforma de preparaÃ§Ã£o acompanhada</span>
          <h1>VocÃª nÃ£o precisa estudar sozinho.</h1>
          <p className="lead">
            A BenThec organiza sua preparaÃ§Ã£o com plano de estudos,
            acompanhamento prÃ³ximo, trilhas de aprendizagem e recursos
            inteligentes para transformar esforÃ§o em aprovaÃ§Ã£o.
          </p>

          <div className="actions">
            <a className="btn btn-primary" href={whatsapp} target="_blank">
              Quero organizar meus estudos
            </a>
            <a className="btn btn-light" href="#trilhas">
              Conhecer a plataforma
            </a>
          </div>
        </div>

        <div className="dashboard">
          <div className="dash-top">
            <div>
              <strong>Continue sua trilha</strong>
              <span>Aprova Ãgua Doce Â· PortuguÃªs</span>
            </div>
            <span className="status">Acompanhamento ativo</span>
          </div>

          <div className="dash-grid">
            <aside className="side">
              <span>Meu Plano</span>
              <span>Minhas Trilhas</span>
              <span>Banco de QuestÃµes</span>
              <span>Simulados</span>
              <span>Atendimento</span>
            </aside>

            <div className="panel">
              <article className="dash-card">
                <div className="progress-row">
                  <div>
                    <h3>PortuguÃªs</h3>
                    <p>Etapa 3 de 6 Â· Pratique com questÃµes</p>
                  </div>
                  <strong className="percent">42%</strong>
                </div>

                <div className="steps">
                  <span>Entenda <b>feito</b></span>
                  <span>Assista <b>feito</b></span>
                  <span>Leia <b>feito</b></span>
                  <span>Pratique <b>agora</b></span>
                  <span>Revise <b>prÃ³ximo</b></span>
                </div>
              </article>

              <div className="mini-grid">
                <div className="mini">Meu Plano</div>
                <div className="mini">Trilhas</div>
                <div className="mini">QuestÃµes</div>
                <div className="mini">Simulados</div>
                <div className="mini">Atendimento</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section id="trilhas">
        <div className="shell">
          <div className="section-head">
            <span className="badge">Trilhas de Aprendizagem</span>
            <h2>O aluno sempre sabe qual Ã© o prÃ³ximo passo.</h2>
            <p>
              As videoaulas entram como parte da trilha. A BenThec organiza o
              caminho completo: entendimento, aula, leitura, prÃ¡tica, revisÃ£o e
              conclusÃ£o.
            </p>
          </div>

          <div className="grid-6">
            {["Entenda", "Assista", "Leia", "Pratique", "Revise", "Conclua"].map(
              (item, index) => (
                <div className="flow-card" key={item}>
                  <div className="num">{index + 1}</div>
                  {item}
                </div>
              )
            )}
          </div>
        </div>
      </section>

      <section id="agua-doce">
        <div className="shell">
          <div className="section-head">
            <span className="badge">Produto principal</span>
            <h2>Aprova Ãgua Doce</h2>
            <p>
              PreparaÃ§Ã£o organizada para cargos operacionais, saÃºde e
              magistÃ©rio, com trilhas especÃ­ficas por objetivo.
            </p>
          </div>

          <div className="grid-3">
            <article className="card">
              <h3>Operacionais</h3>
              <p>
                Auxiliar de ServiÃ§os Gerais, Merendeira, Motorista e Operador
                de MÃ¡quinas.
              </p>
            </article>

            <article className="card">
              <h3>SaÃºde</h3>
              <p>
                TÃ©cnico em Enfermagem com saÃºde pÃºblica, fundamentos,
                procedimentos e Ã©tica.
              </p>
            </article>

            <article className="card">
              <h3>MagistÃ©rio</h3>
              <p>
                Conhecimentos pedagÃ³gicos, EducaÃ§Ã£o Infantil, SÃ©ries Iniciais,
                AEE e Sala de Recursos.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section id="metodo">
        <div className="shell">
          <div className="dark-band">
            <span className="badge">MÃ©todo BenThec</span>
            <h2>MÃ©todo, acompanhamento e tecnologia para sua aprovaÃ§Ã£o.</h2>
            <p>
              A tecnologia organiza a jornada. O acompanhamento mantÃ©m direÃ§Ã£o.
              A trilha transforma conteÃºdo em rotina de estudo.
            </p>

            <div className="method">
              {[
                "DiagnÃ³stico",
                "Planejamento",
                "ExecuÃ§Ã£o",
                "RevisÃ£o",
                "Acompanhamento",
                "AprovaÃ§Ã£o",
              ].map((item, index) => (
                <div className="method-card" key={item}>
                  <div className="num">{index + 1}</div>
                  <strong>{item}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contato">
        <div className="shell">
          <div className="cta">
            <span className="badge">PrÃ³ximo passo</span>
            <h2>Comece sua preparaÃ§Ã£o com mais direÃ§Ã£o.</h2>
            <p>
              Fale com a equipe e entenda como a BenThec pode organizar sua
              rotina de estudos.
            </p>
            <div className="actions" style={{ justifyContent: "center" }}>
              <a className="btn btn-primary" href={whatsapp} target="_blank">
                Falar com a equipe
              </a>
            </div>
          </div>
        </div>
      </section>

      <nav className="mobile-bar">
        <a href="#top">InÃ­cio</a>
        <a href="#trilhas">Trilhas</a>
        <a href="#agua-doce">Cursos</a>
        <a href={whatsapp} target="_blank">WhatsApp</a>
      </nav>
    </main>
  );
}
