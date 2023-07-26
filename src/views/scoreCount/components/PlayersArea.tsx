import React, {ReactElement, useRef, useState} from 'react';
import { Button, DataTable } from 'react-native-paper';
import { useSelector } from 'react-redux';

import AddScoreModal from './AddScoreModal';
import { styles } from '../../../generalStyle';
import {
    setScoreForNewTurn,
    updateScoreForSpecificTurn,
} from '../../../redux/slices/playerScoreSlice';
import { ReduxStore, store } from '../../../redux/store';
import {ScrollView, View} from "react-native";
import RebootGameModal from "./RebootGameModal";
import AddNewPlayerModal from "./AddNewPlayerModal";

export type PlayerUpdateScore = {
    turn: number;
    newScore: number[];
    indexUserSelected: number;
};

type PlayerAreaType = {
    setInitGame : any
}

const PlayersArea = ({setInitGame}: PlayerAreaType): ReactElement => {
    const players = useSelector(
        (state: ReduxStore) => state.playersScore,
    ).players;

    const scrollViewRef = useRef(null);
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
    const [visibleRebootGame, setVisibleRebootGame] = useState<boolean>(false);
    const [visibleAddNewPlayer, setVisibleAddNewPlayer] = useState<boolean>(false);

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
        scrollViewRef.current.scrollToEnd({animated: true})
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
            <View style={{flexDirection: "row"}}>
                <Button
                    onPress={() => setVisibleAddNewPlayer(true)}
                    mode={'contained'}
                    style={{margin: 5}}
                >
                    Ajouter joueur
                </Button>
                <Button
                    onPress={() => setVisibleRebootGame(true)}
                    mode={'contained'}
                    style={{margin: 5}}
                >
                    Recommencer une partie
                </Button>
            </View>
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
                <ScrollView ref={scrollViewRef} style={{height: "60%"}}>
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
                </ScrollView>

            </DataTable>
            <AddScoreModal
                addScore={addScore}
                visible={visibleAddScore}
                setVisible={setVisibleAddScore}
                scoreInfo={playerUpdateScoreSelected}
                setScoreInfo={setPlayerUpdateScore}
            />

            <RebootGameModal
                setInitGame={setInitGame}
                visible={visibleRebootGame}
                setVisible={setVisibleRebootGame}
            />

            <AddNewPlayerModal
                visible={visibleAddNewPlayer}
                setVisible={setVisibleAddNewPlayer}
            />

            <Button
                onPress={() => openAddScoreModal(true)}
                mode={'contained'}
                style={{marginTop: 10}}
            >
                Ajouter Score
            </Button>
        </>
    );
};
export default PlayersArea;
