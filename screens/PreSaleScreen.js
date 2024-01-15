import { Alert, StyleSheet, View } from "react-native"
import BreadCrums from "../components/UI/BreadCrums";
import CenterView from "../components/UI/CenterView";
import Card from "../components/UI/Card";
import LabelText from "../components/UI/LabelText";
import Button from "../components/UI/Button";
import { useEffect, useState } from "react";
import NetInfo from '@react-native-community/netinfo';
import { getPreSaleData } from "../util/http";
import Loader from "../components/UI/Loader";

const PreSaleScreen = () => {

    const [isOnline, setIsOnline] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const [preSaleData, setPreSaleData] = useState([]);

    const {mst_zero_status, mst_two_status, dtl_zero_status, dtl_two_status} = preSaleData;

    useEffect(() => {
        NetInfo.addEventListener(state => {
            setIsOnline(state.isConnected);
            if(state.isConnected){
                const fetchPreSaleData = async () => {
                    try {
                        const response = await getPreSaleData();
                        const parsedResponse = JSON.parse(response);
                        setPreSaleData(parsedResponse);
                        //console.log(parsedResponse)
                    } catch (error) {
                        console.log("Error Fetching Pre Sale Data", error);
                    }finally{
                        setIsLoading(false);
                    }
                }

                fetchPreSaleData();
                
            }else{
                Alert.alert("No Internet Connection", "Please check your internet connection and try again.")
            }
        });
    }, [setIsLoading, setIsOnline]);

    if(isLoading){
        return <Loader message="Loading..." />
    }

    const startSyncProcessHandler = () => {
        Alert.alert("Are You Sure?", 'Are you sure you want to start the sync process', [
            { text: "No", style: "cancel" },
            { text: "Yes", onPress: startProcess }
        ])
    }
    
    const startProcess = async () => {
        if(isOnline){
            try {
                await updateWorkFlowLevels(docName, docNo, selectedDocLevel);                
            } catch (error) {
                console.error('Error Starting Sync Process: ', error);
            }
        }else{
            Alert.alert("No Internet Connection", "Please check your internet connection and try again.")
        }
    }
    
    
    return (
        <View style={styles.root}>
            <BreadCrums text="Dashboard/View Pre-Sale Data"/>
            <CenterView>
                <>
                    <Card style={styles.card}>
                        <LabelText label="Master With Zero Status" text={mst_zero_status}/>
                        <LabelText label="Master With Two Status" text={mst_two_status}/>
                        <LabelText label="Detail With Zero Status" text={dtl_zero_status}/>
                        <LabelText label="Detail With Two Status" text={dtl_two_status}/>
                    </Card>
                    <Button style={styles.btn} onPress={startSyncProcessHandler}>Start Sync Process</Button>
                </>
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
    btn: {
        width: '100%',
        marginTop: 10,
    },
});

export default PreSaleScreen;