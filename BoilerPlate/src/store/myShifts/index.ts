import {createSlice} from "@reduxjs/toolkit";

const initialState: object = [];

const slice = createSlice({
    name: 'myShifts',
    initialState,
    reducers: {
        addToMyShifts: (state, action) => {
            if (state.some(item => item.id === action.payload.id)) {
                return state;
            } else {
                let flag = action.payload.startTime > new Date().getTime();
                if (flag) {
                    return [...state, action.payload];
                }
            }
        },
        cancelMyShifts: (state, action) => {
            return state.filter(shift => shift.id !== action.payload.id);
        }
    }
});

export const {addToMyShifts, cancelMyShifts} = slice.actions;

export const myShiftsReducer = slice.reducer;
