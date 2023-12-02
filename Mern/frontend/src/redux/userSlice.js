/* eslint-disable no-empty-pattern */
/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: {},
    // sadece 1 tane user geleceginden obje olarak aldım
    isAuth: false,
    loading: false,
}
export const register = createAsyncThunk(
    'register',
    async (data) => {
        try {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data) 
            };
            const response = await fetch(`http://localhost:4000/register`, requestOptions);
            // requestOptions'u backendte olusturdugum register route una Postladım.
            if (!response.ok) {
                throw new Error(`HTTP Hatası! Durum: ${response.status}`);
            }
            const dt = await response.json();
            return dt;
        } catch (error) {
            console.error('HATA:', error);
            throw error; // Bu hata tekrar fırlatarak rejected tetiklenebilir.
        }
    }
);



export const login = createAsyncThunk(
    'login',
    async (data) => {
        try {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: data.email, password: data.password })
            };
            const response = await fetch(`http://localhost:4000/login`, requestOptions);
            // requestOptions'u backendte olusturdugum register route una Postladım.
            if (!response.ok) {
                throw new Error(`HTTP Hatası! Durum: ${response.status}`);
            }
            const dt = await response.json();
            localStorage.setItem("token", dt?.token)
            return dt;
        } catch (error) {
            console.error('HATA:', error);
            throw error; // Bu hata tekrar fırlatarak rejected tetiklenebilir.
        }
    }
);



export const profile = createAsyncThunk(
    'profile',
    async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`http://localhost:4000/me`, {
                headers: {
                    authorization: `bearer ${token}`,
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP Hatası! Durum: ${response.status}`);
            }

            const dt = await response.json();
            return dt;
        } catch (error) {
            console.error('HATA:', error);
            throw error;
        }
    }
);





export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // !Register alanı
        builder.addCase(register.pending, (state, action) => {
            state.loading = true
            state.isAuth = false
        })
        builder.addCase(register.fulfilled, (state, action) => {
            state.loading = false
            state.isAuth = true
            state.user = action.payload
            // gelen kullanıcıyı baslangıc statine yukledim
        })
        // !Login Alanı
        builder.addCase(login.pending, (state, action) => {
            state.loading = true
            state.isAuth = false
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.loading = false
            state.isAuth = true
            state.user = action.payload
        })
        // !Profil Alanı
        builder.addCase(profile.pending, (state, action) => {
            state.loading = true
            state.isAuth = false
        })
        builder.addCase(profile.fulfilled, (state, action) => {
            state.loading = false
            state.isAuth = true
            state.user = action.payload
        })
    }
})
export const { } = userSlice.actions
export default userSlice.reducer