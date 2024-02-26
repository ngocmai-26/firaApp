
import { View, Text, StyleSheet } from 'react-native';

const Table = ({ headTable, children }) => {
  return (
    <View style={styles.tableContainer}>
      <View style={styles.tableHeader}>
        {headTable.map((item, index) => (
          <View key={index} style={styles.headerCell}>
            <Text style={styles.headerText}>{item}</Text>
          </View>
        ))}
      </View>
      <View style={styles.tableBody}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tableContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    flex: 1,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: "100%",
  },
  headerCell: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    minWidth: "20%",
  },
  headerText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  tableBody: {
    backgroundColor: '#fff',
  },
});

export default Table;