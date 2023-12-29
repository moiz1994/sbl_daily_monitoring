import { Alert, Pressable, StyleSheet, Text } from "react-native";
import IconButton from "./IconButton";
import { Colors } from "../../constants/Colors";
import { useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker'

const DatePickerView = ({currentDate, onDateChange }) => {
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date(currentDate));

    const showDatePickerHandler = () => {
        setShowDatePicker(true);
    };

    const hideDatePickerHandler = () => {
        setShowDatePicker(false);
    };

    const handleDateChange = (event, date) => {
        hideDatePickerHandler();
        if (date !== undefined && event.type === 'set') {
            setSelectedDate(date);
            onDateChange(date); // Notify the parent component about the selected date            
        }
    };
    
    return ( 
        <>
            <Pressable style={styles.container} onPress={showDatePickerHandler}>
                <Text style={styles.dateHolder}>{currentDate.toDateString()}</Text>
                <IconButton icon="calendar" size={24} color={Colors.gray700} />
            </Pressable>
            {showDatePicker && (
                <DateTimePicker
                    value={selectedDate}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                    positiveButton={hideDatePickerHandler}
                />
            )}            
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginHorizontal: 12,
        marginVertical: 4,
        borderBottomColor: Colors.gray700,
        borderBottomWidth: 1,
    },  
    dateHolder: {
        flex: 1,
        fontSize: 16,
    
    }
});

export default DatePickerView;