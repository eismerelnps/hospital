'use client'
import React from 'react'

export default function error() {
  return (
    <div className='w-full h-full flex flex-col justify-center items-center'>
      <h1 className='font-bold text-2xl lg:text-3xl'>Ha ocurrido un error al obtener la enfermera</h1>
      <p className='text-lg lg:text-xl opacity-80'>Por favor vuelva a intentarlo</p>
    </div>
  )
}
