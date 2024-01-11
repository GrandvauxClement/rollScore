import {PlayerScoreType} from "./playerScoreSlice";
import {createSlice} from "@reduxjs/toolkit";

export type GameStoreType = {
    id: string;
    playerScore: PlayerScoreType;
    createdAt: string;
    lastPlay: string;
}

export type AllGameStore = {
    games : GameStoreType[];
}

const initialState: AllGameStore = {
    games: []
}

const gameStoreSlice = createSlice({
    name: 'game-store',
    initialState,
    reducers: {
        addParty: (state, action) => {
            const games = [...state.games];
            games.push(action.payload);

            return {
                games: games
            }
        },
        updatePartyScore: (state, action) => {
            return {
                ...state,
                games: state.games.map((game) => {
                    if (game.id === action.payload.gameId){
                        return {
                            ...game,
                            playerScore: {
                                ...game.playerScore,
                                title: action.payload.title ? action.payload.title : game.playerScore.title,
                                players: action.payload.players,
                                resumeScore: action.payload.resumeScore
                            }
                        }
                    }
                    return game;
                })
            };
        },
        removePartyById: (state, action) => {
            const games = state.games.filter(game => game.id !== action.payload);

            return {
                games: games
            };
        },
        removeAllPartys: () => {
            return {
                games: []
            };
        }
    }
})

export const {
    addParty,
    updatePartyScore,
    removePartyById,
    removeAllPartys
} = gameStoreSlice.actions;
export default gameStoreSlice.reducer;