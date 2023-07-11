import React, { ReactElement } from 'react';
import { StyleSheet } from 'react-native';
import { Appbar, Button, Dialog, Portal } from 'react-native-paper';
import { useSelector } from 'react-redux';

import { PlayerUpdateScore } from './PlayersArea';
import Calculator from '../../../components/calculator/Calculator';
import { ReduxStore } from '../../../redux/store';

type AddScoreModalType = {
    addScore: any;
    visible: boolean;
    setVisible: any;
    scoreInfo: PlayerUpdateScore;
    setScoreInfo: Function;
};

const AddScoreModal = ({
    addScore,
    visible,
    setVisible,
    scoreInfo,
    setScoreInfo,
}: AddScoreModalType): ReactElement => {
    const [indexSelected, setIndexSelected] = React.useState(
        scoreInfo.indexUserSelected,
    );
    const [defaultScore, setDefaultScore] = React.useState(0);
    const players = useSelector(
        (state: ReduxStore) => state.playersScore,
    ).players;

    React.useEffect(() => {
        //Reset index when dialog was open
        setIndexSelected(scoreInfo.indexUserSelected);
        if (typeof scoreInfo.newScore[indexSelected] === 'undefined') {
            setDefaultScore(0);
        } else {
            setDefaultScore(scoreInfo.newScore[indexSelected]);
        }
    }, [visible]);

    // handle click set score of an user & go next
    const handleUpdateScoreInfo = (
        scoreReceived: number,
        isFinish: boolean = false,
    ) => {
        const tempScore = [...scoreInfo.newScore];
        tempScore[indexSelected] = scoreReceived;
        setScoreInfo({
            ...scoreInfo,
            newScore: tempScore,
        });
        //Check if his last user and on this case close modal & update score on datatable
        if (indexSelected === players.length - 1 || isFinish) {
            addScore(tempScore);
            setVisible(false);
        } else {
            // Else spend to next user
            setIndexSelected(indexSelected + 1);
            setDefaultScore(scoreInfo.newScore[indexSelected + 1]);
        }
    };

    const handleCloseDialog = () => {
        addScore(scoreInfo.newScore);
        setVisible(false);
    };

    return (
        <Portal>
            <Dialog
                visible={visible}
                onDismiss={handleCloseDialog}
                style={{ width: '100%', marginHorizontal: 3 }}>
                <Appbar.Header
                    elevated={true}
                    style={sylesAddScoreModal.appBar}>
                    <Appbar.BackAction onPress={() => setVisible(false)} />
                    <Appbar.Content
                        title={`${players[indexSelected].name} - Tour : ${scoreInfo.turn}`}
                    />
                </Appbar.Header>
                <Dialog.Content>
                    <Calculator
                        handleUpdateScoreInfo={handleUpdateScoreInfo}
                        score={defaultScore}
                        setScore={setDefaultScore}
                    />
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={handleCloseDialog}>Fermer</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};

const sylesAddScoreModal = StyleSheet.create({
    appBar: {
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dataTableWidthItem: {
        width: 300,
        color: 'red',
    },
});

export default AddScoreModal;
