'use client'
import { DrawerOptionType } from '@/lib/components/Drawer/types/DrawerTypes'
import DrawerOption from '@/lib/components/Drawer/DrawerOption'
import { usePathname, useRouter } from 'next/navigation'
import { FileTextIcon, HomeIcon, LineChart, Package, StoreIcon, UserIcon, Users2Icon } from 'lucide-react';


export default function Drawer() {
  const path = usePathname()

  const options: DrawerOptionType[] = [
    {
      icon: <HomeIcon className='icon' />,
      heading: "Inicio",
      url: '/dashboard/',
      active: path === '/dashboard'
    },
    {
      icon: <Package className='icon' />,
      heading: "Pacientes",
      url: '/dashboard/patient',
      active: path === '/dashboard/patient'
    },
    {
      icon: <StoreIcon className='icon' />,
      heading: "Medicos",
      url: '/dashboard/doctors',
      active: path === '/dashboard/doctors'
    },
    {
      icon: <Users2Icon className='icon' />,
      heading: "Enfermeras",
      url: '/dashboard/nurses',
      active: path === '/dashboard/nurses'
    },
    {
      icon: <Users2Icon className='icon' />,
      heading: "Consultas",
      url: '/dashboard/appointments',
      active: path === '/dashboard/appointments'
    },
  ]

  return (
    <div className='size-full border-e border-primary-950/20 dark:border-primary-50/10 '>
      <div className='flex flex-row gap-2 justify-center items-center m-2 p-4 border border-primary-950/20 dark:border-primary-50/10 rounded-3xl'>
        <div className='size-16 bg-primary-50 rounded-full  '></div>
        <div className=''>
          <h3>Eismer Lobaina</h3>
          <h6>CEO</h6>
        </div>
      </div>
      <div className='size-full flex flex-col gap-2 p-2  '>
        {options.map((option, index) => (
          <DrawerOption key={index} option={option} />
        ))}
      </div>
    </div>
  )
}