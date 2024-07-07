import { useForm } from '@/lib/hooks/useForm';
import { useAppSelector } from '@/lib/redux/hooks';
import { ArrowPathIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import React, { useState } from 'react'
import ShowHidePass from './ShowHidePass';
import Input from '@/lib/components/Input/Input';
import { ArrowRightCircleIcon } from 'lucide-react';
// import { UI_LOADING_STATE } from '@/lib/interfaces/UI/UI_Loading_State-enum';
// import { useLoadingState } from '@/lib/hooks/useLoadingState';
// import PrimaryButton from '@/lib/components/commons/Buttons/PrimaryButton';

export default function SignUp({ handleSignUp, formValues, handleInputChange }: any) {
  // const { loading } = useAppSelector((state) => state.ui);
  const [visible, setVisible] = useState<boolean>(false)
  const togglePasswordVisibility = (): void => {
    setVisible(!visible)
  }
  const { email, username, name, password } = formValues;
  const signUpLoading = false
  //useLoadingState(UI_LOADING_STATE.SIGN_UP);
  return (
    <div className="w-full flex flex-col space-y-8 items-center justify-center ">
      {/* <h2 className={` font-bold text-primary-500 text-3xl lg:text-4xl`}>{t('sign_up')}</h2> */}
      <form className='w-full relative flex flex-col justify-center items-center space-y-4' onSubmit={(e) => handleSignUp(e, formValues)}>
        <Input
          autocomplete='email'
          className='w-full p-3 lg:p-4 rounded-lg outline-primary-500 dark:bg-primary-100/20'
          value={email}
          id={'email'}
          type={'email'}
          placeholder="Correo"
          name={'email'}
          onChange={handleInputChange}
        />
        <Input
          autocomplete='name'
          className='w-full p-3 lg:p-4 rounded-lg outline-primary-500 dark:bg-primary-100/20'
          value={name}
          id={'name'}
          type={'text'}
          placeholder="Nombre"
          name={'name'}
          onChange={handleInputChange}
        />
        <div className='relative w-full'>
          <Input
            autocomplete='new-password'
            className='w-full p-3 lg:p-4 rounded-lg outline-primary-500 dark:bg-primary-100/20'
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
          signUpLoading
            ? <button disabled onClick={() => { }}> <ArrowPathIcon className="animate-spin w-6 h-6" /> Creando cuenta </button>
            : <button type='submit' onClick={() => { }}> Crear Cuenta <ArrowRightCircleIcon className="self-en inline-block  h-6 w-6  duration-200 text-active " /></button>
        }
      </form>
    </div>)
}