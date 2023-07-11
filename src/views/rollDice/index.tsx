import React, { ReactElement } from 'react';
import { ScrollView } from 'react-native';

import DiceCustom from './component/DiceCustom';

const RollDice = (): ReactElement => {
    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
            <DiceCustom />
        </ScrollView>
    );
};

export default RollDice;
