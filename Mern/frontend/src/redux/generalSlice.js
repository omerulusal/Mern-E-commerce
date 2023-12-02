/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    keyword: ""
}


export const generalSlice = createSlice({
    name: 'general',
    initialState,
    reducers: {
        getKeyword: (state, action) => {
            state.keyword = action.payload
            // dışarıdan gelen action.payload'ları state.keyword a koy
        },
    }
})
export const { getKeyword } = generalSlice.actions
export default generalSlice.reducer

// bu genelKesitte normalde gelen yazıya gore urun filtreleyip ekrana eklenirdi
// fakat Backend tarafında ProductFilter adlı class hata verdiginden productSlice'a eklemedim.