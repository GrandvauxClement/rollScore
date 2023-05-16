import { createSlice } from '@reduxjs/toolkit';
import Player from "../../views/scoreCount/class/Player";
import {calculateTotalScorePlayers} from "../../views/scoreCount/utils/scoreManipulationt";

export type PlayerScoreType = {
    players: Player[],
    resumeScore: number[][]
}

const initialState : PlayerScoreType = {
    players: [],
    resumeScore: []
}

const playerScoreSlice = createSlice({
  name: 'player-score',
    initialState,
    reducers: {
      initPlayers: (state, action) => {
          return {
              ...state,
              players: action.payload
          }
      },
      setScoreForNewTurn : (state, action) => {
          const tempResumeScore = state.resumeScore.concat([action.payload]);
         // tempResumeScore.push(action.payload);
          console.log("èèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèè REDUXXXX setscore value recevied --> ", action.payload);
          console.log("tempTotal score --> ", tempResumeScore);
          const tempPlayer = state.players
         /* const playersUpdate: Player[] = calculateTotalScorePlayers(tempResumeScore, tempPlayer)

          console.log("PlayersUpdate --> ", playersUpdate)*/
            return {
                ...state,
                players: calculateTotalScorePlayers(tempResumeScore, tempPlayer),
                resumeScore: tempResumeScore
            }
      }
    }
})

export const {
    initPlayers,
    setScoreForNewTurn
} = playerScoreSlice.actions;


export default playerScoreSlice.reducer;
