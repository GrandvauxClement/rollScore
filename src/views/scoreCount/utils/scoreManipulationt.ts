import Player from "../class/Player";

export const calculateTotalScorePlayers = (allScore: number[][], players: Player[]): Player[] => {
    console.log("}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}} on methode utils allScore received --> ", allScore);
    console.log("Players received --> ", players)

  let stockTotal: number[] = [];
  allScore.forEach((scoreTurn, index) => {
      console.log("Boucle for scor turn --> ", index)
      scoreTurn.forEach((score, indexBis) => {
          if (index === 0){
              stockTotal[indexBis] = score
          } else {
              stockTotal[indexBis] += score;
          }
      })
  })
    console.log("}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}} on methode utils stock total calcul --> ", stockTotal);
    // Total score are calculte
    const updatedPlayers = players.map((player, index) => {
        const updatedPlayer = {...player};
        updatedPlayer.score = stockTotal[index];
        return updatedPlayer
    })

    return updatedPlayers
}
