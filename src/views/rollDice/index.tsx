import React, { ReactElement, useState } from 'react';
import { ScrollView } from 'react-native';

import DiceCustom from './component/DiceCustom';
import { Dice } from './model/dice';
import { KindDice } from './model/kind-dice';
import { Button } from 'react-native-paper';
import ChooseDiceModal from './component/ChooseDiceModal';

const RollDice = (): ReactElement => {
    const dicesAvailable: Dice[] = [
        new Dice(KindDice.DICE_6, 6, 'Dé 6'),
        new Dice(KindDice.DICE_10, 10, 'Dé 10'),
        new Dice(KindDice.CUSTOM, 0, 'Dé personnalisé'),
    ];
    const [diceSelected, setDiceSelected] = useState<Dice>(dicesAvailable[0]);
    const [visible, setVisible] = useState<boolean>(false);

    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
            <Button
                onPress={() => setVisible(true)}
                mode={'contained'}
                style={{ marginTop: 4, marginBottom: 8 }}>
                Changer de dé
            </Button>
            <DiceCustom dice={diceSelected} />
            <ChooseDiceModal
                dicesAvailable={dicesAvailable}
                diceSelected={diceSelected}
                setDiceSelected={setDiceSelected}
                visible={visible}
                setVisible={setVisible}
            />
        </ScrollView>
    );
};

export default RollDice;
