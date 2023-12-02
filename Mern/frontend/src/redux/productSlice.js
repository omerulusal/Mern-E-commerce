/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: [],
    // tum urunlerimi bu dizide tutacagim
    adminProducts: [],
    product: {},
    // sadece 1 tane product geleceginden obje olarak aldım
    loading: false,
}
export const getProducts = createAsyncThunk(
    'products',
    async () => {
        try {
            const response = await fetch(`http://localhost:4000/products`);
            if (!response.ok) {
                throw new Error(`HTTP Hatası! Durum: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.error('HATA:', error);
            throw error; // Bu hata tekrar fırlatarak rejected tetiklenebilir.
        }
    }
);

export const getAdminProducts = createAsyncThunk(
    'admin',
    async () => {
        try {
            const token = localStorage.getItem("token")
            const response = await fetch(`http://localhost:4000/admin/products`, { headers: { authorization: `bearer ${token}` } });
            if (!response.ok) {
                throw new Error(`HTTP Hatası! Durum: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('HATA:', error);
            throw error; // Bu hata tekrar fırlatarak rejected tetiklenebilir.
        }
    }
);

export const getProductDetail = createAsyncThunk(
    'product',
    async (id) => {
        try {
            const response = await fetch(`http://localhost:4000/products/${id}`);
            if (!response.ok) {
                throw new Error(`HTTP Hatası! Durum: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('HATA:', error);
            throw error; // Bu hata tekrar fırlatarak rejected tetiklenebilir.
        }
    }
);

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProducts.pending, (state, action) => {
            // verinin yuklenme bekleyisini pending temsil eder
            state.loading = true
        })
        builder.addCase(getProducts.fulfilled, (state, action) => {
            // verinin yuklenmesini fulfilled temsil eder
            state.loading = false
            state.products = action.payload
            // gelen veriyi baslangıc statine yukledim
        })
        builder.addCase(getProductDetail.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getProductDetail.fulfilled, (state, action) => {
            state.loading = false
            state.product = action.payload
        })
        builder.addCase(getAdminProducts.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getAdminProducts.fulfilled, (state, action) => {
            state.loading = false
            state.adminProducts = action.payload
        })
    }
})
export default productSlice.reducer