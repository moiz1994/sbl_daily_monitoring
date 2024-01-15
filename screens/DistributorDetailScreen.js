import { useNavigation, useRoute } from "@react-navigation/native";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import Card from '../components/UI/Card'; 
import { Colors } from "../constants/Colors";
import LabelText from "../components/UI/LabelText";
import Button from '../components/UI/Button';
import { useEffect, useState } from "react";
import CustomModal from "../components/UI/CustomModal";
import { updateDistributorStatus } from "../util/http";
import Loader from "../components/UI/Loader";
import Toast from 'react-native-simple-toast';
import NetInfo from '@react-native-community/netinfo';
import BreadCrums from '../components/UI/BreadCrums';
import CenterView from "../components/UI/CenterView";

const DistributorDetailScreen = () => {
    const route = useRoute();
    const nav = useNavigation();

    const [isOnline, setIsOnline] = useState(false);
    const [modalIsVisible, setModalIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [remarks, setRemarks] = useState("");

    useEffect(() => {
        NetInfo.fetch().then((state) => {
            setIsOnline(state.isConnected);
        });
    }, [isOnline, setIsOnline]);
    
    const {distributorData} = route.params;
    const {
        CUSTOMER_CODE,
        CUSTOMER_NAME,
        CITY_NAME,
        DISTRICT_NAME,
        REGION_NAME,
        PERFORM_DESC,
        PERFORM_SEQ, 
        ACTIVE
    } = distributorData;

    let statusStyle = styles.active;
    let status = "Active Distribution";
    let btnText = "Deactivate Distribution";
    let distStatus = "N";
    if(ACTIVE === "N"){
        statusStyle = styles.inactive;
        status = "Inactive Distribution"
        btnText = "Activate Distribution";
        distStatus = "Y";
    }

    const activeStateHandler = () => {
        setModalIsVisible(true);
    }

    const remarksHandler = (enteredText) => {
        setRemarks(enteredText);
    }

    const updateStatusHandler = () => {
        if(remarks){        
            Alert.alert(
                "Are You Sure?",
                "Are you sure you want to update Distributor Status?", 
                [
                    { text: "No", style: "cancel" },
                    { text: "Yes", onPress: responseUpdateStatus }
                ]
            )
        }else{
            Alert.alert("Invalid Input!", "Please enter remarks")
        }
    }

    const responseUpdateStatus = async () => {
        try{
            setIsLoading(true);
            if(isOnline){
                const response = await updateDistributorStatus(CUSTOMER_CODE, remarks, distStatus)
                
                if(response === "Success"){
                    Toast.show("Distributor Status Updated Successfully", Toast.LONG);                    
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
            console.error('Error Updating Distributor Status: ', error);
        }
    }
    
    if(isLoading){
        return <Loader message="Updating... Please Wait!" />
    }
    
    return (
        <View style={styles.container}>      
            <BreadCrums text="Distributor Status/Distributor Detail" />
            <CustomModal
                isVisible={modalIsVisible}
                title="Enter Remarks"
                closeModal={() => setModalIsVisible(false)}
            >
                <View style={styles.modalContainer}>                    
                    <TextInput 
                        inputMode="text"
                        placeholder="Enter Remarks"
                        value={remarks}
                        onChangeText={remarksHandler}
                        cursorColor={Colors.blue500}
                        placeholderTextColor={Colors.gray100}
                        clearButtonMode="always"
                        style={styles.inputText}
                    />
                    <Button style={[styles.btn, {marginHorizontal: 10,}]} onPress={updateStatusHandler}>{btnText}</Button>
                </View>
            </CustomModal>

            <CenterView>
                <Card style={styles.card}>
                    <View>
                        <Text style={statusStyle}>{status}</Text>
                        <View style={styles.contentContainer}>
                            <LabelText label="Distributor ID" text={CUSTOMER_CODE} longText={false}/>
                            <LabelText label="Distributor Name" text={CUSTOMER_NAME} longText={false}/>
                            <LabelText label="City Name" text={CITY_NAME} longText={false}/>
                            <LabelText label="District Name" text={DISTRICT_NAME} longText={false}/>
                            <LabelText label="Region Name" text={REGION_NAME} longText={false}/>
                            <LabelText label="Limit & Dues Group" text={PERFORM_DESC} longText={false}/>
                            <LabelText label="Limit & Dues Group Sequence" text={PERFORM_SEQ} longText={false}/>
                            <Button style={styles.btn} onPress={activeStateHandler}>{btnText}</Button>
                        </View>
                    </View>
                </Card>
            </CenterView>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    card: {
        overflow: "hidden",
        width: '100%',
    },
    active: {
        color: Colors.gray700,
        width: "100%",
        textAlign: 'center',
        backgroundColor: Colors.green500,
        paddingVertical: 10,
    },
    inactive: {
        color: "white",
        width: "100%",
        textAlign: 'center',
        backgroundColor: Colors.red500,
        paddingVertical: 10,
    },
    contentContainer: {
        backgroundColor: 'white',
        padding: 10,
    },
    btn: {
        marginVertical: 10,
    },
    inputText: {
        borderBottomWidth: 2,
        borderBottomColor: Colors.blue500,
        marginTop: 10,
        marginHorizontal: 13,
        paddingVertical: 6,
    }
    
});

export default DistributorDetailScreen;