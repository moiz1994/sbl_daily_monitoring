import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/Colors';
import IconButton from './IconButton';
import ReactNativeModal from 'react-native-modal'; // Import the react-native-modal library

const CustomModal = ({ isVisible, children, title, closeModal }) => {
    return (
        <ReactNativeModal
            isVisible={isVisible}
            animationIn="tada"
            animationOut="bounceOut"
            transparent={true}
            style={styles.centeredView}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.modalHeading}>
                        <Text style={styles.modalHeadingText}>{title}</Text>
                        <IconButton icon="close" size={24} color="white" onPress={closeModal} />
                    </View>
                    {children}
                </View>
            </View>
        </ReactNativeModal>
        );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        marginTop: 22,
        zIndex: 1,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        overflow: 'hidden',
    },
    modalHeading: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center', // Center items horizontally
        backgroundColor: Colors.blue500,
    },
    modalHeadingText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        paddingLeft: 10,
        fontFamily: 'roboto-bold',
    },
});

export default CustomModal;
