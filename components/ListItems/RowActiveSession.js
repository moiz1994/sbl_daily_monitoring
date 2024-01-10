import { Pressable, StyleSheet, View } from "react-native";
import LabelText from "../UI/LabelText";
import Checkbox from "expo-checkbox";
import { Colors } from "../../constants/Colors";

const RowActiveSession = ({dataItem, onPress, isChecked, setChecked}) => {

    //console.log(dataItem)
    const {SID, LOGON_TIME, MODULE, USERNAME, OSUSER, MACHINE, PROCESS, CLIENT_IDENTIFIER} = dataItem;    

    const handlePress = () => {
        setChecked(!isChecked);
    };

    return (
        <Pressable onPress={handlePress} style={styles.root}>
            <View style={styles.container}>
                <View>
                    <LabelText label="SID" text={SID} />
                    <LabelText label="Logon Time" text={LOGON_TIME} />
                    <LabelText label="Module Name" text={MODULE} />
                    <LabelText label="Username" text={USERNAME} />
                    <LabelText label="OsUser" text={OSUSER} />
                    <LabelText label="Machine" text={MACHINE} />
                    <LabelText label="Process" text={PROCESS} />
                    <LabelText label="Client Identifier" text={CLIENT_IDENTIFIER} />
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

export default RowActiveSession;