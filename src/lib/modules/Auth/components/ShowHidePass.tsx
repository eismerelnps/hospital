'use client'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/20/solid'
import React, { useState } from 'react'

export default function ShowHidePass({ visible, togglePasswordVisibility }: { visible: boolean, togglePasswordVisibility: () => void }) {


    return (
        <button type="button" onClick={togglePasswordVisibility} className={`absolute bottom-0 top-0 right-1 p-2 text-gray-500 z-10  rounded-full hover:scale-105`}>
            {visible ? <EyeSlashIcon className="h-6 w-6 text-slate-500 dark:text-slate-50" /> : <EyeIcon className="block h-6 w-6 text-slate-500 dark:text-slate-50" />}
        </button>
    )
}
