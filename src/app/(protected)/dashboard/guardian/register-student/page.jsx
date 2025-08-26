import WardRegisteringForm from "./components/WardRegisteringForm";
import PageSectionTitle from "@/app/(protected)/components/shared/PageSectionTitle";
import SimplePageInnerTitle from "@/app/(protected)/components/shared/SimplePageInnerTitle";
import { auth } from "@/app/lib/utils/auth";
import NotAuthorized from "@/app/auth/components/NotAuthorized";

export default async function RegisterStudentPage({ params }) {
  const session = await auth();
  const guardianId = session.user.id;

  if (!session.user.roles.includes("parent")) {
    return <NotAuthorized />;
  }

  return (
    <>
      <div className="w-full mt-3">
        <div>
          <PageSectionTitle title="Painel do Responsável" className="mx-5" />
        </div>
        <div className="flex justify-center">
          <SimplePageInnerTitle title="Adicionar estudante " />
        </div>
        <div className="flex justify-center">
          <WardRegisteringForm guardianId={guardianId}/>
        </div>
      </div>
    </>
  );
}
