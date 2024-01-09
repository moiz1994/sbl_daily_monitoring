import { View } from "react-native";
import BreadCrums from "../components/UI/BreadCrums";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import { getActiveSession } from "../util/http";
import Loader from "../components/UI/Loader";
import SearchView from '../components/UI/SearchView';

const ActiveSessionScreen = () => {
    const route = useRoute();
    const {version} = route.params;

    const [isLoading, setIsLoading] = useState(true);
    const [sessionData, setSessionData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const searchHandler = (enteredText) => {
        setSearchQuery(enteredText);
        const formattedQuery = enteredText.toLowerCase();
        const filteredData = filter(distListFull, (data) => {               
            return contains(data, formattedQuery);
        });
        //setDistList(filteredData);
    }

    useEffect(() => {
        NetInfo.addEventListener(state => {
            if(state.isConnected){
                const fetchActiveSession = async () => {
                    try {
                        const response = await getActiveSession(version);
                        const parsedResponse = JSON.parse(response);
                        setSessionData(parsedResponse)
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
    }, [])
    if(isLoading){
        return <Loader message="Loading..." />
    }
    return (
        <View>
            <BreadCrums text="Dashboard/Active Session"/>
            
            <SearchView />
        </View>
    );
}

export default ActiveSessionScreen;