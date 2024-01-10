import { FlatList, StyleSheet, Text, View } from "react-native";
import BreadCrums from "../components/UI/BreadCrums";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import { getActiveSession } from "../util/http";
import Loader from "../components/UI/Loader";
import SearchView from '../components/UI/SearchView';
import Card from '../components/UI/Card';
import LabelText from '../components/UI/LabelText';
import Checkbox from 'expo-checkbox';
import { Colors } from "../constants/Colors";
import RowActiveSession from "../components/ListItems/RowActiveSession";
import Button from '../components/UI/Button';
import filter from 'lodash.filter';

const ActiveSessionScreen = () => {
    const route = useRoute();
    const {version} = route.params;

    const [isLoading, setIsLoading] = useState(true);
    const [sessionData, setSessionData] = useState([]);
    const [allCheck, setAllCheck] = useState(false);
    const [selectedProcesses, setSelectedProcesses] = useState([]);

    useEffect(() => {
        NetInfo.addEventListener(state => {
            if(state.isConnected){
                const fetchActiveSession = async () => {
                    try {
                        const response = await getActiveSession(version);
                        const parsedResponse = JSON.parse(response);
                        setSessionData(parsedResponse);
                    } catch (error) {
                        console.log("Error Fetching Active Sessions: ", error);
                    }finally{
                        setIsLoading(false);
                    }
                }
                fetchActiveSession();
            }else{
                Alert.alert("No Internet Connection", "Please check your internet connection and try again.")
            }
        });
    }, []);

    const handleSelectAllChange = (value) => {
        setAllCheck(value);

        // Update selectedProcesses based on the "Select All" checkbox change
        if (value) {
            const allProcesses = sessionData.map(item => item.PROCESS);
            setSelectedProcesses(allProcesses);
        } else {
            setSelectedProcesses([]);
        }

        // Update the checked state for all items in sessionData
        const updatedSessionData = sessionData.map(item => ({ ...item, checked: value }));
        setSessionData(updatedSessionData);
    };

    const handleCheckboxChange = (item, value) => {
        const updatedSessionData = sessionData.map(dataItem => {
            if (dataItem.SID === item.SID) {
                return { ...dataItem, checked: value };
            }
            return dataItem;
        });
        setSessionData(updatedSessionData);

        // Update setSelectedProcesses based on the checkbox change
        if (value) {
            setSelectedProcesses(prevProcess => [...prevProcess, item.PROCESS]);
        } else {
            setSelectedProcesses(prevProcess =>
                prevProcess.filter(process => process !== item.PROCESS)
            );
        }
    };

    const endSessionHandler = () => {
        console.log(selectedProcesses);
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
            <FlatList 
                data={sessionData}
                keyExtractor={(item, index) => index}
                renderItem={(itemData) => (
                    <RowActiveSession 
                        dataItem={itemData.item}
                        isChecked={itemData.item.checked}
                        setChecked={(value) => handleCheckboxChange(itemData.item, value)}
                    />
                )}
            />
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