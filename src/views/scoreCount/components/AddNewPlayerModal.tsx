import React, {ReactElement, useState} from 'react';
import {Button, Dialog, Portal, TextInput} from 'react-native-paper';
import {store} from '../../../redux/store';
import {addNewPlayerRedux} from "../../../redux/slices/playerScoreSlice";

type RebootGameModalType = {
    visible: boolean;
    setVisible: any;
};

const AddNewPlayerModal = ({
                             visible,
                             setVisible,
                         }: RebootGameModalType): ReactElement => {

    const [namePlayer, setNamePlayer] = useState<string>('');
    const addNewPlayer = () => {
        store.dispatch(addNewPlayerRedux({name: namePlayer}));
        setNamePlayer("");
        handleCloseDialog();
    }

    // handle click set score of an user & go next
    const handleCloseDialog = () => {
        setVisible(false);
    };

    return (
        <Portal>
            <Dialog
                visible={visible}
                onDismiss={handleCloseDialog}
                style={{ width: '100%', marginHorizontal: 3}}
            >
                <Dialog.Title> Ajouter un nouveau joueur</Dialog.Title>
                <Dialog.Content>
                    <TextInput
                        label={"Nom du joueur"}
                        value={namePlayer}
                        onChangeText={(text) => setNamePlayer(text)}
                        mode={"outlined"}
                    />
                    <Button
                        onPress={addNewPlayer}
                        disabled={namePlayer === ''}
                        mode={'contained'}
                        style={{margin: 5}}
                    >
                        Ajouter
                    </Button>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={handleCloseDialog}>Fermer</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};

export default AddNewPlayerModal;
