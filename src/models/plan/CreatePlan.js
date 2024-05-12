import { Picker } from '@react-native-picker/picker'
import { useEffect, useLayoutEffect, useState } from 'react'
import {
  Dimensions,
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
import moment from 'moment'
import DateTimePicker from '@react-native-community/datetimepicker'
import Icon from 'react-native-vector-icons/FontAwesome6'

function CreatePlanModal({ setShowAddBox }) {
  const { allJob } = useSelector((state) => state.jobsReducer)
  const dispatch = useDispatch()
  useLayoutEffect(() => {
    if (allJob?.length <= 0) {
      dispatch(getAllJob())
    }
  }, [])

  const [dataPlan, setDataPlan] = useState({
    title: '',
    planJob: [],
    planDetailRequest: {
      description: '',
      planType: 'ONCE',
      note: '',
      timeStart: '',
      timeEnd: '',
      planSchedules: [],
      scheduleType: 'DAY',
    },
  })

  const handleJobIdClick = (item) => {
    const index = dataPlan.planJob.findIndex((jobId) => jobId === item.id)
    if (index !== -1) {
      // Nếu mục đã tồn tại trong mảng planJob, loại bỏ nó
      const newPlanJob = [...dataPlan.planJob]
      newPlanJob.splice(index, 1)
      setDataPlan({
        ...dataPlan,
        planJob: newPlanJob,
      })
    } else {
      // Nếu mục chưa tồn tại trong mảng planJob, thêm id của nó vào
      setDataPlan({
        ...dataPlan,
        planJob: [...dataPlan.planJob, item.id],
      })
    }
  }

  const [timeEnd, setTimeEnd] = useState(new Date())
  const [timeStart, setTimeStart] = useState(new Date())
  const [mode, setMode] = useState('date')
  const [modeStart, setModeStart] = useState('date')
  const [show, setShow] = useState(false)
  const [showStart, setShowStart] = useState(false)

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate
    setShow(false)
    setTimeEnd(currentDate)
    setDataPlan({
      ...dataPlan,
      planDetailRequest: {
        ...dataPlan.planDetailRequest,
        timeEnd: moment(currentDate).format('YYYY-MM-DD'),
      },
    })
    // setNewJobData({ ...newJobData, timeEnd: moment(currentDate).format('YYYY-MM-DD') })
  }

  const onChangeTimeStart = (event, selectedDate) => {
    const currentDate = selectedDate
    setShowStart(false)
    setTimeStart(currentDate)
    setDataPlan({
      ...dataPlan,
      planDetailRequest: {
        ...dataPlan.planDetailRequest,
        timeStart: moment(currentDate).format('YYYY-MM-DD'),
      },
    })
    // setNewJobData({ ...newJobData, timeStart: moment(currentDate).format('YYYY-MM-DD') })
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

  //////
  const [selectedDates, setSelectedDates] = useState([])
  const [selectedMonths, setSelectedMonths] = useState([])
  const [scheduleType, setScheduleType] = useState('')

  const handleOptionChange = (e) => {
    setDataPlan({
      ...dataPlan,
      planDetailRequest: {
        ...dataPlan.planDetailRequest,
        scheduleType: e,
      },
    })
    setSelectedDates([]) // Reset selected dates when changing options
    setSelectedMonths([]) // Reset selected months when changing options
  }

  const handleDateClick = (value) => {
    if (dataPlan?.planDetailRequest?.scheduleType === 'DAY') {
      value = parseInt(value) // Chuyển đổi từ chuỗi sang số nguyên
      if (isSelectedDate(value)) {
        setSelectedDates(selectedDates.filter((day) => day !== value))
      } else {
        setSelectedDates([...selectedDates, value])
      }
    } else if (dataPlan?.planDetailRequest?.scheduleType === 'MONTH') {
      value = parseInt(value) // Chuyển đổi từ chuỗi sang số nguyên
      if (isSelectedMonth(value)) {
        setSelectedMonths(selectedMonths.filter((month) => month !== value))
      } else {
        setSelectedMonths([...selectedMonths, value])
      }
    }
  }

  const isSelectedDate = (day) => {
    return selectedDates.includes(day)
  }

  const isSelectedMonth = (month) => {
    return selectedMonths.includes(month)
  }

  const renderOptions = () => {
    switch (dataPlan?.planDetailRequest?.scheduleType) {
      case 'DAY':
        return Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
          <TouchableOpacity
            key={day}
            style={[styles.calendarDay, isSelectedDate(day) && styles.selected]}
            onPress={() => handleDateClick(day)}
          >
            <Text style={styles.text}>{day}</Text>
          </TouchableOpacity>
        ))
      case 'MONTH':
        return Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
          <TouchableOpacity
            key={month}
            style={[
              styles.calendarMonth,
              isSelectedMonth(month) && styles.selected,
            ]}
            onPress={() => handleDateClick(month)}
          >
            <Text style={styles.text}>{month}</Text>
          </TouchableOpacity>
        ))
      case 'YEAR':
        return <Text>Chọn năm</Text>
      default:
        return null
    }
  }

  useEffect(() => {
    if (dataPlan?.planDetailRequest?.scheduleType === 'DAY') {
      setDataPlan({
        ...dataPlan,
        planDetailRequest: {
          ...dataPlan.planDetailRequest,
          planSchedules: selectedDates,
        },
      })
    } else if (dataPlan?.planDetailRequest?.scheduleType === 'MONTH') {
      setDataPlan({
        ...dataPlan,
        planDetailRequest: {
          ...dataPlan.planDetailRequest,
          planSchedules: selectedMonths,
        },
      })
    }
  }, [selectedDates, selectedMonths])

  const addNote = () => {
    dispatch(addNewPlan(dataPlan)).then((reps) => {
      setShowAddBox(false)
    })
  }

  return (
    <View
      style={{
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: 'white',
        width: '100%',
        height: Dimensions.get('window').height,
      }}
    >
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
            borderColor: '#ccc',
            marginBottom: 15,
            paddingBottom: 15,
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
                paddingVertical: 5,
                flex: 2,
              }}
            >
              <TextInput
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}
                placeholder="YYYY-MM-DD"
                defaultValue={moment(timeStart).format('YYYY-MM-DD')}
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
                paddingVertical: 5,
                flex: 2,
              }}
            >
              <TextInput
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}
                placeholder="YYYY-MM-DD"
                defaultValue={moment(timeEnd).format('YYYY-MM-DD')}
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
        <View
          style={{
            borderBottomWidth: 1,
            marginBottom: 15,
            paddingBottom: 15,
            borderColor: '#ccc',
          }}
        >
          <Text style={styles.label}>Chi tiết kế hoạch</Text>
          <View>
            <TextInput
              style={[styles.input]}
              placeholder="Tiêu đề kế hoạch"
              defaultValue={dataPlan?.title ? dataPlan?.title : ''}
              onChangeText={(e) => setDataPlan({ ...dataPlan, title: e })}
            />
          </View>
          <View>
            <TextInput
              style={[styles.input]}
              placeholder="Mô tả"
              value={
                dataPlan?.planDetailRequest?.description
                  ? dataPlan?.planDetailRequest?.description
                  : ''
              }
              onChangeText={(e) =>
                setDataPlan({
                  ...dataPlan,
                  planDetailRequest: {
                    ...dataPlan.planDetailRequest,
                    description: e,
                  },
                })
              }
            />
          </View>
          <View
            style={{
              borderWidth: 1,
              borderRadius: 10,
              borderColor: '#CCCCCC',
            }}
          >
            <Picker
              selectedValue={
                dataPlan.planDetailRequest.planType
                  ? dataPlan.planDetailRequest.planType
                  : ''
              }
              style={[styles.picker]}
              onValueChange={(e) =>
                setDataPlan({
                  ...dataPlan,
                  planDetailRequest: {
                    ...dataPlan.planDetailRequest,
                    planType: e,
                  },
                })
              }
            >
              <Picker.Item label="Loại kế hoạch" value={null} />
              <Picker.Item label="Định kì" value={'LOOP'} />
              <Picker.Item label="1 Lần" value={'ONCE'} />
            </Picker>
          </View>
          <View>
            {dataPlan?.planDetailRequest?.planType === 'LOOP' && (
              <View style={styles.informationPlan}>
                <View style={styles.scheduleType}>
                  <View style={styles.optionSelector}>
                    <View
                      style={{
                        borderWidth: 1,
                        marginVertical: 10,
                        borderRadius: 10,
                        borderColor: '#CCCCCC',
                      }}
                    >
                      <Picker
                        selectedValue={
                          dataPlan?.planDetailRequest?.scheduleType
                        }
                        onValueChange={handleOptionChange}
                      >
                        <Picker.Item label="Chọn loại lịch trình" value="" />
                        <Picker.Item label="Ngày" value="DAY" />
                        <Picker.Item label="Tháng" value="MONTH" />
                        {/* <Picker.Item label="Năm" value="YEAR" /> */}
                      </Picker>
                    </View>
                  </View>
                </View>
                <View style={styles.calendarGrid}>{renderOptions()}</View>
              </View>
            )}
          </View>
        </View>

        <View style={{ marginVertical: 2, borderBottomWidth: 1,
            borderColor: '#ccc',
            marginBottom: 15,
            paddingBottom: 15, }}>
          <Text style={styles.label}>Công việc liên quan</Text>
          <View
            style={{
              height: 200,
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 10,
              paddingVertical: 10,
            }}
          >
            <ScrollView
              style={{}}
              contentContainerStyle={{ paddingBottom: 20 }}
              showsVerticalScrollIndicator={false}
            >
              {allJob?.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => handleJobIdClick(item)}
                  style={{
                    flexDirection: 'row',
                    paddingVertical: 13,
                    paddingHorizontal: 16,
                    width: '100%',
                    alignItems: 'center',
                    backgroundColor: dataPlan.planJob.includes(item.id)
                      ? '#e8f0fe'
                      : 'transparent',
                  }}
                >
                  <View style={{ width: '75%' }}>
                    <Text style={{ fontSize: 16 }}>{item.title}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => setShowAddBox(false)}
            style={[styles.button, { backgroundColor: '#bebebe' }]}
          >
            <Text style={styles.buttonText}>Hủy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={addNote}
            style={[styles.button, { backgroundColor: '#2089dc' }]}
          >
            <Text style={styles.buttonText}>Lưu</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    borderRadius: 10,
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
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 3,
    marginBottom: 20,
    paddingBottom: 20,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  informationPlan: {
    marginTop: 2,
  },
  scheduleType: {
    flexDirection: 'row',
  },
  optionSelector: {
    flex: 1,
  },

  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  calendarDay: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    margin: 5,
    borderRadius: 10,
  },
  calendarMonth: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    margin: 5,
    borderRadius: 10,
  },
  selected: {
    backgroundColor: '#e8f0fe',
  },
  text: {
    fontSize: 16,
  },
  label: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    color: '#2089dc',
  },
})
