/* eslint-disable react/prop-types */
import { AiOutlineClose } from 'react-icons/ai'
const Modal = ({ title, content }) => {
    return (
        <div className='w-full h-full fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center'>
            <div className="w-[500px] bg-white border p-4 rounded-md">
                <div className="flex items-center justify-between">
                    <div className='text-xl'>{title}</div>
                    <AiOutlineClose size={25} />
                </div>
                {content}
            </div>
        </div>
    )
}

export default Modal