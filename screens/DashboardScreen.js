import { StyleSheet, Text, View } from "react-native";

function DashboardScreen() {
    return ( 
        <View style={styles.container}>
            <Text style={styles.text}>Dashboard</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'white',
    },

});

export default DashboardScreen;