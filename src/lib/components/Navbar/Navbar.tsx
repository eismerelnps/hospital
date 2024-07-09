'use client'
import { Button } from '@/components/ui/button';
import AppointmentForm from '@/lib/modules/Appointment/AppointmentForm';
import DoctorForm from '@/lib/modules/Doctors/DoctorForm';
import NurseForm from '@/lib/modules/Nurses/NurseForm';
import PatientForm from '@/lib/modules/Patient/PatientForm';
import { ArrowBigDown, ArrowBigLeft, PlusIcon, Router } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react';

export default function Navbar() {
  const path = usePathname();
  const router = useRouter();

  const [addPatient, setAddPatient] = useState(false);
  const [addNurse, setAddNurse] = useState(false);
  const [addDoctor, setAddDoctor] = useState(false);
  const [addAppointmet, setAppointmet] = useState(false);

  const onAdd = () => {
    path === '/dashboard/patient' && setAddPatient(true);
    path === '/dashboard/nurses' && setAddNurse(true);
    path === '/dashboard/doctors' && setAddDoctor(true);
    path === '/dashboard/appointment' && setAppointmet(true);
  }
  return (
    <>

      {addPatient && <PatientForm open={addPatient} onClose={() => setAddPatient(false)} />}
      {addNurse && <NurseForm open={addNurse} onClose={() => setAddNurse(false)} />}
      {addDoctor && <DoctorForm open={addDoctor} onClose={() => setAddDoctor(false)} />}
      {addAppointmet && <AppointmentForm open={addAppointmet} onClose={() => setAppointmet(false)} />}

      <nav className='relative'>
        <div className='fixed top-0 right-0 left-0  h-16  flex'>
          <div className='basis-0 lg:basis-1/5'></div>
          <div className='basis-full lg:basis-4/5 h-full border-b border-primary-950/20 dark:border-primary-50'>
            <div className='h-full p-4 flex justify-end items-center gap-4'>
              <Button size={'icon'} className='rounded-full' onClick={onAdd}>
                <PlusIcon />
              </Button>
              <Button size={'icon'} className='rounded-full' onClick={() => router.push('/auth')}>
                <ArrowBigLeft />
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
