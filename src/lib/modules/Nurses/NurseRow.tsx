import { Button } from "@/components/ui/button"
import { TableCell, TableRow } from "@/components/ui/table"
import { Patient } from "@/lib/types/User/Patient"
import { Eye, PencilIcon, TrashIcon } from "lucide-react"
import Link from "next/link"
export default function NurseRow({ nurse }: { nurse: Patient }) {
  const { image, id, username, first_name, last_name, email, phone_number } = nurse

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
          <Link href={`/dashboard/nurses/${id}`}><Eye size={18} /></Link>
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
