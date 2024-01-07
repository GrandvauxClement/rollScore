import { MaterialCommunityIcons } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';

import RollDice from '../views/rollDice';
import ScoreCount from '../views/scoreCount';
import GamesStore from "../views/gamesStore";
import {ROAD_NAME} from "../config/roadName";

const Tab = createBottomTabNavigator();

const Routes = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === ROAD_NAME.tableauScore) {
                            iconName = focused
                                ? 'ios-list'
                                : 'ios-list-outline';
                            return (
                                <Ionicons
                                    name={iconName}
                                    size={size}
                                    color={color}
                                />
                            );
                        } else if (route.name === ROAD_NAME.lanceDe) {
                            iconName = focused
                                ? 'dice-multiple'
                                : 'dice-multiple-outline';
                            return (
                                <MaterialCommunityIcons
                                    name={iconName}
                                    size={size}
                                    color={color}
                                />
                            );
                        }else if (route.name === ROAD_NAME.allGame) {
                            iconName = focused
                                ? 'history'
                                : 'history';
                            return (
                                <MaterialCommunityIcons
                                    name={iconName}
                                    size={size}
                                    color={color}
                                />
                            );
                        }
                        // You can return any component that you like here!
                    },
                    tabBarActiveTintColor: 'rgba(103, 80, 164, 1)',
                    tabBarInactiveTintColor: 'gray',
                })}>
                <Tab.Screen name={ROAD_NAME.tableauScore} component={ScoreCount} />
                <Tab.Screen name={ROAD_NAME.allGame} component={GamesStore} />
                <Tab.Screen name={ROAD_NAME.lanceDe} component={RollDice} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default Routes;
