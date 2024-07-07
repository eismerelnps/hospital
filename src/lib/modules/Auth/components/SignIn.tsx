'use client'
import { useForm } from '@/lib/hooks/useForm'
import { useAppSelector } from '@/lib/redux/hooks'
import { ArrowPathIcon } from '@heroicons/react/20/solid'
import React, { useState } from 'react'
import ShowHidePass from './ShowHidePass'
import Input from '@/lib/components/Input/Input'
import { Button } from '@/components/ui/button'
import { ArrowRightCircleIcon } from 'lucide-react'
// import { useLoadingState } from '@/lib/hooks/useLoadingState'
// import PrimaryButton from '@/lib/components/commons/Buttons/PrimaryButton'

export default function SignIn({ handleSignIn, formValues, handleInputChange }: any) {

  const { identifier, password } = formValues;

  const [visible, setVisible] = useState<boolean>(false)
  const togglePasswordVisibility = (): void => {
    setVisible(!visible)
  }
  const loadingSignIn = false
  //useLoadingState(UI_LOADING_STATE.SIGN_IN);
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
          loadingSignIn
            ? <Button disabled onClick={() => { }}> <ArrowPathIcon className="animate-spin w-6 h-6" /> Autenticando </Button>
            : <Button type='submit' onClick={() => { }}> Autenticarse<ArrowRightCircleIcon className="self-en inline-block  h-6 w-6  duration-200 text-active" /></Button>
        }
      </form>
    </div>)
}
