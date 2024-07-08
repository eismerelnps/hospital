'use client'
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import PatientRow from "./PatientRow"
import { Patient } from "@/lib/types/User/Patient"
import { AlertDialogDemo } from "@/lib/components/AlertDialog/AlertDialog"
import { useEffect, useState } from "react"
import { useDeleteUserMutation } from "@/lib/redux/features/user/userApiSlice"
import { useToast } from "@/components/ui/use-toast"

type Props = {
  patients: [{ patient: number, user: Patient }]
}

export default function PatientContainer({ patients }: Props) {
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
  
    return () => {};

  }, [isDeleted, isDeleteError, isDeletingUser])
  


  return (
    <>
      {deleteUserId &&
        <AlertDialogDemo open={deleteUserId !== ''} onAccept={onDelete} onClose={onClose} title="Borrar paciente" description="Estás seguro deseas borrar el paciente?" />}
      <Table>
        <TableCaption>Todos los pacientes</TableCaption>
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
          {patients.map((patient, index) => (
            <PatientRow key={index} patient={patient.user} onOpen={onOpen} />
          ))}
        </TableBody>
      </Table>
    </>
  )
}
