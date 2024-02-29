import React, { useState, useEffect, useLayoutEffect } from 'react'
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
import { addNewRole, deleteRoles, getAllRole } from '../../../thunks/RolesThunk'
import { getAllPermissions } from '../../../thunks/PermissionsThunk'
import Icon from 'react-native-vector-icons/FontAwesome6'

export default function ManagerRoles() {
  const { allRole, singleRole } = useSelector((state) => state.rolesReducer)
  const { allPermission } = useSelector((state) => state.permissionsReducer)
  const [showRoleById, setShowRoleById] = useState(false)
  const [isHiddenPer, setIsHiddenPer] = useState(true)
  const [taskList, setTaskList] = useState([])
  const [perUpdate, setPerUpdate] = useState({})
  const dispatch = useDispatch()
  const [dataFetched, setDataFetched] = useState(false)
  const [roles, setRoles] = useState([])

  useLayoutEffect(() => {
    if (allRole.length <= 0) {
      dispatch(getAllRole())
    }
    if (allPermission.length <= 0) {
      dispatch(getAllPermissions())
    }
  }, [])

  useEffect(() => {
    setRoles(allRole)
  }, [allRole])

  

  const [columns, setColumns] = useState([
    'Id',
    'Role Name',
    'Description',
    'Permissions',
    'Action',
  ])
  const [direction, setDirection] = useState(null)
  const [selectedColumn, setSelectedColumn] = useState(null)
  const [selectedRole, setSelectedRole] = useState(null)

  const [showAddForm, setShowAddForm] = useState(false)
  const [newRoleData, setNewRoleData] = useState({
    roleName: '',
    description: '',
    
  })

  const sortTable = (column) => {
    const newDirection = direction === 'desc' ? 'asc' : 'desc'
    const sortedData = _.orderBy(roles, [column], [newDirection])
    setSelectedColumn(column)
    setDirection(newDirection)
    setRoles(sortedData)
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

  const handleAddRole = () => {
    setShowAddForm(true)
  }

  const handleInputChange = (key, value) => {
    setNewRoleData({ ...newRoleData, [key]: value })
  }

  const handleSaveNewRole = () => {
    const updatedRoles = [...roles, newRoleData]
    
    const newData = { ...newRoleData, permissionIds: [] }
    dispatch(addNewRole(newData))
    setNewRoleData({
      roleName: '',
      description: '',
      permissionIds: [],
    })
    setShowAddForm(false)
  }

  // const handlePermissionSelection = (permission) => {
  //   if (!newRoleData.permissionIds.includes(permission.id)) {
  //     const updatedPermissions = [...newRoleData.permissionIds, permission.id]
  //     setNewRoleData({ ...newRoleData, permissionIds: updatedPermissions })
  //   }
  // }

  // const handleRemovePermission = (permissionId) => {
  //   const updatedPermissions = newRoleData.permissionIds.filter(
  //     (id) => id !== permissionId,
  //   )
  //   setNewRoleData({ ...newRoleData, permissionIds: updatedPermissions })
  // }

  const handleViewRoleDetails = (role) => {
    setSelectedRole(role) // Lưu role được chọn để xem chi tiết
  }

  const renderRoleDetailsForm = () => {
    return (
      <View style={styles.addFormContainer}>
        <Text style={styles.formTitle}>Role Details</Text>
        <TextInput
          style={styles.input}
          placeholder="Role Name"
          value={selectedRole?.roleName}
          editable={false} // Không cho phép chỉnh sửa
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={selectedRole?.description}
          editable={false} // Không cho phép chỉnh sửa
        />
        {/* Hiển thị danh sách permissionIds nếu cần */}
        {/* <Text style={styles.input}>
          Permissions: {selectedRole?.permissionIds.join(", ")}
        </Text> */}
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          <TouchableOpacity
            style={{
              backgroundColor: 'gray',
              paddingHorizontal: 5,
              paddingVertical: 5,
              borderRadius: 3,
            }}
            onPress={() => setSelectedRole(null)}
          >
            <Text style={{ color: 'white', fontWeight: '600' }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  const renderAddForm = () => (
    <View style={styles.addFormContainer}>
      <Text style={styles.formTitle}>Add New Role</Text>
      {Object.keys(newRoleData).map((key, index) => {
        if (key === 'permissionIds') {
          return (
            <View></View>
            // <View key={index}>
            //   <Text style={styles.input}>
            //     {newRoleData.permissionIds
            //       .map((permissionId) => {
            //         const foundPermission = allPermission.find(
            //           (permission) => permission.id === permissionId,
            //         )
            //         return foundPermission ? foundPermission.name : ''
            //       })
            //       .join(', ')}
            //   </Text>
            // </View>
          )
        }
        return (
          <TextInput
            key={index}
            style={styles.input}
            placeholder={key}
            value={newRoleData[key]}
            onChangeText={(text) => handleInputChange(key, text)}
          />
          
        )
      })}
      {/* <View style={styles.permissionsContainer}>
        <View style={styles.permissionList}>
          <Text style={styles.permissionsTitle}>Available Permissions</Text>
          <ScrollView style={styles.permissionsScrollView}>
            {allPermission.map((permission) => (
              <TouchableOpacity
                key={permission.id}
                style={styles.permissionItem}
                onPress={() => handlePermissionSelection(permission)}
              >
                <Text>{permission.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View style={styles.permissionList}>
          <Text style={styles.permissionsTitle}>Selected Permissions</Text>
          <ScrollView style={styles.permissionsScrollView}>
            {newRoleData.permissionIds.map((permissionId, index) => {
              const foundPermission = allPermission.find(
                (permission) => permission.id === permissionId,
              )
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.permissionItem}
                  onPress={() => handleRemovePermission(permissionId)}
                >
                  <Text>{foundPermission ? foundPermission.name : ''}</Text>
                </TouchableOpacity>
              )
            })}
          </ScrollView>
        </View>
      </View> */}
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>

          <TouchableOpacity
            style={[styles.cancelButton, {marginHorizontal: 3}]}
            onPress={() => setShowAddForm(false)}
          >
            <Text style={{ color: 'white', fontWeight: '600' }}>Cancel</Text>
          </TouchableOpacity>
          
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveNewRole}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
        </View>
    </View>
  )

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <FlatList
          data={roles}
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
              <View style={[styles.columnRowTxt, { flexDirection: 'row' }]}>
                <TouchableOpacity
                  style={{ paddingHorizontal: 10 }}
                  onPress={() => handleViewRoleDetails(item)}
                >
                  <Icon name="eye" size={20} color="#3498db" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ paddingHorizontal: 10 }}
                  onPress={() => dispatch(deleteRoles(item.id))}
                >
                  <Icon name="trash-can" size={20} color="#3498db" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </ScrollView>
      <TouchableOpacity style={styles.addButton} onPress={handleAddRole}>
        <MaterialCommunityIcons name="plus-circle" size={48} color="blue" />
      </TouchableOpacity>
      {showAddForm && renderAddForm()}
      {selectedRole && renderRoleDetailsForm()}
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
    alignItems: 'center',
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
  permissionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  permissionList: {
    width: '48%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
  },
  permissionsTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 5,
  },
  permissionsScrollView: {
    maxHeight: 150,
  },
  permissionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
})
