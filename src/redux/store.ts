import {combineReducers, configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import playerScoreSlice, { PlayerScoreType } from './slices/playerScoreSlice';
import AsyncStorage from "@react-native-async-storage/async-storage";
import gameStoreSlice, {AllGameStore} from "./slices/gameStoreSlice";
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from "redux-persist/es/constants";

export type ReduxStore = {
    playersScore: PlayerScoreType;
    gameStore: AllGameStore;
};
const reducers = combineReducers({
    playersScore: playerScoreSlice,
    gameStore: gameStoreSlice
})
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['playersScore', 'gameStore']
};
const persistedReducer = persistReducer(persistConfig, reducers)


// Store of Redux
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        })
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
