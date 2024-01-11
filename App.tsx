import * as React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';
import {persistor, store} from './src/redux/store';
import Routes from './src/routes/routes';
import {PersistGate} from "redux-persist/integration/react";
import { useTheme } from 'react-native-paper';

export default function App() {

    return (
        <ReduxProvider store={store}>
            <PersistGate persistor={persistor} loading={null}>
                <PaperProvider>
                    <Routes />
                </PaperProvider>
            </PersistGate>
        </ReduxProvider>
    );
}
