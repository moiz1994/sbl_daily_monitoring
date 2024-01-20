import { StyleSheet, View } from "react-native";
import Card from "../UI/Card";
import LabelText from "../UI/LabelText";

const RowLockedSession = ({dataItem}) => {

    const {OBJECT_NAME, SID_NO, SERIALNO, SSPID, PROGRAM_NO, USERNAME, MACHINE, PORT, LOGON_TIME} = dataItem;


    return (
        <View style={styles.root}>
            <Card style={styles.card}>
                <LabelText label="SID" text={SID_NO}/>
                <LabelText label="Object Name" text={OBJECT_NAME}/>
                <LabelText label="Serial No" text={SERIALNO}/>
                <LabelText label="SPID" text={SSPID}/>
                <LabelText label="Program" text={PROGRAM_NO}/>
                <LabelText label="Username" text={USERNAME}/>
                <LabelText label="Machine" text={MACHINE}/>
                <LabelText label="Port" text={PORT}/>
                <LabelText label="Logon Time" text={LOGON_TIME}/>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        marginHorizontal: 10,
        marginVertical: 5,
    },
    card: {
        paddingHorizontal: 8,
        paddingVertical: 12,
    },
});

export default RowLockedSession;