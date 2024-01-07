import {ReactElement} from "react";
import {View} from "react-native";
import {styles} from "../../generalStyle";
import {Text} from "react-native-paper";
import {useSelector} from "react-redux";
import ResumeGameItem from "./components/ResumeGameItem";
import {GameStoreType, removeAllPartys} from "../../redux/slices/gameStoreSlice";
import {store} from "../../redux/store";

const GamesStore = ({navigation}: {navigation: any}):ReactElement => {
   // store.dispatch(removeAllPartys());
    // @ts-ignore
    const allGames = useSelector((state) => state.gameStore.games);

    // Trier les jeux par ordre de date (lastPlay)
    const sortedGames: GameStoreType[] = [...allGames].sort((a, b) => {
        const dateA = new Date(a.lastPlay);
        const dateB = new Date(b.lastPlay);
        // @ts-ignore
        return dateB - dateA; // Tri décroissant, pour un tri croissant, inversez dateA et dateB
    });
  return (
      <View style={styles.container}>
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
  )
}

export default GamesStore;