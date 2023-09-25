import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';

import {
    NavigationContainer,
    useNavigationContainerRef,
} from '@react-navigation/native';
import {Startup} from '../screens';
import {useTheme} from '../hooks';
import MainNavigator from './Main';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {ApplicationStackParamList} from "../../@types/navigation";

const Stack = createNativeStackNavigator<ApplicationStackParamList>();

const ApplicationNavigator = () => {
    const {Layout, darkMode, NavigationTheme} = useTheme();
    let colors: any;
    ({colors} = NavigationTheme);

    const navigationRef = useNavigationContainerRef();

    return (
        <NavigationContainer theme={NavigationTheme} ref={navigationRef}>
            <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} animated={false}
                       backgroundColor={colors.background}
            />
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="Startup" component={Startup}/>
                <Stack.Screen name="Main" component={MainNavigator}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default ApplicationNavigator;
