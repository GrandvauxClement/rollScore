import * as React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';

import { store } from './src/redux/store';
import Routes from './src/routes/routes';

export default function App() {
    return (
        <ReduxProvider store={store}>
            <PaperProvider>
                <Routes />
            </PaperProvider>
        </ReduxProvider>
    );
}
