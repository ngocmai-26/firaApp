import { StatusBar } from 'expo-status-bar'
import { useState, useEffect, useLayoutEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TextInput,
} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import _ from 'lodash'
import { getAllRole } from '../../../thunks/RolesThunk'
import { useDispatch, useSelector } from 'react-redux'

export default function ManagerRoles() {
  const { allRole, singleRole } = useSelector((state) => state.rolesReducer);
  const [showRoleById, setShowRoleById] = useState(false)
  const [isHiddenPer, setIsHiddenPer] = useState(true);
  const [taskList, setTaskList] = useState([]);
  const [perUpdate, setPerUpdate] = useState({});
  const dispatch = useDispatch();



  useLayoutEffect(() => {
    if (allRole.length <= 0) {
      dispatch(getAllRole());
    }
    
  }, []);

  console.log(allRole)

  const [columns, setColumns] = useState([
    'Id',
    'Role Name',
    'Description',
    'Permissions',
    'Action',
  ])
  const [direction, setDirection] = useState(null)
  const [selectedColumn, setSelectedColumn] = useState(null)
  const [pets, setPets] = useState(allRole)

  const [showAddForm, setShowAddForm] = useState(false)
  const [newPetData, setNewPetData] = useState({
    Name: '',
    Gender: '',
    Breed: '',
    Weight: '',
    Age: '',
  })

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

  const handleAddPet = () => {
    setShowAddForm(true)
  }

  const handleInputChange = (key, value) => {
    setNewPetData({ ...newPetData, [key]: value })
  }

  const handleSaveNewPet = () => {
    const updatedPets = [...pets, newPetData]
    setPets(updatedPets)
    setNewPetData({
      id: '',
      roleName: '',
      description: '',
      permissions: '',
    })
    setShowAddForm(false)
  }

  const renderAddForm = () => (
    <View style={styles.addFormContainer}>
      <Text style={styles.formTitle}>Thêm mới</Text>
      {Object.keys(newPetData).map((key, index) => (
        <TextInput
          key={index}
          style={styles.input}
          placeholder={key}
          value={newPetData[key]}
          onChangeText={(text) => handleInputChange(key, text)}
        />
      ))}
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveNewPet}>
        <Text style={styles.saveButtonText}>Lưu</Text>
      </TouchableOpacity>
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
                {item.id}
              </Text>
              <Text style={styles.columnRowTxt}>{item.roleName}</Text>
              <Text style={styles.columnRowTxt}>{item.description}</Text>
              <Text style={styles.columnRowTxt}>{item.description}</Text>
              <Text style={styles.columnRowTxt}></Text>
            </View>
          )}
        />
      </ScrollView>
      <TouchableOpacity style={styles.addButton} onPress={handleAddPet}>
        <MaterialCommunityIcons name="plus-circle" size={48} color="blue" />
      </TouchableOpacity>
      {showAddForm && renderAddForm()}
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
    minWidth: windowWidth * 0.3, // 20% của chiều rộng màn hình
    maxWidth: windowWidth * 0.3, // 20% của chiều rộng màn hình
    justifyContent: 'center',
    alignItems: 'center',
  },
  columnHeaderTxt: {
    color: 'white',
    fontWeight: 'bold',
  },
  columnRowTxt: {
    minWidth: windowWidth * 0.3, // 20% của chiều rộng màn hình
    maxWidth: windowWidth * 0.3, // 20% của chiều rộng màn hình
    textAlign: 'center',
    alignItems: "center"
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  addFormContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '100%',
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: 'blue',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
})

