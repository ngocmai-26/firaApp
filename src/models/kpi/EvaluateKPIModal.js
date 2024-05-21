import { useState } from 'react'
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import KPIMoreModal from './KPIMoreModal'
import { GetKPIHistory } from '../../thunks/KPIsThunk'
import moment from 'moment'
import Icon from 'react-native-vector-icons/FontAwesome6'
import DateTimePicker from '@react-native-community/datetimepicker'

function EvaluateKPIModal({ setIsModalVisible }) {
  const { account } = useSelector((state) => state.authReducer)
  const [sumPoint, setSumPoint] = useState(
    account.user.checkInPoint + account?.user?.jobPoint,
  )

  const [timeEnd, setTimeEnd] = useState(new Date())
  const [timeStart, setTimeStart] = useState(new Date())

  const [show, setShow] = useState(false)
  const [showStart, setShowStart] = useState(false)
  const [kpiMore, setKPIMore] = useState(false)
  
  const [mode, setMode] = useState('date')
  const [modeStart, setModeStart] = useState('date')
  const dispatch = useDispatch()

  const handleMore = (item) => {
    setKPIMore(!kpiMore)
    dispatch(GetKPIHistory(item))
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
    <>
      <Modal animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View
              style={{
                paddingVertical: 5,
                borderBottomWidth: 1,
                borderColor: '#ccc',
              }}
            >
              <Text
                style={{ fontSize: 22, textAlign: 'center', fontWeight: 500 }}
              >
                Đánh giá KPI
              </Text>
            </View>
            <View
              style={{
                paddingVertical: 5,
                borderBottomWidth: 1,
                borderColor: '#ccc',
              }}
            >
              <Text style={{ fontWeight: 500 }}>Thông tin cơ bản</Text>
              <View>
                <View style={{ flexDirection: 'row', paddingVertical: 3 }}>
                  <Text>Họ và tên: </Text>
                  <Text style={{ color: '#AAAAAA' }}>
                    {account?.user?.fullName}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', paddingVertical: 3 }}>
                  <Text>Phòng ban: </Text>
                  <Text style={{ color: '#AAAAAA' }}>
                    {account?.user?.department}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', paddingVertical: 3 }}>
                  <Text>Chức vụ: </Text>
                  <Text style={{ color: '#AAAAAA' }}>
                    {account?.role?.roleName === 'ROLE_ADMIN'
                      ? 'Quản trị viên'
                      : account?.role?.roleName === 'ROLE_MANAGE'
                      ? 'Quản Lý'
                      : account?.role?.roleName === 'ROLE_STAFF'
                      ? 'Nhân viên'
                      : 'Vô danh'}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', paddingVertical: 3 }}>
                  <Text>Email: </Text>
                  <Text style={{ color: '#AAAAAA' }}>
                    {account?.user?.email}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', paddingVertical: 3 }}>
                  <Text>Ngày bắt đầu: </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      borderWidth: 1,
                      borderColor: '#CCCCCC',
                      borderRadius: 2,
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingHorizontal: 10,
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
                  {showStart && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={timeStart}
                      mode={modeStart}
                      is24Hour={true}
                      onChange={onChangeTimeStart}
                    />
                  )}
                </View>
                <View style={{ flexDirection: 'row',  paddingVertical: 5}}>
                  <Text>Ngày kết thúc: </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      borderWidth: 1,
                      borderColor: '#CCCCCC',
                      borderRadius: 2,
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingHorizontal: 10,
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
            </View>
            <View
              style={{
                paddingVertical: 5,
                borderBottomWidth: 1,
                borderColor: '#ccc',
              }}
            >
              <Text style={{ fontWeight: 500 }}>Danh sách đánh giá KPI</Text>
              <View>
                <Text style={{ fontWeight: 500 }}>1/</Text>
                <View style={{ paddingVertical: 5}}>
                  <Text>TIÊU CHÍ ĐÁNH GIÁ: </Text>
                  <Text style={{ fontSize: 18, color: '#AAAAAA' }}>
                    Tuân thủ giờ giấc làm việc{' '}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', paddingVertical: 3 }}>
                  <Text>ĐIỂM TỐI ĐA: </Text>
                  <Text style={{ color: '#AAAAAA' }}>5</Text>
                </View>
                <View style={{ flexDirection: 'row', paddingVertical: 3 }}>
                  <Text>ĐIỂM TỰ ĐÁNH GIÁ: </Text>
                  <Text style={{ color: '#AAAAAA' }}>
                    {account?.user?.checkInPoint}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', paddingVertical: 3 }}>
                  <Text>TỈ LỆ HOÀN THÀNH: </Text>
                  <Text style={{ color: '#AAAAAA' }}>
                    {((account?.user?.checkInPoint / 95) * 5).toFixed(2)} %
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', paddingVertical: 3 }}>
                  <Text>THẨM ĐỊNH: </Text>
                  <Text style={{ color: '#AAAAAA' }}>5</Text>
                </View>
              </View>
              <View>
                <Text style={{ fontWeight: 500 }}>2/</Text>
                <View>
                  <Text>TIÊU CHÍ ĐÁNH GIÁ: </Text>
                  <Text style={{ fontSize: 18, color: '#AAAAAA' }}>
                    Công việc hoàn thành{' '}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', paddingVertical: 3 }}>
                  <Text>ĐIỂM TỐI ĐA: </Text>
                  <Text style={{ color: '#AAAAAA' }}>5</Text>
                </View>
                <View style={{ flexDirection: 'row', paddingVertical: 3 }}>
                  <Text>Điểm tự đánh giá: </Text>
                  <Text style={{ color: '#AAAAAA' }}>
                    {' '}
                    {account?.user?.jobPoint}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', paddingVertical: 3 }}>
                  <Text>TỈ LỆ HOÀN THÀNH: </Text>
                  <Text style={{ color: '#AAAAAA' }}>
                    {((account?.user?.jobPoint / 95) * 100).toFixed(2)} %
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', paddingVertical: 3 }}>
                  <Text>THẨM ĐỊNH: </Text>
                  <Text style={{ color: '#AAAAAA' }}>5</Text>
                </View>
                <View style={{ flexDirection: 'row', paddingVertical: 3 }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#fff',
                      borderWidth: 1,
                      borderColor: '#FFFF33',
                      padding: 5,
                      borderRadius: 5,
                      elevation: 5,
                    }}
                    onPress={() => handleMore(account?.user?.id)}
                  >
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 16,
                      }}
                    >
                      Chi tiết
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginVertical: 15,
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: '#ccc',
                  borderWidth: 1,
                  borderColor: '#ccc',
                  padding: 5,
                  marginLeft: 5,
                  borderRadius: 5,
                  elevation: 5,
                }}
                onPress={() => setIsModalVisible(false)}
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
              <TouchableOpacity
                style={{
                  backgroundColor: '#f8dea7',
                  borderWidth: 1,
                  borderColor: '#f8dea7',
                  padding: 5,
                  marginLeft: 5,
                  borderRadius: 5,
                  elevation: 5,
                }}
              >
                <Text
                  style={{
                    color: 'white',
                    fontSize: 16,
                  }}
                >
                  Lưu
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {kpiMore && <KPIMoreModal handleMore={handleMore} />}
    </>
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
    width: '95%',
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
})

export default EvaluateKPIModal