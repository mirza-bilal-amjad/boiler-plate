import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {
    persistReducer,
    persistStore,
} from 'redux-persist';

import theme from './theme';
import {availableShiftsReducer} from "./availableShifts";
import {myShiftsReducer} from "./myShifts";
import AsyncStorage from "@react-native-async-storage/async-storage";

const reducers = combineReducers({
    theme,
    availableShiftsReducer,
    myShiftsReducer,
});

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
});

const persistor = persistStore(store);

setupListeners(store.dispatch);

export {store, persistor};
