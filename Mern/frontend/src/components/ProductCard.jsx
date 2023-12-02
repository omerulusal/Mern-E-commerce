/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react"
import { useNavigate } from "react-router-dom"
import Slider from "react-slick";
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'

const ProductCard = ({ product, edit }) => {
    const navigate = useNavigate()

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
        // slick dokumanından olugu gibi aldım
    };

    return (
        <div className="w-[250px] bg-gray-100 relative" onClick={() => navigate(`/product/${product?._id}`)}>
            {/* //!urune tıklandıgında urldeki productın idsine yonlendirecek */}
            <Slider {...settings}>
                {
                    product?.images?.map((image, i) => (
                        <img key={i} src={image.url} alt="product" />
                    ))
                }
            </Slider>
            <div className="text-xl px-3">{product?.name}</div>
            <div className="text-2xl px-3">{product?.price} TL</div>
            <div className="text-lg px-3">{product?.description}</div>

            {edit && <div className="absolute top-1 right-1 flex gap-2 items-center">
                <AiFillEdit size={24}/>
                <AiFillDelete size={24}/>
            </div>}
        </div >
    )
}

export default ProductCard