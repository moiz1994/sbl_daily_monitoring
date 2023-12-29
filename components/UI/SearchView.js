import { TextInput, View, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Colors } from "../../constants/Colors";

const SearchView = ({style, value, onChangeText}) => {
    return (
        <View style={[styles.root, style]}>
            <Ionicons name="search" size={24} color={Colors.gray700} />
            <TextInput 
                clearButtonMode="always"
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Search"
                style={styles.searchText}
                cursorColor={Colors.gray700}
                value={value}
                onChangeText={onChangeText}
            />            
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flexDirection: 'row',
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 8,
        paddingHorizontal: 4,
        paddingVertical: 8,
        marginTop: 12,
        marginBottom: 10,
    },
    searchText: {
        marginLeft: 4,
    },
});

export default SearchView;