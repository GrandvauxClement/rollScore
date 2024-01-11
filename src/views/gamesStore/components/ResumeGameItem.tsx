import {ReactElement, useState} from "react";
import {Button, Divider, List, Menu} from "react-native-paper";
import {GameStoreType, removePartyById} from "../../../redux/slices/gameStoreSlice";
import {ROAD_NAME} from "../../../config/roadName";
import {store} from "../../../redux/store";
import {initPlayers} from "../../../redux/slices/playerScoreSlice";
import ChangeTitleGameComponent from "./ChangeTitleGameComponent";
type ResumeGameItemType = {
    game: GameStoreType,
    index: number,
    navigation: any
}
const ResumeGameItem = ({ game, index, navigation }: ResumeGameItemType): ReactElement => {

    const [visible, setVisible] = useState(false);
    const [showDialogChangeTitle, setShowDialogChangeTitle] = useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
    const changeActiveGameAndOpen = () => {
        closeMenu();
        store.dispatch(initPlayers(game.playerScore));
        navigation.navigate(ROAD_NAME.tableauScore);
    };

    const deleteGame = (id: string) => {
        closeMenu();
        store.dispatch(removePartyById(id));
    }

    const handleClicDialogUpdateTitle = () => {
        closeMenu();
        setShowDialogChangeTitle(true);
    }
    return (
        <>
            <List.Item
                title={`${index + 1} - ${game.playerScore.title}`}
                right={(props) => <Menu
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={<Button onPress={openMenu} icon={'dots-vertical'} > </Button>}>
                    <Menu.Item
                        onPress={changeActiveGameAndOpen}
                        title="Reprendre"
                        trailingIcon={'chevron-right'}
                    />

                    <Menu.Item
                        onPress={() => deleteGame(game.id)}
                        title="Supprimer" trailingIcon={'delete-forever'}
                    />
                    <Menu.Item
                        onPress={handleClicDialogUpdateTitle}
                        title="Modier le titre" trailingIcon={'pencil'}
                    />
                </Menu>}
                description={`joué le ${new Date(game.lastPlay).toLocaleDateString()} - Nbr joueurs: ${game.playerScore.players.length } `}
            />
            <ChangeTitleGameComponent
                gameStoreType={game}
                visible={showDialogChangeTitle}
                setVisible={setShowDialogChangeTitle}
            />
            <Divider />
        </>

    );
};

export default ResumeGameItem