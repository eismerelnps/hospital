'use client'
import { useState } from "react";
//hooks
import { useAppDispatch } from "@/lib/redux/hooks";
import { usePathname, useRouter } from "next/navigation";

import Image from 'next/image'
import { AUTH_ACTION } from "./Auth_Action.enum";
import useVerifyIdentifier from "./hooks/useVerifyIdentifier";
import useVerifyPassword from "./hooks/useVerifyPassword ";
import { startCreatingUser, startUserLogin } from "@/lib/redux/features/auth/authSlice";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { useForm } from "@/lib/hooks/useForm";
import { useSignInMutation } from "@/lib/redux/features/auth/authApiSlice";
import { toast } from "sonner";

const mainChatId = process.env.NEXT_PUBLIC_MAIN_CHAT_ID

export default function AuthContainer() {
  const [authAction, setAuthAction] = useState<AUTH_ACTION>(AUTH_ACTION.SIGN_IN)
  // const t = useTranslations('app');
  const dispatch = useAppDispatch();
  const { validation, verifyIdentifier } = useVerifyIdentifier();
  const { passwordValidation, verifyPassword } = useVerifyPassword();

  const router = useRouter();
  const path = usePathname();
  //to show and hide password on input
  const [showPassword, setShowPassword] = useState<string>('password');//to show & hide password on input
  const togglePasswordVisibility = () => {
    if (showPassword === 'password') {
      setShowPassword('text')
    } else {
      setShowPassword('password')
    }
  };
  //to manage form
  const [formValues, handleInputChange] = useForm({
    identifier: '',
    email: '',
    username: '',
    password: '',
  });

  const [signin, { isLoading: isSignInLoading, isSuccess: isSignInSuccess, isError: isErrorAddingTech }] = useSignInMutation()

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>, identifier: string, password: string) => {
    e.preventDefault();
    const isValidIdentifier = verifyIdentifier(identifier);
    if (isValidIdentifier) {
      if (password.trim().length > 0 && password.trim().length < 128) {
        signin({ email: identifier, password: password })
      } 
    }
  }
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>, userData: any) => {
    e.preventDefault();
    const isValidIdentifier = verifyIdentifier(userData.email);
    const isValidPassword = verifyPassword(userData.password)
    if (isValidIdentifier && isValidPassword) {
      const data = await dispatch(startCreatingUser(userData));
      if (data && data.user) router.replace(`/`)
    }
    // else dispatch(uiSetNotification({ type: NOTIFICATION_TYPE.WARN, message: validation.message || passwordValidation.message }));
  }

  return (
    <div id="auth" className="grid grid-rows-2 lg:grid-rows-1 lg:grid-cols-2 bg-primary-50 dark:bg-primary-950 px-[5%] py-24 lg:py-28 ">

      <article className='flex flex-col justify-center items-center lg:items-start px-4' >
        <div className='flex flex-col gap-2 lg:gap-4 justify-start items-center lg:items-start ' >
          <h4 className='bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-red-500 text-xl lg:text-3xl text-center lg:text-start'>Sistema de Gestión Hospitalaria</h4>
          <p className='text-md lg:text-lg opacity-70 text-center lg:text-start '></p>
        </div>
      </article>

      <div className="flex justify-center items-center">
        <div className=" flex flex-col items-center justify-center gap-4 w-72 lg:w-96 ">
          <section className="w-full flex flex-row rounded-lg justify-between bg-primary-50 dark:bg-primary-950">
            <button onClick={() => setAuthAction(AUTH_ACTION.SIGN_IN)} className={`p-3 lg:p-4 text-nowrap rounded-lg font-bold ${authAction === AUTH_ACTION.SIGN_IN && 'bg-primary-500 text-white w-full'}`}>Autenticarse</button>
            <button onClick={() => setAuthAction(AUTH_ACTION.SIGN_UP)} className={`p-3 lg:p-4 text-nowrap rounded-lg font-bold ${authAction === AUTH_ACTION.SIGN_UP && 'bg-primary-500 text-white w-full'}`}>Crear Cuenta</button>
          </section >
          {authAction === AUTH_ACTION.SIGN_IN && <SignIn handleInputChange={handleInputChange} formValues={formValues} handleSignIn={handleSignIn} showPassword={showPassword} togglePasswordVisibility={togglePasswordVisibility} />}
          {authAction === AUTH_ACTION.SIGN_UP && <SignUp handleInputChange={handleInputChange} formValues={formValues} handleSignUp={handleSignUp} showPassword={showPassword} togglePasswordVisibility={togglePasswordVisibility} />}
        </div>
      </div>
    </div >
  )
}