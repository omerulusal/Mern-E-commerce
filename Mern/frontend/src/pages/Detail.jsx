/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetail } from '../redux/productSlice';
import { BsFillStarFill } from "react-icons/bs"
import { addToCart } from '../redux/cartSlice'
import Slider from "react-slick";
import Button from '../components/Button';

const Detail = () => {
    const { id } = useParams()
    // id degeri dinamik bir yapı oldugundan boyle tanımladım
    const dispatch = useDispatch()
    const { loading, product } = useSelector(state => state.products)
    useEffect(() => {
        if (id) {
            dispatch(getProductDetail(id))
        }
    }, [dispatch, id])
    // useEffect her id degistiginde calıssın ve bunu dispatchlesin istedim
    console.log(loading, product, "loading, product")

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
        // slick dokumanından olugu gibi aldım
    };

    const [adet, setAdet] = useState(1)
    if (adet < 0) {
        setAdet(0)
    }
    if (adet > product?.product?.stock) {
        setAdet(adet - 1)
    }
    const addBasket = () => {
        const data = {
            id: product?.product?._id,
            name: product?.product?.name,
            image: product?.product?.images?.[0],
            price: product?.product?.price,
            adet: adet
        }
        dispatch(addToCart())
    }
    return (
        <>
            {
                loading ? "Loading..." : <div className='w-[900px] min-h-screen'>
                    <div className="flex mt-4 justify-center gap-5">{// eger dısarıdan gelen productlar altında product varsa
                        product?.product && <div className="">
                            <Slider {...settings}>
                                {
                                    product?.product?.images?.map((image, i) => (
                                        <img key={i} src={image.url} alt="product" />
                                    ))
                                }
                            </Slider>
                        </div>
                    }
                        <div className='m-auto w-full'>
                            <div className='text-4xl mt-2'>{product?.product?.name}</div>
                            <div className='text-2xl mt-2'>{product?.product?.description}</div>
                            <div className='text-3xl mt-2'>{product?.product?.price}TL</div>
                            {product?.product?.stock > 0 ? <div className='text-xl mt-10 text-lime-600'>Stok sayısı: {product?.product?.stock}</div> : <div>Urun Stokta Kalmadı</div>}
                            <div className='text-xl mt-1'>Kategory: {product?.product?.category}</div>
                            <div className='text-xl mt-1 flex items-center gap-3'>Rating: {product?.product?.rating}<BsFillStarFill /> </div>
                            <div className="mt-10 flex items-center gap-4">
                                <div className="text-3xl cursor-pointer" onClick={() => setAdet(adet - 1)}>-</div>
                                <div className="text-4xl bg-slate-200 rounded-md w-10 text-center"> {adet} </div>
                                <div className="text-3xl cursor-pointer" onClick={() => setAdet(adet + 1)}>+</div>
                            </div>
                            <Button text={"Sepete Ekle"} onClick={addBasket} />
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Detail