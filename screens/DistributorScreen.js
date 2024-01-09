import { Alert, FlatList, StyleSheet, View } from "react-native";
import SearchView from "../components/UI/SearchView";
import { useEffect, useState } from "react";
import { getDistributorList } from "../util/http";
import Loader from "../components/UI/Loader";
import RowDistList from "../components/ListItems/RowDistList";
import filter from 'lodash.filter';
import { useNavigation } from "@react-navigation/native";
import NetInfo from '@react-native-community/netinfo';
import BreadCrums from '../components/UI/BreadCrums';

const DistributorScreen = () => {    
    const [distList, setDistList] = useState([]);
    const [distListFull, setDistListFull] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const nav = useNavigation();

    const searchHandler = (enteredText) => {
        setSearchQuery(enteredText);
        const formattedQuery = enteredText.toLowerCase();
        const filteredData = filter(distListFull, (data) => {               
            return contains(data, formattedQuery);
        });
        setDistList(filteredData);
    }
    
    const contains = ({CUSTOMER_CODE, CUSTOMER_NAME}, query) => {                
        if(CUSTOMER_CODE.includes(query) || CUSTOMER_NAME.toLowerCase().includes(query)){
            return true;
        }
        return false;
    }
    

    useEffect(() => {
        NetInfo.addEventListener(state => {
            if(state.isConnected){
                const fetchDistList = async () => {
                    try {
                        const response = await getDistributorList();
                        const parsedResponse = JSON.parse(response);
                        setDistList(parsedResponse);
                        setDistListFull(parsedResponse);
                    } catch (error) {
                        console.log("DistListError: ", error);
                        Alert.alert("Error!!!", "Error While Loading Distributors List. Please try again later.")
                    }finally{
                        setIsLoading(false);
                    }
                }
                
                fetchDistList();
            }else{
                Alert.alert("No Internet Connection", "Please check your internet connection and try again.");
            }
        })
    }, []);

    if(isLoading){
        return <Loader message="Loading..." />;
    }

    const onItemPressHandler = (item) => {
        nav.navigate("DistDetail", { distributorData: item });
    }

    return (        
        <View style={styles.root}>
            <BreadCrums text="Dashboard/Distributor Status" />
            <SearchView value={searchQuery} onChangeText={searchHandler}/>
            <FlatList
                data={distList}
                keyExtractor={(item, index) => item.CUSTOMER_CODE}
                renderItem={(itemData) => <RowDistList dataItem={itemData.item} onPress={() => onItemPressHandler(itemData.item)}/>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    }
});

export default DistributorScreen;