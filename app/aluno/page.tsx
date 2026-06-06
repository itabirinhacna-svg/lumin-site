import { StudentHub } from "@/components/student-hub";
import { requireStudentAccess } from "@/lib/access";

const supportHref = "https://wa.me/5527999850434?text=Ola,%20quero%20suporte%20na%20minha%20trilha%20BenThec.";

export default async function StudentAreaPage() {
  const { user, purchase } = await requireStudentAccess();

  return (
    <StudentHub
      viewerName={user.name}
      planName={purchase.planName}
      supportHref={supportHref}
      primaryHref="/aluno/aula-demo"
      primaryLabel="Continuar aula"
      secondaryHref="/trilhas"
      secondaryLabel="Ver trilhas"
    />
  );
}
