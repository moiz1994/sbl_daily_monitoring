import { StyleSheet, Text, View } from "react-native";
import Card from "../UI/Card";
import { Colors } from "../../constants/Colors";

function RowWorkingDates({workingDataItem}) {
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
                    <Text style={styles.value}>{workingDataItem.WORKING_DATE}</Text>
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
    }
});

export default RowWorkingDates;