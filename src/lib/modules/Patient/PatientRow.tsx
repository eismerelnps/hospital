'use client'
import { Button } from "@/components/ui/button"
import { TableCell, TableRow } from "@/components/ui/table"
import { Patient } from "@/lib/types/User/Patient"
import { Eye, PencilIcon, TrashIcon } from "lucide-react"
import Link from "next/link"

type Props = {
  patient: Patient,
  onDelete: (id: string) => void
}
export default function PatientRow({ patient, onDelete }: Props) {
  const { image, id, username, first_name, last_name, email, phone_number } = patient

  return (
    <TableRow key={id}>
      <TableCell className="font-medium">
        {/* <Image
            src={image}
            height={500}
            width={500}
            alt={first_name} /> */}
      </TableCell>
      <TableCell>{first_name}</TableCell>
      <TableCell>{last_name}</TableCell>
      <TableCell>{username}</TableCell>
      <TableCell>{phone_number}</TableCell>
      <TableCell>{email}</TableCell>
      <TableCell className="text-right flex gap-2 justify-end">
        <Button className="rounded-full" variant={'outline'} size={'icon'}>
          <Link href={`/dashboard/patient/${id}`}><Eye size={18} /></Link>
        </Button>
        <Button className="rounded-full" variant={'outline'} size={'icon'}>
          <PencilIcon size={18} className="text-blue-500" />
        </Button>
        <Button onClick={() => onDelete(id)} className="rounded-full" variant={'outline'} size={'icon'}>
          <TrashIcon size={18} className="text-red-500" />
        </Button>

      </TableCell>
    </TableRow>
  )
}
