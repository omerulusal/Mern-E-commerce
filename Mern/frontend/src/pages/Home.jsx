/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getProducts } from "../redux/productSlice";
import ProductCard from "../components/ProductCard";

const Home = () => {
    const dispatch = useDispatch();
    const { products, loading } = useSelector(state => state.products)
    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])

    console.log(products, loading, 'urunler!!!!')
    return (
        <>
        <div>
            <img className="h-[780px] object-none object-top w-full" src="https://media.gq.com/photos/6082dee078652f9e2ec22a66/master/pass/ShopRage.jpg" alt="image" />
        </div>
            {
                loading ? "Loading..." : <div>
                    {
                        products?.products && <div className="flex items-center justify-center gap-10 my-5 flex-wrap">
                            {
                                products?.products?.map((product, i) => (
                                    <ProductCard product={product} key={i} />
                                ))
                            }
                        </div>
                    }
                </div>
            }
        </>
    )
}

export default Home