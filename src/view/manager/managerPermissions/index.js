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
import { MaterialIcons } from '@expo/vector-icons'
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
    dispatch(getAllPermissions(0))
  }, [])

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
    <View style={styles.formCreate}>
      <View style={styles.addFormContainer}>
        <Text style={styles.formTitle}>Thêm chức năng</Text>
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
            <Text style={{ color: 'white', fontWeight: '600' }}>Hủy</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSaveNewPermission}
          >
            <Text style={styles.saveButtonText}>Lưu</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )

  const [selectedPermission, setSelectedPermission] = useState(null)

  const handleViewPermissionDetails = (permission) => {
    setSelectedPermission(permission) // Lưu role được chọn để xem chi tiết
  }

  const renderPermissionDetailsForm = () => {
    return (
      <View style={styles.formCreate}>
        <View style={styles.addFormContainer}>
          <Text style={styles.formTitle}>Role Details</Text>
          <TextInput
            style={styles.input}
            value={selectedPermission?.name}
            editable={false} 
          />
          <TextInput
            style={styles.input}
            value={selectedPermission?.description}
            editable={false} 
            placeholder='Mô tả'
          />
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          
            <TouchableOpacity
            style={[styles.cancelButton, { marginHorizontal: 3 }]}
            onPress={() => setSelectedPermission(null)}
          >
            <Text style={{ color: 'white', fontWeight: '600' }}>Hủy</Text>
          </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  const [currentPage, setCurrentPage] = useState(paginationPer.number )

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
              }}
            >
              <Text style={{ ...styles.columnRowTxt, fontWeight: 'bold' }}>
                {item?.id}
              </Text>
              <Text style={styles.columnRowTxt}>{item?.name}</Text>
              <Text style={styles.columnRowTxt}>{item?.description}</Text>
              <View style={[styles.columnRowTxt, { flexDirection: 'row' }]}>
                <TouchableOpacity
                  style={{ paddingHorizontal: 10 }}
                  onPress={() => handleViewPermissionDetails(item)}
                >
                  <Icon name="eye" size={20} color="#3498db" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ paddingHorizontal: 10 }}
                  onPress={() => dispatch(deletePermissions(item?.id))}
                >
                  <Icon name="trash-can" size={20} color="#3498db" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </ScrollView>
      {paginationPer?.totalPages > 1 && (
        <View style={styles.containerPagination}>
          <TouchableOpacity
            onPress={handlePrevPage}
            style={styles.buttonPagination}
          >
            <Text style={styles.buttonTextPagination}>&#60;</Text>
          </TouchableOpacity>
          <Text style={styles.pageTextPagination}>
            Page {paginationPer?.number + 1} of {paginationPer?.totalPages}
          </Text>
          <TouchableOpacity
            onPress={handleNextPage}
            style={styles.buttonPagination}
          >
            <Text style={styles.buttonTextPagination}>&#62;</Text>
          </TouchableOpacity>
        </View>
      )}

      <StatusBar style="auto" />
      {selectedPermission && renderPermissionDetailsForm()}
      {showAddForm && renderAddForm()}
      
      <TouchableOpacity style={styles.addButton} onPress={handleAddPermission}>
        <MaterialIcons name="add" size={36} color="#fff" />
      </TouchableOpacity>
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
    backgroundColor: '#6a9cfd',
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
    backgroundColor: '#2089dc',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  formCreate: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: '#cccccc84',
  },
  addFormContainer: {
    marginVertical: 20,
    marginHorizontal: 20,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '90%',
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },

  saveButton: {
    backgroundColor: '#0ea5e9',
    borderRadius: 5,
    padding: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#cbd5e1',
    borderRadius: 5,
    padding: 10,
    paddingHorizontal: 15,
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
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
    backgroundColor: 'white',
  },
  buttonTextPagination: {
    color: '#000',
    fontSize: 14,
  },
  pageTextPagination: {
    marginHorizontal: 10,
    fontSize: 14,
  },
})
