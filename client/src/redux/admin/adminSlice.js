import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    modalIsOpen: false
}

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        openModal: (state) => {
            state.modalIsOpen = true;
        },
        closeModal: (state) => {
            state.modalIsOpen = false;
        },

    }
})

export const {
    openModal,
    closeModal
} = adminSlice.actions;
export default adminSlice.reducer;