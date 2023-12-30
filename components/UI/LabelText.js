import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/Colors";

const LabelText = ({label, text, longText}) => {

    let textComponent = <Text>{text}</Text>;
    if(longText){
        textComponent = <Text numberOfLines={2} ellipsizeMode="tail" style={styles.text}>{text}</Text>;
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
        fontWeight: 'bold',
        color: Colors.gray700,
    },
    text: {
        flex: 1,
    },
});

export default LabelText;