import {SafeAreaView, SectionList, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {convertTime} from "../../../utils/method";
import {useTheme} from "@/hooks";
import {inspect} from "util";
import {cancelShiftsAndSetFalse} from "@/store/availableShifts";
import {cancelMyShifts} from "@/store/myShifts";
import {Colors} from "@/theme/Variables";

const MyShifts = () => {
    const [sectionShifts, setSectionShifts] = useState<any>([])
    const dispatch = useDispatch();
    const {Colors, FontSize, NavigationTheme} = useTheme();

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
        const storeShifts = [];

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
            {myShifts.length === 0 ? <View style={{flex: 1, justifyContent: "center", alignItems: 'center'}}>
                    <Text
                        style={{justifyContent: "center", color: Colors.primary}}
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
                            }, styles.sectionCard]}
                            activeOpacity={0.8}
                        >
                            <View>
                                <View style={styles.startTimeEndTime}>
                                    <Text style={{
                                        color: Colors.bookedText,
                                        fontSize: 18,
                                        fontWeight: '400'
                                    }}>{convertTime(item.startTime)}</Text>
                                    <Text style={{
                                        color: 'black',
                                        fontSize: 18,
                                    }}>-</Text>
                                    <Text style={{
                                        color: Colors.bookedText,
                                        fontSize: 18,
                                        fontWeight: '400'
                                    }}>{convertTime(item.endTime)}</Text>
                                </View>
                                <Text
                                    style={{
                                        color: Colors.primaryInActive,
                                        fontSize: 16,
                                        fontWeight: '500'
                                    }}
                                >{item.area}</Text>
                            </View>

                            <View style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center"
                            }}>
                                <TouchableOpacity
                                    style={styles.cancelButton}
                                    activeOpacity={.5}
                                    onPress={() => {
                                        dispatch(cancelShiftsAndSetFalse(item))
                                        dispatch(cancelMyShifts(item))
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: Colors.error,
                                            fontSize: 18,
                                            fontWeight: 'bold'
                                        }}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    )}
                    renderSectionHeader={({section: {title}}) => (
                        <View style={{
                            flexDirection: 'row',
                            backgroundColor: Colors.grey,
                            paddingHorizontal: 18,
                            paddingVertical: 15,
                        }}>
                            <Text style={{
                                fontSize: 15,
                                paddingHorizontal: 5,
                                fontWeight: 'bold',
                                color: Colors.bookedText,
                            }}>
                                {title}
                            </Text>
                            <Text style={{
                                fontSize: 15,
                                paddingHorizontal: 10,
                                fontWeight: '400',
                                color: Colors.primaryInActive,
                            }}>
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
        </SafeAreaView>
    );
}
export default MyShifts

const styles = StyleSheet.create({
    mainContainer: {flex: 1,},
    sectionCard: {

        paddingHorizontal: 20,
        paddingVertical: 15,
        // marginHorizontal: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
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
        paddingVertical: 9,
        borderColor: Colors.error,
    }
})
