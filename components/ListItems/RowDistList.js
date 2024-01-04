import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/Colors";
import LabelText from "../UI/LabelText";

const RowDistList = ({dataItem, onPress}) => {

    const {CUSTOMER_CODE, CUSTOMER_NAME, ACTIVE} = dataItem;
    
    let statusStyle = styles.active;
    let status = "Active";
    if(ACTIVE === "N"){
        statusStyle = styles.inactive;
        status = "Inactive"
    }

    return (
        <Pressable style={({ pressed }) => [styles.root, pressed && styles.pressed]} onPress={onPress}>
            <View style={styles.innerView}>              
                <LabelText label="Distributor ID" text={CUSTOMER_CODE} longText={false} />
                <Text style={statusStyle}>{status}</Text>
            </View>
            <LabelText label="Distributor Name" text={CUSTOMER_NAME}  longText={true} />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    root: {
        marginHorizontal: 10,
        marginVertical: 5,
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
    active: {
        backgroundColor: Colors.green500,
        color: Colors.gray700,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
        fontFamily: 'roboto-regular',
    },
    inactive: {
        backgroundColor: Colors.red500,
        color: "white",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
        fontFamily: 'roboto-regular',
    },
    pressed: {
        opacity: 0.75,
    }
});

export default RowDistList;