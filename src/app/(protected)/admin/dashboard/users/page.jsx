import PageSectionTitle from "@/app/(protected)/components/shared/PageSectionTitle";
import SimplePageInnerTitle from "@/app/(protected)/components/shared/SimplePageInnerTitle";
import UsersTable from "./components/UsersTable";
import { getUsers } from "@/app/lib/users/getUsers";

export default async function UsersAdminPage() {
  const users = await getUsers();
  return (
    <>
      <div className="w-full mt-3">
        <div>
          <PageSectionTitle
            title="Gerenciar Usuários e Papéis"
            className="mx-5"
          />
        </div>
        <div className="flex justify-center">
        </div>
        <div className="flex flex-col mt-3">
          <div className="flex justify-center">
            <SimplePageInnerTitle title="Usuários" />
          </div>
        </div>
        <UsersTable users={users}/>
      </div>
    </>
  );
}
