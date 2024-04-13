import { useLayoutEffect, useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Picker } from '@react-native-picker/picker'
import { useDispatch, useSelector } from 'react-redux'
import {
  deletePlan,
  getAllPlan,
  updateStatus,
} from '../../../thunks/PlansThunk'
import moment from 'moment'
import CreatePlanModal from '../../../models/plan/CreatePlan'
import DetailPlanModal from '../../../models/plan/DetailPlan'

export default function NotesApp() {
  const { allPlan, singlePlan } = useSelector((state) => state.plansReducer)
  const dispatch = useDispatch()
  useLayoutEffect(() => {
    if (allPlan?.length <= 0) {
      dispatch(getAllPlan())
    }
  }, [])

  const [plannedNotes, setPlannedNotes] = useState([])
  const [completedNotes, setCompletedNotes] = useState([])
  const [showAddBox, setShowAddBox] = useState(false)
  const [showPlannedNotes, setShowPlannedNotes] = useState(true)
  const [showOptions, setShowOptions] = useState({ index: null, show: false })
  const [detailPlan, setDetailPlan] = useState(false)

  const markAsCompleted = (index) => {
    const completedNote = plannedNotes[index]
    setCompletedNotes([...completedNotes, completedNote])
    deleteNoteFromPlanned(index)
    setShowOptions({ index: null, show: false })
  }

  const deleteNoteFromPlanned = (index) => {
    const newPlannedNotes = [...plannedNotes]
    newPlannedNotes.splice(index, 1)
    setPlannedNotes(newPlannedNotes)
    setShowOptions({ index: null, show: false })
  }

  const deleteNoteFromCompleted = (index) => {
    const newCompletedNotes = [...completedNotes]
    newCompletedNotes.splice(index, 1)
    setCompletedNotes(newCompletedNotes)
  }

  const handleMoreOptions = (index, isCompleted) => {
    if (!isCompleted) {
      setShowOptions({ index, show: true })
    } else {
      deleteNoteFromCompleted(index)
    }
  }

  const handleOutsidePress = () => {
    setShowOptions({ ...showOptions, show: false })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'ACTIVE':
        return '#FFEFD5' // Màu vàng nhạt
      case 'DISABLE':
        return '#90EE90' // Màu xanh lá
      case 3:
        return '#ADD8E6' // Màu xanh dương
      default:
        return '#fff'
    }
  }
  const handleGetPlanById = (item) => {
    setDetailPlan(!detailPlan)
    dispatch(getPlanById(item))
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
                  { backgroundColor: getStatusColor(note.status) },
                ]}
                onPress={() => handleGetPlanById(note)}
              >
                <View>
                  <Text style={styles.noteTitle}>{note.title}</Text>
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
                      <Ionicons name="pause" size={24} color="green" />
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
                      <Ionicons name="play" size={24} color="green" />
                    </TouchableOpacity>
                  )}

                  <TouchableOpacity
                    onPress={() => dispatch(deletePlan(note.id))}
                  >
                    <Ionicons name="trash-bin" size={24} color="red" />
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

      <View style={[styles.addBoxContainer, showAddBox && styles.centered]}>
        <TouchableOpacity
          onPress={() => setShowAddBox(true)}
          style={styles.addButton}
        >
          <Ionicons name="add-circle" size={64} color="blue" />
        </TouchableOpacity>
      </View>
      {/* Thêm kế hoạch */}
      <View style={styles.showAddBox}>
        {showAddBox && <CreatePlanModal setShowAddBox={setShowAddBox} />}
      </View>
      {detailPlan && <DetailPlanModal handleGetPlanById={handleGetPlanById} />}
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
    borderColor: 'grey',
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
    paddingVertical: 8,
    marginBottom: 10,
  },
  noteTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  noteDate: {
    color: '#888',
    fontSize: 12,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
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
