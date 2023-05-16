import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import {Button} from "react-native-paper";

export default class DiceCustom extends React.Component {
    constructor() {
        super();

        this.state = {
            uri: require('../assets/1.png'),
            randomNumber: 1,
            // numHistory: [1,2,3,4,5,6]
        }
    }
    getRandomNumber = () => {
        let randomNumber = Math.floor((Math.random() * 6) + 1);
        this.setState({
            randomNumber: randomNumber
        })
        return randomNumber;
    }

    // diceHistory = () => {
    //   var numHistory = numHistory.push(this.state.randomNumber);
    //   numHistory.toString();

    //   return numHistory;
    // }


    setDiceImage = () => {
        const randNum = this.getRandomNumber();
        switch(randNum) {
            case 1:
                this.setState({
                    uri: require('../assets/1.png')})
                break;

            case 2:
                this.setState({
                    uri: require('../assets/2.png')})
                break;


            case 3:
                this.setState({
                    uri: require('../assets/3.png')})
                break;


            case 4:
                this.setState({
                    uri: require('../assets/4.png')})
                break;


            case 5:
                this.setState({
                    uri: require('../assets/5.png')})
                break;


            case 6:
                this.setState({
                    uri: require('../assets/6.png')})
                break;

            default:
        }
    }

    diceButtonPressed = () => {
        //  this.diceHistory();
        this.setDiceImage();
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.diceText}>
                    You Rolled a {this.state.randomNumber}
                </Text>
                <Image
                    style={{ width: 200, height: 200 }}
                    source={this.state.uri}
                />
                <TouchableOpacity
                    onPress={this.diceButtonPressed}
                >
                    <Button
                        mode={"contained"}
                        style={{justifyContent: "center", marginTop: 4}}
                    >
                        Roll Dice
                    </Button>
                </TouchableOpacity>
                <Text style={styles.historyText}>Roll History:</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    rollButton: {
        marginTop: 50,
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor: '#3880FF',
        color: '#fff',
        borderRadius: 5,
        paddingHorizontal: 25,
        paddingVertical: 10,
    },
    diceText: {
        marginBottom: 40,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1A1F38',
    },
    historyText: {
        color: '#CCCCCC',
        marginTop: 30,
        fontSize: 14,

    }
});