import {createSlice, Draft, PayloadAction} from '@reduxjs/toolkit';

const initialState: object = {
    loggedIn: false
};

const shiftSlice = createSlice({
    name: 'shifts',
    initialState,
    reducers: {
        setLogIn: (state: Draft<any>, action: PayloadAction<any>) => {
            state.loggedIn = action.payload;
        }
    },
});

export const {setLogIn} = shiftSlice.actions;

export const logInReducer = shiftSlice.reducer;
