import React, { useLayoutEffect, useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  TextInput,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { Picker } from '@react-native-picker/picker'
import { useDispatch, useSelector } from 'react-redux'
import { addNewJob, getAllJob, getJobById } from '../../../thunks/JobsThunk'
import { getAllUsers } from '../../../thunks/UserThunk'
import { getAllRole } from '../../../thunks/RolesThunk'
import DetailJob from './detail'

const ManagerJobs = () => {
  const [currentTab, setCurrentTab] = useState('allTasks')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isAddFormVisible, setIsAddFormVisible] = useState(false)
  const { allJob, paginationJob } = useSelector((state) => state.jobsReducer)
  const { account } = useSelector((state) => state.authReducer)
  const { allRole } = useSelector((state) => state.rolesReducer)

  const { allUser } = useSelector((state) => state.usersReducer)

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
  })

  const [selectedUsers, setSelectedUsers] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [showModal2, setShowModal2] = useState(false)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [staffs, setStaffs] = useState([])

  const [errors, setErrors] = useState({})
  const [hiddenDetail, setHiddenDetail] = useState(false)
  const [currentPage, setCurrentPage] = useState(paginationJob?.number)

  const tabs = [
    { id: 'allTasks', label: 'Tất cả công việc' },
    { id: 'plan', label: 'Kế hoạch' },
    { id: 'due', label: 'Đến hạn' },
    { id: 'inProgress', label: 'Đang tiến hành' },
    { id: 'completed', label: 'Đã hoàn thành' },
  ]

  const handleTabChange = (tab) => {
    setCurrentTab(tab)
    setIsModalVisible(false)
  }

  const isValidDateFormat = (dateString) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/
    return regex.test(dateString)
  }
  const handleCreateJob = () => {
    const validationErrors = {}
    if (!newJobData?.title) {
      validationErrors.title = 'Không được bỏ trống'
    }
    if (!newJobData?.timeStart) {
      validationErrors.timeStart = 'Không được bỏ trống'
    }
    if (!isValidDateFormat(newJobData?.timeStart)) {
      validationErrors.timeStart = 'Định dạng ("YYYY-MM-DD")!'
    }
    if (!newJobData?.timeEnd) {
      validationErrors.timeEnd = 'Không được bỏ trống'
    }
    if (!isValidDateFormat(newJobData?.timeEnd)) {
      validationErrors.timeEnd = 'Định dạng ("YYYY-MM-DD")!'
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setErrors()

    // toggleAddForm()
    setNewJobData({ ...newJobData, staffsGotJobId: staffs })
    console.log('newJobData', newJobData)
    dispatch(addNewJob(newJobData)).then((resp) => {
      if (!resp?.error) {
        setIsAddFormVisible(!isAddFormVisible)
      }
    })
  }

  const toggleUserSelection = (userId) => {
    if (allUser.includes(userId)) {
      setStaffs(staffs.filter((id) => id !== userId))
    } else {
      setStaffs([...staffs, userId])
    }
  }

  const toggleAddForm = () => {
    setIsAddFormVisible(!isAddFormVisible)
    setNewJobData({
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
      status: 1,
    })
    setStaffs([])
  }

  const handlePrevPage = () => {
    if (currentPage > 0) {
      dispatch(getAllJob(currentPage - 1))
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < paginationJob?.totalPages) {
      dispatch(getAllJob(currentPage + 1))
      setCurrentPage(currentPage + 1)
    }
  }

  const handleDetailJob = (item) => {
    console.log("item",item)
    dispatch(getJobById(item)).then((reps) => {
    
      if (!reps.error) {
        console.log("a")
        setHiddenDetail(true)
      }})
  }
  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => setIsModalVisible(true)}
        >
          <Text style={styles.tabText}>Chọn chức năng</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.taskContainer}>
        <View style={[styles.content, { height: '90%' }]}>
          <ScrollView style={[styles.taskContainer, { height: '100%' }]}>
            {allJob.map((item, index) => (
              <TouchableOpacity
                style={[styles.job, styles.jobContainer]}
                onPress={() => handleDetailJob(item.id)}
              >
                <View>
                  <Text style={styles.jobTitle}>{item.title}</Text>
                  <Text style={{ fontSize: 10 }}>
                    {item?.jobDetail?.description}
                  </Text>
                  <View style={{ flexDirection: 'row', gap: 2 }}>
                    <Text style={{ fontWeight: 500, fontSize: 15 }}>
                      Người phụ trách:
                    </Text>
                    <Text style={{ color: 'red' }}>
                      {item.manager.fullName}
                    </Text>
                  </View>
                  <View style={{ gap: 2 }}>
                    <Text style={{ fontWeight: 500, fontSize: 15 }}>
                      Người thực hiện:
                    </Text>
                    <Text style={{}}>
                      {item.staffs.length !== 0
                        ? item.staffs.map((props) => props.fullName)
                        : 'Chưa có người thực hiện'}
                    </Text>
                  </View>
                  <View style={{ gap: 4, flexDirection: 'row' }}>
                    <Text style={{ fontSize: 12, color: '#888' }}>
                      Từ ngày:{' '}
                      {
                        new Date(item?.jobDetail?.timeStart)
                          .toISOString()
                          .split('T')[0]
                      }
                    </Text>
                    <Text style={{ fontSize: 12, color: '#888' }}>
                      Đến ngày:{' '}
                      {
                        new Date(item?.jobDetail?.timeStart)
                          .toISOString()
                          .split('T')[0]
                      }
                    </Text>
                  </View>
                  <Text style={styles.jobDate}>{item.priority}</Text>
                </View>
                <View style={styles.optionsBox}>
                  <TouchableOpacity>
                    {/* <Ionicons
                      name="checkmark-done-circle"
                      size={24}
                      color="green"
                    /> */}
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => deletejobFromPlanned(index)}>
                    <Text>X</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={toggleAddForm}>
        <MaterialIcons name="add" size={36} color="#fff" />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={tabs}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => handleTabChange(item?.id)}
                >
                  <Text>{item.label}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item?.id}
            />
          </View>
        </View>
      </Modal>

      {isAddFormVisible && (
        <View style={styles.addFormContainer}>
          <Text style={styles.addFormHeading}>Thêm công việc mới</Text>
          <ScrollView>
            <View style={{ width: Dimensions.get('window').width * 0.95 }}>
              <Text style={styles.label}>Khung thời gian</Text>
              <View style={{ flexDirection: 'row', gap: 2 }}>
                <View>
                  <TextInput
                    style={styles.input}
                    placeholder="YYYY-MM-DD"
                    value={newJobData?.timeStart}
                    onChangeText={(text) =>
                      setNewJobData({ ...newJobData, timeStart: text })
                    }
                  />
                  {errors?.timeStart && (
                    <Text style={{ color: 'red' }}>{errors?.timeStart}</Text>
                  )}
                </View>

                <View>
                  <TextInput
                    style={styles.input}
                    placeholder="YYYY-MM-DD"
                    value={newJobData?.timeEnd}
                    onChangeText={(text) =>
                      setNewJobData({ ...newJobData, timeEnd: text })
                    }
                  />
                  {errors?.timeEnd && (
                    <Text style={{ color: 'red' }}>{errors?.timeEnd}</Text>
                  )}
                </View>
              </View>
            </View>
            <View>
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
                      value={newJobData.title}
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
                    />
                  </View>
                </View>

                {errors.title && (
                  <Text style={{ color: 'red' }}>{errors.title}</Text>
                )}
              </View>
              <Picker
                selectedValue={newJobData.priority}
                style={[
                  styles.select,
                  { borderWidth: 1, borderColor: 'gray', flex: 1 },
                ]}
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
              <TextInput
                style={[styles.input, styles.descriptionInput]}
                placeholder="Mô tả công việc"
                value={newJobData.description}
                onChangeText={(text) =>
                  setNewJobData({ ...newJobData, description: text })
                }
                multiline
              />
              <View style={styles.usersSelectionListWrapper}>
                <View>
                  <Text style={styles.label}>Phân công</Text>
                </View>
                <TouchableOpacity
                  onPress={() => setShowModal(true)}
                  style={styles.selectUserButton}
                >
                  <Text>Chọn thành viên</Text>
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
                        {allUser.map((item) => (
                          <TouchableOpacity
                            key={item?.id}
                            onPress={() => toggleUserSelection(item?.id)}
                            style={[
                              styles.usersItem,
                              {
                                backgroundColor: staffs.includes(item?.id)
                                  ? '#ccc'
                                  : 'transparent',
                              },
                            ]}
                          >
                            <View style={styles.avatarContainer}>
                              <Image
                                source={{ uri: item?.avatar }}
                                style={styles.avatar}
                              />
                            </View>
                            <View style={styles.nameContainer}>
                              <Text style={styles.fullName}>
                                {item?.fullName}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                      <TouchableOpacity
                        onPress={() => setShowModal(false)}
                        style={styles.closeButton}
                      >
                        <Text>Đóng</Text>
                      </TouchableOpacity>
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
                  <Text>Chọn thành viên</Text>
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
                        {allUser.map((item, key) => (
                          <TouchableOpacity
                            key={key}
                            onPress={() =>
                              setNewJobData({
                                userCreateJobId: item?.id,
                              })
                            }
                            style={[
                              styles.usersItem,
                              {
                                backgroundColor:
                                  item?.id === newJobData?.userCreateJobId
                                    ? '#ccc'
                                    : 'transparent',
                              },
                            ]}
                          >
                            <View style={styles.avatarContainer}>
                              <Image
                                source={{ uri: item?.avatar }}
                                style={styles.avatar}
                              />
                            </View>
                            <View style={styles.nameContainer}>
                              <Text style={styles.fullName}>
                                {item?.fullName}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                      <TouchableOpacity
                        onPress={() => setShowModal2(false)}
                        style={styles.closeButton}
                      >
                        <Text>Đóng</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>
              </View>
              <View style={styles.usersSelectionListWrapper}>
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
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: 3,
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
      )}
      {hiddenDetail && <DetailJob setHiddenDetail={setHiddenDetail} />}
      <View style={styles.containerPagination}>
        <TouchableOpacity
          onPress={handlePrevPage}
          style={styles.buttonPagination}
        >
          <Text style={styles.buttonTextPagination}>Previous</Text>
        </TouchableOpacity>
        <Text style={styles.pageTextPagination}>
          Page {paginationJob?.number + 1} of {paginationJob?.totalPages}
        </Text>
        <TouchableOpacity
          onPress={handleNextPage}
          style={styles.buttonPagination}
        >
          <Text style={styles.buttonTextPagination}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 20,
    paddingTop: 20,
  },
  tabButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  tabText: {
    fontSize: 16,
  },
  taskContainer: {
    paddingHorizontal: 20,
  },
  content: {
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'blue',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
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
  modalItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  addFormContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  createButton: {
    width: '45%',
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButton: {
    width: '45%',
    backgroundColor: 'gray',
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
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  selectUserButton: {
    backgroundColor: '#ccc',
    paddingHorizontal: 5,
    paddingVertical: 10,
    marginVertical: 5,
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
  },
  searchInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  job: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
  },
  jobTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  jobDate: {
    color: '#888',
    fontSize: 12,
  },
  jobContainer: {
    width: '100%',
  },
  containerPagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 0,
    marginTop: -50,
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

export default ManagerJobs
