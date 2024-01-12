import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/Colors";

const LabelText = ({label, text, longText}) => {

    let textComponent = <Text style={styles.text2}>{text}</Text>;
    if(longText){
        textComponent = <Text numberOfLines={10} ellipsizeMode="tail" style={styles.text}>{text}</Text>;
    }

    return (
        <View style={styles.labelView}>
            <Text style={styles.label}>{label}: </Text>
            {textComponent}
        </View>
    );
}

const styles = StyleSheet.create({
    labelView: {        
        flexDirection: 'row',
    },
    label: {        
        color: Colors.blue500,
        fontFamily: 'roboto-bold',
    },
    text: {
        flex: 1,
        fontFamily: 'roboto-regular',
    },
    text2: {
        fontFamily: 'roboto-regular',
    }
});

export default LabelText;