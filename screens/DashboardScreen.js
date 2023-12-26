import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { AuthContext } from "../store/auth-context";
import IconButton from "../components/UI/IconButton";
import Card from "../components/UI/Card";
import Button from "../components/UI/Button";
import { Colors } from "../constants/Colors";
import GridItem from "../components/UI/GridItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getCOD, getEmpProfile, getUserRoles, updateCODLimit } from "../util/http";
import TableLayout from "../components/UI/TableLayout";
import Loader from "../components/UI/Loader";
import Input from "../components/UI/Input";
import Toast from 'react-native-simple-toast';
import LogoContainer from "../components/UI/LogoContainer";
import { VERSION } from "../constants/Strings";

function DashboardScreen() {
    const nav = useNavigation();
    const authContext = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(true);
    const [refreshData, setRefreshData] = useState(true);
    const [empCode, setEmpCode] = useState('');
    const [empProfile, setEmpProfile] = useState({});
    const [userRoles, setUserRoles] = useState({});
    const [fetchedCODLimit, setFetchedCODLimit] = useState({});
    const [codLimit, setCodLimit] = useState('');

    const tableHead = ['Date', 'COD Limit', 'Last Update'];
    const tableData = [];

    function refreshHandler(){
        setIsLoading(true);
        setRefreshData(true);
    }

    function logoutAlert(){
        Alert.alert(
            "Are you sure?", 
            "Are you sure you want to logout?",
            [            
                {
                    text: "No",
                    style: 'cancel'
                },
                {
                    text: "Yes",
                    onPress: () => authContext.logout(), 
                },
            ]
        )
    }

    function codLimitChangeHandler(enteredNumber){
        setCodLimit(enteredNumber)
    }

    async function responseCODLimit(){
        setIsLoading(true);
        const response = await updateCODLimit(empCode, codLimit)
        setIsLoading(false);
        if(response === "Success"){
            Toast.show("COD Limit Updated Successfully!", Toast.SHORT)
            setRefreshData(true);
        }else{
            Toast.show("Error While Updating COD Limit", Toast.SHORT);
        }
        console.log(response);
    }

    function updateCODHandler(){
        //console.log(codLimit);
        if(codLimit){
            try{
                Alert.alert(
                    "Are You Sure?",
                    "Are you sure you want to update COD Limit?", 
                    [
                        { text: "No", style: "cancel" },
                        { text: "Yes", onPress: responseCODLimit }
                    ]
                )
                
            }catch(error){
                console.error('Error Updating COD Limit: ', error);
            }
        }else{
            Alert.alert("Invalid Input!!!", "Please enter a valid COD Limit.", [{text: "Ok"}])
        }
    }

    useLayoutEffect(() => {
        nav.setOptions({
            headerRight: ({tintColor}) => (
                <View style={styles.menu}>            
                    <IconButton
                        icon='refresh'
                        color={tintColor}
                        size={24}
                        onPress={refreshHandler} 
                    />
                    <IconButton
                        icon='power'
                        color={tintColor}
                        size={24}
                        onPress={logoutAlert} 
                    />
                </View>
            ),
        })
    }, []);

    useEffect(() => {
        async function fillEmpCode() {
            try {
                const empID = await AsyncStorage.getItem('EMP_CODE');

                if (empID) {
                    setEmpCode(empID);
                }
            } catch (error) {
                console.error('Error Fetching Emp Code: ', error);
            }
        }

        async function fetchData() {
            await fillEmpCode(); // Wait for fillEmpCode to complete before proceeding

            try {
                if (empCode) {
                    const [empProfileResponse, userRolesResponse, codLimitResponse] = await Promise.all([
                        getEmpProfile(empCode),
                        getUserRoles(empCode),
                        getCOD(),
                    ]);
                
                    const parsedEmpProfile = JSON.parse(empProfileResponse);
                    setEmpProfile(parsedEmpProfile[0] || {});
                    //console.log(parsedEmpProfile);
                
                    const parsedUserRoles = JSON.parse(userRolesResponse);
                    setUserRoles(parsedUserRoles[0] || {});
                    //console.log(parsedUserRoles);
                
                    const parsedCodLimit = JSON.parse(codLimitResponse);
                    setFetchedCODLimit(parsedCodLimit[0] || {});
                    //console.log(parsedCodLimit);

                    setIsLoading(false);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            }
        }

        //fetchData();
        if(refreshData){
            fetchData().finally(() => {
                setRefreshData(false);               
            });
            //setRefreshData(false);
        }
    }, [empCode, refreshData]);


    if(fetchedCODLimit){
        const nonFormattedCOD = +fetchedCODLimit["LIMIT_COD"];
        const formattedCODLimit = nonFormattedCOD.toLocaleString('en-US', {            
            minimumFractionDigits: 0,
        });
        const COD_LIMIT = [fetchedCODLimit["CREATION_DATE"], formattedCODLimit, fetchedCODLimit["USER_FULL_NAME"]]
        tableData.push(COD_LIMIT);
    
    }

    return ( 
        <ScrollView style={styles.container}>
            { isLoading && (<Loader message="Loading..."/>) }
            <LogoContainer />
            <View style={styles.cardContainer}>
                <Card>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{empProfile['EMPLOYEE_NAME']}</Text>
                        <Text style={styles.title}>{empProfile['EMPLOYEE_ID']}</Text>
                    </View>
                </Card>
            </View>
            <View style={styles.cardContainer}>
                <Card>
                    
                    <View style={styles.grid}>
                        { userRoles['working_date'] === '1' && (
                            <GridItem 
                                source={require('../assets/moduleIcons/working_date.png')} 
                                text="Working Date Report"
                                onPress={() => {nav.navigate("WorkingDate")}}/>
                            )
                        }
                        { userRoles['sale_diff'] === '1' && (
                            <GridItem 
                                source={require('../assets/moduleIcons/sale_diff.png')} 
                                text="Sale Difference Report"/>
                            )
                        }
                        { userRoles['dist_status'] === '1' && (
                            <GridItem 
                                source={require('../assets/moduleIcons/dist_status.png')} 
                                text="Distributor Status"/>
                            )
                        }
                    </View>
                        
                    <View style={styles.grid}>
                        { userRoles['sale_date'] === '1' && (
                            <GridItem 
                                source={require('../assets/moduleIcons/sale_date.png')} 
                                text="Sale Date"/>
                            )
                        }
                        { userRoles['active_session'] === '1' && (
                            <GridItem 
                                source={require('../assets/moduleIcons/session.png')} 
                                text="Active Session"/>
                            )
                        }
                        { userRoles['doc_work_flow'] === '1' && (
                            <GridItem 
                                source={require('../assets/moduleIcons/workflow.png')} 
                                text="Doc Work Flow"/>
                            )
                        }
                    </View>

                    <View style={styles.grid}>
                        { userRoles['pre_sale'] === '1' && (
                            <GridItem 
                                source={require('../assets/moduleIcons/sales.png')} 
                                text="View Pre-Sale Data"/>
                            )
                        }
                        { userRoles['gate_pass'] === '1' && (
                            <GridItem 
                                source={require('../assets/moduleIcons/gatepass.png')} 
                                text="Update Vehicle Group on Gate Pass"/>
                            )
                        }
                        { userRoles['locked_session'] === '1' && (
                            <GridItem 
                                source={require('../assets/moduleIcons/locked_session.png')} 
                                text="Locked Session"/>
                            )
                        }
                    </View>

                    <View style={styles.grid}>
                        { userRoles['other_sale'] === '1' && (
                            <GridItem
                                source={require('../assets/moduleIcons/sales.png')}
                                text="Other Sale"/>
                            )
                        }
                    </View>

                    { userRoles['cod_limit'] === '1' && (
                        <>
                            <View style={styles.tableContainer}>
                                <TableLayout 
                                    headers={tableHead}
                                    data={tableData}
                                    headerRowStyle={styles.tableRow}
                                    headerTextStyle={styles.tableRowText}
                                    cellStyle={styles.tableCell}
                                />
                            </View>
                            <View style={styles.codUpdateContainer}>
                                <Input
                                    inputMode="numeric"
                                    keyboardType="number-pad"
                                    placeholder="Enter COD Limit" 
                                    onChange={codLimitChangeHandler}
                                    value={codLimit}
                                />
                                <Button 
                                    style={styles.btnCOD}
                                    onPress={updateCODHandler}>UPDATE COD</Button>
                            </View>
                        </>
                    )}
                </Card>
            </View>

            <View style={styles.cardContainer}>
                <Card>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{VERSION}</Text>
                        <Text style={styles.title}>Powered By SBL Team IT</Text>                        
                    </View>
                </Card>
            </View>

        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,        
        backgroundColor: Colors.gray700
    },
    menu: {
        flexDirection: 'row'
    },
    cardContainer: {
        margin: 10,
    },

    titleContainer: {
        paddingVertical: 18,
    },
    title: {
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold',        
    },

    grid: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
        marginHorizontal: 8,
    },

    tableContainer: {
        flex: 1,
        marginHorizontal: 10,
    },
    tableRow: {
        minHeight: 40,
        alignItems: 'center',
        backgroundColor: Colors.gray700,  
    },
    tableRowText: { 
        margin: 6,
        color: 'white',
        textAlign: 'center'
    },
    tableCell: {
        borderWidth: 1,
        borderColor: Colors.gray700,
        justifyContent: 'center',
        minHeight: 40,
        padding: 5,
    },

    codUpdateContainer: {
        flex: 1,
        flexDirection: 'row',
        marginVertical: 8,
        marginHorizontal: 10,
    },
});


export default DashboardScreen;