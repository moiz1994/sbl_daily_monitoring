import { Alert, FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import BreadCrums from "../components/UI/BreadCrums";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import { endSession, getActiveSession } from "../util/http";
import Loader from "../components/UI/Loader";
import Card from '../components/UI/Card';
import LabelText from '../components/UI/LabelText';
import Checkbox from 'expo-checkbox';
import { Colors } from "../constants/Colors";
import RowActiveSession from "../components/ListItems/RowActiveSession";
import RowActiveSession12c from "../components/ListItems/RowActiveSession12c";
import Button from '../components/UI/Button';
import Toast from 'react-native-simple-toast';

const ActiveSessionScreen = () => {
    const route = useRoute();
    const nav = useNavigation();
    const {version} = route.params;

    const [isLoading, setIsLoading] = useState(true);
    const [isOnline, setIsOnline] = useState(false);
    const [refresh, setRefresh] = useState(false);

    const [sessionData, setSessionData] = useState([]);
    const [allCheck, setAllCheck] = useState(false);
    const [selectedProcesses, setSelectedProcesses] = useState([]);

    const [sessionData12c, setSessionData12c] = useState([]);
    const [selectedProcesses12c, setSelectedProcesses12c] = useState([]);

    useEffect(() => {
        NetInfo.addEventListener(state => {
            if(state.isConnected){
                const fetchActiveSession = async () => {
                    try {
                        const response = await getActiveSession(version);
                        const parsedResponse = JSON.parse(response);
                        if(version === "12c"){
                            setSessionData12c(parsedResponse)
                        }else{
                            setSessionData(parsedResponse);
                        }
                    } catch (error) {
                        console.log("Error Fetching Active Sessions: ", error);
                    }finally{
                        setIsLoading(false);
                        setRefresh(false);
                    }
                }
                fetchActiveSession();
                setIsOnline(state.isConnected);
            }else{
                Alert.alert("No Internet Connection", "Please check your internet connection and try again.")
            }
        });
    }, [setIsOnline, refresh, setRefresh]);

    const handleSelectAllChange = (value) => {
        setAllCheck(value);

        if (version === "12c") {
            const allProcesses = sessionData12c.map(item => item.PROCESS);
            setSelectedProcesses12c(value ? allProcesses : []);
            const updatedSessionData12c = sessionData12c.map(item => ({ ...item, checked: value }));
            setSessionData12c(updatedSessionData12c);
        } else {
            const allProcesses = sessionData.map(item => item.PROCESS);
            setSelectedProcesses(value ? allProcesses : []);
            const updatedSessionData = sessionData.map(item => ({ ...item, checked: value }));
            setSessionData(updatedSessionData);
        }
    };

    const handleCheckboxChange = (item, value) => {
        const process = item.PROCESS;

        if (version === "12c") {
            setSelectedProcesses12c(prevProcesses =>
                value ? [...prevProcesses, process] : prevProcesses.filter(p => p !== process)
            );
            const updatedSessionData12c = sessionData12c.map(dataItem =>
                dataItem.PROCESS === process ? { ...dataItem, checked: value } : dataItem
            );
            setSessionData12c(updatedSessionData12c);
        } else {
            setSelectedProcesses(prevProcesses =>
                value ? [...prevProcesses, process] : prevProcesses.filter(p => p !== process)
            );
            const updatedSessionData = sessionData.map(dataItem =>
                dataItem.PROCESS === process ? { ...dataItem, checked: value } : dataItem
            );
            setSessionData(updatedSessionData);
        }
    };

    const endSessionHandler = () => {
        // console.log(selectedProcesses)
        // console.log(selectedProcesses12c)

        if(selectedProcesses.length > 0){        
            Alert.alert(
                "Are You Sure?",
                "Are you sure you want to end selected session's?", 
                [
                    { text: "No", style: "cancel" },
                    { text: "Yes", onPress: sendProcessData }
                ]
            )
        }else{
            Alert.alert("Invalid Input!", "Please select session(s)")
        }
    }

    const sendProcessData = async () => {
        try {
            setIsLoading(true);
            if(isOnline){
                let response;
                if(version === "12c"){
                    response = await endSession(version, selectedProcesses12c);
                    console.log(response);
                }else{
                    response = await endSession(version, selectedProcesses);
                    console.log(response);
                }
                
                if(response === "Success"){
                    Toast.show("Session(s) Ended Successfully", Toast.LONG);                    
                    nav.reset({
                        index: 0,
                        routes: [{ name: 'Dashboard' }],
                    })
                }else{
                    Toast.show(response, Toast.LONG);
                    console.log(response)
                }
            }else{
                Alert.alert("No Internet Connection", "Please check your internet connection and try again.")
            }
            setIsLoading(false);
        }catch(error){
            console.error('Error Ending Session: ', error);
        }
    }

    const refreshHandler = () => {
        setRefresh(true);
        setIsLoading(true);
    }
    

    let list;
    if (version === "12c") {
        list = (
            <FlatList 
                data={sessionData12c}
                keyExtractor={(item, index) => item.KILL_JOB}
                renderItem={(itemData) => (
                    <RowActiveSession12c 
                        dataItem={itemData.item}
                        isChecked={itemData.item.checked}
                        setChecked={(value) => handleCheckboxChange(itemData.item, value)}
                    />
                )}
                refreshControl={ <RefreshControl refreshing={refresh} onRefresh={refreshHandler} /> }
            />
        );
    } else {
        list = (
            <FlatList 
                data={sessionData}
                keyExtractor={(item, index) => item.SID}
                renderItem={(itemData) => (
                    <RowActiveSession 
                        dataItem={itemData.item}
                        isChecked={itemData.item.checked}
                        setChecked={(value) => handleCheckboxChange(itemData.item, value)}
                    />
                )}
                refreshControl={ <RefreshControl refreshing={refresh} onRefresh={refreshHandler} /> }
            />
        );
    }

    if(isLoading){
        return <Loader message="Loading..." />
    }
    return (
        <View style={styles.container}>
            <View>
                <BreadCrums text="Dashboard/Active Session"/>
                <Card style={styles.card}>
                    <LabelText label="Version" text={version}/>
                    <View style={styles.checkboxContainer}>
                        <Text style={styles.checkboxLabel}>Select All</Text>
                        <Checkbox 
                            value={allCheck}
                            onValueChange={(value) => handleSelectAllChange(value)}
                            color={allCheck ? Colors.blue500 : undefined}
                        />
                    </View>
                </Card>                
            </View>
            {sessionData || sessionData12c ? list : ( <Text>No Sessions Available</Text> )}
            <Button style={styles.btn} onPress={endSessionHandler}>End Session</Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginTop: 10,
        marginHorizontal: 10,
    },
    checkboxContainer: {
        flexDirection: 'row',
    },
    checkboxLabel: {
        color: Colors.blue500,
        fontFamily: 'roboto-regular',
        marginRight: 7,
    },
    btn: {
        marginBottom: 10,
        marginHorizontal: 10,
    }
});

export default ActiveSessionScreen;