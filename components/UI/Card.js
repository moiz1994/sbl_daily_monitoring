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
        backgroundColor: 'white',
        borderRadius: 8,        
    }
});

export default Card;