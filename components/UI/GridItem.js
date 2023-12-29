import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const GridItem = ({ source, text, onPress }) => {
    return (
        <Pressable style={styles.gridItem} onPress={onPress}>
            <Image source={source} style={styles.image} />
            <Text style={styles.text} numberOfLines={3} ellipsizeMode="tail">{text}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    gridItem: {
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 8,
        maxWidth: 110,
        minWidth: 110,
    },
    image: {
        width: 50,
        height: 50,
    },
    text: {
        fontSize: 13,
        fontWeight: "bold",
        textAlign: "center",
    },
});

export default GridItem;
