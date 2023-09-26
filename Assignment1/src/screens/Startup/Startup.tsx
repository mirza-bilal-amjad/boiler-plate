import React, {useEffect} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {useTheme} from '../../hooks';
import {Brand} from '../../components';
import {setDefaultTheme} from '../../store/theme';
import {ApplicationScreenProps} from '../../../@types/navigation';
import LottieView from 'lottie-react-native';
import {useSelector} from "react-redux";

const Startup = ({navigation}: ApplicationScreenProps) => {
    const {Layout, Gutters, Colors} = useTheme();
    const checkIfLoggedIn = useSelector((state: any) => state.logInReducer.loggedIn);
    console.log(checkIfLoggedIn)

    const init = async () => {
        await new Promise(resolve =>
            setTimeout(() => {
                resolve(true);
            }, 2000),
        );
        // @ts-ignore
        await setDefaultTheme({theme: 'default', darkMode: null});
        navigation.reset({
            index: 0,
            routes: [{name: !checkIfLoggedIn ? 'OnBoardScreen' : 'Main'}],
        });
    };

    useEffect(() => {
        init();
    }, []);

    return (
        <View style={[Layout.fill, Layout.colCenter]}>
            {/*<Brand/>*/}
            <LottieView
                source={require('../../assets/startupAnimation.json')}
                colorFilters={
                    [
                        {
                            keypath: "1E1E1E",
                            color: Colors.lottieKp5
                        },
                        {
                            keypath: "262626",
                            color: Colors.lottieKp4
                        },
                        {
                            keypath: "474646",
                            color: Colors.lottieKp3
                        },
                        {
                            keypath: "717171",
                            color: Colors.lottieKp2
                        },
                        {
                            keypath: "979797",
                            color: Colors.lottieKp1
                        }
                    ]
                }
                style={{height: 300, width: 300}}
                autoPlay loop/>
        </View>
    );
};

export default Startup;
