import React, { ReactElement, useState } from 'react';
import { ScrollView } from 'react-native';
import { Button, Dialog, Portal, TextInput, List } from 'react-native-paper';
import Team from '../model/Team';

type BuildTeamModalType = {
    visible: boolean;
    setVisible: any;
    players: string[];
    setPlayers: any;
    setTeams:any;
}
const BuildTeamModal = ({visible, setVisible, players, setPlayers, setTeams}: BuildTeamModalType): ReactElement => {

    const hideDialog = () => setVisible(false);
    const [playerName, setPlayerName] = useState<string>('');

    const [numbersTeams, setNumbersTeam] = useState<number>(2);

     const addNewPlayer = () => {
        if (playerName !== '') {
            setPlayers(prevPlayers => [...prevPlayers, playerName]);
            setPlayerName('');
        }
    };

     const removeUser = (indexReceived: number) => {
        if (players.length === 1) {
            setPlayers([]);
        } else {
            setPlayers(players.filter((item, index) => index !== indexReceived));
        }
    };

    const handleSetNumbersTeam = (value: string) => {
        const valueParse = parseInt(value);
        if(!isNaN(valueParse)) {
            setNumbersTeam(valueParse)
        }
        else {
            setNumbersTeam(0)
        }
    }

    const randomBuildTeam = () => {
            // Copier et mélanger la liste des joueurs (Fisher–Yates shuffle)
            const shuffledPlayers = [...players];
            for (let i = shuffledPlayers.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffledPlayers[i], shuffledPlayers[j]] = [shuffledPlayers[j], shuffledPlayers[i]];
            }

            // Initialiser les équipes vides
            const teams: Team[] = Array.from({ length: numbersTeams }, (_, i) => ({
                nom: (i + 1).toString(),
                players: [],
            }));

            // Répartir les joueurs dans les équipes de manière équilibrée
            shuffledPlayers.forEach((player, index) => {
                const teamIndex = index % numbersTeams;
                teams[teamIndex].players.push(player);
            });

            setTeams(teams);
            hideDialog();
    }

    return (
        <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>Constituez vos équipes aléatoirement</Dialog.Title>
                    <Dialog.Content>
                        <TextInput
                            label={'Indiquer le nombre d\'équipe à constituer'}
                            value={numbersTeams.toString()}
                            keyboardType='numeric'
                        
                            onChangeText={value => handleSetNumbersTeam(value)}
                            style={{marginBottom: 16}}
                        />
                        <TextInput
                            label={'Nom du joueur'}
                            value={playerName}
                            onChangeText={text => setPlayerName(text)}
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
                                                player
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
                            onPress={randomBuildTeam}
                            disabled={players.length === 0 || numbersTeams <= 0}
                        >
                            Constituer les équipes
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
    );
}

export default BuildTeamModal;