import { Alert, Image, KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";
import { useContext, useEffect, useState } from "react";
import { login } from "../util/http";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingOverlay from "../components/LoadingOverlay";
import { AuthContext } from "../store/auth-context";

function LoginScreen() {
    const [isAuth, setIsAuth] = useState(false);
    const [empCode, setEmpCode] = useState('');
    const [password, setPassword] = useState('');
    const authContext = useContext(AuthContext);

    function empCodeHandler(enteredText){
        setEmpCode(enteredText)
    }

    function passwordHandler(enteredText){
        setPassword(enteredText)
    }

    async function loginHandler(){
        const empCodeIsValid = empCode.length == 8;
        const passwordIsValid = password.length > 6;

        if(empCodeIsValid && passwordIsValid){
            setIsAuth(true)
            const response = await login(empCode, password)
            console.log(response);
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
        async function preFillInputHandler(){
            const empID = await AsyncStorage.getItem('EMP_CODE');
    
            if (empID){
                setEmpCode(empID)
            }
        }

        preFillInputHandler();
    }, [setEmpCode])

    

    if(isAuth){
        return <LoadingOverlay message="Logging In..." />
    }

    return ( 
        <KeyboardAvoidingView style={styles.root}>
            <View style={styles.logoContainer}>
                <Image source={ require('../assets/logo.png') } style={styles.logo}/>
            </View>
            <View style={styles.cardContainer}>
                <Card>
                    <Text style={styles.title}>Login</Text>
                    <Input 
                        label="Employee Code"
                        keyboardType="numeric"
                        placeholder="Enter Employee Code"
                        isPassword={false}
                        onUpdateValue={empCodeHandler}
                        value={empCode}/>
                    <Input 
                        label="Password"
                        keyboardType="default"
                        placeholder="Enter Password"
                        isPassword={true}
                        onUpdateValue={passwordHandler}
                        value={password}/>

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