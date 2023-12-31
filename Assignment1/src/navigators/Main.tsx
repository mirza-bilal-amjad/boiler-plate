import {View} from 'react-native'
import React from 'react'
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {useTheme} from "../hooks";
import {AvailableShifts, MyShifts} from "../screens";

const BottomTabs = createBottomTabNavigator();

const MainNavigator = () => {
    const {NavigationTheme, FontSize, Fonts} = useTheme();
    let colors: any;
    ({colors} = NavigationTheme);
    return (
        <BottomTabs.Navigator initialRouteName={'My Shifts'}
                              screenOptions={{
                                  tabBarLabelStyle: [{
                                      position: 'relative',
                                      fontSize: FontSize.small,
                                      bottom: 17,
                                  }, Fonts.textBold],
                                  tabBarStyle: {
                                      flex: 1,
                                      maxHeight: 60,
                                      backgroundColor: colors.card,
                                  },
                                  tabBarActiveTintColor: colors.primary,
                              }}
        >
            <BottomTabs.Screen name='My Shifts' component={MyShifts}
                               options={{
                                   headerShown: true,
                                   headerTitleStyle: {fontWeight: '900', color: colors.primary},
                                   tabBarIcon: () => <View style={{display: 'none'}}></View>,
                                   headerStyle: {
                                       height: 70,
                                       borderBottomWidth: 1,
                                       backgroundColor: colors.background
                                   }
                               }}/>
            <BottomTabs.Screen name='Available Shifts' component={AvailableShifts}
                               options={{
                                   headerShown: false,
                                   tabBarIcon: () => <View style={{display: 'none'}}></View>

                               }}/>
        </BottomTabs.Navigator>
    );
}
export default MainNavigator
