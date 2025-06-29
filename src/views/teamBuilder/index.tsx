import React, { ReactElement, useState } from 'react';
import { FlatList } from 'react-native';
import { Button, Text } from 'react-native-paper';
import Team from './model/Team';
import BuildTeamModal from './component/BuildTeamModal';
import TeamCardDisplay from './component/TeamCardDisplay';
import { store } from '../../redux/store';
import { initPlayers } from '../../redux/slices/playerScoreSlice';
import { addParty } from '../../redux/slices/gameStoreSlice';
import { generateRandomId } from '../scoreCount/utils/scoreManipulationt';
import Player from '../scoreCount/class/Player';
import { ROAD_NAME } from '../../config/roadName';
type TeamBuilderType = {
    navigation: any
}
const TeamBuilder = ({navigation} : {navigation: any}): ReactElement => {

    const [players, setPlayers] = useState<string[]>([]);
    const [teams, setTeams] = useState<Team[]>([]);
    const [visible, setVisible] = useState<boolean>(false);

    const intitaliserPartie = () => {
        const id = generateRandomId();
        const customTitle = `Partie du ${new Date().toLocaleDateString()}`;
        const playersForGame: Player[] = teams.map(team => { return {name: team.players.join('-'), score: 0 }});
        store.dispatch(
            initPlayers({
                players: playersForGame,
                gameId: id,
                title: customTitle
            })
        );
        
        store.dispatch(
            addParty({
                id: id,
                playerScore: { players: playersForGame, title: customTitle, gameId: id },
                createdAt: new Date().toDateString(),
                lastPlay: new Date().toDateString(),
            }),
        );

        navigation.navigate(ROAD_NAME.tableauScore);
    }

    return (
      <FlatList
        data={teams}
        keyExtractor={(item) => item.nom}
        contentContainerStyle={{ flexGrow: 1, padding: 16 }}
        ListHeaderComponent={
            <Text style={{ textAlign: 'center', marginTop: 16 }}>
                Constituer vos équipes aléatoirement, et commencer une partie !
            </Text>
        }
        ListFooterComponent={
            <>
                <Button
                    onPress={() => setVisible(true)}
                    mode={'contained'}
                    style={{ marginTop: 4, marginBottom: 8 }}
                >
                    {teams.length > 0 ? 'Modifier les équipes' : 'Construisez vos équipes'}
                </Button>
                <BuildTeamModal
                    players={players}
                    setPlayers={setPlayers}
                    setTeams={setTeams}
                    setVisible={setVisible}
                    visible={visible}
                />
                {teams && teams.length > 0 && (
                    <Button
                    onPress={intitaliserPartie}
                    mode={'contained'}
                    style={{ marginTop: 4, marginBottom: 8 }}
                >
                    Commencer une partie
                </Button>
                )}
            </>
        }
        renderItem={({ item }) => (
        <TeamCardDisplay team={item} /> // Crée un composant `TeamCard` si nécessaire
        )}
        ListEmptyComponent={
        <Text style={{ textAlign: 'center', marginTop: 16 }}>
            Aucune équipe pour le moment
        </Text>
        }
    />
    );
};

export default TeamBuilder;