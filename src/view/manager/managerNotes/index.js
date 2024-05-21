import { useLayoutEffect, useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
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

  const [completedNotes, setCompletedNotes] = useState([])
  const [showAddBox, setShowAddBox] = useState(false)
  const [showUpdateBox, setShowUpdateBox] = useState(false)
  const [showPlannedNotes, setShowPlannedNotes] = useState(true)

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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
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
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.notesContainer}>
        {showPlannedNotes
          ? allPlan.map((note, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.note,
                 
                ]}
                onPress={() => handleGetPlanById(note)}
              >
                <View style={{paddingVertical: 10,}}>
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
                      <Text style={{ color: getStatusColor(note.status), fontSize: 10 }}>
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
                  {note.status === 'ACTIVE' ? (
                    <TouchableOpacity
                      onPress={() => {
                        dispatch(
                          updateStatus({
                            id: note.id,
                            data: { planStatus: 'DISABLE' },
                          }),
                        )
                      }}
                    >
                      <Ionicons name="pause" size={20} color="green" />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        dispatch(
                          updateStatus({
                            id: note.id,
                            data: { planStatus: 'ACTIVE' },
                          }),
                        )
                      }}
                    >
                      <Ionicons name="play" size={20} color="green" />
                    </TouchableOpacity>
                  )}

                  <TouchableOpacity
                    onPress={() => dispatch(deletePlan(note.id))}
                    style={{ paddingHorizontal: 2 }}
                  >
                    <Ionicons name="trash-bin" size={20} color="red" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleGetPlanByIdUpdate(note)}
                    style={{ paddingLeft: 2 }}
                  >
                    <Icon name="pen-to-square" size={18} color="blue" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
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

      <View style={[styles.addBoxContainer]}>
     
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('Them-ke-hoach')}>
        <MaterialIcons name="add" size={36} color="#fff" />
      </TouchableOpacity>
      </View>
      {/* Thêm kế hoạch */}

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
    backgroundColor: '#fff',
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 3,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    flexDirection: 'row',
    position: 'absolute',
    bottom: 5,
    right: 10,
    zIndex: 5,
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
})
