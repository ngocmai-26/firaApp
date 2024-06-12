import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux'
import { getAllJob, getJobById } from '../../../thunks/JobsThunk'
import { getAllUsers } from '../../../thunks/UserThunk'
import { getAllRole } from '../../../thunks/RolesThunk'
import DetailJob from './detail'
import Icon from 'react-native-vector-icons/FontAwesome6'
import moment from 'moment'
import { useNavigation } from '@react-navigation/native'
import EValueJobModal from '../../../models/jobs/EValateJobModal'
import ReportJobModel from '../../../models/jobs/ReportJobModal'

const ManagerJobs = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { allJob, paginationJob } = useSelector((state) => state.jobsReducer)
  const { account } = useSelector((state) => state.authReducer)
  const { allRole } = useSelector((state) => state.rolesReducer)

  const { allUser } = useSelector((state) => state.usersReducer)
  const navigation = useNavigation()

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

  const [hiddenDetail, setHiddenDetail] = useState(false)
  const [currentPage, setCurrentPage] = useState(paginationJob.number)
  const [currentTab, setCurrentTab] = useState({})

  const tabs = [
    { id: 'allTasks', label: 'Tất cả công việc' },
    { id: 'planning', label: 'Công việc đang thực hiện' },
    { id: 'report', label: 'Đánh giá công việc' },
    { id: 'completed', label: 'Đã hoàn thành' },
  ]

  const [filteredJobs, setFilteredJobs] = useState([])

  const handleTabChange = (tab) => {
    setCurrentTab(tab)
    setIsModalVisible(false)
    setFilteredJobs([])
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
    dispatch(getJobById(item)).then((reps) => {
      if (!reps.error) {
        navigation.navigate('chi-tiet-cong-viec')
      }
    })
  }

  const [hiddenEValue, isHiddenEValue] = useState(false)
  const [evaluateData, setEvaluateData] = useState({})
  const handleHiddenEValue = (item) => {
    isHiddenEValue(!hiddenEValue)
    setEvaluateData(item)
  }

  const [isHiddenReport, setIsHiddenReport] = useState(false)
  const [report, setReport] = useState({})

  const handleHiddenReport = (item) => {
    setReport(item)
    setIsHiddenReport(!isHiddenReport)
  }

  useEffect(() => {
    const addedJobIds = new Set()
    let filteredData = []
    const filteredList = []

    if (currentTab?.id === 'planning') {
      // Lọc công việc đang thực hiện
      filteredData = allJob
        .filter((item) =>
          item.userJobs.some((userJob) => {
            const condition =
              account?.role?.roleName === 'ROLE_ADMIN'
                ? userJob.status === 'PROCESSING'
                : userJob.user.id === account?.user?.id &&
                  userJob.status === 'PROCESSING'
            return condition 
          }),
        )
        .map((item) => {
          addedJobIds.add(item.id)
          const userJobs = item.userJobs.filter((userJob) => {
            return account?.role?.roleName === 'ROLE_ADMIN'
              ? userJob.status === 'PROCESSING'
              : userJob.user.id === account?.user?.id &&
                  userJob.status === 'PROCESSING' ||
                  userJob?.verifyLink === "reassess"
          })

          return { ...item, userJobs }
        })
    } else if (currentTab?.id === 'report') {
      // Lọc công việc cần đánh giá
      allJob.forEach((job) => {
        job.userJobs.forEach((userJob) => {
          if (
            account.role.roleName === 'ROLE_ADMIN' ||
            account.user.id === job.manager.id
          ) {
            const shouldRender =
              userJob.status === 'PROCESSING' &&
              userJob.cachedProgress !== 0 &&
              userJob.verifyLink === '' &&
              userJob.jobEvaluate === null
            if (shouldRender) {
              filteredData.push({
                ...job,
                userJobs: [userJob],
              })
            }
          }
        })
      })
    } else if (currentTab?.id === 'completed') {
      // Lọc công việc đã hoàn thành

      allJob.forEach((job) => {
        job.userJobs.forEach((userJob) => {
          if (
            account.role.roleName === 'ROLE_ADMIN' ||
            account.user.id === job.manager.id
          ) {
            const shouldRender = userJob.status === 'DONE'
            if (shouldRender) {
              filteredData.push({
                ...job,
                userJobs: [userJob],
              })
            }
          }
        })
      })
    } else {
      // Hiển thị tất cả công việc
      filteredData = allJob.filter((item) => {
        if (account?.role?.roleName === 'ROLE_ADMIN') {
          return true
        } else {
          return (
            item.userJobs.some(
              (userJob) => userJob.user.id === account?.user?.id,
            ) || item.manager.id === account?.user?.id
          )
        }
      })
    }
    setFilteredJobs(filteredData)
  }, [currentTab, allJob, account])

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => setIsModalVisible(true)}
        >
          <Icon
            name="filter"
            size={23}
            style={{
              color: '#bdc6cf',
              alignItems: 'center',
              marginVertical: 'auto',
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.taskContainer}>
        <View style={[styles.content, { height: '90%' }]}>
          <ScrollView style={[styles.taskContainer, { height: '100%' }]}>
            {filteredJobs?.map((item, index) => (
              <View key={index} style={[styles.job, styles.jobContainer]}>
                {item?.manager?.id === account?.user?.id && (
                  <View style={{ position: 'absolute', top: 0, right: 0 }}>
                    <Icon
                      name="crown"
                      size={23}
                      style={{
                        color: '#EEEE00',
                        alignItems: 'center',
                        marginVertical: 'auto',
                      }}
                    />
                  </View>
                )}

                <View style={{ width: Dimensions.get('window').width * 0.8 }}>
                  <Text
                    style={[styles.jobTitle, styles.lineJob]}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {item?.title}
                  </Text>
                  <Text
                    style={[styles.lineJob, { fontSize: 10 }]}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                  >
                    {item?.jobDetail?.description}
                  </Text>
                  <View
                    style={[styles.lineJob, { flexDirection: 'row', gap: 2 }]}
                  >
                    <Text
                      style={[
                        styles.lineJob,
                        { fontWeight: '500', fontSize: 15 },
                      ]}
                    >
                      Người phụ trách:
                    </Text>
                    <Text style={[styles.lineJob, { color: 'red' }]}>
                      {item?.manager?.fullName}
                    </Text>
                  </View>
                  <View style={{ gap: 2 }}>
                    <Text
                      style={[
                        styles.lineJob,
                        { fontWeight: '500', fontSize: 15 },
                      ]}
                    >
                      Người thực hiện:
                    </Text>
                    <Text
                      style={[
                        styles.lineJob,
                        { fontWeight: '400', fontSize: 15 },
                      ]}
                    >
                      {item?.userJobs?.length !== 0
                        ? item?.userJobs
                            .map((userJob) => userJob?.user?.fullName)
                            .join(', ')
                        : 'Chưa có người thực hiện'}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.lineJob,
                      {
                        gap: 4,
                        flexDirection: 'row',
                        borderTopWidth: 1,
                        borderColor: '#ccc',
                        paddingTop: 10,
                        marginTop: 10,
                      },
                    ]}
                  >
                    <Text style={{ fontSize: 12, color: '#888' }}>
                      Từ ngày:{' '}
                      {moment(item?.jobDetail?.timeStart).format('DD-MM-YYYY')}
                    </Text>
                    <Text style={{ fontSize: 12, color: '#888' }}>
                      Đến ngày:{' '}
                      {moment(item?.jobDetail?.timeEnd).format('DD-MM-YYYY')}
                    </Text>
                  </View>
                </View>
                <View style={styles.optionsBox}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: 'white',
                      borderWidth: 1,
                      borderColor: '#58AD69',
                      padding: 7,
                      marginLeft: 5,
                      borderRadius: 5,
                      elevation: 5,
                    }}
                    onPress={() => handleDetailJob(item?.id)}
                  >
                    <Text style={{ color: '#58AD69', fontSize: 12 }}>
                      Chi tiết
                    </Text>
                  </TouchableOpacity>
                  {currentTab?.id === 'planning' && (
                    <TouchableOpacity
                      style={{
                        backgroundColor: 'white',
                        borderWidth: 1,
                        borderColor: '#e97254',
                        padding: 7,
                        marginLeft: 5,
                        borderRadius: 5,
                        elevation: 5,
                      }}
                      onPress={() => handleHiddenReport(item)}
                    >
                      <Text style={{ color: '#e97254', fontSize: 12 }}>
                        Báo cáo
                      </Text>
                    </TouchableOpacity>
                  )}
                  {currentTab?.id === 'report' && (
                    <TouchableOpacity
                      style={{
                        backgroundColor: 'white',
                        padding: 7,
                        borderRadius: 5,
                        elevation: 5,
                        marginLeft: 5,
                        borderColor: '#17103a',
                        borderWidth: 1,
                      }}
                      onPress={() => handleHiddenEValue(item)}
                    >
                      <Text style={{ color: '#17103a', fontSize: 12 }}>
                        Đánh giá
                      </Text>
                    </TouchableOpacity>
                  )}
                  {currentTab?.id === 'completed' && (
                    <View
                      style={{
                        backgroundColor: '#17103a',
                        padding: 7,
                        borderRadius: 5,
                        elevation: 5,
                        marginLeft: 5,
                        borderColor: '#17103a',
                        borderWidth: 1,
                      }}
                    >
                      <Text style={{ color: 'white', fontSize: 12 }}>
                        Đã đánh giá
                      </Text>
                    </View>
                  )}
                  {currentTab?.id === 'allTasks' && (
                    <View style={{ flexDirection: 'row' }}>
                      <TouchableOpacity
                        style={{
                          borderColor: 'red',
                          padding: 5,
                          borderRadius: 5,
                          borderWidth: 1,
                          backgroundColor: 'white',
                          elevation: 5,
                        }}
                        onPress={() => handleDelete(singleJob?.id)}
                      >
                        <Text style={{ color: 'red', fontSize: 12 }}>Xóa</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          backgroundColor: 'white',
                          borderWidth: 1,
                          borderColor: '#3b82f6',
                          padding: 7,
                          marginLeft: 5,
                          borderRadius: 5,
                          elevation: 5,
                        }}
                      >
                        <Text style={{ color: '#3b82f6', fontSize: 12 }}>
                          Chỉnh sửa
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('them-cong-viec')}
      >
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
                  onPress={() => handleTabChange(item)}
                >
                  <Text>{item.label}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item?.id}
            />
          </View>
        </View>
      </Modal>

      {hiddenEValue && (
        <EValueJobModal
          handleHiddenEValue={handleHiddenEValue}
          evaluateData={evaluateData}
        />
      )}

      {isHiddenReport && (
        <ReportJobModel
          handleHiddenReport={handleHiddenReport}
          report={report}
        />
      )}

      {hiddenDetail && <DetailJob handleDetailJob={handleDetailJob} />}
      {/* <DetailJob setHiddenDetail={setHiddenDetail} /> */}

      {paginationJob?.totalPages > 1 && (
        <View style={styles.containerPagination}>
          <TouchableOpacity
            onPress={handlePrevPage}
            style={styles.buttonPagination}
          >
            <Text style={styles.buttonTextPagination}>&#60;</Text>
          </TouchableOpacity>
          <Text style={styles.pageTextPagination}>
            Page {paginationJob?.number + 1} of {paginationJob?.totalPages}
          </Text>
          <TouchableOpacity
            onPress={handleNextPage}
            style={styles.buttonPagination}
          >
            <Text style={styles.buttonTextPagination}>&#62;</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 20,
    paddingTop: 20,
    marginVertical: 5,
  },
  tabButton: {
    paddingHorizontal: 20,
    // borderWidth: 1,
    // borderColor: '#ccc',
    borderRadius: 5,
    // borderBottomWidth: 1,
    marginBottom: 10,
    backgroundColor: 'white',
    paddingVertical: 5,
    marginLeft: 2,
  },
  tabText: {
    fontSize: 16,
  },
  taskContainer: {
    paddingHorizontal: 10,
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
    backgroundColor: '#2089dc',
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
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
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
  optionsBox: {
    flexDirection: 'row',
    gap: 5,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    marginTop: 10,
    paddingTop: 5,
    justifyContent: 'flex-end',
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
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 15,

    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    elevation: 5,
  },
  jobTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 10,
    marginBottom: 10,
  },
  jobDate: {
    color: '#888',
    fontSize: 12,
  },
  jobContainer: {
    width: '100%',
    position: 'relative',
  },
  containerPagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 0,
    marginTop: -50,
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
  lineJob: {
    marginVertical: 2,
  },
})

export default ManagerJobs
