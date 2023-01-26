import React, {useEffect, useRef, useState} from "react";
import {Button, View, Animated, Easing} from "react-native";
import DiceImage from "./DiceImage";

const ArrayOfImageDice = [
    require('../assets/1.png'),
    require('../assets/2.png'),
    require('../assets/3.png'),
    require('../assets/4.png'),
    require('../assets/5.png'),
    require('../assets/6.png')
]
const Dice = () : JSX.Element => {
    const [diceSelect, setDiceSelect] = useState(0)

    const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
    const rotateX = useRef(new Animated.Value(0)).current;
    const rotateY = useRef(new Animated.Value(0)).current;// Initial value for opacity: 0

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 10000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    useEffect(() => {
        Animated.timing(rotateX, {
            toValue: 1,
            duration: 5000,
            easing: Easing.linear,
            useNativeDriver: true
        }).start();

        Animated.timing(rotateY, {
            toValue: 1,
            duration: 5000,
            easing: Easing.linear,
            useNativeDriver: true
        }).start();
        Animated.timing(rotateX, {
            toValue: 2,
            duration: 5000,
            easing: Easing.linear,
            useNativeDriver: true
        }).start();

        Animated.timing(rotateY, {
            toValue: 2,
            duration: 5000,
            easing: Easing.linear,
            useNativeDriver: true
        }).start();
        Animated.timing(rotateX, {
            toValue: 4,
            duration: 5000,
            easing: Easing.linear,
            useNativeDriver: true
        }).start();

        Animated.timing(rotateY, {
            toValue: 4,
            duration: 5000,
            easing: Easing.linear,
            useNativeDriver: true
        }).start();
        Animated.timing(rotateX, {
            toValue: 0,
            duration: 5000,
            easing: Easing.linear,
            useNativeDriver: true
        }).start();

        Animated.timing(rotateY, {
            toValue: 0,
            duration: 5000,
            easing: Easing.linear,
            useNativeDriver: true
        }).start();
    }, [diceSelect, rotateX, rotateY])

    const spinX = rotateX.interpolate({
        inputRange: [0,1,2, 3, 4],
        outputRange: ['0deg', '360deg', '90deg', '-280deg', '250deg']
    })

    const spinY = rotateY.interpolate({
        inputRange: [0,1,2, 3, 4],
        outputRange: ['0deg', '360deg', '90deg', '-280deg', '250deg']
    })



    const roll = () => {
        const random = Math.floor(Math.random() * ArrayOfImageDice.length);
        setDiceSelect(random);
    }

    return (
      <View>
          {/*{ArrayOfImageDice.map((img, index) => (
              index === diceSelect &&
                  <DiceImage
                      key={index}
                      image={ArrayOfImageDice[index]}
                  />
          ))}*/}
          {/*{diceSelect === 0 &&

          }*/}
          <View
            /*style={{
                opacity: fadeAnim,
                transform: [
                    {rotateX: spinX},
                    {rotateY: spinY}
                ]
            }}*/
          >
              <DiceImage
                  image={ArrayOfImageDice[diceSelect]}
              />
          </View>

          <Button
              title={"Clique pour faire rouler !"}
              onPress={roll}
              color={"blue"}
          />
      </View>
  )
}
export default Dice