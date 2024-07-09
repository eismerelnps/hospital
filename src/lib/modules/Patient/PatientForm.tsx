'use client'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useForm } from "@/lib/hooks/useForm";
import { userPlaceholder } from "@/lib/placeholder/UserPlaceholder";
import { ReloadIcon } from "@radix-ui/react-icons";
import { PencilIcon } from "lucide-react";
import { Patient } from "@/lib/types/User/Patient";
import { Input } from "@/components/ui/input";
import { useEditUSerMutation } from "@/lib/redux/features/user/userApiSlice";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast"

type Props = {
  open: boolean,
  onClose: () => void,
  patient?: Patient,
  seeUser: boolean
}

export default function PatientForm({ open, onClose, patient, seeUser }: Props) {
  const [formValues, handleInputChange] = useForm(
    patient
      ? {
        ...patient,
        image: null
      }
      : {
        ...userPlaceholder,
        image: null
      }
  );
  const [editUser, { isLoading: isEditingUser, isError: isEditError, isSuccess: isEdited }] = useEditUSerMutation();
  const { toast } = useToast()

  useEffect(() => {
    isEditError && toast({
      title: "Ha ocurrido un error",
      description: "No ha sido posible eliminar el usuario",
    });

    isEdited && toast({
      title: "Usuario editado",
      description: "Usuario editado con éxito.",
    });

    return () => {

    }
  }, [isEditError, isEdited])

  const onSave = async (e: any) => {
    e.preventDefault();
    console.log('edit')
    await editUser({ user: formValues });
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{seeUser ? 'Info del paciente' : 'Editar paciente'}</DialogTitle>
          <DialogDescription>
            {seeUser
              ? ''
              : 'Por favor verifique todos los campos antes de guardar.'
            }
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSave} className="flex flex-col gap-4">
          <Input disabled={seeUser} type="text" value={formValues.first_name} onChange={handleInputChange} name="first_name" placeholder="Nombre" />
          <Input disabled={seeUser} type="text" value={formValues.last_name} onChange={handleInputChange} name="last_name" placeholder="Apellidos" />
          <Input disabled={seeUser} type="email" value={formValues.email} onChange={handleInputChange} name="email" placeholder="Correo electrónico" />
          <Input disabled={seeUser} type="text" value={formValues.phone_number} onChange={handleInputChange} name="phone_number" placeholder="Número de teléfono" />
        </form>
        {!seeUser &&
          <>
            {
              isEditingUser ?
                <Button disabled>
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Editando
                </Button>
                :
                <Button onClick={onSave}>
                  <PencilIcon size={16} />
                  Editar
                </Button>
            }</>
        }
      </DialogContent>
    </Dialog>
  )
}