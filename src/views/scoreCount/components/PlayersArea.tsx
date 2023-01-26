import React, {useEffect, useState} from "react";
import Player from "../class/Player";
import {Button, DataTable} from 'react-native-paper';
import {styles} from "../../../generalStyle";
import AddScoreModal from "./AddScoreModal";

type PlayersAreaType = {
    players: Array<Player>
}

const optionsPerPage = [2, 3, 4];

const PlayersArea = ({players}: PlayersAreaType): JSX.Element => {

    const [page, setPage] = useState<number>(0);
    const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);
    const [arrayScore, setArrayScore] = useState<Array<any>>([])
    const [totalScore, setTotalScore] = useState<Array<any>>([])
    const [playerUpdateScoreSelected, setPlayerUpdateScore] = useState({
        turn: 1,
        namePlayer: players[0].name,
        score: 0
    });
    const [visibleAddScore, setVisibleAddScore] = useState(false);

    useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);

    useEffect(() => {
        let startedArrayScore = [];
        players.map((player) => {
            startedArrayScore.push(player.score)
        })
        setTotalScore(startedArrayScore)
    }, [])

    const addScore = () => {
        const scoreToAd = [25, 2];
        let tempTotalScore = [...totalScore];
        scoreToAd.map((value, index) => {
            tempTotalScore[index] += value;
        })
        setTotalScore(tempTotalScore);
        setArrayScore([...arrayScore, {index: arrayScore.length + 1, score: scoreToAd}])
    }

    const openAddScoreModal = (isNewTurn: boolean, turnSelected : number = 0, playerSelected : string = "", score: number = 0) => {
        if (isNewTurn){
            setPlayerUpdateScore({
                turn: arrayScore.length ,
                namePlayer: players[0].name,
                score: 0
            })
        }else {
            setPlayerUpdateScore({
                turn: turnSelected ,
                namePlayer: playerSelected,
                score: score
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
                        {totalScore.map((num, indexBis) => (
                            <DataTable.Cell
                                style={styles.dataTableWidthItem}
                                key={`total-cell-${indexBis}`}
                            >
                                {num}
                            </DataTable.Cell>
                        ))}
                    </DataTable.Row>

                {arrayScore.map((scoreUser, index) => (
                    <DataTable.Row key={`score-row-${index}`}>
                        <DataTable.Cell
                            style={styles.dataTableWidthItem}
                        >
                            {scoreUser.index}
                        </DataTable.Cell>
                        {scoreUser.score.map((num, indexBis) => (
                            <DataTable.Cell
                                style={styles.dataTableWidthItem}
                                key={`score-cell-${indexBis}`}
                                onPress={() => openAddScoreModal(false, scoreUser.index, players[indexBis].name, num )}
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
