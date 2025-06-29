import React from 'react';
import { View, FlatList } from 'react-native';
import { Card, Text, Divider } from 'react-native-paper';
import Team from '../model/Team';

interface Props {
  team: Team;
}

const TeamCardDisplay: React.FC<Props> = ({ team }) => {
  return (
        <Card style={{ marginBottom: 16 }}>
          <Card.Title title={`Équipe ${team.nom}`} />
          <Card.Content>
            {team.players.map((player, index) => (
              <View key={index}>
                <Text>{player}</Text>
                {index < team.players.length - 1 && <Divider />}
              </View>
            ))}
          </Card.Content>
        </Card>
  );
};

export default TeamCardDisplay;
