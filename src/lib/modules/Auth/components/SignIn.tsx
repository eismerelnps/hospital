'use client'
import { useForm } from '@/lib/hooks/useForm'
import { useAppSelector } from '@/lib/redux/hooks'
import { ArrowPathIcon } from '@heroicons/react/20/solid'
import React, { useState } from 'react'
import ShowHidePass from './ShowHidePass'
import Input from '@/lib/components/Input/Input'
import { Button } from '@/components/ui/button'
import { ArrowRightCircleIcon } from 'lucide-react'
import useVerifyIdentifier from '../hooks/useVerifyIdentifier'
import { useSignInMutation } from '@/lib/redux/features/auth/authApiSlice'
import { toast } from 'sonner'

export default function SignIn({ formValues, handleInputChange }: any) {
  const { validation, verifyIdentifier } = useVerifyIdentifier();
  const { identifier, password } = formValues;
  const [signin, { isLoading: isSignInLoading, isSuccess: isSignInSuccess, isError: isErrorAddingTech }] = useSignInMutation()

  const [visible, setVisible] = useState<boolean>(false)
  const togglePasswordVisibility = (): void => {
    setVisible(!visible)
  }
  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>, identifier: string, password: string) => {
    e.preventDefault();
    if (identifier && identifier.trim().length < 3 || identifier.trim().length > 52) {
      return toast("Event has been created", {
        description: "Sunday, December 03, 2023 at 9:00 AM",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      })
    } else if (password.trim().length < 0 || password.trim().length > 128) {
      return toast("Event has been created", {
        description: "Sunday, December 03, 2023 at 9:00 AM",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      })
    } else signin({ email: identifier, password: password })
  }

  return (
    <div className="w-full  flex flex-col space-y-8 items-center justify-center ">
      {/* <h2 className={`  font-bold text-primary-500 text-3xl lg:text-4xl`}>{t('sign_in')}</h2> */}
      <form className='w-full relative flex flex-col justify-center items-center space-y-4' onSubmit={(e) => handleSignIn(e, identifier, password)}>
        <Input
          autocomplete='true'
          className=' w-full  p-3 lg:p-4 rounded-lg outline-primary-500 '
          value={identifier}
          id={'identifier'}
          type={'text'}
          placeholder="Correo"
          name={'identifier'}
          onChange={handleInputChange}
        />
        <div className='relative w-full'>
          <Input
            autocomplete='current-password'
            className=' w-full p-3 lg:p-4 rounded-lg outline-primary-500 dark:bg-primary-100/20'
            value={password}
            id={'password'}
            type={visible ? 'text' : 'password'}
            placeholder="Contraseña"
            name={'password'}
            onChange={handleInputChange}
          />
          <ShowHidePass visible={visible} togglePasswordVisibility={togglePasswordVisibility} />
        </div>

        {
          isSignInLoading
            ? <Button disabled onClick={() => { }}> <ArrowPathIcon className="animate-spin w-6 h-6" /> Autenticando </Button>
            : <Button type='submit' onClick={() => { }}> Autenticarse<ArrowRightCircleIcon className="self-en inline-block  h-6 w-6  duration-200 text-active" /></Button>
        }
      </form>
    </div>)
}
