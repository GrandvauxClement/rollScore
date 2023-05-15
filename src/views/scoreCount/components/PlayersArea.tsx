import React, {useEffect, useState} from "react";
import Player from "../class/Player";
import {Button, DataTable} from 'react-native-paper';
import {styles} from "../../../generalStyle";
import AddScoreModal from "./AddScoreModal";

type PlayersAreaType = {
    players: Player[],
    setPlayers: Function
}

export type PlayerUpdateScore = {
    turn: number,
    newScore: number[],
    indexUserSelected: number,
}

const optionsPerPage = [2, 3, 4];

const PlayersArea = ({players}: PlayersAreaType): JSX.Element => {
    console.log("Players !!! ", players);
    const [page, setPage] = useState<number>(0);
    const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);
    const [arrayScore, setArrayScore] = useState<Array<any>>([])
   // const [totalScore, setTotalScore] = useState<Array<any>>([])
    const [playerUpdateScoreSelected, setPlayerUpdateScore] = useState<PlayerUpdateScore>({
        turn: 1,
        newScore: [],
        indexUserSelected: 0
    });
    const [visibleAddScore, setVisibleAddScore] = useState<boolean>(false);

    useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);

    const addScore = (scoreReceived: number[]) => {
        // Add new score for turn concerned
        // check if this turn already Exist
        console.log("ADDD SCORE !!! :) --> ",scoreReceived)
        if (playerUpdateScoreSelected.turn === arrayScore.length + 1){
            //Is new turn so just add
            setArrayScore([...arrayScore, scoreReceived])
        } else {
            // Update turn concerned !!
            console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ A FAIRE UPDATE SCOrE !! :)")
        }
        console.log("AAARRRRAAAYY SCORE --> ", arrayScore);
        /*let tempPlayersTotalScore = [...players];
        scoreToAd.map((value, index) => {
            tempPlayersTotalScore[index] += value;
        })
        setTotalScore(tempPlayersTotalScore);*/
        //setArrayScore([...arrayScore, {index: arrayScore.length + 1, score: scoreToAd}])

        // Update total score !! :)
    }

    const openAddScoreModal = (isNewTurn: boolean, turnSelected : number = 1, indexPlayerSelected : number = 0) => {
        if (isNewTurn){
            let arrayNewScore = [];
            players.forEach(() => {
                arrayNewScore.push(0);
            })
            setPlayerUpdateScore({
                turn: arrayScore.length + 1,
                newScore: arrayNewScore,
                indexUserSelected: 0,
            })
        }else {
            setPlayerUpdateScore({
                turn: turnSelected,
                newScore: arrayScore[turnSelected - 1],
                indexUserSelected: indexPlayerSelected,
            })
        }
        setVisibleAddScore(true);
    }

    // @ts-ignore
    return (
        <>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title
                        style={styles.dataTableWidthItem}
                    >
                        Tour
                    </DataTable.Title>
                    {players.map((player, index) => (
                        <DataTable.Title
                            key={index}
                            style={styles.dataTableWidthItem}
                        >
                            {player.name}
                        </DataTable.Title>
                    ))}
                </DataTable.Header>

                    <DataTable.Row >
                        <DataTable.Cell
                            style={styles.dataTableWidthItem}
                        >
                            Total
                        </DataTable.Cell>
                        {players.map((player, indexBis) => (
                            <DataTable.Cell
                                style={styles.dataTableWidthItem}
                                key={`total-cell-${indexBis}`}
                            >
                                {player.score}
                            </DataTable.Cell>
                        ))}
                    </DataTable.Row>

                {arrayScore.map((scoreUser, index) => (
                    <DataTable.Row key={`score-row-${index}`}>
                        <DataTable.Cell
                            style={styles.dataTableWidthItem}
                        >
                            {index + 1}
                        </DataTable.Cell>
                        {scoreUser.map((num, indexBis) => (
                            <DataTable.Cell
                                style={styles.dataTableWidthItem}
                                key={`score-cell-${indexBis}`}
                                onPress={() => openAddScoreModal(false, scoreUser.index, indexBis)}
                            >
                                {num}
                            </DataTable.Cell>
                        ))}
                    </DataTable.Row>
                ))}

                <DataTable.Pagination
                    page={page}
                    numberOfPages={3}
                    onPageChange={(page) => setPage(page)}
                    label="1-2 of 6"
                    //@ts-ignore
                    optionsPerPage={optionsPerPage}
                    itemsPerPage={itemsPerPage}
                    setItemsPerPage={setItemsPerPage}
                    showFastPagination
                    optionsLabel={'Rows per page'}
                />
            </DataTable>
            <AddScoreModal
                addScore={addScore}
                visible={visibleAddScore}
                setVisible={setVisibleAddScore}
                scoreInfo={playerUpdateScoreSelected}
                setScoreInfo={setPlayerUpdateScore}
                players={players}
            />

            <Button
                onPress={() => openAddScoreModal(true)}
            >
                Ajouter Score
            </Button>
        </>
  )
}

export default PlayersArea
