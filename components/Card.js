import { StyleSheet, View } from "react-native";

function Card({children}) {
    return ( 
        <View style={styles.card}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 8,
        elevation: 4,
        shadowColor: 'black',
        shadowOffset: {height: 2, width: 0},
        shadowOpacity: 0.7,
        shadowRadius: 8,
    }
});

export default Card;