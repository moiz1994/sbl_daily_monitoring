import { Image, StyleSheet, Text, View } from 'react-native';

const LogoContainer = () => {
    return ( 
        <View style={styles.logoContainer}>
            <Image source={ require('../../assets/logo.png') } style={styles.logo}/>
            <Text style={styles.heading}>DAILY MONITORING</Text>
            <Text style={styles.subHeading}>Dashboard</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 150,
        height: 150,     
        marginTop: 30,
    },
    heading: {
        color: 'white',
        fontFamily: 'roboto-bold',
        fontSize: 24,
    },
    subHeading: {
        color: 'white',
        fontFamily: 'roboto-regular',
        fontSize: 22,
    },
});

export default LogoContainer;