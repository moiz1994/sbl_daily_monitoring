import { Image, StyleSheet, Text, View } from "react-native";
import LogoContainer from '../components/UI/LogoContainer';
import Card from '../components/UI/Card';
import LabelText from "../components/UI/LabelText";
import Button from '../components/UI/Button';

const SaleDateScreen = () => {
    return (
        <View style={styles.container}>
            <LogoContainer />
            <View style={styles.cardContainer}>
                <Card style={styles.card}>
                    <View>
                        <LabelText label="Sale Date" text="02/01/2024"/>
                        <LabelText label="Sale Date Close @" text="date"/>
                        <LabelText label="Changed @" text="date"/>
                        <LabelText label="Changed By" text="date"/>
                        <View style={styles.subContainer}>
                            <Text style={styles.textHeading}>Until When</Text>
                            <Text style={styles.text}>Until When</Text>
                            <Image source={require("../assets/time.png")} style={styles.timeImage}/>
                            <Button>Change Sale Date</Button>
                        </View>
                    </View>
                </Card>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cardContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 100, // Adjust this value to control the position of the card
        left: 0,
        right: 0,
        bottom: 0,
        marginHorizontal: 10,        
    },
    card: {
        overflow: "hidden",
        padding: 10,
    },
    note: {
        textAlign: 'center',
        paddingHorizontal: 10,
        fontWeight: '500'
    },
    subContainer: {
        alignItems: 'center',
    },
    timeImage: {
        width: 120,
        height: 120,
        marginBottom: 10,
    },
    textHeading: {
        fontWeight: 'bold',
        fontSize: 16,
        marginVertical: 10,
    }
});

export default SaleDateScreen;