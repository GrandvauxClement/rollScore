import React, { ReactElement } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { Image } from 'expo-image';
import { Dice } from '../model/dice';
import { KindDice } from '../model/kind-dice';
import { images } from '../model/images';

type DiceCustomType = {
    dice: Dice;
};
const DiceCustom = ({ dice }: DiceCustomType): ReactElement => {
    const blurhash =
        '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
    const [randomNumber, setRandomNumber] = React.useState<number>(1);

    const getRandomNumber = () => {
        const randomNumber = Math.floor(Math.random() * dice.valueMax + 1);
        setRandomNumber(randomNumber);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.diceText}>
                Vous jouez avec un {dice.label}
                {dice.kind == KindDice.CUSTOM &&
                    ` de valeur max : ${dice.valueMax}`}
            </Text>
            {dice && dice.kind != KindDice.CUSTOM && (
                <Image
                    style={{ width: 300, height: 300 }}
                    source={images[dice.kind][randomNumber - 1]}
                    placeholder={blurhash}
                    contentFit={'cover'}
                    transition={200}
                />
            )}
            <Text style={styles.diceText}> Valeur du dé : {randomNumber}</Text>
            <TouchableOpacity onPress={getRandomNumber}>
                <Button mode={'contained'} style={{ justifyContent: 'center' }}>
                    Relancer le dé
                </Button>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    rollButton: {
        marginTop: 50,
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor: '#3880FF',
        borderRadius: 5,
        paddingHorizontal: 25,
        paddingVertical: 10,
    },
    diceText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    historyText: {
        color: '#CCCCCC',
        marginTop: 30,
        fontSize: 14,
    },
});

export default DiceCustom;
