import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
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
import CustomModal from "../components/UI/CustomModal";
import DatePickerView from "../components/UI/DatePickerView";
import { dateFormat } from "../util/DateFormat";
import { numberFormat, toTitleCase } from "../util/Utilities";
import NetInfo from '@react-native-community/netinfo';
import { LinearGradient } from 'expo-linear-gradient';

const DashboardScreen = () => {
    const nav = useNavigation();
    const authContext = useContext(AuthContext);
    
    const [inOnline, setIsOnline] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshData, setRefreshData] = useState(true);
    const [empCode, setEmpCode] = useState('');
    const [empProfile, setEmpProfile] = useState({});
    const [userRoles, setUserRoles] = useState({});
    const [fetchedCODLimit, setFetchedCODLimit] = useState({});
    const [codLimit, setCodLimit] = useState('');
    const [saleDiffModalVisible, setSaleDiffModalVisible] = useState(false);

    const tableHead = ['Date', 'COD Limit', 'Last Update'];
    const tableData = [];

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
        const fillEmpCode = async () => {
            try {
                const empID = await AsyncStorage.getItem('EMP_CODE');

                if (empID) {
                    setEmpCode(empID);
                }
            } catch (error) {
                console.error('Error Fetching Emp Code: ', error);
            }
        }

        NetInfo.addEventListener(state => {
            if(state.isConnected){
                const fetchData = async () => {
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
            }else{
                Alert.alert("No Internet Connection", "Please check your internet connection and try again.")
            }
            setIsOnline(state.isConnected);
        })

        
    }, [empCode, refreshData]);

    const refreshHandler = () => {
        setIsLoading(true);
        setRefreshData(true);
    }

    const logoutAlert = () => {
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

    const codLimitChangeHandler = (enteredNumber) => {
        setCodLimit(enteredNumber)
    }

    const responseCODLimit = async () => {
        try{            
            setIsLoading(true);
            if(inOnline){
                const response = await updateCODLimit(empCode, codLimit)
                if(response === "Success"){
                    Toast.show("COD Limit Updated Successfully!", Toast.SHORT)
                    setRefreshData(true);
                }else{
                    Toast.show("Error While Updating COD Limit", Toast.SHORT);
                }
            }else{
                Alert.alert("No Internet Connection", "Please check your internet connection and try again.");
            }
            setIsLoading(false);
            
        }catch(error){
            console.error('Error Updating COD Limit: ', error);
        }
    }

    const updateCODHandler = () => {
        //console.log(codLimit);
        if(codLimit){        
            Alert.alert(
                "Are You Sure?",
                "Are you sure you want to update COD Limit?", 
                [
                    { text: "No", style: "cancel" },
                    { text: "Yes", onPress: responseCODLimit }
                ]
            )
        }else{
            Alert.alert("Invalid Input!!!", "Please enter a valid COD Limit.", [{text: "Ok"}])
        }
    }

    const saleDiffHandler = () => {
        setSaleDiffModalVisible(true);
    }

    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);                
    };

    const saleDiffSelectHandler = (inputDate) => {
        let forDate = dateFormat(inputDate);
        setSaleDiffModalVisible(false);
        nav.navigate('SaleDifference', {
            saleDate : forDate,
        })
    }

    if(fetchedCODLimit){
        const formattedCODLimit = numberFormat(fetchedCODLimit['LIMIT_COD']);
        const COD_LIMIT = [fetchedCODLimit["CREATION_DATE"], formattedCODLimit, fetchedCODLimit["USER_FULL_NAME"]]
        tableData.push(COD_LIMIT);
    }

    return (     
        <ScrollView style={styles.container}>
            { isLoading && (<Loader message="Loading..."/>) }

            <CustomModal 
                isVisible={saleDiffModalVisible}             
                title="Select Date"
                closeModal={() => setSaleDiffModalVisible(false)}>
                <View>
                    <DatePickerView currentDate={selectedDate} onDateChange={handleDateChange}/>
                    <Button style={styles.modalBtn} onPress={() => saleDiffSelectHandler(selectedDate)}>Select</Button>
                </View>
            </CustomModal>
            
            {/*         Header*/}
            <View style={styles.headerContainer}>
                <View>
                    <Text style={styles.headerTitle}>Daily Monitoring</Text>
                    <Text style={styles.headerSubTitle}>Dashboard</Text>
                </View>
                <Image source={require('../assets/logo.png')} style={{ width: 60, height: 60, }}/>
            </View>
            <Text style={[styles.headerSubTitle, styles.headerUser]}>{empProfile['EMPLOYEE_NAME']} - {empProfile['EMPLOYEE_ID']}</Text>           

            {/*         Content*/}
            <View style={styles.contentContainer}>
                <Text style={[styles.headerSubTitle, styles.mb6]}>Dashboard Main</Text>
            
                <View style={styles.grid}>
                    { userRoles['working_date'] === '1' && (                        
                        <GridItem 
                            source={require('../assets/moduleIcons/working_date.png')} 
                            text="Working Date"
                            onPress={() => {nav.navigate("WorkingDate")}}/>                        
                    )}
                    { userRoles['sale_diff'] === '1' && (
                        <GridItem 
                            source={require('../assets/moduleIcons/sale_diff.png')} 
                            text="Sale Difference"
                            onPress={saleDiffHandler}/>
                        )
                    }
                    { userRoles['dist_status'] === '1' && (
                        <GridItem 
                            source={require('../assets/moduleIcons/dist_status.png')} 
                            text="Distributor Status"
                            onPress={() => {nav.navigate("DistStatus")}}/>
                        )
                    }
                </View>

                <View style={styles.grid}>
                    { userRoles['sale_date'] === '1' && (
                        <GridItem 
                            source={require('../assets/moduleIcons/sale_date.png')} 
                            text="Sale Date"
                            onPress={() => nav.navigate("SaleDate")}/>
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
                            text="Update Vehicle.. GP"/>
                        )
                    }
                    { userRoles['locked_session'] === '1' && (
                        <GridItem 
                            source={require('../assets/moduleIcons/locked_session.png')} 
                            text="Locked Session"/>
                        )
                    }
                </View>

                { userRoles['other_sale'] === '1' && (
                    <GridItem style={{ marginLeft: 0, }}
                        source={require('../assets/moduleIcons/other_sale.png')}
                        text="Other Sale"/>
                    )
                }

                { userRoles['cod_limit'] === '1' && (
                    <LinearGradient
                        colors={[Colors.gradientStart, Colors.gradientEnd]}
                        start={{ x: 0, y: 0.5 }} // Starts at left center
                        end={{ x: 1, y: 0.5 }} // Ends at right center
                        style={styles.codContainer}
                    >
                        <Text style={styles.codTitle}>COD Limit</Text>

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
                                textStyle={styles.btnCODText}
                                onPress={updateCODHandler}>UPDATE COD</Button>
                        </View>

                    </LinearGradient>
                )}
                {/*         Footer*/}            
                <View style={styles.footerContainer}>
                    <Text style={styles.footerText}>{VERSION}</Text>
                    <Text style={styles.footerText}>Powered By SBL Team IT</Text>                        
                </View>   
            </View>

        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },

    menu: {
        flexDirection: 'row'
    },

    headerContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginHorizontal: 10,
        marginTop: 10,
    },
    headerTitle: {
        color: 'black',
        fontFamily: 'roboto-bold',
        fontSize: 24,
    },
    headerSubTitle: {
        color: Colors.gray50,
        fontFamily: 'roboto-medium',
        fontSize: 18,
    },
    headerUser: {
        marginLeft: 10,
        marginTop: 15,
    },

    mb6: {
        marginBottom: 6,
    },

    contentContainer: {
        flex: 1,
        backgroundColor: Colors.bgColor,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        padding: 10,
        marginTop: 10,
    },
    grid: {        
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
        marginHorizontal: 8,
    },

    codContainer: {
        borderRadius: 12,
    },
    codTitle: {
        color: 'white',
        fontFamily: 'roboto-bold',
        textAlign: 'center',
        fontSize: 15,
        marginTop: 10,
    },

    tableContainer: {
        flex: 1,
        marginHorizontal: 10,
    },
    tableRow: {        
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    tableRowText: { 
        padding: 6,
        color: 'white',
        textAlign: 'center'
    },
    tableCell: {    
        justifyContent: 'center',
        minHeight: 40,        
    },

    codUpdateContainer: {
        flex: 1,
        flexDirection: 'row',
        marginVertical: 8,
        marginHorizontal: 10,
    },

    btnCOD: {
        backgroundColor: 'white',
    },
    btnCODText: {
        color: Colors.gray700,
        fontFamily: 'roboto-medium'
    },

    footerContainer: {
        paddingVertical: 18,
    },
    footerText: {
        textAlign: 'center',
        fontSize: 10,
        fontFamily: 'roboto-regular',
        color: Colors.gray50
    },

    modalBtn: {
        marginHorizontal: 12,
        marginTop: 4,
        marginBottom: 8,
    },
});


export default DashboardScreen;