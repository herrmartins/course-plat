import { getUserModel } from "@/app/models/User";
import UpdateUserForm from "@/app/(protected)/admin/dashboard/users/components/UpdateUserForm";
import PageSectionTitle from "@/app/(protected)/components/shared/PageSectionTitle";
import SimplePageInnerTitle from "@/app/(protected)/components/shared/SimplePageInnerTitle";
import { toPlain } from "@/app/lib/helpers/toPlain";

export default async function UpdateUserPage({ params }) {
  const {id} = await params;

  const User = await getUserModel();
  const userDoc = await User.findById(id)
  .select("-passwordHash -createdAt -modifiedAt -__v")
  .lean();

  const user = toPlain(userDoc);

  user._id = user._id.toString();
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
          <SimplePageInnerTitle title="Editar Dados do Usuário" />
        </div>
        <div className="flex justify-center">
          <UpdateUserForm user={user} />
        </div>
      </div>
    </>
  );
}
