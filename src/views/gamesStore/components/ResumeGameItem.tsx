import {ReactElement} from "react";
import {List} from "react-native-paper";
import {GameStoreType} from "../../../redux/slices/gameStoreSlice";
import {ROAD_NAME} from "../../../config/roadName";
import {store} from "../../../redux/store";
import {initPlayers} from "../../../redux/slices/playerScoreSlice";
type ResumeGameItemType = {
    game: GameStoreType,
    index: number,
    navigation: any
}
const ResumeGameItem = ({ game, index, navigation }: ResumeGameItemType): ReactElement => {
    const changeActiveGameAndOpen = () => {
        store.dispatch(initPlayers(game.playerScore));
        navigation.navigate(ROAD_NAME.tableauScore);
    };
//
    console.log("PLayers --> ", game.playerScore);
    return (
        <List.Item
            title={`${index} - ${game.title}`}
            description={`créer le ${new Date(game.createdAt).toLocaleDateString()} - Nbr joueurs: ${game.playerScore.players.length } `}
            onPress={changeActiveGameAndOpen}
        />
    );
};

export default ResumeGameItem