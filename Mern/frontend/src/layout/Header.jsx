/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { SlBasket } from 'react-icons/sl'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getKeyword } from '../redux/generalSlice'
const Header = () => {


    const [openMenu, setOpenMenu] = useState(false)
    const [keyword, setKeyword] = useState("")
    const { user, isAuth } = useSelector(state => state.user)
    const { carts } = useSelector(state => state.cart);//store.js teki cart degiskenini cektim carts a atadim
    const navigate = useNavigate();
    const dispatch = useDispatch();//useDispatch, Redux eylemlerini tetiklemek için kullanılır.
    const menuOpen = () => {
        setOpenMenu(!openMenu)
    }
    const menuItems = [
        {
            name: "profil",
            url: "/profile"
        },
        {
            name: "Admin",
            url: "/admin"
        },
        {
            name: "cikis",
            url: "/logout"
        },
    ]

    const menuFunc = (item) => {
        if (item.name == "cikis") {
            //logout
            localStorage.clear()
            window.location = "/"
            console.log("cıkısss")
        } else {
            window.location = item.url
        }
    }
    const keywordFunc = () => {
        dispatch(getKeyword(keyword))//getKeyword actionuma keyword parametresi gonderdim
        setKeyword("")//aradıktan sonra input temizlenir 
        navigate('/products')
        // işlem gercekleştiginde urlde /products sayfasına yonlendirdim. 
    }

    return (
        <div className="bg-red-200 h-16 px-2 flex items-center justify-between">
            <div className="ml-24 text-4xl cursor-pointer" onClick={() => navigate("/")}>
                OM3R
            </div>
            <button className='p-3 bg-red-300 bg-opacity-30 rounded-lg transition-all hover:bg-opacity-50 gap-5' onClick={() => navigate("/auth")}>Kayıt Ol <span className='px-4'>||</span>Giris yap</button>
            <div className="flex items-center gap-5">
                <div className='flex items-center'>
                    <input value={keyword} onChange={e => setKeyword(e.target.value)} className='p-2 outline-none rounded-md' type="text" placeholder="Arama yap" />
                    <div onClick={keywordFunc} className="p-2 ml-1 bg-white cursor-pointer rounded-md">Ara</div>
                </div>
                <div className="relative w-8 h-8">
                    <img onClick={menuOpen} className='rounded-full' src={user?.user ? user?.user?.avatar?.url : "https://static.vecteezy.com/system/resources/previews/005/129/844/non_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"} alt="user" />
                    {/* giris yapılmıssa kayıtlı resmi profile ekler aksi halde default ekler */}

                    {openMenu && <div className="absolute right-0 mt-3 w-[200px] bg-white shadow-xl shadow-gray -700">
                        {
                            menuItems.map((item, i) => {
                                return <div onClick={() => menuFunc(item)} className='cursor-pointer hover:bg-gray-100 hover:text-blue-900 px-2 py-1' key={i}>{item.name}</div>
                            })
                        }
                    </div>}
                </div>
                <div onClick={() => navigate('/cart')} className="relative">
                    <SlBasket size={30} />
                    <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">{carts?.length}</div>
                </div>
            </div>

        </div>
    )
}

export default Header