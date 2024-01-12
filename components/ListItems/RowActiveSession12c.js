import { Pressable, StyleSheet, View } from "react-native";
import LabelText from "../UI/LabelText";
import Checkbox from "expo-checkbox";
import { Colors } from "../../constants/Colors";

const RowActiveSession12C = ({dataItem, isChecked, setChecked}) => {

    //console.log(dataItem)
    const {LOGON_TIME, MODULE, OSUSER, CLIENT_IDENTIFIER, TERMINAL, PROCESS, KILL_JOB} = dataItem;    

    const handlePress = () => {
        setChecked(!isChecked);
    };

    return (
        <Pressable onPress={handlePress} style={styles.root}>
            <View style={styles.container}>
                <View>                    
                    <LabelText label="Client Identifier" text={CLIENT_IDENTIFIER} />
                    <LabelText label="Logon Time" text={LOGON_TIME} />
                    <LabelText label="Module Name" text={MODULE} />
                    <LabelText label="Terminal" text={TERMINAL} />
                    <LabelText label="OsUser" text={OSUSER} />
                    <LabelText label="Kill Job" text={KILL_JOB} />
                    <LabelText label="Process" text={PROCESS} />                    
                </View>
                <Checkbox
                    value={isChecked}
                    onValueChange={setChecked}
                    color={isChecked ? Colors.blue500 : undefined}
                />                
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    root: {
        marginHorizontal: 10,
        marginVertical: 5,
        backgroundColor: "white",        
        padding: 8,        
        borderRadius: 8,
        overflow: 'hidden',
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default RowActiveSession12C;