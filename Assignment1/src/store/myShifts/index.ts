import {createSlice, Draft, PayloadAction} from "@reduxjs/toolkit";

const initialState: object = [];

const slice = createSlice({
    name: 'myShifts',
    initialState,
    reducers: {
        addToMyShifts: (state: Draft<any>, action: PayloadAction<any>) => {
            if (state.some((item: any) => item.id === action.payload.id)) {
                return state;
            } else {
                let flag = action.payload.startTime > new Date().getTime();
                if (flag) {
                    return [...state, action.payload];
                }
            }
        },
        cancelMyShifts: (state: Draft<any>, action: PayloadAction<any>) => {
            return state.filter((shift: any) => shift.id !== action.payload.id);
        }
    }
});

export const {addToMyShifts, cancelMyShifts} = slice.actions;

export const myShiftsReducer = slice.reducer;
