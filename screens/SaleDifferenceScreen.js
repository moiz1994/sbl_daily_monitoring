import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/Colors";
import LogoContainer from "../components/UI/LogoContainer";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { getSaleDifference } from "../util/http";
import Loader from "../components/UI/Loader";
import RowSaleDifference from "../components/ListItems/RowSaleDifference";
import NetInfo from '@react-native-community/netinfo';

const SaleDifferenceScreen = () => {
    const route = useRoute();
    const { saleDate } = route.params;
    const [saleDiff, setSaleDiff] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        NetInfo.addEventListener(state => {
            if(state.isConnected){
                const fetchSaleDifference = async () => {
                    try {
                        const response = await getSaleDifference(saleDate);
                        const parsedResponse = JSON.parse(response);
                        setSaleDiff(parsedResponse);                
                    } catch (error) {
                        console.log("Error SaleDiff: ", error);
                        Alert("Error!!!", "Error While Loading Sale Difference Report. Please try again later.");
                    }finally{
                        setIsLoading(false);
                    }
                }
                
                fetchSaleDifference();
            }else{
                Alert.alert("No Internet Connection", "Please check your internet connection and try again.")
            }
        })
    }, []);

    let content = <Loader message="Loading..." />;
    if(!isLoading){
        content = (
            <>
                <LogoContainer />
                <Text style={styles.dateText}>Dated On: {saleDate}</Text>
                <FlatList 
                    alwaysBounceVertical={true}
                    data={saleDiff}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={(itemData) => <RowSaleDifference dataItem={itemData.item}/> }
                />
            </>
        );
    }
    
    return ( 
        <View style={styles.container}>
            {content}
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    dateText: {
        marginTop: 8,
        marginHorizontal: 12,
        color: "white",
        fontSize: 18,        
    }
});



export default SaleDifferenceScreen;