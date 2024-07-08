'use client'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import PatientRow from "./PatientRow"
import { Patient } from "@/lib/types/User/Patient"
import { AlertDialogDemo } from "@/lib/components/AlertDialog/AlertDialog"
import { useState } from "react"

type Props = {
  patients: [{ patient: number, user: Patient }]
}

export default function PatientContainer({ patients }: Props) {
  const [deleteUser, setDeleteUser] = useState('');

  const onClose = () => setDeleteUser('');
  const onDelete = (id: string) => setDeleteUser(id)

  return (
    <>
      {deleteUser && <AlertDialogDemo open={deleteUser !== ''} onClose={onClose} title="Borrar paciente" description="Estás seguro deseas borrar el paciente?" />}
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
          {patients.map((patient) => (
            <PatientRow patient={patient.user} onDelete={onDelete} />
          ))}
        </TableBody>
        {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */}
      </Table>
    </>

  )
}
