import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { AppointmentType } from '@/lib/types/User/Appointment'
import { Eye, PencilIcon, TrashIcon } from 'lucide-react'
import Link from 'next/link'
import { formatInTimeZone } from "date-fns-tz";

export default function AppointmentRow({ appointment }: { appointment: AppointmentType }) {
  const { id, consultation_date, reason_of_visit, symptoms, diagnosis, prescribed_treatment, observation, test_conducted, patient, doctor } = appointment

  const date = consultation_date ? formatInTimeZone(consultation_date, "America/Havana", "dd-MM-yyyy") : 'Sin fecha';


  return (
    <TableRow key={id}>
      <TableCell>{date}</TableCell>
      <TableCell>{reason_of_visit}</TableCell>
      <TableCell>{symptoms}</TableCell>
      <TableCell>{diagnosis}</TableCell>
      <TableCell>{prescribed_treatment}</TableCell>
      <TableCell className="text-right flex gap-2 justify-end">
        <Button className="rounded-full" variant={'outline'} size={'icon'}>
          <Link href={`/dashboard/appointments/${id}`}><Eye size={18} /></Link>
        </Button>
        <Button className="rounded-full" variant={'outline'} size={'icon'}>
          <PencilIcon size={18} className="text-blue-500" />
        </Button>
        <Button className="rounded-full" variant={'outline'} size={'icon'}>
          <TrashIcon size={18} className="text-red-500" />
        </Button>

      </TableCell>
    </TableRow>
  )
}
