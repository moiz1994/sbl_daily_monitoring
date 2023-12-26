import { Image, StyleSheet, View } from 'react-native';

function LogoContainer() {
    return ( 
        <View style={styles.logoContainer}>
            <Image source={ require('../../assets/logo.png') } style={styles.logo}/>
        </View>
    );
}

const styles = StyleSheet.create({
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 220,
        height: 90,     
        marginTop: 30,
    },
});

export default LogoContainer;