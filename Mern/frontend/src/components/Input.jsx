/* eslint-disable react/prop-types */
const Input = ({ placeholder, value, name, id, type, onChange }) => {
    return (
        <div className='flex justify-center items-center'>
            <input className='border w-[720px] h-10 p-2 outline-none rounded-md my-4' onChange={onChange} placeholder={placeholder} value={value} name={name} id={id} type={type} />
        </div>
    )
}

export default Input