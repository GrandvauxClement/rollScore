import { createSlice } from '@reduxjs/toolkit';

import Player from '../../views/scoreCount/class/Player';
import { calculateTotalScorePlayers } from '../../views/scoreCount/utils/scoreManipulationt';

export type PlayerScoreType = {
    players: Player[];
    resumeScore: number[][];
};

const initialState: PlayerScoreType = {
    players: [],
    resumeScore: [],
};

const playerScoreSlice = createSlice({
    name: 'player-score',
    initialState,
    reducers: {
        initPlayers: (state, action) => {
            return {
                ...state,
                players: action.payload,
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
    },
});

export const { initPlayers, setScoreForNewTurn, updateScoreForSpecificTurn } =
    playerScoreSlice.actions;

export default playerScoreSlice.reducer;
