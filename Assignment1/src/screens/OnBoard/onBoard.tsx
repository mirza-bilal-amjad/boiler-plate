import {Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import {useTheme} from "../../hooks";

import {SwiperFlatList} from 'react-native-swiper-flatlist'
import LottieView from "lottie-react-native";
import {setLogIn} from "../../store/login";
import {useDispatch} from "react-redux";


const OnBoard = ({navigation}: any) => {

    const {Layout, Colors, NavigationTheme, FontSize, Fonts, Gutters} = useTheme();
    const {colors} = NavigationTheme;
    const dispatch = useDispatch();

    const data = [{
        title: 'Welcome to the Shifts Management', viewCont: () =>
            <LottieView source={require('../../assets/paginationAnimation1.json')}
                        style={{height: Dimensions.get('screen').height / 2, width: Dimensions.get('screen').width}}
                        autoPlay loop/>
    }, {
        title: 'Book your shifts', viewCont: () =>
            <LottieView source={require('../../assets/paginationAnimation2.json')}
                        style={{height: Dimensions.get('screen').height / 2, width: Dimensions.get('screen').width}}
                        autoPlay loop/>

    }, {
        title: 'Cancel your shifts', viewCont: () =>
            <LottieView source={require('../../assets/paginationAnimation3.json')}
                        style={{height: Dimensions.get('screen').height / 2, width: Dimensions.get('screen').width}}
                        autoPlay/>
    }, {
        title: 'View your shifts', viewCont: () =>
            <LottieView source={require('../../assets/paginationAnimation4.json')}
                        style={{height: Dimensions.get('screen').height / 2, width: Dimensions.get('screen').width}}
                        loop autoPlay
            />
    }]

    return (
        <SafeAreaView style={[Layout.fill, {backgroundColor: colors.background}]}>

            <View style={[{height: Dimensions.get('screen').height / 1.3,}]}>
                <SwiperFlatList
                    autoplay
                    autoplayDelay={4}
                    // autoplayLoop
                    index={0}
                    showPagination
                    data={data}
                    paginationDefaultColor={Colors.primaryInActive}
                    paginationActiveColor={Colors.primary}
                    paginationStyleItem={{width: 10, height: 10}}
                    renderItem={({item}) => (
                        <View style={[{
                            width: Dimensions.get('screen').width,
                        }, Layout.center]}>
                            <Text
                                style={[{
                                    color: Colors.primary,
                                    fontSize: FontSize.large,
                                    ...Fonts.textCenter,
                                }, Layout.justifyContentCenter, Fonts.textBold,
                                    Gutters.smallHPadding
                                ]}>{item.title}</Text>
                            {item.viewCont &&
                                <View style={[
                                    Layout.center,
                                    {
                                        // backgroundColor: 'pink'
                                    }
                                ]}>
                                    {item.viewCont()}
                                </View>
                            }
                        </View>
                    )}
                />
            </View>
            <View style={[Layout.fill, Layout.center,]}>
                <TouchableOpacity
                    style={[{
                        backgroundColor: Colors.primary,
                        height: 60,
                        width: Dimensions.get('screen').width / 2.3,
                        alignSelf: 'center',
                        borderRadius: 100,
                    }, Layout.center]}
                    onPress={() => {
                        navigation.reset({
                            index: 0,
                            routes: [{name: 'Main'}],
                        })
                        dispatch(setLogIn({loggedIn: true}))
                    }}
                >
                    <Text style={[{
                        color: 'white',
                        fontSize: FontSize.regular,
                    }, Fonts.textBold]}>Get Started</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
export default OnBoard
const styles = StyleSheet.create({})
