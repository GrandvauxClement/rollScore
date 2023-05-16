import { configureStore } from '@reduxjs/toolkit';
import playerScoreSlice, {PlayerScoreType} from "./slices/playerScoreSlice";



export type ReduxStore = {
    playersScore: PlayerScoreType;
};

// Store of Redux
export const store = configureStore({
    reducer: {
        playersScore: playerScoreSlice,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
