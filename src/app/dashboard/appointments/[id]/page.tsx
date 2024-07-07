import { Button } from "@/components/ui/button";
import { AppointmentType } from "@/lib/types/User/Appointment";
import { formatInTimeZone } from "date-fns-tz";
import { Eye } from "lucide-react";
import Link from "next/link";

async function getData(id: string) {
  const res = await fetch(
    `http://127.0.0.1:8000/appointments/${id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token 8bf77cfcf7501982129d38584c5c6e6e53d999fc'
      }
    }
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export default async function page({ params }: { params: { id: string } }) {
  const data = await getData(params.id);
  const { id, consultation_date, reason_of_visit, symptoms, diagnosis, prescribed_treatment, observation, test_conducted, patient, doctor } = data
  const date = consultation_date ? formatInTimeZone(consultation_date, "America/Havana", "dd-MM-yyyy") : 'Sin fecha';

  return (
    <div className="px-20 flex flex-col gap-4">
      <div className="flex flex-col">
        <p className="opacity-60">Fecha</p>
        <h1>{date}</h1>
      </div>

      <div className="flex flex-col">
        <p className="opacity-60">Razón</p>
        <h1>{reason_of_visit}</h1>
      </div>

      <div className="flex flex-col">
        <p className="opacity-60">Síntomas</p>
        <h3>{symptoms}</h3>
      </div>

      <div className="flex flex-col">
        <p className="opacity-60">Diagnóstico</p>
        <h1>{diagnosis}</h1>
      </div>

      <div className="flex flex-col">
        <p className="opacity-60">Tratamiento</p>
        <p>{prescribed_treatment}</p>
      </div>

      <div className="flex flex-col">
        <p className="opacity-60">Observación</p>
        <h1>{observation}</h1>
      </div>
      <div className="flex flex-col">
        <p className="opacity-60">Consejo</p>
        <p>{test_conducted}</p>
      </div>


      <div className="flex gap-2">
        <Link href={`/dashboard/patient/${patient}`}>
          <Button>
            <Eye size={18} />
            Ver paciente
          </Button>
        </Link>

        <Link href={`/dashboard/doctor/${doctor}`}>
          <Button>
            <Eye size={18} />
            Ver doctor
          </Button>
        </Link>
      </div>


    </div>
  )
}
