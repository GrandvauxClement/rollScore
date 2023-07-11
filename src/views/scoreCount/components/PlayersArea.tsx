import React, { ReactElement, useEffect, useState } from 'react';
import { Button, DataTable } from 'react-native-paper';
import { useSelector } from 'react-redux';

import AddScoreModal from './AddScoreModal';
import { styles } from '../../../generalStyle';
import {
    setScoreForNewTurn,
    updateScoreForSpecificTurn,
} from '../../../redux/slices/playerScoreSlice';
import { ReduxStore, store } from '../../../redux/store';

export type PlayerUpdateScore = {
    turn: number;
    newScore: number[];
    indexUserSelected: number;
};

const optionsPerPage = [2, 3, 4];

const PlayersArea = (): ReactElement => {
    const players = useSelector(
        (state: ReduxStore) => state.playersScore,
    ).players;

    const [page, setPage] = useState<number>(0);
    const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);
    const arrayScore = useSelector(
        (state: ReduxStore) => state.playersScore,
    ).resumeScore;
    const [playerUpdateScoreSelected, setPlayerUpdateScore] =
        useState<PlayerUpdateScore>({
            turn: 1,
            newScore: [],
            indexUserSelected: 0,
        });
    const [visibleAddScore, setVisibleAddScore] = useState<boolean>(false);

    useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);

    const addScore = (scoreReceived: number[]) => {
        // Add new score for turn concerned
        // check if this turn already Exist
        if (playerUpdateScoreSelected.turn === arrayScore.length + 1) {
            //Is new turn so just add
            store.dispatch(setScoreForNewTurn(scoreReceived));
        } else {
            // Update turn concerned !!
            store.dispatch(
                updateScoreForSpecificTurn({
                    score: scoreReceived,
                    turn: playerUpdateScoreSelected.turn,
                }),
            );
        }
    };

    const openAddScoreModal = (
        isNewTurn: boolean,
        turnSelected: number = 1,
        indexPlayerSelected: number = 0,
    ) => {
        if (isNewTurn) {
            const arrayNewScore: number[] = [];
            players.forEach(() => {
                arrayNewScore.push(0);
            });
            setPlayerUpdateScore({
                turn: arrayScore.length + 1,
                newScore: arrayNewScore,
                indexUserSelected: 0,
            });
        } else {
            setPlayerUpdateScore({
                turn: turnSelected,
                newScore: arrayScore[turnSelected - 1],
                indexUserSelected: indexPlayerSelected,
            });
        }
        setVisibleAddScore(true);
    };

    return (
        <>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title style={styles.dataTableWidthItem}>
                        Tour
                    </DataTable.Title>
                    {players.map((player, index) => (
                        <DataTable.Title
                            key={index}
                            style={styles.dataTableWidthItem}>
                            {player.name}
                        </DataTable.Title>
                    ))}
                </DataTable.Header>

                <DataTable.Row>
                    <DataTable.Cell style={styles.dataTableWidthItem}>
                        Total
                    </DataTable.Cell>
                    {players.map((player, indexBis) => (
                        <DataTable.Cell
                            style={styles.dataTableWidthItem}
                            key={`total-cell-${indexBis}`}>
                            {player.score}
                        </DataTable.Cell>
                    ))}
                </DataTable.Row>

                {arrayScore.map((scoreUser, index) => (
                    <DataTable.Row key={`score-row-${index}`}>
                        <DataTable.Cell style={styles.dataTableWidthItem}>
                            {index + 1}
                        </DataTable.Cell>
                        {scoreUser.map((num, indexBis) => (
                            <DataTable.Cell
                                style={styles.dataTableWidthItem}
                                key={`score-cell-${indexBis}`}
                                onPress={() =>
                                    openAddScoreModal(
                                        false,
                                        index + 1,
                                        indexBis,
                                    )
                                }>
                                {num}
                            </DataTable.Cell>
                        ))}
                    </DataTable.Row>
                ))}

                <DataTable.Pagination
                    page={page}
                    numberOfPages={3}
                    onPageChange={page => setPage(page)}
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
            />

            <Button onPress={() => openAddScoreModal(true)} mode={'contained'}>
                Ajouter Score
            </Button>
        </>
    );
};
export default PlayersArea;
