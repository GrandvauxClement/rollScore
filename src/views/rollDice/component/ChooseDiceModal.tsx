import React, { ReactElement, useState } from 'react';
import { View } from 'react-native';
import {
    Button,
    Dialog,
    Portal,
    RadioButton,
    Text,
    TextInput,
} from 'react-native-paper';
import { Dice } from '../model/dice';
import { KindDice } from '../model/kind-dice';

type ChooseDiceModalType = {
    dicesAvailable: Dice[];
    diceSelected: Dice;
    setDiceSelected: any;
    visible: boolean;
    setVisible: any;
};
const ChooseDiceModal = ({
    dicesAvailable,
    diceSelected,
    setDiceSelected,
    visible,
    setVisible,
}: ChooseDiceModalType): ReactElement => {
    const [valueMaxCustom, setValueMaxCustom] = useState<string>('6');
    const handleCloseDialog = () => {
        setVisible(false);
    };

    const handleChangeDice = (diceSelectedKind: string) => {
        const diceChoice = dicesAvailable.find(
            dice => dice.kind === diceSelectedKind,
        );
        setDiceSelected(diceChoice ? diceChoice : dicesAvailable[0]);
    };

    const handleChangeValueMaxCustom = (value: string) => {
        const castToNumber = value.replace(/[^0-9]/g, '');
        setValueMaxCustom(castToNumber);
        setDiceSelected({
            ...diceSelected,
            valueMax: parseInt(castToNumber),
        });
    };

    return (
        <Portal>
            <Dialog
                visible={visible}
                onDismiss={handleCloseDialog}
                style={{ width: '100%', marginHorizontal: 3 }}>
                <Dialog.Title> Choisissez votre type de dé</Dialog.Title>
                <Dialog.Content>
                    <RadioButton.Group
                        onValueChange={newValue => handleChangeDice(newValue)}
                        value={diceSelected.kind}>
                        {dicesAvailable.map((dice, i) => (
                            <View
                                key={i}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                <RadioButton value={dice.kind} />
                                <Text>{dice.label}</Text>
                            </View>
                        ))}
                    </RadioButton.Group>
                    {diceSelected.kind === KindDice.CUSTOM && (
                        <>
                            <TextInput
                                label={'Saisissez la valeur max'}
                                keyboardType={'numeric'}
                                value={valueMaxCustom}
                                onChangeText={text =>
                                    handleChangeValueMaxCustom(text)
                                }
                            />
                        </>
                    )}
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={handleCloseDialog}>Fermer</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};

export default ChooseDiceModal;
