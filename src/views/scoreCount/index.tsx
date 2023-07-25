import { ReactElement, useState } from 'react';
import { View } from 'react-native';

import DialogStartGame from './components/DialogStartGame';
import PlayersArea from './components/PlayersArea';
import { styles } from '../../generalStyle';

const ScoreCount = (): ReactElement => {
    const [init, setInit] = useState(false);

    return (
        <View style={styles.container}>
            {!init ? <DialogStartGame setInit={setInit} /> : <PlayersArea setInitGame={setInit}/>}
        </View>
    );
};
export default ScoreCount;
