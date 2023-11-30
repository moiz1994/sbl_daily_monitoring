import { StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "../constants/Colors";

function input({label, keyboardType, placeholder, onUpdateValue, value, isPassword}) {
    return ( 
        <View style={styles.root}>
            <Text style={styles.label}>{label}</Text>
            <TextInput 
                cursorColor={Colors.gray600}
                keyboardType={keyboardType}
                maxLength={8}
                placeholder={placeholder}
                style={styles.input}
                onChangeText={onUpdateValue}
                value={value}
                secureTextEntry={isPassword}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    label: {
        fontWeight: 'bold'
    },
    input: {
        borderBottomWidth: 2,
        borderBottomColor: Colors.gray600,
        paddingVertical: 4,        
        color: Colors.gray600
    },
});

export default input;