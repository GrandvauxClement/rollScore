import { MaterialCommunityIcons } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';

import RollDice from '../views/rollDice';
import ScoreCount from '../views/scoreCount';

const Tab = createBottomTabNavigator();

const Routes = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Tableau de score') {
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
                        } else if (route.name === 'Lancer de dé') {
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
                        }
                        // You can return any component that you like here!
                    },
                    tabBarActiveTintColor: 'rgba(103, 80, 164, 1)',
                    tabBarInactiveTintColor: 'gray',
                })}>
                <Tab.Screen name="Tableau de score" component={ScoreCount} />
                <Tab.Screen name="Lancer de dé" component={RollDice} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default Routes;
