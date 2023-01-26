import React from "react";
import type {PropsWithChildren} from 'react';
import { ScrollView, Text, View} from "react-native";
import {styles} from "../../generalStyle";
import Dice from "./component/Dice";


const RollDice = (): JSX.Element => {

    return (
        /*<SafeAreaView>*/
            <ScrollView>
                <View>
                    <Text style={styles.sectionTitle}>
                        Super TestDe mon app
                    </Text>
                </View>
                <Dice />
            </ScrollView>
        /*</SafeAreaView>*/
    )

}

export default RollDice