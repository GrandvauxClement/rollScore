import React, {ReactElement, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Appbar, Button, Dialog, Portal, Text, TextInput} from 'react-native-paper';
import {store} from '../../../redux/store';
import {
    updateTitleRedux
} from "../../../redux/slices/playerScoreSlice";
import {GameStoreType, updatePartyScore} from "../../../redux/slices/gameStoreSlice";

type RebootGameModalType = {
    gameStoreType: GameStoreType;
    visible: boolean;
    setVisible: any;
};

const ChangeTitleGameComponent = ({
                             visible,
                             setVisible,
                             gameStoreType
                         }: RebootGameModalType): ReactElement => {

    const [title, setTitle] = useState(gameStoreType.playerScore.title);
    const updateTitle = () => {
        store.dispatch(
            updateTitleRedux(title)
        );
        store.dispatch(
            updatePartyScore({
                gameId: gameStoreType.id,
                title: title,
                players: gameStoreType.playerScore.players,
                resumeScore: gameStoreType.playerScore.resumeScore
            }),
        );
        handleCloseDialog();
    }

    const handleChangeTitle = (titleGame: string) => {
      setTitle(titleGame);
    }

    const handleCloseDialog = () => {
        setVisible(false);
    };

    return (
        <Portal>
            <Dialog
                visible={visible}
                onDismiss={handleCloseDialog}
                style={{ marginHorizontal: 3}}>
                <Appbar.Header
                    elevated={true}
                    style={sylesAddScoreModal.appBar}
                >
                    <Appbar.BackAction onPress={() => setVisible(false)}/>
                    <Appbar.Content
                        title={`Modifier le titre`}
                    />
                </Appbar.Header>
                <Dialog.Content>

                    <TextInput
                        label={'Titre de la partie'}
                        value={title}
                        onChangeText={titleGame => handleChangeTitle(titleGame)}
                        style={{marginBottom: 16}}
                    />
                    <Button
                        onPress={updateTitle}
                        mode={'contained'}
                        style={{margin: 5}}
                    >
                        Valider
                    </Button>
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
        marginTop: 0,
        paddingTop: 0
    },
    sectionContainer: {
        //  marginTop: 32,
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

export default ChangeTitleGameComponent;
