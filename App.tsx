import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RollDice from "./src/views/rollDice";
import ScoreCount from "./src/views/scoreCount";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Ionicons from '@expo/vector-icons/Ionicons'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Provider as PaperProvider } from 'react-native-paper';

/*const Stack = createNativeStackNavigator();
const Tab = createNativeStackNavigator();
const Test = () : JSX.Element => {
  return (
      <View>
          <Text>COmponent TEst ! :)</Text>
      </View>
  )
}
function Home() : JSX.Element {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Profile" component={ScoreCount} />
            <Tab.Screen name="Settings" component={Test} />
        </Tab.Navigator>
    );
}


export default function App(): JSX.Element {
  return (
      <NavigationContainer>
          <Stack.Navigator>
              <Stack.Screen
                  name={"ScoreCount"}
                  component={Home}
                  options={{title: "Compte les scores"}}
              />
              <Stack.Screen
                  name={"RollDice"}
                  component={RollDice}
                  options={{title: "Lanceur de Dé"}}
              />
          </Stack.Navigator>
              {/!*<RollDice />*!/}
          {/!*<RollDice />*!/}
      </NavigationContainer>
  );
}*/
function HomeScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Home!</Text>
        </View>
    );
}

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <PaperProvider>
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName;

                            if (route.name === 'Home') {
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
                    <Tab.Screen name="Home" component={ScoreCount} />
                    <Tab.Screen name="Roll Dice" component={RollDice} />
                </Tab.Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
}
