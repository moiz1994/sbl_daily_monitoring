import { StyleSheet, Text } from "react-native";
import { Colors } from "../../constants/Colors";

const BreadCrums = ({text}) => {
    return (
        <Text style={styles.textStyle}>{text}</Text>
    );
}

const styles = StyleSheet.create({
    textStyle: {
        color: Colors.gray50,
        fontFamily: 'roboto-medium',
        fontSize: 15,
        marginTop: 10,
        marginLeft: 10,
    },
});

export default BreadCrums;