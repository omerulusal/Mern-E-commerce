import { AiOutlineFacebook } from "react-icons/ai"
import { SlSocialInstagram, SlSocialLinkedin } from "react-icons/sl"
const Footer = () => {

    return (
        <div className="h-64 bg-red-200 text-2xl flex items-center justify-around">
            <div className="flex justify-center items-center">
                <div className="px-28">
                    <div className="logo"> <span>OM3R</span></div>
                    <h4>2024 &copy; All rights reserved by Ömer Ulusal</h4>
                </div>
                <div className="px-28">
                    <ul className="flex items-center justify-center gap-4">
                        <li><a href="#" className="p-2 hover:bg-red-300 hover:bg-opacity-50 rounded-lg" >About</a></li>
                        <li><a href="#" className="p-2 hover:bg-red-300 hover:bg-opacity-50 rounded-lg" >Contacts</a></li>
                        <li><a href="#" className="p-2 hover:bg-red-300 hover:bg-opacity-50 rounded-lg" >Services</a></li>
                        <li><a href="#" className="p-2 hover:bg-red-300 hover:bg-opacity-50 rounded-lg" >Privacy</a></li>
                        <li><a href="#" className="p-2 hover:bg-red-300 hover:bg-opacity-50 rounded-lg" >Cookies</a></li>
                    </ul>
                </div>
                <div className="px-56">
                    <ul className="flex items-center justify-center gap-5">
                        <li><a href="#" className="p-2 rounded-lg" ><AiOutlineFacebook size={38} /> </a></li>
                        <li><a href="#" className="p-2 rounded-lg" > <SlSocialLinkedin size={38} /> </a></li>
                        <li><a href="#" className="p-2 rounded-lg" > <SlSocialInstagram size={38} /> </a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Footer