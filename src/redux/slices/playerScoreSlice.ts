import { createSlice } from '@reduxjs/toolkit';

import Player from '../../views/scoreCount/class/Player';
import {
    addNewPlayer,
    calculateTotalScorePlayers,
} from '../../views/scoreCount/utils/scoreManipulationt';

export type PlayerScoreType = {
    players: Player[];
    resumeScore: number[][];
    gameId: string;
    title: string;
};

const initialState: PlayerScoreType = {
    players: [],
    resumeScore: [],
    gameId: '0',
    title: new Date().toLocaleDateString(),
};

const playerScoreSlice = createSlice({
    name: 'player-score',
    initialState,
    reducers: {
        initPlayers: (state, action) => {
            return {
                ...state,
                title: action.payload.title,
                gameId: action.payload.gameId,
                players: action.payload.players,
            };
        },
        changeGameActive: (state, action) => {
            return {
                title: action.payload.title,
                gameId: action.payload.gameId,
                players: action.payload.players,
                resumeScore: action.payload.resumeScore,
            };
        },
        setScoreForNewTurn: (state, action) => {
            const tempResumeScore = state.resumeScore.concat([action.payload]);
            const tempPlayer = state.players;
            return {
                ...state,
                players: calculateTotalScorePlayers(
                    tempResumeScore,
                    tempPlayer,
                ),
                resumeScore: tempResumeScore,
            };
        },
        updateScoreForSpecificTurn: (state, action) => {
            const tempUpdateScore = state.resumeScore.map(
                (scoreTurn, index) => {
                    if (index === action.payload.turn - 1) {
                        return action.payload.score;
                    } else {
                        return scoreTurn;
                    }
                },
            );

            return {
                ...state,
                players: calculateTotalScorePlayers(
                    tempUpdateScore,
                    state.players,
                ),
                resumeScore: tempUpdateScore,
            };
        },
        rebootGameWithoutPlayer: () => {
            return {
                ...initialState,
            };
        },
        rebootGameWithPlayer: (state, action) => {
            let resetPlayer = state.players.map(player => ({
                ...player,
                score: 0,
            }));
            return {
                ...state,
                players: resetPlayer,
                resumeScore: [],
            };
        },
        addNewPlayerRedux: (state, action) => {
            const playerScore = addNewPlayer(
                action.payload.name,
                [...state.players],
                [...state.resumeScore],
            );
            return {
                ...state,
                players: playerScore.players,
                resumeScore: playerScore.resumeScore,
            };
        },
        updatePlayerNameRedux: (state, action) => {
            const { playerSelected, newName } = action.payload;
            let playersUpdate = state.players.map(player => {
                if (player.name === playerSelected.name) {
                    return { ...player, name: newName };
                } else {
                    return { ...player };
                }
            });

            return {
                ...state,
                players: playersUpdate,
            };
        },
        deletePlayerReduxByIndex: (
            state,
            action: { payload: number; type: string },
        ) => {
            const players = state.players.filter(
                (player, index) => index !== action.payload,
            );
            const resumeScores = state.resumeScore.map(score =>
                score.filter((scoreByUser, index) => index !== action.payload),
            );
            return {
                ...state,
                players: players,
                resumeScore: resumeScores,
            };
        },
        updateTitleRedux: (state, action) => {
            return {
                ...state,
                title: action.payload,
            };
        },
    },
});

export const {
    initPlayers,
    changeGameActive,
    setScoreForNewTurn,
    updateScoreForSpecificTurn,
    rebootGameWithoutPlayer,
    rebootGameWithPlayer,
    addNewPlayerRedux,
    updatePlayerNameRedux,
    deletePlayerReduxByIndex,
    updateTitleRedux,
} = playerScoreSlice.actions;

export default playerScoreSlice.reducer;
