import { Picker } from '@react-native-picker/picker'
import { useLayoutEffect, useState } from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getAllJob } from '../../thunks/JobsThunk'
import { addNewPlan } from '../../thunks/PlansThunk'

function CreatePlanModal({ setShowAddBox }) {
  const { allJob } = useSelector((state) => state.jobsReducer)
  const dispatch = useDispatch()
  useLayoutEffect(() => {
    if (allJob?.length <= 0) {
      dispatch(getAllJob())
    }
  }, [])

  const [dataJob, setDataJob] = useState({
    title: '',
    planStatus: 'ACTIVE',
    planJob: [],
    planDetailRequest: {
      description: '',
      planType: '',
      note: '',
      timeStart: '',
      timeEnd: '',
      planSchedules: [],
    },
  })

  const handleJobIdClick = (item) => {
    const index = dataJob.planJob.findIndex((jobId) => jobId === item.id)
    if (index !== -1) {
      // Nếu mục đã tồn tại trong mảng planJob, loại bỏ nó
      const newPlanJob = [...dataJob.planJob]
      newPlanJob.splice(index, 1)
      setDataJob({
        ...dataJob,
        planJob: newPlanJob,
      })
    } else {
      // Nếu mục chưa tồn tại trong mảng planJob, thêm id của nó vào
      setDataJob({
        ...dataJob,
        planJob: [...dataJob.planJob, item.id],
      })
    }
  }

  const [pickerValue, setPickerValue] = useState(null) // Lưu giá trị của Picker
  const [newNoteTitle, setNewNoteTitle] = useState('')
  const [newNoteContent, setNewNoteContent] = useState('')
  const addNote = () => {
    dispatch(addNewPlan(dataJob)).then((reps) => {
      setShowAddBox(false)
    })
    console.log('dataJob', dataJob)
  }
  return (
    <View style={styles.addBox}>
      <TextInput
        style={[styles.input]}
        placeholder="Tiêu đề kế hoạch"
        defaultValue={dataJob?.title ? dataJob?.title : ''}
        onChangeText={(e) => setDataJob({ ...dataJob, title: e })}
      />
      <TextInput
        style={[styles.input]}
        placeholder="Mô tả"
        value={
          dataJob?.planDetailRequest?.description
            ? dataJob?.planDetailRequest?.description
            : ''
        }
        onChangeText={(e) =>
          setDataJob({
            ...dataJob,
            planDetailRequest: {
              ...dataJob.planDetailRequest,
              description: e,
            },
          })
        }
      />
      <Picker
        selectedValue={
          dataJob.planDetailRequest.planType
            ? dataJob.planDetailRequest.planType
            : ''
        }
        style={[styles.picker]}
        onValueChange={(e) =>
          setDataJob({
            ...dataJob,
            planDetailRequest: {
              ...dataJob.planDetailRequest,
              planType: e,
            },
          })
        }
      >
        <Picker.Item label="Loại kế hoạch" value={null} />
        <Picker.Item label="Định kì" value={'LOOP'} />
        <Picker.Item label="1 Lần" value={'ONCE'} />
      </Picker>
      <View>
        <TextInput
          style={[styles.input]}
          placeholder="Ngày bắt đầu: YYYY-MM-DD"
          value={
            dataJob.planDetailRequest.timeStart
              ? dataJob.planDetailRequest.timeStart
              : ''
          }
          onChangeText={(e) =>
            setDataJob({
              ...dataJob,
              planDetailRequest: {
                ...dataJob.planDetailRequest,
                timeStart: e,
              },
            })
          }
        />
        <TextInput
          style={[styles.input]}
          placeholder="Ngày kết thúc: YYYY-MM-DD"
          value={
            dataJob.planDetailRequest.timeEnd
              ? dataJob.planDetailRequest.timeEnd
              : ''
          }
          onChangeText={(e) =>
            setDataJob({
              ...dataJob,
              planDetailRequest: {
                ...dataJob.planDetailRequest,
                timeEnd: e,
              },
            })
          }
        />
      </View>
      <View style={{ marginTop: 2 }}>
        <Text
          style={{
            marginBottom: 2,
            fontSize: 12,
            fontWeight: 'bold',
            color: '#000',
          }}
        >
          Công việc
        </Text>
        <ScrollView
          style={{ height: 120 }}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        >
          {allJob.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => handleJobIdClick(item)}
              style={{
                flexDirection: 'row',
                paddingVertical: 8,
                paddingHorizontal: 16,
                width: '100%',
                alignItems: 'center',
                backgroundColor: dataJob.planJob.includes(item.id)
                  ? '#ccc'
                  : 'transparent',
              }}
            >
              <View style={{ width: '75%' }}>
                <Text style={{ fontSize: 14 }}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => setShowAddBox(false)}
          style={[styles.button, { backgroundColor: 'gray' }]}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={addNote}
          style={[styles.button, { backgroundColor: 'blue' }]}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default CreatePlanModal

const styles = StyleSheet.create({
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
