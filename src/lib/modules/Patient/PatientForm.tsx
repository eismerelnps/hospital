'use client'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useForm } from "@/lib/hooks/useForm";
import { userPlaceholder } from "@/lib/placeholder/UserPlaceholder";
import { ReloadIcon } from "@radix-ui/react-icons";
import { PencilIcon, Plus } from "lucide-react";
import { Patient } from "@/lib/types/User/Patient";
import { Input } from "@/components/ui/input";
import { useAddUserMutation, useEditUSerMutation } from "@/lib/redux/features/user/userApiSlice";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast"

type Props = {
  open: boolean,
  onClose: () => void,
  patient?: Patient,
  seeUser?: boolean
}

export default function PatientForm({ open, onClose, patient, seeUser }: Props) {
  const [formValues, handleInputChange] = useForm(
    patient
      ? {
        ...patient,
        image: null,
      }
      : {
        ...userPlaceholder,
        image: null,
        password: "hola1234",
        username: "",
        gender: "female",
        address: "Guantanamo",
        date_of_birth: "2024-05-02",
        user_type: 'patients',
        doctor: "jdoe123",
        nurse: "nurse123"


        // "username": "patient123",
        // "first_name": "John",
        // "last_name": "Smith",
        // "email": "john.smith@example.com",
        // "password": "securepassword",
        // "date_of_birth": "1985-07-20",
        // "gender": "male",
        // "address": "456 Elm St",
        // "phone_number": "0987654321",
        // "image": null,
        // "user_type": "patients",
        // "doctor": "jdoe123",
        // "nurse": "nurse123"


      }
  );
  const [editUser, { isLoading: isEditingUser, isError: isEditError, isSuccess: isEdited }] = useEditUSerMutation();
  const [addUser, { isLoading: isAddingUser, isError: isAddError, isSuccess: isAdded }] = useAddUserMutation();

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


  useEffect(() => {
    isAddError && toast({
      title: "Ha ocurrido un error",
      description: "No ha sido posible agregar el usuario",
    });

    isAdded && toast({
      title: "Usuario agregado",
      description: "Usuario agregado con éxito.",
    });

    return () => {

    }
  }, [isAddError, isAdded])

  const onSave = async (e: any) => {
    e.preventDefault();
    await editUser({ user: formValues });
  }


  const onAddNew = async () => {
    await addUser({ user: formValues })
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{!patient ? "Agregar paciente" : seeUser ? 'Info del paciente' : 'Editar paciente'}</DialogTitle>
          <DialogDescription>
            {seeUser
              ? ''
              : 'Por favor verifique todos los campos antes de guardar.'
            }
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSave} className="flex flex-col gap-4">
          <Input disabled={seeUser} type="text" value={formValues.username} onChange={handleInputChange} name="username" placeholder="Nombre de usuario" />
          <Input disabled={seeUser} type="text" value={formValues.first_name} onChange={handleInputChange} name="first_name" placeholder="Nombre" />
          <Input disabled={seeUser} type="text" value={formValues.last_name} onChange={handleInputChange} name="last_name" placeholder="Apellidos" />
          <Input disabled={seeUser} type="email" value={formValues.email} onChange={handleInputChange} name="email" placeholder="Correo electrónico" />
          <Input disabled={seeUser} type="text" value={formValues.phone_number} onChange={handleInputChange} name="phone_number" placeholder="Número de teléfono" />
        </form>
        {!seeUser &&
          <>

            {
              !patient ?
                <Button onClick={onAddNew}>
                  <Plus size={16} />
                  Agregar
                </Button>
                :

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