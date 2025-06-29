import * as React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
    DarkTheme,
    DefaultTheme,
    NavigationContainer,
} from '@react-navigation/native';

import RollDice from '../views/rollDice';
import ScoreCount from '../views/scoreCount';
import GamesStore from '../views/gamesStore';
import { ROAD_NAME } from '../config/roadName';
import { useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import TeamBuilder from '../views/teamBuilder';

const Tab = createBottomTabNavigator();
const Routes = () => {
    const colorScheme = useColorScheme();
    return (
        <NavigationContainer
            theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        switch(route.name) {
                            case ROAD_NAME.tableauScore : {
                                iconName = focused ? 'list' : 'list-outline';
                                return (
                                    <Ionicons
                                        name={iconName}
                                        size={size}
                                        color={color}
                                    />
                                );
                            }
                            case ROAD_NAME.lanceDe : {
                               iconName = focused ? 'list' : 'list-outline';
                                return (
                                    <Ionicons
                                        name={iconName}
                                        size={size}
                                        color={color}
                                    />
                                );
                            }
                            case ROAD_NAME.lanceDe : {
                                iconName = focused ? 'dice-multiple' : 'dice-multiple-outline';
                                return (
                                    <MaterialCommunityIcons
                                        name={iconName}
                                        size={size}
                                        color={color}
                                    />
                                );
                            }
                            case ROAD_NAME.allGame : {
                               iconName = focused ? 'history' : 'history';
                                return (
                                    <MaterialCommunityIcons
                                        name={iconName}
                                        size={size}
                                        color={color}
                                    />
                                );
                            }
                            case ROAD_NAME.constructionEquipe : {
                               iconName = focused ? 'account-multiple' : 'account-multiple-outline';
                                return (
                                    <MaterialCommunityIcons
                                        name={iconName}
                                        size={size}
                                        color={color}
                                    />
                                );
                            }
                        }
                        
                        // You can return any component that you like here!
                    },
                    tabBarActiveTintColor: 'rgba(103, 80, 164, 1)',
                    tabBarInactiveTintColor: 'gray',
                })}>
                <Tab.Screen
                    name={ROAD_NAME.tableauScore}
                    component={ScoreCount}
                />
                <Tab.Screen name={ROAD_NAME.allGame} component={GamesStore} />
                <Tab.Screen name={ROAD_NAME.lanceDe} component={RollDice} />
                <Tab.Screen name={ROAD_NAME.constructionEquipe} component={TeamBuilder} />
            </Tab.Navigator>
            <StatusBar />
        </NavigationContainer>
    );
};

export default Routes;
