import { StyleSheet, Text, View } from "react-native";
import Card from "../UI/Card";
import { Colors } from "../../constants/Colors";
import { systemDateFormat } from "../../util/DateFormat";

function RowWorkingDates({workingDataItem}) {
    // Convert WORKING_DATE string to a Date object
    const workingDate = systemDateFormat(workingDataItem.WORKING_DATE);
    //const workingDate = new Date("26-DEC-23");
    //console.log("Working Date: ", workingDate);

    // Get the current date
    const currentDate = new Date();
    currentDate.setUTCHours(0, 0, 0, 0);

    const localCurrentDate = new Date(Date.UTC(
        currentDate.getUTCFullYear(),
        currentDate.getUTCMonth(),
        currentDate.getUTCDate()
    ));


    // Check if WORKING_DATE is less than the current date
    const isPastDate = workingDate < currentDate;

    return ( 
        <View style={styles.root}>
            <Card style={styles.card}>
                <View style={styles.container}>
                    <Text style={styles.heading}>Depot Name:</Text>
                    <Text style={styles.value}>{workingDataItem.DEPOT_NAME}</Text>
                </View>
                <View style={styles.container}>
                    <Text style={styles.heading}>Description:</Text>
                    <Text style={styles.value}>{workingDataItem.DESCRIPTION}</Text>
                </View>
                <View style={styles.container}>
                    <Text style={styles.heading}>Working Date:</Text>
                    <Text style={[isPastDate ? styles.value : styles.pastDateText]}>{workingDataItem.WORKING_DATE}</Text>
                </View>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        margin: 10,
    },
    card: {
        paddingHorizontal: 8,
        paddingVertical: 12,
    },
    container: {
        flexDirection: 'row',        
    },
    heading: {
        fontWeight: 'bold',
        color: Colors.gray700,
        marginRight: 4,
    },
    value: {
        color: Colors.gray700,
    },
    pastDateText: {
        backgroundColor: Colors.red500,
        color: 'white',
        paddingHorizontal: 4,
    },
});

export default RowWorkingDates;