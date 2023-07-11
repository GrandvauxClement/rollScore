import React, { ReactElement, useEffect, useRef } from 'react';
import { View, LogBox, Animated, Easing } from 'react-native';

type DiceImageProps = {
    image: any;
};

const DiceImage = ({ image }: DiceImageProps): ReactElement => {
    LogBox.install();

    const rotateX = useRef(new Animated.Value(0)).current;
    const rotateY = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

    useEffect(() => {
        Animated.timing(rotateX, {
            toValue: 1,
            duration: 10000,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start();

        Animated.timing(rotateY, {
            toValue: 1,
            duration: 10000,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start();

        Animated.timing(rotateX, {
            toValue: 2,
            duration: 10000,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start();

        Animated.timing(rotateY, {
            toValue: 2,
            duration: 10000,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start();

        Animated.timing(rotateX, {
            toValue: 4,
            duration: 5000,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start();

        Animated.timing(rotateY, {
            toValue: 4,
            duration: 5000,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start();

        Animated.timing(rotateX, {
            toValue: 0,
            duration: 5000,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start();

        Animated.timing(rotateY, {
            toValue: 0,
            duration: 5000,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start();
    }, [image, rotateX, rotateY]);

    const spinX = rotateX.interpolate({
        inputRange: [0, 1, 2, 3, 4],
        outputRange: ['0deg', '360deg', '90deg', '-280deg', '250deg'],
    });

    const spinY = rotateY.interpolate({
        inputRange: [0, 1, 2, 3, 4],
        outputRange: ['0deg', '360deg', '90deg', '-280deg', '250deg'],
    });
    return (
        <View>
            <Animated.Image
                source={image}
                style={{
                    transform: [{ rotateX: spinX }, { rotateY: spinY }],
                }}
            />
        </View>
    );
};

export default DiceImage;
