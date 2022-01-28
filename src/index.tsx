import React from 'react';
import {ThemeProvider} from 'styled-components/native';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';

import {AppNavigator} from '~/navigator';
import DefaultTheme from '~/theme/Default';
import {StoreProvider} from './store/Provider';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ThemeProvider theme={DefaultTheme}>
        <StoreProvider>
          <AppNavigator />
        </StoreProvider>
      </ThemeProvider>
    </SafeAreaView>
  );
};

export default App;
