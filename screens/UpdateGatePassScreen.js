import { View, StyleSheet, Text, Alert } from "react-native";
import BreadCrums from '../components/UI/BreadCrums';
import CenterView from '../components/UI/CenterView';
import Card from '../components/UI/Card';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from "react";
import NetInfo from '@react-native-community/netinfo';
import { getVehGatePassData, updateVehGatePass } from "../util/http";
import Loader from "../components/UI/Loader";
import LabelText from "../components/UI/LabelText";
import { Picker } from "@react-native-picker/picker";
import { Colors } from "../constants/Colors";
import Button from "../components/UI/Button";
import Toast from 'react-native-simple-toast';

const UpdateGatePassScreen = () => {
    const route = useRoute();
    const nav = useNavigation();

    const { gPNo } = route.params;

    const [isOnline, setIsOnline] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const [gpData, setGPData] = useState([]);

    const {GATE_PASS_ID, GATEPASS_DATE, CUSTOMER_CODE, CUSTOMER_NAME, CITY_NAME, VEHICLE_NO, VEHICLE_GROUP, REMARKS} = gpData[0] || {}

    
    const [selectedGroup, setSelectGroup] = useState();

    useEffect(() => {
        NetInfo.addEventListener(state => {
            setIsOnline(state.isConnected);
            if(state.isConnected){
                const fetchGatePassData = async () => {
                    try {
                        const response = await getVehGatePassData(gPNo);
                        const parsedData = JSON.parse(response);
                        setGPData(parsedData);
                        setSelectGroup(parsedData[0].VEHICLE_GROUP);
                    } catch (error) {
                        console.log("Error Fetching Vehicle Gate Pass Data", error);
                        Alert.alert("Invalid Gate Pass No", "The gate pass No is invalid please provide accurate information", [
                            {text: "Okay", onPress: () => {nav.reset({index: 0, routes: [{ name: 'Dashboard' }]})}}
                        ])
                    }finally{
                        setIsLoading(false);
                    }
                }
                
                fetchGatePassData();
            }else{
                Alert.alert("No Internet Connection", "Please check your internet connection and try again.")
            }
        });
    }, [setIsLoading, setIsOnline])

    const updateVehicleGroupHandler = () => {
        //console.log(selectedGroup)
        Alert.alert("Are You Sure?", 'Are you sure you want to update vehicle group', [
            { text: "No", style: "cancel" },
            { text: "Yes", onPress: updateVehGroup }
        ])
    }

    const updateVehGroup = async () => {
        if(isOnline){
            try {
                setIsLoading(true);
                const response = await updateVehGatePass(gPNo, selectedGroup);                
                if(response === "Success"){
                    Toast.show("Vehicle Group Updated Successfully", Toast.LONG);                    
                    nav.reset({
                        index: 0,
                        routes: [{ name: 'Dashboard' }],
                    })
                }else{
                    Toast.show("Error While Updating Vehicle Group: " + response, Toast.LONG);
                    console.log(response)
                }
                setIsLoading(false);
            } catch (error) {
                console.error('Error Updating Vehicle Group: ', error);
            }
        }else{
            Alert.alert("No Internet Connection", "Please check your internet connection and try again.")
        }
    }
    
    
    
    if(isLoading){
        return <Loader message="Loading..."/>
    }

    return (
        <View style={styles.root}>
            <BreadCrums text="Dashboard/Update Vehicle Gate Pass"/>
            <CenterView>
                <Card style={styles.card}>             
                    <LabelText label="Gate Pass#" text={GATE_PASS_ID}/>
                    <LabelText label="Gate Pass Date" text={GATEPASS_DATE}/>
                    <LabelText label="Customer" text={CUSTOMER_CODE + '-' + CUSTOMER_NAME}/>
                    <LabelText label="City" text={CITY_NAME}/>
                    <LabelText label="Vehicle No#" text={VEHICLE_NO}/>
                    <LabelText label="Vehicle Group" text={VEHICLE_GROUP}/>
                    <LabelText label="Remarks" text={REMARKS}/>
                    <Picker
                        selectedValue={selectedGroup}
                        onValueChange={(itemValue, itemIndex) => setSelectGroup(itemValue)}
                        placeholder="Select Vehicle Group"
                    >
                        <Picker.Item label="--Select Vehicle Group--" value="NA" color={Colors.gray50} fontFamily="roboto-regular"/>
                        <Picker.Item label="PV" value="PV" fontFamily="roboto-regular" />
                        <Picker.Item label="DV" value="DV" fontFamily="roboto-regular" />
                        <Picker.Item label="SV" value="SV" fontFamily="roboto-regular" />
                    </Picker>
                    <Button onPress={updateVehicleGroupHandler}>Update Vehicle Group</Button>
                </Card>
            </CenterView>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    card: {
        width: '100%',
        padding: 10,
    },
    
});

export default UpdateGatePassScreen;