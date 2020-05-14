import { createSlice } from '@reduxjs/toolkit';

export interface View {
    isMenuOpen: boolean;
}

const initialState: View = {
    isMenuOpen: false,
};

export const viewSlice = createSlice({
    name: 'view',
    initialState,
    reducers: {
        openMenu: (state) => {
            state.isMenuOpen = true;
        },
        closeMenu: (state) => {
            state.isMenuOpen = false;
        },
    },
});

export const asyncViewActions = {};
export const viewActions = { ...viewSlice.actions, ...asyncViewActions };
