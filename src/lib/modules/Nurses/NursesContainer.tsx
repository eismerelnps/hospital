import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Patient } from '@/lib/types/User/Patient'
import NurseRow from "./NurseRow";

type Props = {
  nurses: [{ nurse: number, user: Patient }]
}

export default function NursesContainer({ nurses }: Props) {
  return (
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
          <NurseRow key={index} nurse={nurse.user} />
        ))}
      </TableBody>
    </Table>
  )
}
