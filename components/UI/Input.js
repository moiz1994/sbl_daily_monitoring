import { StyleSheet, TextInput, View } from "react-native";
import { Colors } from "../../constants/Colors";

const Input = ({inputMode, keyboardType, placeholder, value, style, onChange}) => {
    return ( 
        <View style={styles.root}>
            <TextInput 
                style={[styles.inputText, style]}
                cursorColor={Colors.gray700}
                inputMode={inputMode} //  "numeric", "text", "none", "decimal", "tel", "search", "email", "url"                
                keyboardType={keyboardType} //default, number-pad, decimal-pad, numeric, email-address, phone-pad, url, ascii-capable, numbers-and-punctuation, name-phone-pad, twitter, web-search, decimal-pad
                placeholder={placeholder}
                placeholderTextColor={Colors.gray100}
                value={value}
                onChangeText={onChange}
                clearButtonMode="always"/>
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
        height: 40,
    },  
});

export default Input;