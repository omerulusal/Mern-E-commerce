/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import { useDispatch, useSelector } from "react-redux"
import { login, register } from '../redux/userSlice'
import { useNavigate } from 'react-router-dom'

const Auth = () => {
    const [signUp, setSignUp] = useState(true)
    const dispatch = useDispatch()
    const { user, isAuth } = useSelector(state => state.user)
    const [data, setData] = useState({ name: "", email: "", password: "", avatar: "" })
    const [preview, setPreview] = useState('https://static.vecteezy.com/system/resources/previews/005/129/844/non_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg')
    const registerFunc = () => {
        dispatch(register(data))
    }
    const loginFunc = () => {
        dispatch(login(data))
    }
    const handleChange = (e) => {
        if (e.target.name == "avatar") {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setData(prev => ({ ...prev, avatar: reader.result }))
                    setPreview(reader.result)
                }
            }
            reader.readAsDataURL(e.target.files[0])
        } else {
            setData(prev => ({ ...prev, [e.target.name]: e.target.value }))
        }
    }
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuth) {
            navigate('/')
            // eger kullanıcı giris yaparsa anasayfaya yonlendirir
        }
    }, [isAuth]);
    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className='border p-24  bg-red-200 rounded-xl shadow-2xl'>
                <div className="text-2xl text-center">{signUp ? "Kayıt Ol" : "Giriş Yap"}</div>
                {signUp && <Input onChange={handleChange} value={data.name} type={"text"} name={"name"} id={""} placeholder={"Ad"} />}
                {/* signUp && : signUp ozelligi true ise gosterecektır. */}
                <Input onChange={handleChange} value={data.email} type={"email"} name={"email"} id={""} placeholder={"email"} />
                <Input onChange={handleChange} value={data.password} type={"password"} name={"password"} id={""} placeholder={"sifre"} />
                {signUp && <div className="relative flex justify-center items-center gap-2">
                    <img src={preview} alt="avatar" className='rounded-full w-10 h-10 absolute -left-10' />
                    <Input onChange={handleChange} type={"file"} name={"avatar"} id={""} placeholder={""} />
                </div>}
                <div className='text-red-500 text-sm cursor-pointer my-4' onClick={() => setSignUp(!signUp)}>{signUp ? "Giriş Yap" : "Kayıt Ol"} </div>
                <div className='text-red-500 text-sm cursor-pointer my-4' onClick={() => navigate('/forgot') }>{signUp ? "" : "Sifremi Unuttum"} </div>
                <Button text={signUp ? "Kayıt Ol" : "Giriş Yap"} onClick={signUp ? registerFunc : loginFunc} />
            </div>
        </div>
    )
}

export default Auth