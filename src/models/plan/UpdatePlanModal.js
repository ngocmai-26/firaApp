import { Picker } from '@react-native-picker/picker'
import { useLayoutEffect, useState } from 'react'
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
import { addNewPlan, updatePlan } from '../../thunks/PlansThunk'
import moment from 'moment'
import DateTimePicker from '@react-native-community/datetimepicker'
import Icon from 'react-native-vector-icons/FontAwesome6'

function UpdatePlanModal({setShowUpdateBox}) {
    const { allJob } = useSelector((state) => state.jobsReducer)
    const {  singlePlan } = useSelector((state) => state.plansReducer)
  const dispatch = useDispatch()
  const [timeEnd, setTimeEnd] = useState(new Date())
  const [timeStart, setTimeStart] = useState(new Date())
  const [mode, setMode] = useState('date')
  const [modeStart, setModeStart] = useState('date')
  const [show, setShow] = useState(false)
  const [showStart, setShowStart] = useState(false)

  useLayoutEffect(() => {
    if (allJob?.length <= 0) {
      dispatch(getAllJob())
    }
  }, [])


  const [dataPlan, setDataPlan] = useState({
    title: singlePlan?.title,
    planStatus: singlePlan?.status,
    planJob: singlePlan?.planJobs?.map((job) => job.id),
    planDetailRequest: {
      description: singlePlan?.planDetail?.description,
      planType: singlePlan?.planDetail?.planType,
      note: singlePlan?.planDetail?.note,
      timeStart: singlePlan?.planDetail?.timeStart,
      timeEnd: singlePlan?.planDetail?.timeEnd,
      planSchedules: [],
    },
  })

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
  }

  const onChangeTimeStart = (event, selectedDate) => {
    const currentDate = selectedDate
    setShowStart(false)
    setTimeStart(currentDate)
    setDataPlan({
        ...dataPlan,
        planDetailRequest: {
          ...dataPlan.planDetailRequest,
          timeStart:moment(currentDate).format('YYYY-MM-DD'),
        },
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
  const handleButtonClick = (jobId) => {
    let newPlanJob;
    if (Array.isArray(dataPlan?.planJob)) {
      if (dataPlan?.planJob?.includes(jobId)) {
        // If the job exists in planJob, remove it
        newPlanJob = dataPlan?.planJob?.filter((id) => id !== jobId);
      } else {
        // If the job doesn't exist in planJob, add it
        newPlanJob = [...dataPlan?.planJob, jobId];
      }
    } else {
      // If planJob is not an array, initialize it as an array containing jobId
      newPlanJob = [jobId];
    }
    setDataPlan({
      ...dataPlan,
      planJob: newPlanJob,
    });
  };

  const handleUpdate =() => {
    dispatch(updatePlan({id: singlePlan.id, data: dataPlan})).then((reps) => {
        if (!reps.error) {
            setShowUpdateBox(false)
        }
      });
  }
    return ( 
        <View style={styles.addBox}>
        <TextInput
          style={[styles.input]}
          placeholder="Tiêu đề kế hoạch"
          defaultValue={dataPlan?.title ? dataPlan?.title : ''}
        //   onChangeText={(e) => setDataPlan({ ...dataPlan, title: e })}
        />
        <TextInput
          style={[styles.input]}
          placeholder="Mô tả"
          value={
            dataPlan?.planDetailRequest?.description
              ? dataPlan?.planDetailRequest?.description
              : ''
          }
        //   onChangeText={(e) =>
        //     setDataPlan({
        //       ...dataPlan,
        //       planDetailRequest: {
        //         ...dataPlan.planDetailRequest,
        //         description: e,
        //       },
        //     })
        //   }
        />
        <Picker
          selectedValue={
            dataPlan.planDetailRequest.planType
              ? dataPlan.planDetailRequest.planType
              : ''
          }
          style={[styles.picker]}
        //   onValueChange={(e) =>
        //     setDataPlan({
        //       ...dataPlan,
        //       planDetailRequest: {
        //         ...dataPlan.planDetailRequest,
        //         planType: e,
        //       },
        //     })
        //   }
        >
          <Picker.Item label="Loại kế hoạch" value={null} />
          <Picker.Item label="Định kì" value={'LOOP'} />
          <Picker.Item label="1 Lần" value={'ONCE'} />
        </Picker>
        <View style={{flexDirection: 'row', gap: 2}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      borderWidth: 1,
                      borderColor: '#CCCCCC',
                      borderRadius: 5,
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <TextInput
                      style={{
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                      }}
                      placeholder="DD-MM-YYYY"
                      defaultValue={moment(dataPlan?.planDetailRequest?.timeStart).format('DD-MM-YYYY')}
                     
                    />
                    <TouchableOpacity onPress={showDatepickerStart} style={{flexDirection: 'row', paddingHorizontal: 5}}>
                      <Icon
                        name="calendar-days"
                        size={20}
                        style={{ color: 'black', alignItems: 'center', marginVertical: 'auto' }}
                      />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      borderWidth: 1,
                      borderColor: '#CCCCCC',
                      borderRadius: 5,
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <TextInput
                      style={{
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                      }}
                      placeholder="DD-MM-YYYY"
                      defaultValue={moment(dataPlan?.planDetailRequest?.timeEnd).format('DD-MM-YYYY')}
                      
                    />
                    <TouchableOpacity onPress={showDatepicker} style={{flexDirection: 'row', paddingHorizontal: 5}}>
                      <Icon
                        name="calendar-days"
                        size={20}
                        style={{ color: 'black', alignItems: 'center', marginVertical: 'auto' }}
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
            {allJob?.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => handleButtonClick(item.id)}
                style={{
                  flexDirection: 'row',
                  paddingVertical: 8,
                  paddingHorizontal: 16,
                  width: '100%',
                  alignItems: 'center',
                  backgroundColor: dataPlan?.planJob?.includes(item.id)
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
            onPress={() => setShowUpdateBox(false)}
            style={[styles.button, { backgroundColor: 'gray' }]}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleUpdate}
            style={[styles.button, { backgroundColor: 'blue' }]}
          >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
     );
}

export default UpdatePlanModal;


const styles = StyleSheet.create({
    addBox: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      backgroundColor: 'white',
      width: "100%",
      height: Dimensions.get('window').height
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
  