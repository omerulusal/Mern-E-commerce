/* eslint-disable no-unused-vars */
import React from 'react'
import Input from '../components/Input'
import Button from '../components/Button'

const ForgotPassword = () => {
    return (
        <div className='flex h-screen items-center justify-center'>
            <div className="w-1/3 space-y-3">
                <div className='text-3xl '>Sifremi Unuttum</div>
                <Input placeholder={"Email"} onChange={() => { }} name={"email"} id={""} type={"text"} />
                <Button text={"Onayla"} onClick={() => { }} />
            </div>
        </div>
    )
}

export default ForgotPassword