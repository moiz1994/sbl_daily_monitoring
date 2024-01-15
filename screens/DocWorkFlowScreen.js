import { Alert, StyleSheet, Text, View } from "react-native";
import BreadCrums from '../components/UI/BreadCrums';
import CenterView from '../components/UI/CenterView';
import LabelText from '../components/UI/LabelText';
import Card from '../components/UI/Card';
import { useNavigation, useRoute } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { Colors } from "../constants/Colors";
import Button from "../components/UI/Button";
import NetInfo from '@react-native-community/netinfo';
import { getWorkFlowData, getWorkFlowLevels, updateWorkFlowLevels } from "../util/http";
import Loader from "../components/UI/Loader";
import Toast from 'react-native-simple-toast';

const DocWorkFlowScreen = () => {
    const route = useRoute();
    const nav = useNavigation();

    const {docName, docNo} = route.params;

    const [isOnline, setIsOnline] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const [workFlowData, setWorkFlowData] = useState([]);
    const [levelsData, setLevelsData] = useState([]);

    const [selectedDocLevel, setSelectedDocLevel] = useState();

    const {DOC_LVL, LEVEL_DESC} = workFlowData[0] || {};

    useEffect(() => {
        NetInfo.addEventListener(state => {
            setIsOnline(state.isConnected);
            if(state.isConnected){
                const fetchWorkFlowData = async () => {
                    try {
                        const [workFlowResponse, levelResponse] = await Promise.all([
                            getWorkFlowData(docName, docNo),
                            getWorkFlowLevels(docName)
                        ]);
                        
                        const parsedWorkflow = JSON.parse(workFlowResponse);
                        setWorkFlowData(parsedWorkflow);      
                        
                        const parsedLevels = JSON.parse(levelResponse);
                        setLevelsData(parsedLevels);
                    } catch (error) {
                        console.log("Error Fetching Work Flow Data", error);
                    }finally{
                        setIsLoading(false);
                    }
                }

                fetchWorkFlowData();
                
            }else{
                Alert.alert("No Internet Connection", "Please check your internet connection and try again.")
            }
        })
    }, [setIsOnline, setIsLoading])

    const updateLevelHandler = () => {
        if(selectedDocLevel === undefined || selectedDocLevel === "NA"){
            Alert.alert("Invalid Selection!!!", "Please Select Appropriate Level to Update")
        }else{
            Alert.alert("Are You Sure?", `Are you sure you want to update the level of Document No: ${docNo} from level ${DOC_LVL} to ${selectedDocLevel}`, [
                { text: "No", style: "cancel" },
                { text: "Yes", onPress: updateDocLevelCall }
            ])
        }
    }

    const updateDocLevelCall = async () => {
        if(isOnline){
            try {
                setIsLoading(true);
                const response = await updateWorkFlowLevels(docName, docNo, selectedDocLevel);
                if(response === "Success"){
                    Toast.show("Document Level Updated Successfully", Toast.LONG);                    
                    nav.reset({
                        index: 0,
                        routes: [{ name: 'Dashboard' }],
                    })
                }else{
                    Toast.show("Error While Updating Document Level: " + response, Toast.LONG);
                    console.log(response)
                }
                setIsLoading(false);
            } catch (error) {
                console.error('Error Updating Document Level: ', error);
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
            <BreadCrums text="Dashboard/Document Work Flow"/>
            <CenterView>
                <Card style={styles.card}>
                    <LabelText label="Document #" text={docNo}/>
                    <LabelText label="Document Name" text={docName}/>
                    <LabelText label="Document Level" text={DOC_LVL}/>
                    <LabelText label="Level Description" text={LEVEL_DESC}/>
                    <Picker
                        selectedValue={selectedDocLevel}
                        onValueChange={(itemValue, itemIndex) => setSelectedDocLevel(itemValue)}
                        placeholder="Select Document">

                        <Picker.Item label="--Select Document Level--" value="NA" color={Colors.gray50} fontFamily="roboto-regular"/>
                        {levelsData.map((item, index) => (
                            <Picker.Item 
                                key={index}
                                label={item['LEVEL_DESC']}
                                value={item['APP_LVL']}
                                fontFamily="roboto-regular" />
                        ))}
                    </Picker>
                    <Button onPress={updateLevelHandler}>Update Level</Button>
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
        overflow: "hidden",
        width: '100%',
        padding: 10,
    },
});

export default DocWorkFlowScreen;