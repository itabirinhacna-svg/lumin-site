import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import { redirect } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { requireStudentAccess } from "@/lib/access";
import { createEssaySubmission } from "@/lib/db";
import { getRedacaoTrack } from "@/lib/redacao";

type RedacaoEnvioPageProps = {
  searchParams?: Promise<{
    linha?: "ENEM" | "Concursos";
  }>;
};

async function saveAttachment(file: File) {
  if (!file || file.size === 0) {
    return null;
  }

  const allowedTypes = ["image/jpeg", "image/png", "application/pdf", "image/heic", "image/heif"];
  if (!allowedTypes.includes(file.type)) {
    return null;
  }

  const uploadDir = path.join(process.cwd(), "public", "uploads", "redacoes");
  await mkdir(uploadDir, { recursive: true });

  const ext =
    path.extname(file.name) ||
    (file.type === "application/pdf"
      ? ".pdf"
      : file.type === "image/png"
        ? ".png"
        : file.type === "image/heic" || file.type === "image/heif"
          ? ".heic"
          : ".jpg");
  const fileName = `${Date.now()}-${randomUUID()}${ext}`;
  const filePath = path.join(uploadDir, fileName);
  const buffer = Buffer.from(await file.arrayBuffer());

  await writeFile(filePath, buffer);

  return {
    href: `/uploads/redacoes/${fileName}`,
    name: file.name,
    mimeType: file.type,
  };
}

export default async function RedacaoEnvioPage({ searchParams }: RedacaoEnvioPageProps) {
  const { user } = await requireStudentAccess();
  const params = (await searchParams) ?? {};
  const selectedLine = params.linha === "ENEM" ? "ENEM" : "Concursos";
  const enem = getRedacaoTrack("enem");
  const concursos = getRedacaoTrack("concursos");

  async function submitEssay(formData: FormData) {
    "use server";

    const { user: currentUser } = await requireStudentAccess();
    const linha = String(formData.get("linha") ?? "Concursos") === "ENEM" ? "ENEM" : "Concursos";
    const contextoRaw = String(formData.get("contexto") ?? "Municipais");
    const contexto = contextoRaw === "ENEM" ? "ENEM" : contextoRaw === "PMES" ? "PMES" : "Municipais";
    const title = String(formData.get("tema") ?? "").trim();
    const instructions = String(formData.get("instrucoes") ?? "").trim();
    const body = String(formData.get("texto") ?? "").trim();
    const notes = String(formData.get("observacoes") ?? "").trim();
    const uploadedFile = formData.get("redacaoManuscrita");
    const attachment =
      uploadedFile instanceof File && uploadedFile.size > 0
        ? await saveAttachment(uploadedFile)
        : null;

    if (!title || (!body && !attachment)) {
      redirect("/redacao/envio");
    }

    const essay = await createEssaySubmission({
      userId: currentUser.id,
      title,
      linha,
      contexto,
      instructions,
      body,
      notes,
      attachmentRef: attachment?.href,
      attachmentName: attachment?.name,
      attachmentMimeType: attachment?.mimeType,
    });

    redirect(`/redacao/status?essay=${essay.id}`);
  }

  return (
    <>
      <SiteHeader ctaLabel="Ver historico" ctaHref="/redacao/historico" />

      <main className="section">
        <div className="page-shell" style={{ maxWidth: 1080, display: "grid", gap: 20 }}>
          <section className="auth-card">
            <div className="kicker">Envio de redacao</div>
            <h1 style={{ fontSize: "clamp(2.1rem, 5vw, 3.8rem)" }}>Escreva digitando ou envie a redacao manuscrita.</h1>
            <p>
              O envio agora aceita JPG, PNG e PDF. Seu texto ou imagem fica salvo no historico para voce acompanhar recebimento, correcao e devolutiva.
            </p>
            <div className="glass-card" style={{ padding: 18, marginTop: 18 }}>
              <strong>Correção humana especializada BenThec</strong>
              <p style={{ marginTop: 8 }}>
                Devolutiva em ate 24 horas. Avaliacao baseada nos criterios oficiais do edital e na metodologia BenThec.
              </p>
              <p style={{ marginTop: 8 }}><strong>Aluno conectado:</strong> {user.name}</p>
            </div>
          </section>

          <div className="section-grid">
            <article className="glass-card">
              <div className="kicker">Redacao ENEM</div>
              <h2 style={{ marginTop: 8 }}>Temas sugeridos agora</h2>
              <ul className="list-clean" style={{ marginTop: 14 }}>
                {enem.temas.map((tema) => (
                  <li key={tema.title}>
                    <strong>{tema.title}</strong>
                    <br />
                    {tema.proposal}
                    <br />
                    <span style={{ color: "#94a3b8" }}>Objetivo: {tema.objective}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="glass-card">
              <div className="kicker">Redacao Concursos e PMES</div>
              <h2 style={{ marginTop: 8 }}>Temas sugeridos agora</h2>
              <ul className="list-clean" style={{ marginTop: 14 }}>
                {concursos.temas.map((tema) => (
                  <li key={tema.title}>
                    <strong>{tema.title}</strong>
                    <br />
                    {tema.proposal}
                    <br />
                    <span style={{ color: "#94a3b8" }}>Objetivo: {tema.objective}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>

          <form action={submitEssay} className="auth-card" encType="multipart/form-data">
            <div className="field">
              <label htmlFor="linha">1. Linha</label>
              <select id="linha" name="linha" defaultValue={selectedLine}>
                <option value="Concursos">Concursos</option>
                <option value="ENEM">ENEM</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="contexto">2. Edital / categoria</label>
              <select id="contexto" name="contexto" defaultValue={selectedLine === "ENEM" ? "ENEM" : "Municipais"}>
                <option value="Municipais">Concursos municipais</option>
                <option value="PMES">PMES</option>
                <option value="ENEM">ENEM</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="tema">3. Tema</label>
              <input id="tema" name="tema" placeholder="Digite o tema da redacao" required />
            </div>

            <div className="field">
              <label htmlFor="instrucoes">4. Proposta / instrucoes</label>
              <textarea
                id="instrucoes"
                name="instrucoes"
                placeholder="Cole aqui a proposta, o comando ou o que voce quer que a correcao observe."
                style={{ minHeight: 110, padding: 14, borderRadius: 14, border: "1px solid var(--line)", background: "var(--surface-strong)", color: "var(--text)" }}
              />
            </div>

            <section className="glass-card" style={{ padding: 18 }}>
              <div className="kicker">Enviar redacao manuscrita</div>
              <h2 style={{ marginTop: 8 }}>Primeira opcao para quem escreve no papel</h2>
              <p style={{ marginTop: 10 }}>
                Envie foto em JPG, PNG ou HEIC, ou PDF escaneado. Se preferir, voce tambem pode digitar o texto logo abaixo.
              </p>
              <div className="field" style={{ marginTop: 16 }}>
                <label htmlFor="redacaoManuscrita">Arquivo manuscrito</label>
                <input id="redacaoManuscrita" name="redacaoManuscrita" type="file" accept=".jpg,.jpeg,.png,.pdf,.heic,.heif" />
              </div>
            </section>

            <div className="field">
              <label htmlFor="texto">5. Digite seu texto (opcional se houver arquivo)</label>
              <textarea
                id="texto"
                name="texto"
                placeholder="Se quiser, cole a redacao aqui."
                style={{ minHeight: 220, padding: 14, borderRadius: 14, border: "1px solid var(--line)", background: "var(--surface-strong)", color: "var(--text)" }}
              />
            </div>

            <div className="field">
              <label htmlFor="observacoes">6. Observacoes</label>
              <textarea
                id="observacoes"
                name="observacoes"
                placeholder="Exemplo: quero foco em repertorio, objetividade ou proposta de intervencao."
                style={{ minHeight: 110, padding: 14, borderRadius: 14, border: "1px solid var(--line)", background: "var(--surface-strong)", color: "var(--text)" }}
              />
            </div>

            <div className="glass-card" style={{ padding: 18, marginTop: 18 }}>
              <strong>Como a jornada acontece</strong>
              <ul className="list-clean" style={{ marginTop: 10 }}>
                <li>Envio</li>
                <li>Recebida</li>
                <li>Em correcao</li>
                <li>Corrigida</li>
                <li>Devolutiva</li>
              </ul>
            </div>

            <div className="actions" style={{ marginTop: 18 }}>
              <button type="submit" className="btn">
                Enviar e salvar no historico
              </button>
              <Link href="/redacao/status" className="btn-secondary">
                Ver fluxo de status
              </Link>
              <Link href="/redacao/historico" className="btn-ghost">
                Abrir historico
              </Link>
            </div>
          </form>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
