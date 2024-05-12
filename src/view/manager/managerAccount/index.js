import React, { useState, useLayoutEffect, useEffect } from 'react'
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
import Icon from 'react-native-vector-icons/FontAwesome6'
import {
  addNewAccount,
  deleteAccount,
  getAccountById,
  getAllAccount,
} from '../../../thunks/AccountsThunk'
import { getAllRole } from '../../../thunks/RolesThunk'
import Select from 'react-select'
import { Dropdown } from 'react-native-element-dropdown'

export default function ManagerAccount() {
  const { allAccount, singleAccount, paginationAccount } = useSelector(
    (state) => state.accountsReducer,
  )
  const { allRole } = useSelector((state) => state.rolesReducer)
  const dispatch = useDispatch()
  const [newAccountData, setNewAccountData] = useState({
    username: '',
    password: '',
  })

  const [isFocus, setIsFocus] = useState(false)
  const [accounts, setAccounts] = useState(allAccount)
  const [accountDetail, setAccountDetail] = useState(null)
  useLayoutEffect(() => {
    if (allAccount.length <= 0) {
      dispatch(getAllAccount())
    }
    if (allRole.length <= 0) {
      dispatch(getAllRole())
    }
  }, [])
  useEffect(() => {
    setAccounts(allAccount)
  }, [allAccount])

  const data = allRole.map((role) => ({
    value: role.id.toString(),
    label: role.roleName,
  }))

  const [columns, setColumns] = useState([
    'Id',
    'FullName',
    'UserName',
    'Phone',
    'Action',
  ])
  const [direction, setDirection] = useState(null)
  const [selectedColumn, setSelectedColumn] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)

  const sortTable = (column) => {
    const newDirection = direction === 'desc' ? 'asc' : 'desc'
    const sortedData = _.orderBy(accounts, [column], [newDirection])
    setSelectedColumn(column)
    setDirection(newDirection)
    setAccounts(sortedData)
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

  const handleInputChange = (key, value) => {
    setNewAccountData({ ...newAccountData, [key]: value })
  }

  const handleAddAccount = () => {
    setShowAddForm(true)
  }

  const handleSaveNewAccount = () => {
    dispatch(addNewAccount(newAccountData)).then((resp) => {
      if (!resp?.payload) {
        setShowAddForm(false)
        setNewAccountData({
          username: '',
          password: '',
        })
      }
    })
  }

  const renderAddForm = () => (
    <View style={styles.addFormContainer}>
      <Text style={styles.formTitle}>Thêm tài khoản</Text>
      {Object.keys(newAccountData).map((key, index) => {
        return (
          <View>
            <TextInput
              key={index}
              style={styles.input}
              placeholder={key}
              value={newAccountData[key]}
              onChangeText={(text) => handleInputChange(key, text)}
            />
          </View>
        )
      })}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        value={newAccountData.roleId}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setNewAccountData({ ...newAccountData, roleId: item.value })
          setIsFocus(false)
        }}
      />

      <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
        <TouchableOpacity
          style={[styles.cancelButton, { marginHorizontal: 3 }]}
          onPress={() => setShowAddForm(false)}
        >
          <Text style={{ color: 'white', fontWeight: '600' }}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSaveNewAccount}
        >
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

  const [showRoleById, setShowRoleById] = useState(false)

  const handleViewAccountDetails = (item) => {
    setShowRoleById(!showRoleById)
    dispatch(getAccountById(item))
  }

  const renderAccountDetailsForm = () => {
    return (
      <View style={styles.addFormContainer}>
        <Text style={styles.formTitle}>Thông tin tài khoản </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 5,
          }}
        >
          <Text style={{ flex: 1 }}>Họ và tên: </Text>
          <TextInput
            style={[styles.input, { flex: 2 }]}
            value={singleAccount?.user?.fullName}
            editable={false}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 5,
          }}
        >
          <Text style={{ flex: 1 }}>Username: </Text>
          <TextInput
            style={[styles.input, { flex: 2 }]}
            value={singleAccount?.username}
            editable={false}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 5,
          }}
        >
          <Text style={{ flex: 1 }}>Số điện thoại: </Text>
          <TextInput
            style={[styles.input, { flex: 2 }]}
            value={singleAccount?.user?.phone}
            editable={false}
          />
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          <TouchableOpacity
            style={{
              backgroundColor: 'gray',
              paddingHorizontal: 5,
              paddingVertical: 5,
              borderRadius: 3,
            }}
            onPress={handleViewAccountDetails}
          >
            <Text style={{ color: 'white', fontWeight: '600' }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  const [currentPage, setCurrentPage] = useState(paginationAccount?.number)

  const handlePrevPage = () => {
    if (currentPage > 0) {
      dispatch(getAllAccount(currentPage - 1))
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < paginationAccount?.totalPages - 1) {
      dispatch(getAllAccount(currentPage + 1))
      setCurrentPage(currentPage + 1)
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <FlatList
          data={accounts}
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
                {index + 1}
              </Text>
              <Text style={styles.columnRowTxt}>
                {item?.user?.fullName || 'Tài khoản chưa cập nhật thông tin'}
              </Text>
              <Text style={styles.columnRowTxt}>{item?.username}</Text>
              <Text style={styles.columnRowTxt}>
                {item?.user?.phone || 'Tài khoản chưa cập nhật thông tin'}
              </Text>
              {item.active === true ? (
                <View style={[styles.columnRowTxt, { flexDirection: 'row' }]}>
                  <TouchableOpacity
                    style={{ paddingHorizontal: 10 }}
                    onPress={() => handleViewAccountDetails(item.id)}
                  >
                    <Icon name="eye" size={20} color="#3498db" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ paddingHorizontal: 10 }}
                    onPress={() => dispatch(deleteAccount(item.id))}
                  >
                    <Icon name="trash-can" size={20} color="#3498db" />
                  </TouchableOpacity>
                </View>
              ) : (
                <View>
                  <Text>Tài khoản bị vô hiệu hóa</Text>
                </View>
              )}
            </View>
          )}
        />
      </ScrollView>
      {paginationAccount?.totalPages > 1 && (
        <View style={styles.containerPagination}>
          <TouchableOpacity
            onPress={handlePrevPage}
            style={styles.buttonPagination}
          >
            <Text style={styles.buttonTextPagination}>Previous</Text>
          </TouchableOpacity>
          <Text style={styles.pageTextPagination}>
            Page {paginationAccount?.number + 1} of{' '}
            {paginationAccount?.totalPages}
          </Text>
          <TouchableOpacity
            onPress={handleNextPage}
            style={styles.buttonPagination}
          >
            <Text style={styles.buttonTextPagination}>Next</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity style={styles.addButton} onPress={handleAddAccount}>
        <MaterialCommunityIcons name="plus-circle" size={64} color="#2089dc" />
      </TouchableOpacity>
      {showAddForm && renderAddForm()}
      {showRoleById && renderAccountDetailsForm()}
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
    backgroundColor: '#2089dc',
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
  placeholderStyle: {
    fontSize: 14,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    paddingHorizontal: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderWidth: 1,
    marginVertical: 2,
    borderRadius: 5,
    fontSize: 12,
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
