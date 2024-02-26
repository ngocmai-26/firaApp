import { StatusBar } from 'expo-status-bar'
import { useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import _ from 'lodash'

export default function ManagerPermissions() {
  const [columns, setColumns] = useState([
    'Name',
    'Gender',
    'Breed',
    'Weight',
    'Age',
    'Age',
  ])
  const [direction, setDirection] = useState(null)
  const [selectedColumn, setSelectedColumn] = useState(null)
  const [pets, setPets] = useState([
    {
      Name: 'Charlie',
      Gender: 'Male',
      Breed: 'Dog',
      Weight: 12,
      Age: 3,
    },
    // more pet data...
  ])

  const sortTable = (column) => {
    const newDirection = direction === 'desc' ? 'asc' : 'desc'
    const sortedData = _.orderBy(pets, [column], [newDirection])
    setSelectedColumn(column)
    setDirection(newDirection)
    setPets(sortedData)
  }

  const tableHeader = () => (
    <View style={styles.tableHeader}>
      {columns.map((column, index) => (
        <TouchableOpacity
          key={index}
          style={styles.columnHeader}
          onPress={() => sortTable(column)}
        >
          <Text style={styles.columnHeaderTxt}>
            {column + ' '}
            {selectedColumn === column && (
              <MaterialCommunityIcons
                name={
                  direction === 'desc'
                    ? 'arrow-down-drop-circle'
                    : 'arrow-up-drop-circle'
                }
              />
            )}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  )

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <FlatList
          data={pets}
          style={styles.tableContent}
          keyExtractor={(item, index) => index + ''}
          ListHeaderComponent={tableHeader}
          stickyHeaderIndices={[0]}
          renderItem={({ item, index }) => (
            <View
              style={{
                ...styles.tableRow,
                backgroundColor: index % 2 == 1 ? '#F0FBFC' : 'white',
              }}
            >
              <Text style={{ ...styles.columnRowTxt, fontWeight: 'bold' }}>
                {item.Name}
              </Text>
              <Text style={styles.columnRowTxt}>{item.Gender}</Text>
              <Text style={styles.columnRowTxt}>{item.Breed}</Text>
              <Text style={styles.columnRowTxt}>{item.Weight}</Text>
              <Text style={styles.columnRowTxt}>{item.Age}</Text>
              <Text style={styles.columnRowTxt}>{item.Age}</Text>
            </View>
          )}
        />
      </ScrollView>
      <TouchableOpacity style={styles.addButton}>
        <MaterialCommunityIcons name="plus-circle" size={64} color="blue" />
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  )
}

const windowWidth = Dimensions.get('window').width * 0.95

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  tableContent: {
    width: '100%',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#37C2D0',
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    height: 50,
  },
  tableRow: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
  },
  columnHeader: {
    minWidth: windowWidth * 0.2, // 20% của chiều rộng màn hình
    maxWidth: windowWidth * 0.2, // 20% của chiều rộng màn hình
    justifyContent: 'center',
    alignItems: 'center',
  },
  columnHeaderTxt: {
    color: 'white',
    fontWeight: 'bold',
  },
  columnRowTxt: {
    width: '20%',
    textAlign: 'center',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,

  },
})

