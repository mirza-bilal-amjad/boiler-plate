import {createSlice} from '@reduxjs/toolkit';

const initialState: object = [];

const shiftSlice = createSlice({
    name: 'shifts',
    initialState,
    reducers: {
        setBookedTrue: (state, action) => {
            return state.map(shift =>
                shift.id === action.payload.id
                    ? {...shift, booked: true}
                    : shift
            );
        },
        addToShifts: (state, action) => {
            if (state.some(item => item.id === action.payload.id)) {
                return state;
            } else {
                let flag = action.payload.startTime > new Date().getTime();
                if (flag) {
                    return [...state, action.payload];
                }
            }
        },
        cancelShiftsAndSetFalse: (state, action) => {
            return state.map(shift =>
                shift.id === action.payload.id
                    ? {...shift, booked: false}
                    : shift
            );
        },
    },
});

export const {setBookedTrue, addToShifts, cancelShiftsAndSetFalse} = shiftSlice.actions;

export const availableShiftsReducer = shiftSlice.reducer;
