import React, { ReactElement, useState } from 'react';
import { ScrollView } from 'react-native';
import { Button, Dialog, Portal, TextInput, List } from 'react-native-paper';

import {initPlayers, PlayerScoreType} from '../../../redux/slices/playerScoreSlice';
import { store } from '../../../redux/store';
import Player from '../class/Player';
import {addParty} from "../../../redux/slices/gameStoreSlice";

type DialogSTartGameType = {
    setInit: any;
};

const DialogStartGame = ({ setInit }: DialogSTartGameType): ReactElement => {
    const [visible, setVisible] = useState(false);
    const [players, setPlayers] = useState<Player[]>([]);
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);
    const [text, setText] = useState('');
    const handleEnterUserName = (name: string) => {
        setText(name);
    };
    const addNewPlayer = () => {
        if (text !== '') {
            setPlayers([...players, { name: text, score: 0 }]);

            setText('');
        }
    };
    function generateRandomId() {
        const timestamp = new Date().getTime().toString(36);
        const randomPart = Math.random().toString(36).substr(2, 5);

        return `${timestamp}-${randomPart}`;
    }
    const beginGame = () => {
        const id = generateRandomId();
        store.dispatch(initPlayers({ players, gameId: id }));
        store.dispatch(
            addParty({
                id: id,
                playerScore: { players: players },
                title: 'test',
                createdAt: new Date().toDateString(),
                lastPlay: new Date().toDateString(),
            }),
        );
        setInit(true);
        hideDialog();
    };

    const removeUser = (indexReceived: number) => {
        if (players.length === 1) {
            setPlayers([]);
        } else {
            setPlayers(players.filter((item, index) => index !== indexReceived));
        }
    };

    return (
        <>
            <Button onPress={showDialog}>Commencer une nouvelle partie</Button>
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>Ajouter les joueurs</Dialog.Title>
                    <Dialog.Content>
                        <TextInput
                            label={'Nom du joueur'}
                            value={text}
                            onChangeText={text => handleEnterUserName(text)}
                        />
                        <Button onPress={addNewPlayer}>Ajouter</Button>
                        <ScrollView style={{ height: 200 }}>
                            {players.length > 0 && (
                                <List.Section>
                                    <List.Subheader>
                                        Joueur Inscrit
                                    </List.Subheader>
                                    {players.map((player, index) => (
                                        <List.Item
                                            onPress={() => removeUser(index)}
                                            key={index}
                                            title={`${index + 1} - ${
                                                player.name
                                            }`}
                                            right={() => (
                                                <List.Icon
                                                    icon={'delete-forever'}
                                                />
                                            )}
                                        />
                                    ))}
                                </List.Section>
                            )}
                        </ScrollView>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={hideDialog}>Fermer</Button>
                        <Button onPress={beginGame}>Commencer la partie</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </>
    );
};
export default DialogStartGame;
