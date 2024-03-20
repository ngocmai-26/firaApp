import React, { useState } from 'react'
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
} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { Picker } from '@react-native-picker/picker'

const ManagerJobs = () => {
  const [currentTab, setCurrentTab] = useState('allTasks')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isAddFormVisible, setIsAddFormVisible] = useState(false)
  const [jobDetail, setJobDetail] = useState({
    timeStart: '',
    timeEnd: '',
    description: '',
    target: '',
    additionInfo: '',
  })
  const [job, setJob] = useState({
    title: '',
    priority: 0,
    staff: '',
  })
  const [selectedUsers, setSelectedUsers] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [jobs, setJobs] = useState([])

  const [errors, setErrors] = useState({})

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

  const toggleAddForm = () => {
    setIsAddFormVisible(!isAddFormVisible)
  }
  const isValidDateFormat = (dateString) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/
    return regex.test(dateString)
  }
  const handleCreateJob = () => {
    const validationErrors = {}
    if (!job.title) {
      validationErrors.title = 'Không được bỏ trống'
    }
    if (!jobDetail.timeStart) {
      validationErrors.timeStart = 'Không được bỏ trống'
    }
    if (!isValidDateFormat(jobDetail.timeStart)) {
      validationErrors.timeStart = 'Định dạng ("YYYY-MM-DD")!'
    }
    if (!jobDetail.timeEnd) {
      validationErrors.timeEnd = 'Không được bỏ trống'
    }
    if (!isValidDateFormat(jobDetail.timeEnd)) {
      validationErrors.timeEnd = 'Định dạng ("YYYY-MM-DD")!'
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    const newJob = {
      title: job.title,
      priority: job.priority,
      staff: selectedUsers,
      timeStart: jobDetail.timeStart,
      timeEnd: jobDetail.timeEnd,
      description: jobDetail.description,
      target: jobDetail.target,
      additionInfo: jobDetail.additionInfo,
    }

    setJobs([...jobs, newJob])

    toggleAddForm()
  }

  const fakeAllUser = [
    { status: 1, user: { id: 1, fullName: 'John Doe' } },
    { status: 1, user: { id: 2, fullName: 'Jane Smith' } },
    { status: 1, user: { id: 3, fullName: 'John Doe' } },
    { status: 1, user: { id: 4, fullName: 'Jane Smith' } },
    { status: 1, user: { id: 5, fullName: 'John Doe' } },
    { status: 1, user: { id: 6, fullName: 'Jane Smith' } },
  ]

  const toggleUserSelection = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId))
    } else {
      setSelectedUsers([...selectedUsers, userId])
    }
  }

  const filteredUsers = fakeAllUser.filter(
    (item) =>
      item.status === 1 &&
      item.user.fullName
        .toLowerCase()
        .includes(searchKeyword.trim().toLowerCase()),
  )

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
        <View style={styles.content}>
          <ScrollView style={styles.taskContainer}>
            {jobs.map((item, index) => (
              <TouchableOpacity style={[styles.job, styles.jobContainer]}>
                <View>
                  <Text style={styles.jobTitle}>{item.title}</Text>
                  <Text>{job.content}</Text>
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
                    {/* <Ionicons name="trash-bin" size={24} color="red" /> */}
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
                  onPress={() => handleTabChange(item.id)}
                >
                  <Text>{item.label}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>
      </Modal>

      {isAddFormVisible && (
        <View style={styles.addFormContainer}>
          <Text style={styles.addFormHeading}>Thêm công việc mới</Text>
          <ScrollView>
            <View>
              <Text style={styles.label}>Khung thời gian</Text>
              <View style={{ flexDirection: 'row', gap: 2 }}>
                <View>
                  <TextInput
                    style={styles.input}
                    placeholder="Khung thời gian bắt đầu"
                    value={jobDetail.timeStart}
                    onChangeText={(text) =>
                      setJobDetail({ ...jobDetail, timeStart: text })
                    }
                  />
                  {errors.timeStart && (
                    <Text style={{ color: 'red' }}>{errors.timeStart}</Text>
                  )}
                </View>

                <View>
                  <TextInput
                    style={styles.input}
                    placeholder="Khung thời gian kết thúc"
                    value={jobDetail.timeEnd}
                    onChangeText={(text) =>
                      setJobDetail({ ...jobDetail, timeEnd: text })
                    }
                  />
                  {errors.timeEnd && (
                    <Text style={{ color: 'red' }}>{errors.timeEnd}</Text>
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
                      value={job.title}
                      onChangeText={(text) => setJob({ ...job, title: text })}
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
                selectedValue={job.priority}
                style={[
                  styles.select,
                  { borderWidth: 1, borderColor: 'gray', flex: 1 },
                ]}
                onValueChange={(value) => setJob({ ...job, priority: value })}
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
                value={jobDetail.description}
                onChangeText={(text) =>
                  setJobDetail({ ...jobDetail, description: text })
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
                        {filteredUsers.map((item) => (
                          <TouchableOpacity
                            key={item.user.id}
                            onPress={() => toggleUserSelection(item.user.id)}
                            style={[
                              styles.usersItem,
                              {
                                backgroundColor: selectedUsers.includes(
                                  item.user.id,
                                )
                                  ? '#ccc'
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
              <TextInput
                style={styles.input}
                placeholder="Đường dẫn File"
                value={jobDetail.additionInfo}
                onChangeText={(text) =>
                  setJobDetail({ ...jobDetail, additionInfo: text })
                }
              />
            </View>

            <TouchableOpacity
              style={styles.createButton}
              onPress={handleCreateJob}
            >
              <Text style={styles.createButtonText}>Lưu công việc</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}
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
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    maxHeight: 200,
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
    backgroundColor: 'blue',
    padding: 15,
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
  },
  scrollContentContainer: {
    maxHeight: 150,
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
    marginBottom: 5,
  },
  jobDate: {
    color: '#888',
    fontSize: 12,
  },
  jobContainer: {
    width: '100%',
  },
})

export default ManagerJobs
