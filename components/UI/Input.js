import { StyleSheet, TextInput, View } from "react-native";
import { Colors } from "../../constants/Colors";

const Input = ({inputMode, keyboardType, placeholder, value, style, onChange}) => {
    return ( 
        <View style={styles.root}>
            <TextInput 
                style={[styles.inputText, style]}
                cursorColor={Colors.gray700}
                inputMode={inputMode} //  "numeric"
                keyboardType={keyboardType} //"number-pad"
                placeholder={placeholder}
                placeholderTextColor={Colors.gray100}
                value={value}
                onChangeText={onChange}/>
                
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    inputText: {        
        borderBottomWidth: 2,
        fontSize: 14,
        marginRight: 8,
    },  
});

export default Input;