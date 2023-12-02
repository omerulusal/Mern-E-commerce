/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminProducts } from '../redux/productSlice';
import ProductCard from '../components/ProductCard';
import Button from '../components/Button';
import Modal from '../components/Modal';
import Input from '../components/Input';

const Admin = () => {
    const dispatch = useDispatch()
    const { adminProducts } = useSelector(state => state.products)
    const { openModal } = useSelector(state => state.general)
    const [data, setData] = useState({
        name: "",
        description: "",
        rating: null,
        price: null,
        stock: null,
        category: "",
        images: [],
    })

    useEffect(() => {
        dispatch(getAdminProducts())
    }, [dispatch]);
    const addProduct = () => {

    }
    const productHandle = (e) => {
        if (e.target.name == "images") {
            return;
        } else {
            setData(prev => ({ ...prev, [e.target.name]: [e.target.value] }))
        }
    }
    const content = () => {
        <div className='my-3'>
            <Input onChange={productHandle} name={"name"} id={""} placeholder={"Urun Adı"} type={"text"} value={""} key={""} />
            <Input onChange={productHandle} name={"description"} id={""} placeholder={"Urun Acıklaması"} type={"text"} value={""} key={""} />
            <Input onChange={productHandle} name={"price"} id={""} placeholder={"Urun Fiyatı"} type={"number"} value={""} key={""} />
            <Input onChange={productHandle} name={"category"} id={""} placeholder={"Urun kategorisi"} type={"text"} value={""} key={""} />
            <Input onChange={productHandle} name={"stock"} id={""} placeholder={"Urun Stogu"} type={"number"} value={""} key={""} />
            <Input onChange={productHandle} name={"rating"} id={""} placeholder={"Urun Puanı"} type={"number"} value={""} key={""} />
            <Input onChange={productHandle} name={"images"} id={""} placeholder={""} type={"files"} value={""} key={""} />
        </div>
    }
    return (
        <div className="min-h-screen">
            <Button name={"Urun Ekle"} onClick={addProduct} />
            {
                adminProducts?.products && <div className="flex items-center justify-center gap-5 my-5 flex-wrap">
                    {
                        adminProducts?.products?.map((product, i) => (
                            <ProductCard edit={true} product={product} key={i} />
                        ))
                    }
                </div>
            }
            {openModal && <Modal title={"Urun Ekle"} content={content} />}
        </div>
    )
}

export default Admin