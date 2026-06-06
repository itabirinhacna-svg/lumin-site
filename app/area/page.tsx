import { StudentHub } from "@/components/student-hub";
import { getCurrentUser } from "@/lib/access";

const supportHref = "https://wa.me/5527999850434?text=Ola,%20quero%20suporte%20na%20minha%20trilha%20BenThec.";

export default async function AreaPage() {
  const currentUser = await getCurrentUser();

  return (
    <StudentHub
      viewerName={currentUser?.name}
      planName={currentUser ? "Aprova Agua Doce" : undefined}
      supportHref={supportHref}
      primaryHref={currentUser ? "/aluno/aula-demo" : "/login"}
      primaryLabel={currentUser ? "Continuar aula" : "Entrar na plataforma"}
      secondaryHref={currentUser ? "/trilhas" : "/checkout"}
      secondaryLabel={currentUser ? "Ver trilhas" : "Quero organizar meus estudos"}
    />
  );
}
