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
import { useDispatch, useSelector } from 'react-redux'
import {
  addNewPermission,
  deletePermissions,
  getAllPermissions,
} from '../../../thunks/PermissionsThunk'
import Icon from 'react-native-vector-icons/FontAwesome6'

export default function ManagerPermissions() {
  const { allPermission, singlePermission, paginationPer } = useSelector(
    (state) => state.permissionsReducer,
  )
  const dispatch = useDispatch()
  const [showPermissionById, setShowPermissionById] = useState(false)
  const [permissions, setPermissions] = useState([])

  useLayoutEffect(() => {
    if (allPermission.length <= 0) {
      dispatch(getAllPermissions())
    }
  }, [])

  useLayoutEffect(() => {
    dispatch(getAllPermissions(0));
  }, []);

  useEffect(() => {
    setPermissions(allPermission)
  }, [allPermission])

  const [columns, setColumns] = useState([
    'Id',
    'Tên Chức Năng',
    'Mô Tả',
    'Hành động',
  ])
  const [direction, setDirection] = useState(null)
  const [selectedColumn, setSelectedColumn] = useState(null)

  const [showAddForm, setShowAddForm] = useState(false)
  const [newPermissionData, setNewPermissionData] = useState({
    name: '',
    description: '',
  })

  const sortTable = (column) => {
    const newDirection = direction === 'desc' ? 'asc' : 'desc'
    const sortedData = _.orderBy(permissions, [column], [newDirection])
    setSelectedColumn(column)
    setDirection(newDirection)
    setPermissions(sortedData)
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

  const handleAddPermission = () => {
    setShowAddForm(true)
  }

  const handleInputChange = (key, value) => {
    setNewPermissionData({ ...newPermissionData, [key]: value })
  }

  const handleSaveNewPermission = () => {
    const updatedPermission = [...permissions, newPermissionData]
    dispatch(addNewPermission(newPermissionData))

    // setNewPermissionData({
    //   name: '',
    //   description: '',
    // })
    setShowAddForm(false)
  }

  const renderAddForm = () => (
    <View style={styles.addFormContainer}>
      <Text style={styles.formTitle}>Add New Permission</Text>
      {Object.keys(newPermissionData).map((key, index) => {
        return (
          <TextInput
            key={index}
            style={styles.input}
            placeholder={key}
            value={newPermissionData[key]}
            onChangeText={(text) => handleInputChange(key, text)}
          />
        )
      })}

      <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
        <TouchableOpacity
          style={[styles.cancelButton, { marginHorizontal: 3 }]}
          onPress={() => setShowAddForm(false)}
        >
          <Text style={{ color: 'white', fontWeight: '600' }}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSaveNewPermission}
        >
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

  const [selectedPermission, setSelectedPermission] = useState(null)

  const handleViewPermissionDetails = (permission) => {
    setSelectedPermission(permission) // Lưu role được chọn để xem chi tiết
  }

  const renderPermissionDetailsForm = () => {
    return (
      <View style={styles.addFormContainer}>
        <Text style={styles.formTitle}>Role Details</Text>
        <TextInput
          style={styles.input}
          value={selectedPermission?.name}
          editable={false} // Không cho phép chỉnh sửa
        />
        <TextInput
          style={styles.input}
          value={selectedPermission?.description}
          editable={false} // Không cho phép chỉnh sửa
        />
        88
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          <TouchableOpacity
            style={{
              backgroundColor: 'gray',
              paddingHorizontal: 5,
              paddingVertical: 5,
              borderRadius: 3,
            }}
            onPress={() => setSelectedPermission(null)}
          >
            <Text style={{ color: 'white', fontWeight: '600' }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  const [currentPage, setCurrentPage] = useState(paginationPer?.number)


  const handlePrevPage = () => {
    if (currentPage > 0) {
      dispatch(getAllPermissions(currentPage - 1))
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < paginationPer?.totalPages) {
      dispatch(getAllPermissions(currentPage + 1))
      setCurrentPage(currentPage + 1)
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <FlatList
          data={permissions}
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
              <Text style={styles.columnRowTxt}>{item.name}</Text>
              <Text style={styles.columnRowTxt}>{item.description}</Text>
              <View style={[styles.columnRowTxt, { flexDirection: 'row' }]}>
                <TouchableOpacity
                  style={{ paddingHorizontal: 10 }}
                  onPress={() => handleViewPermissionDetails(item)}
                >
                  <Icon name="eye" size={20} color="#3498db" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ paddingHorizontal: 10 }}
                  onPress={() => dispatch(deletePermissions(item.id))}
                >
                  <Icon name="trash-can" size={20} color="#3498db" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </ScrollView>

      <View style={styles.containerPagination}>
        <TouchableOpacity
          onPress={handlePrevPage}
          style={styles.buttonPagination}
        >
          <Text style={styles.buttonTextPagination}>Previous</Text>
        </TouchableOpacity>
        <Text style={styles.pageTextPagination}>
          Page {paginationPer?.number + 1} of {paginationPer?.totalPages}
        </Text>
        <TouchableOpacity
          onPress={handleNextPage}
          style={styles.buttonPagination}
        >
          <Text style={styles.buttonTextPagination}>Next</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={handleAddPermission}>
        <MaterialCommunityIcons name="plus-circle" size={64} color="blue" />
      </TouchableOpacity>
      <StatusBar style="auto" />
      {selectedPermission && renderPermissionDetailsForm()}
      {showAddForm && renderAddForm()}
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
    minWidth: windowWidth * 0.3,
    maxWidth: windowWidth * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  columnHeaderTxt: {
    color: 'white',
    fontWeight: 'bold',
  },
  columnRowTxt: {
    minWidth: windowWidth * 0.3,
    maxWidth: windowWidth * 0.3,
    textAlign: 'center',
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
  cancelButton: {
    backgroundColor: 'gray',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  containerPagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonPagination: {
    padding: 10,
    marginHorizontal: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
    backgroundColor: '#f0f0f0',
  },
  buttonTextPagination: {
    color: '#000',
    fontSize: 16,
  },
  pageTextPagination: {
    marginHorizontal: 10,
    fontSize: 16,
  },
})
