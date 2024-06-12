import { useEffect, useLayoutEffect, useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Modal,
  FlatList,
} from 'react-native'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux'
import {
  deletePlan,
  getAllPlan,
  getPlanById,
  updateStatus,
} from '../../../thunks/PlansThunk'
import moment from 'moment'
import Icon from 'react-native-vector-icons/FontAwesome6'
import UpdatePlanModal from '../../../models/plan/UpdatePlanModal'
import { useNavigation } from '@react-navigation/native'

export default function NotesApp() {
  const { allPlan, singlePlan } = useSelector((state) => state.plansReducer)
  const dispatch = useDispatch()
  useLayoutEffect(() => {
    if (allPlan?.length <= 0) {
      dispatch(getAllPlan())
    }
  }, [])

  const navigation = useNavigation()
  const [isModalVisible, setIsModalVisible] = useState(false)

  const [completedNotes, setCompletedNotes] = useState([])
  const [showAddBox, setShowAddBox] = useState(false)
  const [showUpdateBox, setShowUpdateBox] = useState(false)
  const [showPlannedNotes, setShowPlannedNotes] = useState(true)
  const { account } = useSelector((state) => state.authReducer)

  const getStatusColor = (status) => {
    switch (status) {
      case 'ACTIVE':
        return '#FEA837' // Màu vàng nhạt
      case 'DISABLE':
        return '#A4C3A2' // Màu xanh lá
      default:
        return '#fff'
    }
  }

  const [currentTab, setCurrentTab] = useState({})

  const tabs = [
    { id: 'allTasks', label: 'Tất cả kế hoach' },
    { id: 'planning', label: 'Chưa hoàn thành' },
    { id: 'completed', label: 'Đã hoàn thành' },
  ]


  const handleGetPlanById = (item) => {
    dispatch(getPlanById(item.id)).then((reps) => {
      if (!reps.error) {
        navigation.navigate('Chi-tiet-ke-hoach')
      }
    })
  }
  const handleGetPlanByIdUpdate = (item) => {
    dispatch(getPlanById(item.id)).then((data) => {
      setDetailPlan(false)
      setShowUpdateBox(!showUpdateBox)
    })
  }
  
  const [filteredJobs, setFilteredJobs] = useState([])

  const handleTabChange = (tab) => {
    setCurrentTab(tab)
    setIsModalVisible(false)
    setFilteredJobs([])
  }
  useEffect(() => {
    let filtered = [];

    if (currentTab.id === 'allTasks' && account.role.roleName === 'ROLE_ADMIN') {
      filtered = allPlan;
    } else if (currentTab.id === 'planning' && account.role.roleName !== 'ROLE_ADMIN') {
      filtered = allPlan.filter(plan => {
        if (plan.status === 'ACTIVE' && (account.user.id === plan.creator.id ||
          plan.planJobs.some(job =>
            job.userJobs.some(userJob => userJob.user.id === account.user.id)
          ))) {
          return true;
        }
        return false;
      });
    } else if (currentTab.id === 'completed') {
      filtered = allPlan.filter(plan => {
        if (plan.status === 'DISABLE' && (account.user.id === plan.creator.id ||
          plan.planJobs.some(job =>
            job.userJobs.some(userJob => userJob.user.id === account.user.id)
          ))) {
          return true;
        }
        return false;
      });
    } else {
      filtered = allPlan.filter(plan => {
        if (account.user.id === plan.creator.id) {
          return true;
        }
        return plan.planJobs.some(job =>
          job.userJobs.some(userJob => userJob.user.id === account.user.id)
        );
      });
    }

    setFilteredJobs(filtered);
  }, [currentTab, allPlan, account]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
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
        {/* <TouchableOpacity
          style={[
            styles.headerButton,
            showPlannedNotes ? styles.activeHeaderButton : null,
          ]}
          onPress={() => setShowPlannedNotes(true)}
        >
          <Text style={styles.headerButtonText}>Chưa hoàn thành</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.headerButton,
            !showPlannedNotes ? styles.activeHeaderButton : null,
          ]}
          onPress={() => setShowPlannedNotes(false)}
        >
          <Text style={styles.headerButtonText}>Đã hoàn thành</Text>
        </TouchableOpacity> */}
      </View>

      <ScrollView style={styles.notesContainer}>
        {showPlannedNotes
          ? filteredJobs?.map((note, index) => (
              <View
                key={index}
                style={[styles.note]}
              >
                <View style={{ paddingVertical: 10 }}>
                  <View
                    style={[
                      styles.noteTitle,
                      {
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      },
                    ]}
                  >
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 16,
                      }}
                    >
                      {note.title}
                    </Text>
                    <View
                      style={{
                        borderColor: getStatusColor(note.status),
                        borderWidth: 1,

                        padding: 3,
                        marginRight: 2,
                        borderRadius: 5,
                      }}
                    >
                      <Text
                        style={{
                          color: getStatusColor(note.status),
                          fontSize: 10,
                        }}
                      >
                        {note?.planDetail?.planType === 'ONCE'
                          ? '1 LẦN'
                          : note?.planDetail?.planType === 'LOOP'
                          ? 'ĐỊNH KỲ'
                          : ''}
                      </Text>
                    </View>
                  </View>
                  <Text>{note.planDetail.description}</Text>
                  <Text style={styles.noteDate}>
                    Ngày tạo:
                    {moment(note?.createdAt).format('DD-MM-YYYY')}
                  </Text>
                </View>

                <View style={styles.optionsBox}>
                  {(account.role.roleName === 'ROLE_ADMIN' ||
                    account.role.roleName === 'ROLE_MANAGER') &&
                    (note?.status === 'ACTIVE' ? (
                      <TouchableOpacity
                        style={{
                          backgroundColor: 'white',
                          borderWidth: 1,
                          borderColor: '#FEA837',
                          padding: 7,
                          marginLeft: 5,
                          borderRadius: 5,
                          elevation: 5,
                        }}
                        onPress={() => {
                          dispatch(
                            updateStatus({
                              id: note.id,
                              data: {
                                planStatus: 'DISABLE',
                                planJob: note.planJobs.map((job) => job.id),
                              },
                            }),
                          )
                        }}
                      >
                        <Text style={{ color: '#FEA837', fontSize: 12 }}>
                          Tạm dừng
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        style={{
                          backgroundColor: 'white',
                          borderWidth: 1,
                          borderColor: '#A4C3A2',
                          padding: 7,
                          marginLeft: 5,
                          borderRadius: 5,
                          elevation: 5,
                        }}
                        onPress={() => {
                          dispatch(
                            updateStatus({
                              id: note.id,
                              data: {
                                planStatus: 'ACTIVE',
                                planJob: note.planJobs.map((job) => job.id),
                              },
                            }),
                          )
                        }}
                      >
                        <Text style={{ color: '#A4C3A2', fontSize: 12 }}>
                          Chạy
                        </Text>
                      </TouchableOpacity>
                    ))}
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
                    onPress={() => handleGetPlanById(note)}
                  >
                    <Text style={{ color: '#58AD69', fontSize: 12 }}>Chi tiết</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      backgroundColor: 'white',
                      borderWidth: 1,
                      borderColor: 'red',
                      padding: 7,
                      marginLeft: 5,
                      borderRadius: 5,
                      elevation: 5,
                    }}
                    onPress={() => dispatch(deletePlan(note.id))}
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
                    onPress={() => handleGetPlanByIdUpdate(note)}
                  >
                    <Text style={{ color: '#3b82f6', fontSize: 12 }}>
                      Chỉnh sửa
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          : completedNotes.map((note, index) => (
              <TouchableOpacity key={index} style={styles.note}>
                <View>
                  <Text style={styles.noteTitle}>{note.title}</Text>
                  <Text>{note.content}</Text>
                  <Text style={styles.noteDate}>{note.createdAt}</Text>
                </View>
              </TouchableOpacity>
            ))}
      </ScrollView>
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

      <View style={[styles.addBoxContainer]}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('Them-ke-hoach')}
        >
          <MaterialIcons name="add" size={36} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.showAddBox}>
        {showUpdateBox && (
          <UpdatePlanModal setShowUpdateBox={setShowUpdateBox} />
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 3,
    justifyContent: 'flex-end',
  },
  headerButton: {
    padding: 10,
    borderRadius: 5,
  },
  activeHeaderButton: {
    backgroundColor: 'lightblue',
  },
  headerButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  tabButton: {
    paddingHorizontal: 20,
    // borderWidth: 1,
    // borderColor: '#ccc',
    borderRadius: 5,
    // borderBottomWidth: 1,
    backgroundColor: 'white',
    paddingVertical: 5,
    marginLeft: 2,
  },
  addBoxContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 1,
  },
  centered: {
    alignItems: 'center',
  },
  showAddBox: {
    position: 'absolute',
    zIndex: 1,
    alignItems: 'center',
    left: 0,
    right: 0,
    top: 10,
  },
  addBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    backgroundColor: 'white',
    width: 350,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  notesContainer: {
    flex: 1,
  },
  note: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
  },
  noteTitle: {
    marginBottom: 5,
    borderBottomWidth: 1,
    width: Dimensions.get('window').width * 0.85,
    borderColor: '#ccc',
    paddingBottom: 10,
  },
  noteDate: {
    color: '#888',
    fontSize: 12,
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
  option: {
    position: 'relative',
  },
  optionsBox: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    zIndex: 5,
    borderTopColor: '#ccc',
    borderTopWidth: 1,
    paddingTop: 5,
    marginTop: 3,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
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
})
