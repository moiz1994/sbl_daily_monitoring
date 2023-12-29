import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/Colors";
import LogoContainer from "../components/UI/LogoContainer";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { getSaleDifference } from "../util/http";
import Loader from "../components/UI/Loader";
import RowSaleDifference from "../components/ListItems/RowSaleDifference";

const SaleDifferenceScreen = () => {
    const route = useRoute();
    const { saleDate } = route.params;
    const [saleDiff, setSaleDiff] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
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
    }, []);

    let content = <Loader message="Loading..." />;
    if(!isLoading){
        content = (
            <>
                <LogoContainer />
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
        backgroundColor: Colors.gray700,
    },

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
});



export default SaleDifferenceScreen;