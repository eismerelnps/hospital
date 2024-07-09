'use client'
import { AppointmentType } from '@/lib/types/User/Appointment';
import { useEffect, useState } from 'react'

type StateType = {
  isValid: boolean,
  notification?: string
}
export default function useValidateAppointment(data: AppointmentType) {
  const [validation, setValidation] = useState<StateType>({
    isValid: true,
    notification: undefined
  });
  const { isValid, notification } = validation

  useEffect(() => {
    const validateData = () => {
      if (!data.consultation_date) {
        setValidation({ isValid: false, notification: "Inserte la fecha" });
      } else if (!data.diagnosis) {
        setValidation({ isValid: false, notification: "Inserte el diagnostico" });
      } else if (!data.doctor) {
        setValidation({ isValid: false, notification: "Inserte el doctor" });
      } else if (!data.observation) {
        setValidation({ isValid: false, notification: "Inserte la observación" });
      } else if (!data.patient) {
        setValidation({ isValid: false, notification: "Inserte el paciente" });
      } else if (!data.prescribed_treatment) {
        setValidation({ isValid: false, notification: "Inserte el tratamiento" });
      } else if (!data.reason_of_visit) {
        setValidation({ isValid: false, notification: "Inserte la razón de la visita" });
      } else if (!data.symptoms) {
        setValidation({ isValid: false, notification: "Inserte los síntomas" });
      } 
    }
    validateData()
  }, [data])

  return [isValid, notification]
}