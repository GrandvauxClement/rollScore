import React, {ReactElement} from "react";
import {View} from "react-native";
import {styles} from "../../generalStyle";
import {Button, Text} from "react-native-paper";
import {useSelector} from "react-redux";
import ResumeGameItem from "./components/ResumeGameItem";
import {GameStoreType} from "../../redux/slices/gameStoreSlice";
import {store} from "../../redux/store";
import {rebootGameWithoutPlayer} from "../../redux/slices/playerScoreSlice";
import {ROAD_NAME} from "../../config/roadName";

const GamesStore = ({navigation}: {navigation: any}):ReactElement => {
    /*store.dispatch(removeAllPartys());
    store.dispatch(rebootGameWithoutPlayer());*/

    // @ts-ignore
    const allGames = useSelector((state) => state.gameStore.games);

    // Trier les jeux par ordre de date (lastPlay)
    const sortedGames: GameStoreType[] = [...allGames].sort((a, b) => {
        const dateA = new Date(a.lastPlay);
        const dateB = new Date(b.lastPlay);
        // @ts-ignore
        return dateB - dateA; // Tri décroissant, pour un tri croissant, inversez dateA et dateB
    });

    const startNewGame = () => {
        store.dispatch(rebootGameWithoutPlayer());
        navigation.navigate(ROAD_NAME.tableauScore, {
            autoOpenModal :true
        });
    }

  return (
      <View style={styles.containerSpaceAround}>
          <View>
          <Text> Historiques de vos parties</Text>
          {sortedGames.length === 0 ?
              <Text>  Créer votre 1ere partie</Text> :
              sortedGames.map((game: GameStoreType, index: number) =>
              <ResumeGameItem
                  game={game}
                  navigation={navigation}
                  key={index}
                  index={index}
              />
          )}
          </View>
          <Button
              onPress={startNewGame}
              mode={'contained'}
              style={{margin: 5}}
          >
              Nouvelle partie
          </Button>
      </View>
  )
}

export default GamesStore;