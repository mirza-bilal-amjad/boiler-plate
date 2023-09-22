import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {
    NavigationContainer,
    useNavigationContainerRef,
} from '@react-navigation/native';
import {Startup} from '../screens';
import {useTheme} from '../hooks';
import MainNavigator from './Main';
import {useFlipper} from '@react-navigation/devtools';
import {ApplicationStackParamList} from 'types/navigation';

const Stack = createStackNavigator<ApplicationStackParamList>();

const ApplicationNavigator = () => {
    const {Layout, darkMode, NavigationTheme} = useTheme();
    const {colors}: string = NavigationTheme;

    const navigationRef = useNavigationContainerRef();
    useFlipper(navigationRef);

    return (
        <NavigationContainer theme={NavigationTheme} ref={navigationRef}>
            <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} animated={false}
                       backgroundColor={darkMode ? colors.background : colors.card}
            />
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="Startup" component={Startup}/>
                <Stack.Screen name="Main" component={MainNavigator}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default ApplicationNavigator;
