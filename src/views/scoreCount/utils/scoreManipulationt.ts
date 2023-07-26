import Player from '../class/Player';

export const calculateTotalScorePlayers = (
    allScore: number[][],
    players: Player[],
): Player[] => {
    const stockTotal: number[] = [];
    allScore.forEach((scoreTurn, index) => {
        scoreTurn.forEach((score, indexBis) => {
            if (index === 0) {
                stockTotal[indexBis] = score;
            } else {
                stockTotal[indexBis] += score;
            }
        });
    });
    // Total score are calculte
    return players.map((player, index) => {
        const updatedPlayer = {...player};
        updatedPlayer.score = stockTotal[index];
        return updatedPlayer;
    });
};

export const calculateTotalScoreByHisHistory = (
    historyScore: any[],
): number => {
    let total: number = 0;
    let calculFinish: boolean = false;
    let index = 0;
    while (!calculFinish) {
        if (index === 0) {
            total = historyScore[index];
            if (historyScore.length <= 2) {
                calculFinish = true;
            } else {
                index++;
            }
        } else {
            if (
                typeof historyScore[index] === 'string' &&
                typeof historyScore[index + 1] === 'number'
            ) {
                if (historyScore[index] === 'subtraction') {
                    total -= historyScore[index + 1];
                } else if (historyScore[index] === 'addition') {
                    total += historyScore[index + 1];
                } else if (historyScore[index] === 'multiplication') {
                    total = total * historyScore[index + 1];
                } else if (historyScore[index] === 'division') {
                    total = total / historyScore[index];
                }

                if (historyScore.length <= index + 2) {
                    calculFinish = true;
                } else {
                    index += 2;
                }
            } else {
                calculFinish = true;
            }
        }
    }
    return total;
};

export const addNewPlayer = (name : string, players: Player[], resumeScore: number[][]) : {players: Player[], resumeScore: number[][]} =>{
    players.push({name: name, score: 0});
    let tempScore = resumeScore.map((score) => {
        let test = [...score];
        test.push(0)
       return test;
    })

    return {
        players,
        resumeScore: tempScore
    }
}
