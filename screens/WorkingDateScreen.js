import { FlatList, StyleSheet, View } from "react-native";
import { Colors } from "../constants/Colors";
import LogoContainer from "../components/UI/LogoContainer";
import { useEffect, useState } from "react";
import { getWorkingDate } from "../util/http";
import Loader from "../components/UI/Loader";
import RowWorkingDates from "../components/ListItems/RowWorkingDates";

const WorkingDateScreen = () => {
    const [workingDates, setWorkingDates] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchWorkingDates = async () => {
            try{
                const response = await getWorkingDate();  
                const parsedWorkingDates = JSON.parse(response)
                setWorkingDates(parsedWorkingDates);                
            }catch(error){
                console.log("Error Loading Working dates: ", error)
            }finally{
                setIsLoading(false);
            }
            
        }

        fetchWorkingDates();    
    }, [])


    var content = <Loader message="Loading..."/>;
    if(!isLoading){
        content = (
            <>
                <LogoContainer />
                <FlatList 
                    alwaysBounceVertical={true}
                    data={workingDates}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={(itemData) => <RowWorkingDates workingDataItem={itemData.item}/> }
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
        backgroundColor: Colors.gray700
    },
});

export default WorkingDateScreen;