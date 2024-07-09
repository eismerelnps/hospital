import { Button } from "@/components/ui/button"
import { TableCell, TableRow } from "@/components/ui/table"
import { Patient } from "@/lib/types/User/Patient"
import { Eye, PencilIcon, TrashIcon } from "lucide-react"

type Props = {
  nurse: Patient,
  onOpen: (id: string) => void
  onEdit: (nurse: Patient) => void,
  onSeeUser: (nurse: Patient) => void,
  onCloseSeeUSer: () => void
}

export default function NurseRow({ nurse, onOpen, onEdit, onSeeUser, onCloseSeeUSer }: Props) {
  const { image, id, username, first_name, last_name, email, phone_number } = nurse

  return (
    <TableRow key={id}>
      <TableCell className="font-medium"></TableCell>
      <TableCell>{first_name}</TableCell>
      <TableCell>{last_name}</TableCell>
      <TableCell>{username}</TableCell>
      <TableCell>{phone_number}</TableCell>
      <TableCell>{email}</TableCell>
      <TableCell className="text-right flex gap-2 justify-end">
        <Button onClick={() => onSeeUser(nurse)} className="rounded-full" variant={'outline'} size={'icon'}>
          <Eye size={18} />
        </Button>
        <Button onClick={() => onEdit(nurse)} className="rounded-full" variant={'outline'} size={'icon'}>
          <PencilIcon size={18} className="text-blue-500" />
        </Button>
        <Button onClick={() => onOpen(id)} className="rounded-full" variant={'outline'} size={'icon'}>
          <TrashIcon size={18} className="text-red-500" />
        </Button>

      </TableCell>
    </TableRow>
  )
}
