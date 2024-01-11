import {ReactElement, useEffect, useState} from 'react';
import { View } from 'react-native';
import DialogStartGame from './components/DialogStartGame';
import PlayersArea from './components/PlayersArea';
import { styles } from '../../generalStyle';
import {useSelector} from "react-redux";
import {ReduxStore} from "../../redux/store";

const ScoreCount = (): ReactElement => {
    const players = useSelector(
        (state: ReduxStore) => state.playersScore,
    ).players;

    const [init, setInit] = useState(false);

    useEffect(() => {
        setInit(players.length > 0);
    }, [players]);


    return (
        <View style={styles.container}>
            {!init ? <DialogStartGame setInit={setInit} /> : <PlayersArea setInitGame={setInit}/>}
        </View>
    );
};
export default ScoreCount;
