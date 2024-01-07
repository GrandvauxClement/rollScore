import {createSlice} from '@reduxjs/toolkit';

import Player from '../../views/scoreCount/class/Player';
import {addNewPlayer, calculateTotalScorePlayers} from '../../views/scoreCount/utils/scoreManipulationt';

export type PlayerScoreType = {
    players: Player[];
    resumeScore: number[][];
    gameId: number;
};

const initialState: PlayerScoreType = {
    players: [],
    resumeScore: [],
    gameId: 0,
};

const playerScoreSlice = createSlice({
    name: 'player-score',
    initialState,
    reducers: {
        initPlayers: (state, action) => {
            return {
                ...state,
                gameId: action.payload.gameId,
                players: action.payload.players,
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
        rebootGameWithoutPlayer : () => {
            return {
                ...initialState
            }
        },
        rebootGameWithPlayer : (state) => {

            let resetPlayer = state.players.map(player => ({
                ...player,
                score : 0
            }));
            return {
                players : resetPlayer,
                resumeScore : []
            }
        },
        addNewPlayerRedux: (state, action) => {
            return addNewPlayer(action.payload.name, [...state.players], [...state.resumeScore]) ;
        }

    },
});

export const {
    initPlayers,
    setScoreForNewTurn,
    updateScoreForSpecificTurn,
    rebootGameWithoutPlayer,
    rebootGameWithPlayer,
    addNewPlayerRedux
} = playerScoreSlice.actions;

export default playerScoreSlice.reducer;
