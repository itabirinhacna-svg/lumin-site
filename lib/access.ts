import { redirect } from "next/navigation";
import { getActivePurchaseForUser, getUserById, type UserRecord, type UserRole } from "@/lib/db";
import { getSession } from "@/lib/session";

export async function getCurrentUser() {
  const session = await getSession();

  if (!session) {
    return null;
  }

  return getUserById(session.userId);
}

export async function requireUser(role?: UserRole) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (role && user.role !== role) {
    redirect(user.role === "student" ? "/aluno" : "/admin");
  }

  return user as UserRecord;
}

export async function requireStudentAccess() {
  const user = await requireUser("student");
  const purchase = await getActivePurchaseForUser(user.id);

  if (!purchase) {
    redirect("/checkout");
  }

  return { user, purchase };
}
