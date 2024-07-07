import Drawer from '@/lib/components/Drawer/Drawer'
import Navbar from '@/lib/components/Navbar/Navbar'
import React from 'react'

export default function layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      {/* <Navbar /> */}
      <main className=" w-full h-screen flex justify-center items-center bg-primary-50 dark:bg-primary-950">
        <div className='basis-0 hidden lg:basis-1/5 h-screen lg:flex items-center justify-start gap-2 '>
          <Drawer />
        </div>
        <div className='basis-full lg:basis-4/5 h-dvh pt-16 overflow-hidden'>
          {children}
        </div>
      </main>
    </div>
  )
}
