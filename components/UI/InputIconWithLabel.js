import { StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "../../constants/Colors";
import { AntDesign } from '@expo/vector-icons';

const InputIconWithLabel = ({label, keyboardType, placeholder, onUpdateValue, value, isPassword, icon, onIconPress}) => {
    return ( 
        <View style={styles.root}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.inputContainer}>
                {/* <AntDesign name="people" color={Colors.blue500} size={24} /> */}
                <AntDesign name={icon} color={Colors.blue500} size={24} onPress={onIconPress}/>
                <TextInput 
                    cursorColor={Colors.blue500}
                    keyboardType={keyboardType}//default, number-pad, decimal-pad, numeric, email-address, phone-pad, url, ascii-capable, numbers-and-punctuation, name-phone-pad, twitter, web-search, decimal-pad
                    maxLength={8}
                    placeholder={placeholder}
                    style={styles.input}
                    onChangeText={onUpdateValue}
                    value={value}
                    secureTextEntry={isPassword}
                    clearButtonMode="always"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    label: {
        color: Colors.blue500,
        fontFamily: 'roboto-bold',
    },
    inputContainer: {
        flexDirection: 'row',
        paddingVertical: 4,        
        borderBottomWidth: 2,
        borderBottomColor: Colors.blue500,
    },
    input: {
        borderBottomColor: Colors.blue500,
        width: '100%',
        color: Colors.gray600,
        paddingHorizontal: 8,
        fontFamily: 'roboto-regular',
    },
});

export default InputIconWithLabel;