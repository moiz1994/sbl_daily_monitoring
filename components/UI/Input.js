import { StyleSheet, TextInput, View } from "react-native";
import { Colors } from "../../constants/Colors";

const Input = ({inputMode, keyboardType, placeholder, value, style, textStyle, onChangeText, placeholderTextColor}) => {
    return ( 
        <View style={style}>
            <TextInput 
                style={[styles.inputText, textStyle]}
                cursorColor={Colors.blue500}
                inputMode={inputMode} //  "numeric", "text", "none", "decimal", "tel", "search", "email", "url"                
                keyboardType={keyboardType} //default, number-pad, decimal-pad, numeric, email-address, phone-pad, url, ascii-capable, numbers-and-punctuation, name-phone-pad, twitter, web-search, decimal-pad
                placeholder={placeholder}
                placeholderTextColor={placeholderTextColor}
                value={value}
                onChangeText={onChangeText}
                clearButtonMode="always"/>
        </View>
    );
}

const styles = StyleSheet.create({
    inputText: {        
        borderBottomWidth: 2,
        fontSize: 14,
        height: 40,
        fontFamily: 'roboto-regular',
    },  
});

export default Input;