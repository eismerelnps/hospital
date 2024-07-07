import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AppointmentRow from "./AppointmentRow";
import { AppointmentType } from "@/lib/types/User/Appointment";

export default function AppintmentContainer({ appointments }: { appointments: AppointmentType[] }) {
  return (
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
          <AppointmentRow appointment={appointment} />
        ))}
      </TableBody>
    </Table>
  )
}
