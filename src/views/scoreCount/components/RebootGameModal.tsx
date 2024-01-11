import React, { ReactElement } from 'react';
import {StyleSheet, View} from 'react-native';
import { Appbar, Button, Dialog, Portal, Text } from 'react-native-paper';
import {store} from '../../../redux/store';
import {rebootGameWithoutPlayer, rebootGameWithPlayer} from "../../../redux/slices/playerScoreSlice";

type RebootGameModalType = {
    setInitGame: any;
    visible: boolean;
    setVisible: any;
};

const RebootGameModal = ({
                           setInitGame,
                           visible,
                           setVisible,
                       }: RebootGameModalType): ReactElement => {
    const rebootGameWithoutUser = () => {
        store.dispatch(rebootGameWithoutPlayer(''));
        setInitGame(false);
    }

    const rebootGameWithUser = () => {
        store.dispatch(rebootGameWithPlayer('test'));
        handleCloseDialog();
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
                        title={`Recommencer une partie`}
                    />
                </Appbar.Header>
                <Dialog.Content>
                    <Text>Attention, vous allez recommencez une nouvelle partie toute vos données seront perdu</Text>
                    <Text>Vous pouvez soit recommencer avec les mêmes joueurs soit recommencer une partie de 0, choisissez l'option qui vous convient :</Text>
                    <View >
                        <Button
                            onPress={rebootGameWithUser}
                            mode={'contained'}
                            style={{margin: 5}}
                        >
                            Conserver les joueurs
                        </Button>
                        <Button
                            onPress={rebootGameWithoutUser}
                            mode={'contained'}
                            style={{margin: 5}}
                        >
                            Repartir de 0
                        </Button>
                    </View>
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

export default RebootGameModal;
