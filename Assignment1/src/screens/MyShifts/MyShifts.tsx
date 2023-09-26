import {SafeAreaView, SectionList, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {convertTime} from "../../../utils/method";
import {useTheme} from "../../hooks";
import {cancelMyShifts} from "../../store/myShifts";
import {cancelShiftsAndSetFalse} from "../../store/availableShifts";
import {Colors} from "../../theme/Variables";
import {bookShift, cancelShift} from "../../components/backend_server/fetchBackend";

const MyShifts = () => {
    const [sectionShifts, setSectionShifts] = useState<any>([])
    const dispatch = useDispatch();
    const {Colors, FontSize, NavigationTheme, Layout, Gutters, Fonts} = useTheme();

    const {colors} = NavigationTheme;
    const myShifts = useSelector((state: any) => state.myShiftsReducer)
    const formatDate = (date: any) => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        if (date.toDateString() === today.toDateString()) {
            return 'Today';
        } else if (date.toDateString() === tomorrow.toDateString()) {
            return 'Tomorrow';
        } else {
            // Format the date as you prefer (e.g., "DD/MM/YYYY")
            return date.toDateString();

        }
    }

    const returnShifts = () => {
        const storeShifts: any = [];

        const MYSHIFTSS = myShifts.reduce((acc: any, curr: any) => {
            const date = formatDate(new Date(curr.startTime));
            if (!acc[date]) {
                acc[date] = []
            }
            acc[date].push(curr)
            return acc;
        }, {})
        for (const [key] of Object.entries(MYSHIFTSS)) {
            storeShifts.push({title: key, data: MYSHIFTSS[key]})
        }
        setSectionShifts(storeShifts)
    }

    useEffect(() => {
        returnShifts();
    }, [myShifts]);

    return (
        <SafeAreaView style={styles.mainContainer}>
            {myShifts.length === 0 ? <View style={[Layout.fill, Layout.center]}>
                    <Text
                        style={[{color: Colors.primary}, Layout.justifyContentCenter]}
                    >No booked shifts...</Text></View> :
                <SectionList
                    sections={sectionShifts}
                    keyExtractor={(item, index) => item + index}
                    ItemSeparatorComponent={() => <Text style={{
                        borderBottomWidth: .2,
                        // marginHorizontal: 10,
                        height: 0
                    }}/>}
                    renderItem={({item, index, section}) => (
                        <TouchableOpacity
                            style={[{
                                borderTopWidth: index === 0 ? 0.2 : 0,
                                borderBottomWidth: index === section.data.length - 1 ? 0.2 : 0,
                            }, styles.sectionCard, Gutters['smallHPadding'], Layout.row, Layout.alignItemsCenter, Layout.scrollSpaceBetween]}
                            activeOpacity={0.8}
                        >
                            <View>
                                <View style={styles.startTimeEndTime}>
                                    <Text style={[{
                                        color: Colors.bookedText,
                                        fontSize: FontSize.small,
                                    }, Fonts.textBold]}>{convertTime(item.startTime)}</Text>
                                    <Text style={{
                                        color: 'black',
                                        fontSize: 18,
                                    }}>-</Text>
                                    <Text style={[{
                                        fontSize: FontSize.small,
                                        color: Colors.bookedText,
                                    }, Fonts.textBold]}>{convertTime(item.endTime)}</Text>
                                </View>
                                <Text
                                    style={[{
                                        color: Colors.primaryInActive,
                                        fontSize: 16,
                                    }, Fonts.textBold]}
                                >{item.area}</Text>
                            </View>

                            <View style={[Layout.row, Layout.alignItemsCenter, Layout.justifyContentBetween]}>
                                <TouchableOpacity
                                    style={styles.cancelButton}
                                    activeOpacity={.5}
                                    onPress={() => {
                                        dispatch(cancelShiftsAndSetFalse(item))
                                        dispatch(cancelMyShifts(item))
                                    }}
                                >
                                    <Text
                                        style={[{
                                            color: Colors.error,
                                            fontSize: FontSize.small,
                                        }, Fonts.textBold]}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    )}
                    renderSectionHeader={({section: {title}}) => (
                        <View style={[{
                            backgroundColor: colors.card,
                            paddingVertical: 15,
                        }, Layout.row, Gutters['smallHPadding']]}>
                            <Text style={[{
                                fontSize: FontSize.tiny,
                                paddingHorizontal: 5,

                                color: Colors.bookedText,
                            }, Fonts.textBold]}>
                                {title}
                            </Text>
                            <Text style={[{
                                fontSize: FontSize.tiny,
                                color: Colors.primaryInActive,
                            }, Gutters['tinyHPadding'], Fonts.textBold]}>
                                {
                                    myShifts.filter((item: any) => formatDate(new Date(item.startTime)) === title).length
                                }
                                {
                                    myShifts.filter((item: any) => formatDate(new Date(item.startTime)) === title).length === 1 ? ' shift' : ' shifts'
                                }, {
                                myShifts.filter((item: any) => formatDate(new Date(item.startTime)) === title).reduce((acc: any, curr: any) => acc + (curr.endTime - curr.startTime), 0) / 3600000
                            } hrs
                            </Text>
                        </View>
                    )}
                />
            }

            <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => bookShift('d76a9e35-2422-4bf7-9fd7-e7d7a9e444a9')}
            ><Text>Candelabrum</Text></TouchableOpacity>
        </SafeAreaView>
    );
};
export default MyShifts

const styles = StyleSheet.create({
    mainContainer: {flex: 1,},
    sectionCard: {
        paddingVertical: 15,
    },
    startTimeEndTime: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 100,
    },
    cancelButton: {
        borderRadius: 30,
        borderWidth: .5,
        paddingHorizontal: 25,
        paddingVertical: 12,
        borderColor: Colors.error,
    }
})
