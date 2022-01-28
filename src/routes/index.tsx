import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Home} from '~/pages/Home';

const Stack = createNativeStackNavigator();

export const Routes = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};
