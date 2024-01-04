import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/Colors";

const Button = ({children, onPress, style, textStyle}) => {
    return ( 
        <Pressable
            style={({ pressed }) => [styles.button, style, pressed && styles.pressed]}
            onPress={onPress}
        >
            <Text style={[styles.buttonText, textStyle]}>{children}</Text>            
        </Pressable>
    );
}
const styles = StyleSheet.create({
    button: {
        borderRadius: 6,
        paddingVertical: 6,
        paddingHorizontal: 12,
        backgroundColor: Colors.blue500,
        justifyContent: 'center',
        alignItems: 'center'
        // elevation: 2,
        // shadowColor: 'black',
        // shadowOffset: { width: 1, height: 1 },
        // shadowOpacity: 0.25,
        // shadowRadius: 4,
    },
    pressed: {
        opacity: 0.7,
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
        fontFamily: 'roboto-bold',
    },
});

export default Button;