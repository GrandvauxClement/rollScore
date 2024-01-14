import React, {ReactElement, useEffect, useRef, useState} from 'react';
import {Button, DataTable, MD3Colors, Text, Title} from 'react-native-paper';
import { useSelector } from 'react-redux';
import AddScoreModal from './AddScoreModal';
import {
    setScoreForNewTurn,
    updateScoreForSpecificTurn,
} from '../../../redux/slices/playerScoreSlice';
import { ReduxStore, store } from '../../../redux/store';
import {ScrollView, View} from "react-native";
import RebootGameModal from "./RebootGameModal";
import AddNewPlayerModal from "./AddNewPlayerModal";
import { useTheme } from 'react-native-paper';
import {updatePartyScore} from "../../../redux/slices/gameStoreSlice";


export type PlayerUpdateScore = {
    turn: number;
    newScore: number[];
    indexUserSelected: number;
};

const PlayersArea = (): ReactElement => {
    const players = useSelector(
        (state: ReduxStore) => state.playersScore,
    ).players;
    const titleGame = useSelector(
        (state: ReduxStore) => state.playersScore,
    ).title;
    const arrayScore = useSelector(
        (state: ReduxStore) => state.playersScore,
    ).resumeScore;

    const idGame = useSelector(
        (state: ReduxStore) => state.playersScore,
    ).gameId;
    const theme = useTheme();

    const scrollViewRef = useRef(null);

    const [playerUpdateScoreSelected, setPlayerUpdateScore] =
        useState<PlayerUpdateScore>({
            turn: 1,
            newScore: [],
            indexUserSelected: 0,
        });
    const [visibleAddScore, setVisibleAddScore] = useState<boolean>(false);
    const [visibleRebootGame, setVisibleRebootGame] = useState<boolean>(false);
    const [visibleAddNewPlayer, setVisibleAddNewPlayer] = useState<boolean>(false);
    const [widthColDG, setWidthColDG] = useState<number>(60);

    useEffect(() => {
        store.dispatch(updatePartyScore({
            players: players,
            resumeScore: arrayScore,
            gameId: idGame
        }))

        setWidthColDG(defineWithCol());
    }, [arrayScore, players])

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
        // @ts-ignore
        scrollViewRef?.current?.scrollToEnd({animated: true})
    };

    const defineWithCol = (): number => {
        const minWidth = 60;
        const maxWidth = 360;
        if (players.length === 0){
            return maxWidth;
        }
        return (maxWidth / (players.length + 1)) > minWidth ? (maxWidth / (players.length + 1)) : minWidth;
    }

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
            <Title> {titleGame}</Title>
            <View style={{flexDirection: "row", justifyContent: "space-between", width: "98%"}}>

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
                    Recommencer
                </Button>
            </View>
            <ScrollView horizontal>
                <DataTable style={{width: '100%'}}>
                    <DataTable.Header>
                        <DataTable.Title style={{width: widthColDG}}>
                            <Text style={{color: theme.colors.primary}}>
                                Tour
                            </Text>
                        </DataTable.Title>
                        {players.map((player, index) => (
                            <DataTable.Title
                                key={index}
                                style={{width: widthColDG}}
                            >
                                <Text style={{color: theme.colors.primary}}>
                                    {player.name}
                                </Text>
                            </DataTable.Title>
                        ))}
                    </DataTable.Header>

                    <DataTable.Row style={{backgroundColor: MD3Colors.primary40}}>
                        <DataTable.Cell style={{width: widthColDG}}>
                            <Text style={{color: "#ffffff"}}>
                                Total
                            </Text>
                        </DataTable.Cell>
                        {players.map((player, indexBis) => (
                            <DataTable.Cell
                                style={{width: widthColDG}}
                                key={`total-cell-${indexBis}`}
                            >
                                <Text style={{color: "#ffffff"}}>
                                    {player.score}
                                </Text>
                            </DataTable.Cell>
                        ))}
                    </DataTable.Row>
                    <ScrollView ref={scrollViewRef} style={{height: "60%"}}>
                        {arrayScore.map((scoreUser, index) => (
                            <DataTable.Row key={`score-row-${index}`}>
                                <DataTable.Cell style={{width: widthColDG}}>
                                    <Text style={{color: theme.colors.primary}}>
                                        {index + 1}
                                    </Text>

                                </DataTable.Cell>
                                {scoreUser.map((num, indexBis) => (
                                    <DataTable.Cell
                                        style={{width: widthColDG}}
                                        key={`score-cell-${indexBis}`}
                                        onPress={() =>
                                            openAddScoreModal(
                                                false,
                                                index + 1,
                                                indexBis,
                                            )
                                        }
                                    >
                                        <Text style={{color: theme.colors.primary}}>
                                            {num}
                                        </Text>
                                    </DataTable.Cell>
                                ))}
                            </DataTable.Row>
                        ))}
                    </ScrollView>

                </DataTable>
            </ScrollView>

            <AddScoreModal
                addScore={addScore}
                visible={visibleAddScore}
                setVisible={setVisibleAddScore}
                scoreInfo={playerUpdateScoreSelected}
                setScoreInfo={setPlayerUpdateScore}
            />

            <RebootGameModal
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
                style={{marginTop: 12, marginBottom: 8}}
            >
                Ajouter Score
            </Button>
        </>
    );
};
export default PlayersArea;
