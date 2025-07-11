import PageSectionTitle from "@/app/(protected)/components/shared/PageSectionTitle";
import SimplePageInnerTitle from "@/app/(protected)/components/shared/SimplePageInnerTitle";

async function getUsers() {
  const res = await fetch("http://localhost:3000/api/users", {
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Falha ao buscar os usuários:", res.statusText);
    return [];
  }
  return res.json();
}

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
      </div>
    </>
  );
}
