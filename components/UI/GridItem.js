import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Card from "./Card";

const GridItem = ({ source, text, onPress, style }) => {
    return (
        <Pressable onPress={onPress}>
            <Card style={[styles.gridItem, style]}>
                <Image source={source} style={styles.image} />
                <Text style={styles.text} numberOfLines={3} ellipsizeMode="tail">{text}</Text>
            </Card>
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
        paddingVertical: 10,
        marginHorizontal: 18,
    },
    image: {
        width: 40,
        height: 40,
    },
    text: {
        fontSize: 10,        
        textAlign: "center",
        fontFamily: 'roboto-medium',
    },
});

export default GridItem;
