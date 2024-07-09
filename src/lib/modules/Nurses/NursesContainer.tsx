'use client'
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Patient } from '@/lib/types/User/Patient'
import NurseRow from "./NurseRow";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { AlertDialogDemo } from "@/lib/components/AlertDialog/AlertDialog";
import { useDeleteUserMutation } from "@/lib/redux/features/user/userApiSlice";
import NurseForm from "./NurseForm";
import { UserType } from "@/lib/types/User/UserType";

type Props = {
  nurses: [{ nurse: number, user: Patient }]
}

export default function NursesContainer({ nurses }: Props) {
  const [deleteUser, { isLoading: isDeletingUser, isError: isDeleteError, isSuccess: isDeleted }] = useDeleteUserMutation();
  const [deleteUserId, setDeleteUser] = useState('');
  const { toast } = useToast()
  const onClose = () => setDeleteUser('');
  const onOpen = (id: string) => setDeleteUser(id);
  const onDelete = async () => await deleteUser({ id: deleteUserId });

  useEffect(() => {
    isDeleteError && toast({
      title: "Ha ocurrido un error",
      description: "No ha sido posible eliminar el usuario",
    });

    isDeleted && toast({
      title: "Usuario eliminado",
      description: "Usuario eliminado con éxito.",
    });

    return () => { };

  }, [isDeleted, isDeleteError, isDeletingUser]);

  const [seeNurse, setSeeNurse] = useState<{ see: boolean, edit: boolean, nurse: Patient | undefined }>({
    see: false,
    edit: false,
    nurse: undefined
  });

  const onCloseSee = () => {
    setSeeNurse({
      see: false,
      edit: false,
      nurse: undefined
    })
  };

  const onEdit = (nurse: Patient) => {
    setSeeNurse({
      see: false,
      edit: true,
      nurse: nurse
    })
  }
  const onSee = (nurse: Patient) => {
    setSeeNurse({
      see: true,
      edit: false,
      nurse: nurse
    })
  }
  return (
    <>
      {deleteUserId && <AlertDialogDemo open={deleteUserId !== ''} onAccept={onDelete} onClose={onClose} title="Eliminar enfermera" description="Estás seguro deseas eliminar la enfermera seleccionada?" />}
      {seeNurse.edit && <NurseForm open={seeNurse.edit} onClose={onCloseSee} patient={seeNurse.nurse} seeUser={seeNurse.see} />}
      {seeNurse.see && <NurseForm open={seeNurse.see} onClose={onCloseSee} patient={seeNurse.nurse} seeUser={seeNurse.see} />}

      <Table>
        <TableCaption>Todas las enfermeras</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Imagen</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Apellidos</TableHead>
            <TableHead>Usuario</TableHead>
            <TableHead>Móvil</TableHead>
            <TableHead >Correo</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {nurses.map((nurse, index) => (
            <NurseRow key={index} nurse={nurse.user} onOpen={onOpen} onEdit={onEdit} onSeeUser={onSee} onCloseSeeUSer={onCloseSee}/>
          ))}
        </TableBody>
      </Table>
    </>

  )
}
