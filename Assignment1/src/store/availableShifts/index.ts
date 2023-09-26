import {createSlice, Draft, PayloadAction} from '@reduxjs/toolkit';

const initialState: object = [];

const shiftSlice = createSlice({
    name: 'shifts',
    initialState,
    reducers: {
        setBookedTrue: (state: Draft<any>, action) => {
            return state.map((shift: any) =>
                shift.id === action.payload.id
                    ? {...shift, booked: true}
                    : shift
            );
        },
        addToShifts: (state: Draft<any>, action: PayloadAction<any>) => {

            if (state.some((item: any) => item.id === action.payload.id)) {
                return state;
            } else {
                let flag = action.payload.startTime > new Date().getTime();
                if (flag) {
                    return [...state, action.payload];
                }
            }
        },
        cancelShiftsAndSetFalse: (state: Draft<any>, action) => {
            return state.map((shift: any) =>
                shift.id === action.payload.id
                    ? {...shift, booked: false}
                    : shift
            );
        },
    },
});

export const {setBookedTrue, addToShifts, cancelShiftsAndSetFalse} = shiftSlice.actions;

export const availableShiftsReducer = shiftSlice.reducer;
