'use client'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useForm } from "@/lib/hooks/useForm";
import { userPlaceholder } from "@/lib/placeholder/UserPlaceholder";
import { ReloadIcon } from "@radix-ui/react-icons";
import { PencilIcon } from "lucide-react";
import { useEditAppointmentMutation, useEditUSerMutation } from "@/lib/redux/features/user/userApiSlice";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast"
import { AppointmentType, NewAppointmentType } from "@/lib/types/User/Appointment";
import Input from "@/lib/components/Input/Input";
import useValidateAppointment from "./useValidateAppointment";

type Props = {
  open: boolean,
  onClose: () => void,
  appointment?: AppointmentType,
  seeUser?: boolean
}

const emptyAppointment: AppointmentType = {
  id: "",
  consultation_date: "2024/06/20",
  reason_of_visit: "",
  symptoms: "",
  diagnosis: "",
  prescribed_treatment: "",
  observation: "",
  test_conducted: "",
  patient: { id: "", full_name: '' },
  doctor: { id: "", full_name: '' },
}

export default function AppointmentForm({ open, onClose, appointment, seeUser }: Props) {
  const [formValues, handleInputChange] = useForm(appointment ? appointment : emptyAppointment);
  const [editUser, { isLoading: isEditingUser, isError: isEditError, isSuccess: isEdited }] = useEditUSerMutation();
  const [editAppointment, { isLoading: isEditingAppointment, isError: isEditAppointmentError, isSuccess: isEditedAppointment }] = useEditAppointmentMutation();
  const { toast } = useToast();
  const [isValid, notification] = useValidateAppointment(formValues)

  useEffect(() => {
    isEditError && toast({
      title: "Ha ocurrido un error",
      description: "No ha sido posible eliminar el usuario",
    });

    isEdited && toast({
      title: "Usuario eliminado",
      description: "Usuario editado con éxito.",
    });

    return () => {

    }
  }, [isEditError, isEdited])

  const onSave = async () => {
    console.log('formValues', formValues)
    editAppointment(formValues);
    // toast({
    //   title: "Ha ocurrido un error",
    //   description: "No ha sido posible editar el usuario",
    // });
  };

  useEffect(() => {
    isEditAppointmentError && toast({
      title: "Ha ocurrido un error",
      description: "No ha sido posible eliminar la consulta",
    });

    isEditedAppointment && toast({
      title: "Consulta editada",
      description: "Consulta editada con éxito.",
    });


    return () => {

    }
  }, [isEditError, isEdited])


  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{seeUser ? 'Info de la consulta' : 'Editar consulta medica'}</DialogTitle>
          <DialogDescription>
            {seeUser
              ? ''
              : 'Por favor verifique todos los campos antes de guardar.'
            }

          </DialogDescription>
        </DialogHeader>

        <form className="flex flex-col gap-4">
          <Input id="reason_of_visit" disabled={seeUser} type="text" value={formValues.reason_of_visit} onChange={handleInputChange} name="reason_of_visit" placeholder="Razón de la visita" />
          <Input id="symptoms" disabled={seeUser} type="text" value={formValues.symptoms} onChange={handleInputChange} name="symptoms" placeholder="Síntomas" />
          <Input id="diagnosis" disabled={seeUser} type="email" value={formValues.diagnosis} onChange={handleInputChange} name="diagnosis" placeholder="Diagnóstico" />
          <Input id="prescribed_treatament" disabled={seeUser} type="text" value={formValues.prescribed_treatament} onChange={handleInputChange} name="prescribed_treatament" placeholder="Tratamiento" />
          <Input id="observation" disabled={seeUser} type="text" value={formValues.observation} onChange={handleInputChange} name="observation" placeholder="Observación" />
          <Input id="test_conducted" disabled={seeUser} type="text" value={formValues.test_conducted} onChange={handleInputChange} name="test_conducted" placeholder="Test" />
          <Input id="patient" disabled={seeUser} type="email" value={formValues.patient.full_name} onChange={handleInputChange} name="patient" placeholder="Paciente" />
          <Input id="doctor" disabled={seeUser} type="text" value={formValues.doctor.full_name} onChange={handleInputChange} name="doctor" placeholder="Doctor" />

        </form>
        <DialogFooter>
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
        </DialogFooter>
      </DialogContent>
    </Dialog>

  )
}