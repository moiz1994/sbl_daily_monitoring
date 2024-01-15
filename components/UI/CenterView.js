import { StyleSheet, View } from "react-native";

const CenterView = ({children}) => {
    return (
        <View style={styles.centerContainer}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0, // Adjust this value to control the position of the card
        left: 0,
        right: 0,
        bottom: 0,
        marginHorizontal: 10,        
    },
});

export default CenterView;