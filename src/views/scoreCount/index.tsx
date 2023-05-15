import { View} from "react-native";
import {styles} from "../../generalStyle";
import {useState} from "react";
import DialogStartGame from "./components/DialogStartGame";
import PlayersArea from "./components/PlayersArea";

type ScoreCountProps = {
    navigation: any,
    route: any
}
const ScoreCount = ({navigation, route}: ScoreCountProps): JSX.Element => {

    const [init, setInit] = useState(false);
    const [players, setPlayers] = useState([]);


    return (
        <View
            style={styles.container}
        >
            {!init ?
                <DialogStartGame
                    players={players}
                    setPlayers={setPlayers}
                    setInit={setInit}
                /> :
                <PlayersArea
                    players={players}
                    setPlayers={setPlayers}
                />
            }

        </View>
    )
}

export default ScoreCount
