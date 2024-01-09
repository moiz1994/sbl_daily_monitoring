import { Image, Pressable, StyleSheet } from "react-native";

const ImageButton = ({source, onPress}) => {
    return (
        <Pressable onPress={onPress}>
            <Image source={source} style={styles.timeImage} />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    timeImage: {
        width: 120,
        height: 120,
        marginBottom: 10,
    },
});

export default ImageButton;