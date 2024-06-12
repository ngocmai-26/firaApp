import React, { useLayoutEffect, useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { Picker } from '@react-native-picker/picker'
import { useDispatch, useSelector } from 'react-redux'
import { addNewJob, getAllJob, getJobById } from '../../../thunks/JobsThunk'
import { getAllUsers } from '../../../thunks/UserThunk'
import { getAllRole } from '../../../thunks/RolesThunk'
import DateTimePicker from '@react-native-community/datetimepicker'
import Icon from 'react-native-vector-icons/FontAwesome6'
import moment from 'moment'
import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-toast-message'
import { TOAST_ERROR } from '../../../constants/toast'
import { getAllAccount } from '../../../thunks/AccountsThunk'

function CreateJob() {
  const [isAddFormVisible, setIsAddFormVisible] = useState(false)
  const { allJob } = useSelector((state) => state.jobsReducer)
  const { account } = useSelector((state) => state.authReducer)
  const { allRole } = useSelector((state) => state.rolesReducer)
  const { allUser } = useSelector((state) => state.usersReducer)

  const { allAccount } = useSelector((state) => state.accountsReducer)
  const dispatch = useDispatch()

  useLayoutEffect(() => {
    if (allJob.length <= 0) {
      dispatch(getAllJob())
    }
    if (allUser?.length <= 0) {
      dispatch(getAllUsers())
    }
    if (allRole?.length <= 0) {
      dispatch(getAllRole())
    }
    if (account?.role?.roleName === 'ROLE_ADMIN') {
      if (allAccount?.length <= 0) {
        dispatch(getAllAccount())
      }
    }
  }, [])

  useLayoutEffect(() => {
    dispatch(getAllJob(0))
  }, [])

  const [newJobData, setNewJobData] = useState({
    title: '',
    kpiCount: 0,
    priority: 0,
    userCreateJobId: account?.user?.id,
    staffsGotJobId: [],
    userCreateJobId: '',
    description: '',
    note: '',
    target: '',
    timeStart: '',
    timeEnd: '',
    additionInfo: '',
    task: true,
    pointPerJob: 0,
  })

  const [showModal, setShowModal] = useState(false)
  const [showModal2, setShowModal2] = useState(false)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [staffs, setStaffs] = useState([])
  const [errors, setErrors] = useState({})
  const [timeEnd, setTimeEnd] = useState(new Date())
  const [timeStart, setTimeStart] = useState(new Date())
  const [mode, setMode] = useState('date')
  const [modeStart, setModeStart] = useState('date')
  const [show, setShow] = useState(false)
  const [showStart, setShowStart] = useState(false)
  const navigation = useNavigation()

  const handleCreateJob = () => {
    const validationErrors = {}
    const now = moment()

    if (!newJobData?.title) {
      validationErrors.title = 'Không được bỏ trống'
    }
    if (moment(newJobData.timeEnd).isBefore(newJobData.timeStart)) {
      Toast.show({
        type: TOAST_ERROR,
        text1: 'Thời gian kết thúc phải sau thời gian bắt đầu',
      })
      validationErrors.timeEnd = 'Thời gian kết thúc phải sau thời gian bắt đầu'
    }
    if (moment(newJobData.timeEnd).isBefore(now)) {
      Toast.show({
        type: TOAST_ERROR,
        text1: 'Thời gian kết thúc không được trước thời gian hiện tại',
      })
      validationErrors.timeEnd =
        'Thời gian kết thúc không được trước thời gian hiện tại'
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setErrors({})

    setNewJobData({ ...newJobData, staffsGotJobId: staffs })
    dispatch(addNewJob({ ...newJobData, staffsGotJobId: staffs })).then(
      (resp) => {
        if (!resp?.error) {
          navigation.navigate('quan-ly-cong-viec')
        }
      },
    )
  }

  const toggleUserSelection = (userId) => {
    if (staffs.includes(userId)) {
      setStaffs(staffs.filter((id) => id !== userId))
    } else {
      setStaffs([...staffs, userId])
    }
  }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate
    setShow(false)
    setTimeEnd(currentDate)

    setNewJobData({
      ...newJobData,
      timeEnd: moment(currentDate).format('YYYY-MM-DD'),
    })
  }

  const onChangeTimeStart = (event, selectedDate) => {
    const currentDate = selectedDate
    setShowStart(false)
    setTimeStart(currentDate)

    setNewJobData({
      ...newJobData,
      timeStart: moment(currentDate).format('YYYY-MM-DD'),
    })
  }

  const showMode = (currentMode) => {
    setShow(true)
    setMode(currentMode)
  }

  const showModeStart = (currentMode) => {
    setShowStart(true)
    setModeStart(currentMode)
  }

  const showDatepicker = () => {
    showMode('date')
  }

  const showDatepickerStart = () => {
    showModeStart('date')
  }

  return (
    <View style={styles.addFormContainer}>
      <ScrollView
        style={{
          marginTop: 10,
          width: Dimensions.get('window').width,
          paddingHorizontal: 15,
        }}
      >
        <View
          style={{
            borderBottomWidth: 1,
            marginBottom: 15,
            paddingBottom: 15,
            borderColor: '#ccc',
          }}
        >
          <Text style={styles.label}>Khung thời gian</Text>

          <View style={{ flexDirection: 'row', gap: 2 }}>
            <View
              style={{
                flexDirection: 'row',
                borderWidth: 1,
                borderColor: '#CCCCCC',
                borderRadius: 10,
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 10,
                paddingVertical: 10,
                flex: 2,
              }}
            >
              <TextInput
                placeholder="DD-MM-YYYY"
                defaultValue={moment(timeStart).format('DD-MM-YYYY')}
              />
              <TouchableOpacity
                onPress={showDatepickerStart}
                style={{ flexDirection: 'row', paddingHorizontal: 5 }}
              >
                <Icon
                  name="calendar-days"
                  size={20}
                  style={{
                    color: 'black',
                    alignItems: 'center',
                    marginVertical: 'auto',
                  }}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                borderWidth: 1,
                borderColor: '#CCCCCC',
                borderRadius: 10,
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 10,
                paddingVertical: 10,
                flex: 2,
              }}
            >
              <TextInput
                placeholder="DD-MM-YYYY"
                defaultValue={moment(timeEnd).format('DD-MM-YYYY')}
              />
              <TouchableOpacity
                onPress={showDatepicker}
                style={{ flexDirection: 'row', paddingHorizontal: 5 }}
              >
                <Icon
                  name="calendar-days"
                  size={20}
                  style={{
                    color: 'black',
                    alignItems: 'center',
                    marginVertical: 'auto',
                  }}
                />
              </TouchableOpacity>
            </View>
            {showStart && (
              <DateTimePicker
                testID="dateTimePicker"
                value={timeStart}
                mode={modeStart}
                is24Hour={true}
                onChange={onChangeTimeStart}
              />
            )}
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={timeEnd}
                mode={mode}
                is24Hour={true}
                onChange={onChange}
              />
            )}
          </View>
        </View>
        <View>
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: '#CCCCCC',
              marginBottom: 15,

              paddingBottom: 15,
            }}
          >
            <Text style={styles.label}>Chi tiết công việc</Text>
            <View>
              <View
                style={[
                  styles.informationPlanContainer,
                  { flexDirection: 'row', gap: 2 },
                ]}
              >
                <View style={[{ flex: 5 }]}>
                  <TextInput
                    style={[styles.input]}
                    placeholder="Tên công việc"
                    value={newJobData?.title}
                    onChangeText={(text) =>
                      setNewJobData({ ...newJobData, title: text })
                    }
                  />
                </View>
                <View>
                  <TextInput
                    style={[styles.input, { flex: 1 }]}
                    placeholder="Chỉ tiêu"
                    keyboardType="numeric"
                    onChangeText={(text) =>
                      setNewJobData({ ...newJobData, target: text })
                    }
                  />
                </View>
              </View>

              {errors?.title && (
                <Text style={{ color: 'red' }}>{errors?.title}</Text>
              )}
            </View>
            <View
              style={[
                styles.informationPlanContainer,
                { flexDirection: 'row', gap: 2 },
              ]}
            >
              <View
                style={{
                  borderWidth: 1,
                  marginVertical: 10,
                  borderRadius: 10,
                  borderColor: '#CCCCCC',
                  flex: 5,
                }}
              >
                <Picker
                  selectedValue={newJobData.priority}
                  onValueChange={(value) =>
                    setNewJobData({ ...newJobData, priority: value })
                  }
                >
                  <Picker.Item label="Mức độ" value={0} />
                  <Picker.Item label="Cần gấp" value={1} />
                  <Picker.Item label="Quan trọng" value={2} />
                  <Picker.Item label="Bình thường" value={3} />
                  <Picker.Item label="Ưu tiên sau" value={4} />
                </Picker>
              </View>
              <View>
                <TextInput
                  style={[
                    {
                      flex: 1,
                      borderWidth: 1,
                      borderColor: '#CCCCCC',
                      borderRadius: 10,
                      paddingHorizontal: 10,
                      marginBottom: 10,
                      marginTop: 10,
                      fontSize: 16,
                    },
                  ]}
                  placeholder="Điểm CV"
                  keyboardType="numeric"
                  onChangeText={(text) =>
                    setNewJobData({ ...newJobData, pointPerJob: text })
                  }
                />
              </View>
            </View>

            <View
              style={{
                marginVertical: 10,
              }}
            >
              <TextInput
                style={[styles.input, styles.descriptionInput]}
                placeholder="Mô tả công việc"
                value={newJobData.description}
                onChangeText={(text) =>
                  setNewJobData({ ...newJobData, description: text })
                }
                multiline
              />
            </View>
            <View>
              <TextInput
                style={styles.input}
                placeholder="Đường dẫn File"
                value={newJobData.additionInfo}
                onChangeText={(text) =>
                  setNewJobData({ ...newJobData, additionInfo: text })
                }
              />
            </View>
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: '#CCCCCC',
              marginBottom: 20,
              paddingBottom: 20,
            }}
          >
            <View>
              <View>
                <Text style={styles.label}>Phân công</Text>
              </View>
              <TouchableOpacity
                onPress={() => setShowModal(true)}
                style={styles.selectUserButton}
              >
                <Text style={{ fontSize: 16 }}>Chọn thành viên</Text>
              </TouchableOpacity>
              <Modal
                visible={showModal}
                transparent
                animationType="slide"
                onRequestClose={() => setShowModal(false)}
              >
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    <TextInput
                      style={styles.searchInput}
                      placeholder="Tìm kiếm"
                      value={searchKeyword}
                      onChangeText={setSearchKeyword}
                    />
                    <ScrollView style={styles.scrollContentContainer}>
                      {allAccount
                        .filter(
                          (item) =>
                            !(
                              item.role.roleName === 'ROLE_ADMIN' ||
                              item.active === false
                            ),
                        )
                        .map((item) => (
                          <TouchableOpacity
                            key={item.user.id}
                            onPress={() =>
                              setStaffs((prevStaffs) => {
                                if (prevStaffs.includes(item.user.id)) {
                                  return prevStaffs.filter(
                                    (id) => id !== item.user.id,
                                  )
                                } else {
                                  return [...prevStaffs, item.user.id]
                                }
                              })
                            }
                            style={[
                              styles.usersItem,
                              {
                                backgroundColor: staffs.includes(item.user.id)
                                  ? '#e8f0fe'
                                  : 'transparent',
                              },
                            ]}
                          >
                            <View style={styles.avatarContainer}>
                              <Image
                                source={{ uri: item.user.avatar }}
                                style={styles.avatar}
                              />
                            </View>
                            <View style={styles.nameContainer}>
                              <Text style={styles.fullName}>
                                {item.user.fullName}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        ))}
                    </ScrollView>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => setShowModal(false)}
                        style={styles.closeButton}
                      >
                        <Text
                          style={{
                            color: 'white',
                            fontSize: 16,
                          }}
                        >
                          Đóng
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
            <View style={styles.usersSelectionListWrapper}>
              <View>
                <Text style={styles.label}>Người chịu trách nhiệm</Text>
              </View>
              <TouchableOpacity
                onPress={() => setShowModal2(true)}
                style={styles.selectUserButton}
              >
                <Text style={{ fontSize: 16 }}>Chọn thành viên</Text>
              </TouchableOpacity>
              <Modal
                visible={showModal2}
                transparent
                animationType="slide"
                onRequestClose={() => setShowModal2(false)}
              >
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    <TextInput
                      style={styles.searchInput}
                      placeholder="Tìm kiếm"
                      value={searchKeyword}
                      onChangeText={setSearchKeyword}
                    />
                    <ScrollView style={styles.scrollContentContainer}>
                      {account.role.roleName === "ROLE_ADMIN"? allAccount
                        ?.filter(
                          (item) => item.role.roleName === 'ROLE_ADMIN'||
                          item.active === false,
                        )
                        .map((item) => (
                          <TouchableOpacity
                            key={item.user.id}
                            onPress={() =>
                              setNewJobData({
                                ...newJobData,
                                userCreateJobId: item.user.id,
                              })
                            }
                            style={[
                              styles.usersItem,
                              {
                                backgroundColor:
                                  item.user.id === newJobData.userCreateJobId
                                    ? '#e8f0fe'
                                    : 'transparent',
                              },
                            ]}
                          >
                            <View style={styles.avatarContainer}>
                              <Image
                                source={{ uri: item.user.avatar }}
                                style={styles.avatar}
                              />
                            </View>
                            <View style={styles.nameContainer}>
                              <Text style={styles.fullName}>
                                {item.user.fullName}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        )): account.user?.staffs?.map((item) => (
                          <TouchableOpacity
                            key={item.id}
                            onPress={() =>
                              setNewJobData({
                                ...newJobData,
                                userCreateJobId: item.id,
                              })
                            }
                            style={[
                              styles.usersItem,
                              {
                                backgroundColor:
                                  item.id === newJobData.userCreateJobId
                                    ? '#e8f0fe'
                                    : 'transparent',
                              },
                            ]}
                          >
                            <View style={styles.avatarContainer}>
                              <Image
                                source={{ uri: item.user.avatar }}
                                style={styles.avatar}
                              />
                            </View>
                            <View style={styles.nameContainer}>
                              <Text style={styles.fullName}>
                                {item.user.fullName}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        ))}
                    </ScrollView>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => setShowModal2(false)}
                        style={styles.closeButton}
                      >
                        <Text
                          style={{
                            color: 'white',
                            fontSize: 16,
                          }}
                        >
                          Đóng
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 3,

            marginBottom: 20,
            paddingBottom: 20,
          }}
        >
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setIsAddFormVisible(!isAddFormVisible)}
          >
            <Text style={styles.createButtonText}>Hủy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.createButton}
            onPress={handleCreateJob}
          >
            <Text style={styles.createButtonText}>Lưu công việc</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },

  addFormContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addFormHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  descriptionInput: {
    height: 150,
    textAlignVertical: 'top',
  },
  createButton: {
    width: '45%',
    backgroundColor: '#2089dc',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButton: {
    width: '45%',
    backgroundColor: '#bebebe',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  usersSelectionListWrapper: {
    marginTop: 20,
  },
  label: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    color: '#2089dc',
  },
  selectUserButton: {
    backgroundColor: '#e8f0fe',
    paddingHorizontal: 10,
    paddingVertical: 15,
    fontSize: 16,
    marginVertical: 5,
    borderRadius: 10,
  },
  scrollContentContainer: {
    height: 250,
    borderWidth: 1,
    borderColor: 'gray',
    marginTop: 10,
  },
  usersItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  avatarContainer: {
    marginRight: 10,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  nameContainer: {
    flex: 1,
  },
  fullName: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 10,
    textAlign: 'center',
    color: 'blue',
    backgroundColor: '#bebebe',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  select: {
    paddingVertical: 1,
    fontSize: 14,
  },
})
export default CreateJob
