import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Patient } from "@/lib/types/User/Patient"
import DoctorRow from "./DoctorRow"

type Props = {
  patients: [{ patient: number, user: Patient }]
}

export default function DoctorContainer({ patients }: Props) {

  return (
    <Table>
      <TableCaption>Todos los médicos</TableCaption>
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
          <DoctorRow patient={patient.user} />
        ))}
      </TableBody>
    </Table>
  )
}
