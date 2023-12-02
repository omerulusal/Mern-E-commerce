import Input from '../components/Input'
import Button from '../components/Button'
const ResetPassword = () => {
    return (
        <div className='flex h-screen items-center justify-center'>
            <div className="w-1/3 space-y-3">
                <div className='text-3xl '>Yeni Sifre Olustur</div>
                <Input placeholder={"Yeni Sifre"} onChange={() => { }} name={"password"} id={""} type={"password"} />
                <Button text={"Onayla"} onClick={() => { }} />
            </div>
        </div>
    )
}

export default ResetPassword