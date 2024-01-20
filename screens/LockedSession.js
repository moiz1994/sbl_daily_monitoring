import { View, StyleSheet, Alert, Text, FlatList } from "react-native";
import BreadCrums from '../components/UI/BreadCrums';
import { useEffect, useState } from "react";
import NetInfo from '@react-native-community/netinfo';
import { getLockedSession } from "../util/http";
import Loader from "../components/UI/Loader";
import RowLockedSession from "../components/ListItems/RowLockedSession";
import { Colors } from "../constants/Colors";
import Button from "../components/UI/Button";

const LockedSession = () => {
    const [sessionList, setSessionList] = useState([]);
    const [isListEmpty, setListEmpty] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        NetInfo.addEventListener(state => {
            if(state.isConnected){
                const fetchLookedSession = async () => {
                    try {
                        const response = await getLockedSession();
                        if(response === "[]"){
                            setListEmpty(true);
                        }else{
                            setListEmpty(false);
                            const parsedData = await JSON.parse(response);
                            setSessionList(parsedData);
                        }
                    } catch (error) {
                        console.log("LockedSessionListError: ", error);
                        Alert.alert("Error!!!", "Error While Loading Locked Sessions List. Please try again later.")
                    }finally{
                        setIsLoading(false);
                        setRefresh(false)
                    }
                }

                fetchLookedSession();
            }else{
                Alert.alert("No Internet Connection", "Please check your internet connection and try again.");
            }
        });
    },[setIsLoading, setListEmpty, refresh, setRefresh])

    if(isLoading){
        return <Loader message="Loading..."/>
    }

    const refreshHandler = () => {
        setIsLoading(true);
        setRefresh(true);
    }
    

    // let content = <Text style={styles.empty}>No Locked Sessions Available</Text>
    // if(!isListEmpty){
    //     content = <FlatList
    //         data={sessionList}
    //         keyExtractor={(item, index) => index}
    //         renderItem={(itemData) => <RowLockedSession dataItem={itemData.item} />}
    //         />
    // }

    return (
        <View style={styles.root}>
            <View>
                <BreadCrums text="Dashboard/Locked Session" />
                {isListEmpty && <Text style={styles.empty}>No Locked Sessions Available</Text>}
                <View style={{ flex: 1 }}>
                    {/* {content} */}
                    <FlatList
                        data={sessionList}
                        keyExtractor={(item, index) => index}
                        renderItem={(itemData) => <RowLockedSession dataItem={itemData.item} />}
                    />
                </View>
            </View>
            <View>
                <Button style={styles.btn} onPress={refreshHandler}>Refresh</Button>
                <Button style={styles.btn}>Kill Sessions</Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'space-between'
    },
    empty: {
        fontFamily: 'roboto-regular',
        fontSize: 18,
        color: Colors.gray100,
        margin: 10,
        textAlign: 'center'
    },
    btn: {
        marginBottom: 10,
        marginHorizontal: 10,
    }
});

export default LockedSession;