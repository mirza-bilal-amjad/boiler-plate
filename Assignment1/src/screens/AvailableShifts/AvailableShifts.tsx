import {
    ActivityIndicator,
    FlatList,
    SectionList,
    StatusBar, StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";

import {fetchShifts} from "../../components/backend_server/fetchBackend";
import {convertTime} from "../../../utils/method";
import {useTheme} from "../../hooks";
import {addToShifts, setBookedTrue} from "../../store/availableShifts";
import {addToMyShifts} from "../../store/myShifts";

const AvailableShifts = () => {
    const {NavigationTheme, FontSize, Colors, Gutters, Layout, Fonts} = useTheme();
    let colors: any;
    ({colors} = NavigationTheme);


    const [helsinkiShifts, setHelsinkiShifts] = useState([]);
    const [tampereShifts, setTampereShifts] = useState([]);
    const [turkuShifts, setTurkuShifts] = useState([]);
    ///set area

    const avShifts = useSelector((state: any) => state.availableShiftsReducer);
    const myShifts = useSelector((state: any) => state.myShiftsReducer);
    const [menuName, setMenuName] = useState<any>('Helsinki');
    const [area, setArea] = useState([]);
    //fetch current date
    const dispatch = useDispatch();

    const formatDate = (date: any) => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        if (date.toDateString() === today.toDateString()) {
            return 'Today';
        } else {
            return date.toDateString();
        }
    };
    const compareShifts = (shift1: any, shift2: any) => {
        // Check if the start and end times of the two shifts overlap.
        return (shift1.startTime < shift2.endTime && shift1.endTime > shift2.startTime);
    };


    useEffect(() => {
        try {
            fetchShifts().then((r) => {
                    r.map((item: any) => dispatch(addToShifts(item)))
                }
            )
        } catch
            (e) {
            console.log(e)
        }
    }, []);

    useEffect(() => {
        const storeHelsinki: any = [];
        const storeTampere: any = [];
        const storeTurku: any = [];
        const storeArea: any = [];

        const HelsinkiData = avShifts.filter((item: any) => (item.area === 'Helsinki'));
        const TampereData = avShifts.filter((item: any) => (item.area === 'Tampere'));
        const TurkuData = avShifts.filter((item: any) => (item.area === 'Turku'));

        const HelsinkiShifts = HelsinkiData.reduce((acc: any, curr: any) => {
            const date = formatDate(new Date(curr.startTime));
            if (!acc[date]) {
                acc[date] = []
            }
            acc[date].push(curr)
            return acc;
        }, {})
        const TampereShifts = TampereData.reduce((acc: any, curr: any) => {
            const date = formatDate(new Date(curr.startTime));
            if (!acc[date]) {
                acc[date] = []
            }
            acc[date].push(curr)
            return acc;
        }, {})
        const TurkuShifts = TurkuData.reduce((acc: any, curr: any) => {
            const date = formatDate(new Date(curr.startTime));
            if (!acc[date]) {
                acc[date] = []
            }
            acc[date].push(curr)
            return acc;
        }, {})

        for (const [key] of Object.entries(HelsinkiShifts)) {
            storeHelsinki.push({title: key, data: HelsinkiShifts[key]})
        }
        for (const [key] of Object.entries(TampereShifts)) {
            storeTampere.push({title: key, data: TampereShifts[key]})
        }
        for (const [key] of Object.entries(TurkuShifts)) {
            storeTurku.push({title: key, data: TurkuShifts[key]})
        }

        setHelsinkiShifts(storeHelsinki);
        setTampereShifts(storeTampere);
        setTurkuShifts(storeTurku);
        // setTurkuShifts(TurkuData);


        const AreaData = avShifts.reduce((acc: any, curr: any) => {
            const area = curr.area;
            if (!acc[area]) {
                acc[area] = []
            }
            acc[area].push(curr)
            return acc;
        }, {})


        for (const [key] of Object.entries(AreaData)) {
            storeArea.push({area: key})
        }

        setArea(storeArea);
        // @ts-ignore
    }, [avShifts]);
    // @ts-ignore

    const SectionListItem = ({item, index, section}: any) => {
        const [isLoading, setIsLoading] = useState(false);
        const overlapFlag = myShifts.some((myItem: any) => compareShifts(item, myItem));
        const handleClick = () => {
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        };

        return (
            <View
                style={[{
                    borderTopWidth: index === 0 ? 0.2 : 0,
                    borderBottomWidth: index === section.data.length - 1 ? 0.2 : 0,
                }, Gutters["smallHPadding"], Gutters["tinyVPadding"], Layout.rowHCenter, Layout.scrollSpaceBetween /*styles.sectionListCard*/]}
            >
                <View style={[{
                    width: 100,
                }, Layout.row, Layout.justifyContentBetween]}>
                    <Text style={[{
                        color: Colors.bookedText,
                        fontSize: FontSize.small,
                        fontWeight: '400'
                    },]}>{convertTime(item.startTime)}</Text>
                    <Text style={{
                        color: Colors.bookedText,
                        fontSize: FontSize.small,
                    }}
                    >-</Text>
                    <Text style={{
                        color: Colors.bookedText,
                        fontSize: FontSize.small,
                        fontWeight: '400'
                    }}>{convertTime(item.endTime)}</Text>
                </View>


                <View style={[Layout.row, Layout.alignItemsCenter, Layout.justifyContentBetween]}>
                    <Text style={[{
                        color: item.booked ? Colors.bookedText : overlapFlag ? Colors.error : Colors.primaryInActive,
                        fontSize: FontSize.tiny,
                    }, Fonts.textBold, Gutters['smallHPadding']]}>{item.booked ? 'Booked' : overlapFlag ? 'Overlapped' : ''}</Text>
                    <TouchableOpacity
                        style={[{
                            borderColor: item.booked || overlapFlag ? Colors.primaryInActive : Colors.success,
                        }, styles.bookCancelButton, Layout.justifyContentCenter, Gutters['tinyVPadding'], Gutters['smallHPadding']]}
                        disabled={!!item.booked || overlapFlag}
                        activeOpacity={item.booked ? 1 : .8}
                        onPress={() => {
                            !item.booked &&
                            handleClick();
                            dispatch(setBookedTrue(item))
                            dispatch(addToMyShifts(item))

                        }}
                    >
                        {
                            isLoading && !item.booked ?
                                <ActivityIndicator size={'small'} color={Colors.success}/> :
                                <Text
                                    style={[{
                                        color: item.booked ? Colors.primaryInActive : overlapFlag ? Colors.primaryInActive : Colors.success,
                                        // color: 'black',
                                        textAlign: 'center',
                                        fontSize: FontSize.small,
                                    }, Fonts.textBold]}>{'Book'}</Text>
                        }
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    // @ts-ignore
    return (
        <View style={{flex: 1, backgroundColor: Colors.background}}>


            <View
                style={{
                    height: 70,
                    backgroundColor: Colors.background,
                }}
            >
                <FlatList
                    data={area}
                    renderItem={({item}) => (
                        <TouchableOpacity
                            activeOpacity={.8}
                            onPress={() => {
                                // @ts-ignore
                                setMenuName(item.area);
                            }}
                        >
                            <Text style={[{
                                borderRadius: 20,
                                color: item['area'] === menuName
                                    ? Colors.primary
                                    : Colors.primaryInActive,
                                fontSize: FontSize.tiny,
                            }, Fonts.textBold, Gutters['smallPadding']]}
                            >{item['area']}{` (${item['area'] === 'Helsinki' ? helsinkiShifts.length : item['area'] === 'Turku' ? turkuShifts.length : item['area'] === 'Tampere' ? tampereShifts.length : null})`}</Text>
                        </TouchableOpacity>

                    )}
                    // style={{width: "100%"}}
                    contentContainerStyle={[{
                        height: 70,
                        flexShrink: 1,
                    }, Layout.row, Layout.alignItemsCenter, Layout.justifyContentBetween, Gutters['tinyHPadding']]}
                />
                <Text style={{
                    borderBottomWidth: .2,
                    height: 0,
                }}/>
            </View>
            {helsinkiShifts.length === 0 && tampereShifts.length === 0 && turkuShifts.length === 0 ?
                <ActivityIndicator size={'large'} color={colors.black}
                                   style={[Layout.center, Layout.fill]}>

                </ActivityIndicator> :

                <SectionList
                    sections={menuName === 'Helsinki' ? helsinkiShifts : menuName === 'Tampere' ? tampereShifts : turkuShifts}
                    keyExtractor={(item, index) => item + index}
                    ItemSeparatorComponent={() => <Text style={{
                        borderBottomWidth: .2,
                        // marginHorizontal: 10,
                        height: 0
                    }}/>}
                    renderItem={SectionListItem}
                    renderSectionHeader={({section: {title}}) => (
                        <Text style={[{
                            paddingVertical: 15,
                            fontSize: FontSize.tiny,
                            color: Colors.bookedText,
                            backgroundColor: colors.card
                        }, Gutters['smallHPadding'], Fonts.textBold]}>
                            {title}
                        </Text>
                    )}
                />}
        </View>
    );
}
export default AvailableShifts
const styles = StyleSheet.create({

    bookCancelButton: {
        borderRadius: 30,
        borderWidth: .5,
        // paddingHorizontal: 25,
        // paddingVertical: 9,
        width: 110,
        height: 50,
    }

});
