import * as React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import ScoreCount from "../views/scoreCount";
import RollDice from "../views/rollDice";
import {NavigationContainer} from "@react-navigation/native";

const Tab = createBottomTabNavigator();

const Routes = () => {

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Score Count') {
                            iconName = focused ?
                                'ios-list' : 'ios-list-outline';
                            return <Ionicons name={iconName} size={size} color={color} />;
                        } else if (route.name === 'Roll Dice') {
                            iconName = focused  ?
                                'dice-multiple' :
                                'dice-multiple-outline';
                            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                        }
                        // You can return any component that you like here!
                    },
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                })}
            >
                <Tab.Screen name="Score Count" component={ScoreCount} />
                <Tab.Screen name="Roll Dice" component={RollDice} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default Routes
