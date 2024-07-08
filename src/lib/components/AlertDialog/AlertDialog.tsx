import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";

type Props = {
  open: boolean,
  onClose: () => void,
  onAccept: () => any
  title: string,
  description: string,
  loading?: boolean
}
export function AlertDialogDemo({ open, onAccept, onClose, title, description, loading }: Props) {
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          {
            loading
              ? <Button disabled><ReloadIcon className="mr-2 h-4 w-4 animate-spin" />Eliminando</Button>
              : <Button onClick={onAccept}>Eliminar</Button>
          }

        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
