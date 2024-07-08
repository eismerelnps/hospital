'use client'
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import AppointmentRow from "./AppointmentRow";
import { AppointmentType } from "@/lib/types/User/Appointment";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { AlertDialogDemo } from "@/lib/components/AlertDialog/AlertDialog";
import { useDeleteAppointmentMutation } from "@/lib/redux/features/user/userApiSlice";

export default function AppintmentContainer({ appointments }: { appointments: AppointmentType[] }) {
  const [deleteAppointment, { isLoading: isDeleting, isError: isDeleteError, isSuccess: isDeleted }] = useDeleteAppointmentMutation();
  const [deleteUserId, setDeleteUser] = useState('');
  const { toast } = useToast()
  const onClose = () => setDeleteUser('');
  const onOpen = (id: string) => setDeleteUser(id);
  const onDelete = async () => await deleteAppointment({ id: deleteUserId });

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

  }, [isDeleted, isDeleteError, isDeleting])
  return (
    <>
      {deleteUserId && <AlertDialogDemo loading={isDeleting} open={deleteUserId !== ''} onAccept={onDelete} onClose={onClose} title="Eliminar consulta médica" description="Estás seguro deseas eliminar la consulta médica seleccionada?" />}
      <Table>
        <TableCaption>Todas las consultas</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Fecha</TableHead>
            <TableHead>Razón</TableHead>
            <TableHead>Síntomas</TableHead>
            <TableHead>Diagnóstico</TableHead>
            <TableHead >Tratamiento</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointments.map((appointment) => (
            <AppointmentRow appointment={appointment} onOpen={onOpen} />
          ))}
        </TableBody>
      </Table>
    </>
  )
}
