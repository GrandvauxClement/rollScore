import React, { ReactElement, useState } from 'react';
import { ScrollView } from 'react-native';
import { Button, Dialog, Portal, TextInput, List } from 'react-native-paper';

import {initPlayers} from '../../../redux/slices/playerScoreSlice';
import { store } from '../../../redux/store';
import Player from '../class/Player';
import {addParty} from "../../../redux/slices/gameStoreSlice";

type DialogSTartGameType = {
    setInit: any;
    autoOpen: boolean;
};

const DialogStartGame = ({ setInit, autoOpen = false }: DialogSTartGameType): ReactElement => {
    const [visible, setVisible] = useState(autoOpen);
    const [players, setPlayers] = useState<Player[]>([]);
    const [titleGame, setTitleGame] = useState<string>('');
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

    const handleChangeTitleGame = (title: string) => {
      setTitleGame(title);
    }
    function generateRandomId() {
        const timestamp = new Date().getTime().toString(36);
        const randomPart = Math.random().toString(36).substr(2, 5);

        return `${timestamp}-${randomPart}`;
    }
    const beginGame = () => {
        const id = generateRandomId();
        const customTitle = titleGame === '' ? `Partie du ${new Date().toLocaleDateString()}` : titleGame;
        store.dispatch(
            initPlayers({
                players,
                gameId: id,
                title: customTitle
            })
        );
        store.dispatch(
            addParty({
                id: id,
                playerScore: { players: players, title: customTitle },
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
                    <Dialog.Title>Initialiser la partie</Dialog.Title>
                    <Dialog.Content>
                        <TextInput
                            label={'Titre de la partie'}
                            value={titleGame}
                            onChangeText={titleGame => handleChangeTitleGame(titleGame)}
                            style={{marginBottom: 16}}
                        />
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
                                        Joueurs Inscrits
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
                        <Button
                            onPress={beginGame}
                            disabled={players.length === 0}
                        >
                            Commencer la partie
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </>
    );
};
export default DialogStartGame;
