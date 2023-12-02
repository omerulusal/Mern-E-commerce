/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Filter from "../layout/Filter"
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from "../redux/productSlice";
import ProductCard from "../components/ProductCard";

const Products = () => {
    const dispatch = useDispatch();
    const { products, loading } = useSelector((state) => state.products);
    const [price, setPrice] = useState({ min: 0, max: 10000 })
    const [rating, setRating] = useState(0)
    const [category, setCategory] = useState("")

    useEffect(() => {
        dispatch(getProducts({ price, rating, category }))
    }, [dispatch, price, rating, category])
    return (
        <div className="min-h-screen">
            {/* min-h-screen demezsem footer yukarıda kalır. */}
            <div className="flex gap-3">
                <Filter setPrice={setPrice} setRating={setRating} setCategory={setCategory} />
                <div>
                    {
                        loading ? "Loading..." :
                            (
                                <div>
                                    {products?.products && <div className="flex mt-4 justify-center gap-5">
                                        {
                                            products.products?.map((product, i) => (
                                                <ProductCard product={product} key={i} />
                                            ))
                                        }
                                    </div>
                                    }
                                </div>
                            )
                    }
                </div>
            </div>
            <div>pagination</div>
        </div>
    )
}

export default Products