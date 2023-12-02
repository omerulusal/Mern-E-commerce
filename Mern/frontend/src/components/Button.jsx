/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'

const Button = ({ text, onClick }) => {
    return (
        <button className='w-full h-10 flex items-center justify-center bg-black text-white mt-5 px-10 rounded-md text-lg' onClick={onClick}>
            {text}
        </button>
    )
}

export default Button