import React from 'react';
import { InputInterface } from '@/lib/components/commons/Input/InputInterface'
import { XMarkIcon } from '@heroicons/react/20/solid';

interface NavInputInterface extends InputInterface {
  handleFinishSearch: () => void
}

export default function NavSearchInput({ autocomplete, value, name, id, type, placeholder, onChange, handleFinishSearch }: NavInputInterface) {
  return (
    <div className='flex flex-row items-center w-full bg-primary-100 dark:bg-primary-950/90 rounded-full'>
      <button className='btn btn-ghost btn-circle p-0 flex-none hover:bg-primary-950 hover:opacity-45' onClick={handleFinishSearch}>
        <XMarkIcon className='shrink-0 size-6 lg:size-8 text-primary-50 dark:text-primary-50' />
      </button>
      <form className=''>

        <input
          className='w-full  rounded-md p-2 border-0 outline-0 ring-0 bg-transparent'
          value={value}
          autoComplete={autocomplete}
          name={name}
          id={id}
          onChange={onChange}
          type={type}
          placeholder={placeholder}
        />
      </form>
    </div>
  )
}
