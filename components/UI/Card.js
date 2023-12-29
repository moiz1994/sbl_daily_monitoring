import { StyleSheet, View } from "react-native";

const Card = ({children, style}) => {
    return ( 
        <View style={[styles.card, style]}>
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