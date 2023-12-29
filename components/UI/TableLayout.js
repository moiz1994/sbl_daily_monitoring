import { View, Text, StyleSheet } from 'react-native';

const TableLayout = ({
    headers,
    data,
    tableStyle,
    headerRowStyle,
    headerCellStyle,
    headerTextStyle,
    rowStyle,
    cellStyle,
    cellTextStyle
}) => {
    return ( 
        <View style={[styles.table, tableStyle]}>
            {/* Table Headers */}
            <View style={[styles.headerRow, headerRowStyle]}>
                {headers.map((header, index) => (
                    <View key={index} style={[styles.headerCell, headerCellStyle]}>
                        <Text style={[styles.headerText, headerTextStyle]}>{header}</Text>
                    </View>
                ))}
            </View>

            {/* Table Rows */}
            {data.map((row, rowIndex) => (
                <View key={rowIndex} style={[styles.row, rowStyle]}>
                {row.map((cell, cellIndex) => (
                    <View key={cellIndex} style={[styles.cell, cellStyle]}>
                    <Text style={[styles.cellText, cellTextStyle]}>{cell}</Text>
                    </View>
                ))}
                </View>
            ))}
        </View>
    );
}
const styles = StyleSheet.create({
    table: {
        borderWidth: 1,
        borderColor: 'black',
        marginVertical: 10,
    },
    headerRow: {
        flexDirection: 'row',
        backgroundColor: '#f2f2f2',
    },
    headerCell: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
    },
    headerText: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
    row: {
        flexDirection: 'row',
    },
    cell: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
    },
    cellText: {
        textAlign: 'center',
    },
});

export default TableLayout;