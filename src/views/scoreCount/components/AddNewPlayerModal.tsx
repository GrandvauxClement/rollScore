import React, { ReactElement, useEffect, useState } from 'react';
import { Button, Dialog, Portal, TextInput } from 'react-native-paper';
import { store } from '../../../redux/store';
import {
    addNewPlayerRedux,
    deletePlayerReduxByIndex,
    updatePlayerNameRedux,
} from '../../../redux/slices/playerScoreSlice';
import Player from '../class/Player';

export type RebootGameModalType = {
    visible: boolean;
    setVisible: any;
    indexPlayer: number;
    player: Player | null;
};

const AddNewPlayerModal = ({
    visible,
    setVisible,
    indexPlayer,
    player,
}: RebootGameModalType): ReactElement => {
    const [namePlayer, setNamePlayer] = useState<string>('');

    useEffect(() => {
        if (player != null) {
            setNamePlayer(player.name);
        } else {
            setNamePlayer('');
        }
    }, [player]);
    const handlePressSubmitUser = () => {
        if (player != null) {
            store.dispatch(
                updatePlayerNameRedux({
                    playerSelected: player,
                    newName: namePlayer,
                }),
            );
        } else {
            store.dispatch(addNewPlayerRedux({ name: namePlayer }));
        }
        setNamePlayer('');
        handleCloseDialog();
    };

    const handleDeletePlayer = () => {
        store.dispatch(deletePlayerReduxByIndex(indexPlayer));
        setNamePlayer('');
        handleCloseDialog();
    };
    // handle click set score of an user & go next
    const handleCloseDialog = () => {
        setVisible({
            visible: false,
            setVisible: null,
            isUpdateOrDeleteUser: false,
            player: null,
        });
    };

    return (
        <Portal>
            <Dialog
                visible={visible}
                onDismiss={handleCloseDialog}
                style={{ width: '100%', marginHorizontal: 3 }}>
                <Dialog.Title style={{ textAlign: 'center' }}>
                    {player != null
                        ? `Modifier le nom ou supprimer le joueur ${player?.name}`
                        : 'Ajouter un nouveau joueur'}
                </Dialog.Title>
                <Dialog.Content>
                    <TextInput
                        label={'Nom du joueur'}
                        value={namePlayer}
                        onChangeText={text => setNamePlayer(text)}
                        mode={'outlined'}
                    />
                    <Button
                        onPress={handlePressSubmitUser}
                        disabled={namePlayer === ''}
                        mode={'contained'}
                        style={{ margin: 5 }}>
                        {player != null ? 'Modifier' : 'Ajouter'}
                    </Button>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={handleDeletePlayer}>Supprimer</Button>
                    <Button onPress={handleCloseDialog}>Fermer</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};

export default AddNewPlayerModal;
