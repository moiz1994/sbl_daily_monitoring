import { Alert, Image, StyleSheet, Text, View } from "react-native";
import Card from '../components/UI/Card';
import LabelText from "../components/UI/LabelText";
import Button from '../components/UI/Button';
import BreadCrums from '../components/UI/BreadCrums';
import { useEffect, useState } from "react";
import NetInfo from '@react-native-community/netinfo';
import { getSaleDateTimerData, updateSaleDate } from "../util/http";
import Loader from "../components/UI/Loader";
import ImageButton from "../components/UI/ImageButton";
import DateTimePicker from '@react-native-community/datetimepicker'
import { formatTime } from "../util/DateFormat";
import { useRoute } from "@react-navigation/native";
import Toast from 'react-native-simple-toast';

const SaleDateScreen = () => {
    const route = useRoute();
    const {empCode} = route.params;

    const [isOnline, setIsOnline] = useState(false);
    const [timerData, setTimerData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);   
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [selectedTime, setSelectedTime] = useState(new Date());
    const [selectTimeString, setSelectedTimeString] = useState('');

    useEffect(() => {
        NetInfo.addEventListener(state => {
            if(state.isConnected){
                const fetchTimerData = async () => {
                    try {
                        const response = await getSaleDateTimerData();
                        const parsedJson = JSON.parse(response);
                        setTimerData(parsedJson);                        
                        // console.log(parsedJson)
                    } catch (error) {
                        console.log("Error Loading Timer Data: ", error)
                    }finally{
                        setIsLoading(false);
                    }                    
                }    
                fetchTimerData();
            }else{
                Alert.alert("No Internet Connection", "Please check your internet connection and try again.")
            }
            setIsOnline(state.isConnected);
        })
    }, [setIsOnline]);


    if(isLoading){
        return <Loader message="Loading..." />
    }
    
    const {SALE_DATE, CUR_DATE, EXPIRED_ON, CHANGED_AT, CHANGED_BY} = timerData[0];

    const handleTimePicker = () => {
        setShowTimePicker(true);
    }

    const hideTimePicker = () => {
        setShowTimePicker(false);
    }
    

    const handleTimeChange = (event, time) => {        
        hideTimePicker()
        if (time !== undefined && event.type === 'set') {    
            setSelectedTime(time);
            setSelectedTimeString(formatTime(time))
        }
        setShowTimePicker(false)
    }

    const updateFunctionSaleDate = async () => {
        try {
            setIsLoading(true);
            if(isOnline){
                const response = await updateSaleDate(selectTimeString, SALE_DATE, empCode);
                console.log(response);
                if(response === "Success"){
                    Toast.show("Sale Date Updated Successfully!", Toast.SHORT)
                    setRefreshData(true);
                }else{
                    Toast.show("Error While Updating Sale Date", Toast.SHORT);
                }
            }else{
                Alert.alert("No Internet Connection", "Please check your internet connection and try again.");
            }
            setIsLoading(false);
        } catch (error) {
            console.log("Error Updating Sale Date: ", error);
        }
    }

    const updateSaleDateHandler = () => {
        if(selectTimeString){
            Alert.alert(
                "Are You Sure?",
                "Are you sure you want to update Sale Date?", 
                [
                    { text: "No", style: "cancel" },
                    { text: "Yes", onPress: updateFunctionSaleDate }
                ]
            )
        }else{
            Alert.alert("Select Time!!!", "Please select a time for sale date first.", [{text: "Ok"}])
        }
    }

    let content;
    if(CUR_DATE >= SALE_DATE){
        //console.log("Current Date is greater than or equal to Sale Date");       
        content = (
            <>
                <LabelText label="Sale Date" text={SALE_DATE}/>
                <LabelText label="Sale Date Close @" text={EXPIRED_ON}/>
                <LabelText label="Changed @" text={CHANGED_AT}/>
                <LabelText label="Changed By" text={CHANGED_BY}/>
                <Text style={styles.note}> NOTE: Sale Date to be {CUR_DATE} after Sale Date is closed.</Text>
            </>
        );
    }else{
        // console.log("Current Date is Less than Sale Date")        
        content = (
            <>
                <LabelText label="Current Sale Date" text={SALE_DATE}/>
                <View style={styles.subContainer}>
                    <Text style={styles.textHeading}>Until When</Text>
                    <Text style={styles.text}>{selectTimeString}</Text>
                    <ImageButton source={require('../assets/time.png')} onPress={handleTimePicker} />
                    <Button onPress={updateSaleDateHandler}>Change Sale Date</Button>
                </View>
            </>
        );
    }
    
    return (    
        <View style={styles.container}>
            {showTimePicker && (
                <DateTimePicker 
                    value={selectedTime || new Date()}
                    mode='time'
                    display='default'
                    is24Hour={true}
                    onChange={handleTimeChange}
                    positiveButton={hideTimePicker}                    
                />
            )}
            <BreadCrums text="Dashboard/Sale Date" />
            <View style={styles.cardContainer}>
                <Card style={styles.card}>
                    <View>
                        {/* <LabelText label="Sale Date" text={CUR_DATE}/>
                        <LabelText label="Sale Date Close @" text={EXPIRED_ON}/>
                        <LabelText label="Changed @" text={CHANGED_AT}/>
                        <LabelText label="Changed By" text={CHANGED_BY}/>

                        <LabelText label="Current Sale Date" text={SALE_DATE}/>
                        <View style={styles.subContainer}>
                            <Text style={styles.textHeading}>Until When</Text>
                            <Text style={styles.text}>Until When</Text>
                            <Image source={require("../assets/time.png")} style={styles.timeImage}/>
                            <Button>Change Sale Date</Button>
                        </View> */}
                        {content}
                    </View>
                </Card>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cardContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0, // Adjust this value to control the position of the card
        left: 0,
        right: 0,
        bottom: 0,
        marginHorizontal: 10,        
    },
    card: {
        overflow: "hidden",
        padding: 10,
        width: '100%',
    },
    note: {
        textAlign: 'center',
        paddingHorizontal: 10,
        fontFamily: 'roboto-medium',
        marginVertical: 10,
    },
    subContainer: {
        alignItems: 'center',
    },
    timeImage: {
        width: 120,
        height: 120,
        marginBottom: 10,
    },
    textHeading: {
        fontSize: 16,
        marginVertical: 10,
        fontFamily: 'roboto-bold',
    },
    text: {
        fontSize: 14,
        marginBottom: 10,
        fontFamily: 'roboto-regular'
    },
});

export default SaleDateScreen;