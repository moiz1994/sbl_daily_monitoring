import { Alert, FlatList, StyleSheet, View } from "react-native";
import LogoContainer from "../components/UI/LogoContainer";
import SearchView from "../components/UI/SearchView";
import { useEffect, useState } from "react";
import { getDistributorList } from "../util/http";
import Loader from "../components/UI/Loader";
import RowDistList from "../components/ListItems/RowDistList";
import filter from 'lodash.filter';

const DistributorStatusScreen = () => {
    const [distList, setDistList] = useState([]);
    const [distListFull, setDistListFull] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    const searchHandler = (enteredText) => {
        setSearchQuery(enteredText);
        const formattedQuery = enteredText.toLowerCase();
        const filteredData = filter(distListFull, (data) => {
            return contains(data, formattedQuery);
        });
        setDistList(filteredData);
    }
    
    const contains = ({CUSTOMER_CODE, CUSTOMER_NAME}, query) => {
        if(CUSTOMER_CODE.includes(query) || CUSTOMER_NAME.includes(query)){
            return true;
        }
        return false;
    }
    

    useEffect(() => {
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
    }, []);

    if(isLoading){
        return <Loader message="Loading..." />;
    }

    return (        
        <View style={styles.root}>
            <LogoContainer />
            <SearchView value={searchQuery} onChangeText={searchHandler}/>
            <FlatList
                data={distList}
                keyExtractor={(item) => item.CUSTOMER_CODE}
                renderItem={(itemData) => <RowDistList dataItem={itemData.item}/>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    }
});

export default DistributorStatusScreen;