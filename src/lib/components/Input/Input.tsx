'use client'
import React from 'react'
import './input.css'

export type Props = {
  autocomplete: string;
  value: string;
  name: string;
  id: string;
  type: string;
  placeholder: string;
  onChange: any;
  className: string;
}

export default function Input({ autocomplete, value, name, id, type, placeholder, onChange, className }: Props) {
  //POV:  esto es una brujeria para solucionar e problema de al hacer click sobre el label no se posicionaba
  const handleLabelClick = () => {
    document.getElementById(id)?.focus(); // Enfoca el input al hacer clic en el label
  }

  return (
    <div className={` plasticine-item  z-[1] `}>
      <input
        value={value}
        autoComplete={autocomplete}
        name={name}
        id={id}
        onChange={onChange}
        type={type}
        className={`${className} plasticine-input animate__animated bg-primary-50 dark:bg-primary-950 autocomplete:bg-red-500 autofill:bg-red-700 `}
        placeholder={placeholder}
      />
      <label
        onClick={() => handleLabelClick()} className={`plasticine-label animate__animated text-primary-950 dark:text-primary-50 rounded-lg bg-primary-50 dark:bg-primary-950`}>{placeholder}</label>
      <span className={` absolute inset-[-3px] rounded-lg  blur-lg transition delay-500`}>
      </span>
    </div>
  )

}

// ${ animation === 'in' ? 'animate__fadeInRight' : 'animate__fadeInLeft' }
//  ${ validInput ? 'bg-[#1a73e8]' : 'bg-[#e81a1a]' }

// return (
//   <input
//     className={`${className}`}
//     value={value}
//     autoComplete={autocomplete}
//     name={name}
//     id={id}
//     onChange={onChange}
//     type={type}
//     placeholder={placeholder}
//   />
// )