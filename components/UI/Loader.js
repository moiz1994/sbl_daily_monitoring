import LottieView from "lottie-react-native";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";


const Loader = ({message}) => {
    return ( 
        <View style={[StyleSheet.absoluteFillObject, styles.container]}>
            <ActivityIndicator size="large" color="white" />
            <Text style={styles.message}>{message}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "black",
        opacity: 0.7,
        zIndex: 1,        
    },
    lottie: {
        width: 200,
        height: 200,
        backgroundColor: '#eee',
    },
    message: {
        fontSize: 24,
        marginBottom: 12,
        color: 'white',
        fontFamily: 'roboto-bold',
    },
});

export default Loader;