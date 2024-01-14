import {ReactElement, useEffect, useState} from 'react';
import { View } from 'react-native';
import DialogStartGame from './components/DialogStartGame';
import PlayersArea from './components/PlayersArea';
import { styles } from '../../generalStyle';
import {useSelector} from "react-redux";
import {ReduxStore} from "../../redux/store";

type ScoreCountType = {
    route: any;
}
const ScoreCount = ({route}: ScoreCountType): ReactElement => {
    const playersScore = useSelector(
        (state: ReduxStore) => state.playersScore,
    );
    const routeParams = route.params;
    const [init, setInit] = useState(false);

    useEffect(() => {
        setInit(playersScore.players.length > 0);
    }, [playersScore]);

    return (
        <View style={styles.container}>
            {!init ?
                <DialogStartGame
                    setInit={setInit}
                    autoOpen={routeParams?.autoOpenModal ? routeParams?.autoOpenModal: false}
                /> :
                <PlayersArea />
            }
        </View>
    );
};
export default ScoreCount;
