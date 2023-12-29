import { Alert, Image, KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import Card from "../components/UI/Card";
import Button from "../components/UI/Button";
import { useContext, useEffect, useState } from "react";
import { login } from "../util/http";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../store/auth-context";
import Loader from "../components/UI/Loader";
import InputIconWithLabel from "../components/UI/InputIconWithLabel";


const LoginScreen = () => {
    const [isAuth, setIsAuth] = useState(false);
    const [empCode, setEmpCode] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const authContext = useContext(AuthContext);

    const toggleShowPassword = () => { 
        setShowPassword(!showPassword); 
    }; 

    const empCodeHandler = (enteredText) => {
        setEmpCode(enteredText)
    }

    const passwordHandler = (enteredText) => {
        setPassword(enteredText)
    }

    const loginHandler = async () => {
        const empCodeIsValid = empCode.length == 8;
        const passwordIsValid = password.length > 6;

        if(empCodeIsValid && passwordIsValid){
            setIsAuth(true)
            const response = await login(empCode, password)
            
            //console.log(response);
            if(response === 'Success'){
                AsyncStorage.setItem('EMP_CODE', empCode);
                AsyncStorage.setItem('PASSWORD', password);
                authContext.authenticate(response);
            }else{                
                Alert.alert("Login Failed!!!", "Invalid Employee Code or Password. Please try again with correct credentials")
            }
            setIsAuth(false);
        }else{
            Alert.alert("Invalid Input!!!", "Please check your entered credentials.")
        }
        
    }

    useEffect(() => {
        const preFillInputHandler = async () => {
            const empID = await AsyncStorage.getItem('EMP_CODE');
    
            if (empID){
                setEmpCode(empID)
            }
        }

        preFillInputHandler();
    }, [setEmpCode])

    

    if(isAuth){
        return <Loader message="Loading..."/>
    }

    return ( 
        <KeyboardAvoidingView style={styles.root} behavior="height">            
            <View style={styles.logoContainer}>
                <Image source={ require('../assets/logo.png') } style={styles.logo}/>
            </View>
            <View style={styles.cardContainer}>
                <Card>
                    <Text style={styles.title}>Login</Text>
                    <InputIconWithLabel
                        label="Employee Code"
                        keyboardType="numeric"
                        placeholder="Enter Employee Code"
                        isPassword={false}
                        onUpdateValue={empCodeHandler}
                        value={empCode}
                        icon="user"/>
                    <InputIconWithLabel 
                        label="Password"
                        keyboardType="default"
                        placeholder="Enter Password"
                        isPassword={!showPassword}
                        onUpdateValue={passwordHandler}
                        value={password}
                        icon={showPassword ? 'unlock' : 'lock'} 
                        onIconPress={toggleShowPassword}/>

                    <View style={styles.buttonContainer}>
                        <Button onPress={loginHandler}>Login</Button>
                    </View>
                </Card>
            </View>

            <View style={styles.versionContainer}>
                <Text style={styles.versionText}>Version 2.1</Text>
                <Text style={styles.versionText}>Powered By SBL Team IT</Text>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        padding: 16,
        justifyContent: 'space-around',
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 220,
        height: 90,     
        marginTop: 100,
    },
    cardContainer: {
        alignItems: 'stretch',
    },
    input: {        
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    buttonContainer: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginBottom: 8,
    },
    versionContainer: {
        justifyContent: 'center',
        alignItems: 'center',

    },
    versionText: {
        color: 'white'
    },
    title: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 8, 
    },
});

export default LoginScreen;