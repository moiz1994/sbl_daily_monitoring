import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/Colors";
import LogoContainer from "../components/UI/LogoContainer";
import { useRoute } from "@react-navigation/native";

function SaleDifferenceScreen() {
    const route = useRoute();
    const { saleDate } = route.params;
    return ( 
        <View style={styles.container}>
            <LogoContainer />
            <Text>Sale Difference Report {saleDate}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.gray700,
    },

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
});

export default SaleDifferenceScreen;