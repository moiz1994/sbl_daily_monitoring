import { StyleSheet, View, Text } from "react-native";
import { Colors } from "../../constants/Colors";
import Card from '../UI/Card';
import { numberFormat } from "../../util/Utilities";

const RowSaleDifference = ({dataItem}) => {
    
    const {DESCP, VIEWSALE_QTY, DADB_QTY, TEMPVS_QTY} = dataItem;

    const description = DESCP;

    const viewSaleQty = VIEWSALE_QTY;
    const fViewSaleQty = numberFormat(viewSaleQty);

    const dadbQty = DADB_QTY;
    const fDadbQty = numberFormat(dadbQty);

    const tempQty = TEMPVS_QTY;
    const fTempQty = numberFormat(tempQty);

    const dadbQtyDiff = viewSaleQty - dadbQty;
    const fDadbDiff = numberFormat(dadbQtyDiff);

    const tempDiff = viewSaleQty - tempQty;
    const fTempDiff = numberFormat(tempDiff);

    return (
        <View style={styles.root}>
            <Card style={styles.card}>
                <View style={styles.container}>
                    <Text style={styles.heading}>Description:</Text>
                    <Text style={styles.value}>{description}</Text>
                </View>
                <View style={styles.container}>
                    <Text style={styles.heading}>View Sale:</Text>
                    <Text style={styles.value}>{fViewSaleQty}</Text>
                </View>
                <View style={styles.container}>
                    <Text style={styles.heading}>DADB Sales:</Text>
                    <Text style={styles.value}>{fDadbQty}</Text>
                </View>
                <View style={styles.container}>
                    <Text style={styles.heading}>Difference DADB:</Text>
                    <Text style={styles.value}>{fDadbDiff}</Text>
                </View>
                <View style={styles.container}>
                    <Text style={styles.heading}>Temp View Sale:</Text>
                    <Text style={styles.value}>{fTempQty}</Text>
                </View>
                <View style={styles.container}>
                    <Text style={styles.heading}>Difference Temp:</Text>
                    <Text style={styles.value}>{fTempDiff}</Text>
                </View>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        margin: 10,
    },
    card: {
        paddingHorizontal: 8,
        paddingVertical: 12,
    },
    container: {
        flexDirection: 'row',        
    },
    heading: {
        flex: 2,
        color: Colors.gray700,
        marginRight: 4,
        fontFamily: 'roboto-bold',
    },
    value: {
        flex: 3,
        color: Colors.gray700,
        fontFamily: 'roboto-regular',
    },
});

export default RowSaleDifference;