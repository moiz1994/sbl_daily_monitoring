import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/Colors";

const RowDistList = ({dataItem}) => {

    const {CUSTOMER_CODE, CUSTOMER_NAME, ACTIVE} = dataItem;
    
    let statusStyle = styles.active;
    let status = "Active";
    if(ACTIVE === "N"){
        statusStyle = styles.inactive;
        status = "Inactive"
    }

    return (
        <Pressable style={({ pressed }) => [styles.root, pressed && styles.pressed]}>
            <View style={styles.innerView}>
                <View style={styles.labelView}>
                    <Text style={styles.label}>Distributor ID: </Text>
                    <Text>{CUSTOMER_CODE}</Text>
                </View>
                <Text style={statusStyle}>{status}</Text>
            </View>
            
            <View style={styles.labelView}>
                <Text style={styles.label}>Distributor Name: </Text>
                <Text numberOfLines={2} ellipsizeMode="tail" style={styles.distributorName}>{CUSTOMER_NAME}</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    root: {
        marginHorizontal: 10,
        marginVertical: 6,
        backgroundColor: "white",
        paddingHorizontal: 4,
        paddingVertical: 8,
        borderRadius: 8,
        overflow: 'hidden',
    },
    innerView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    labelView: {        
        flexDirection: 'row',
    },
    label: {
        fontWeight: 'bold',
        color: Colors.gray700,
    },
    distributorName: {
        flex: 1,
        // Add any additional styles for the distributor name if needed
    },
    active: {
        backgroundColor: Colors.green500,
        color: Colors.gray700,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
    },
    inactive: {
        backgroundColor: Colors.red500,
        color: "white",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
    },
    pressed: {
        opacity: 0.75,
    }
});

export default RowDistList;