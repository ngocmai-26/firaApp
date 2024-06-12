import React, { useState, useEffect, useLayoutEffect } from 'react'
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native'
import NetInfo from '@react-native-community/netinfo'
import { useDispatch, useSelector } from 'react-redux'
import {
  CheckIn,
  CheckOut,
  getAllByUserToday,
  getUserTimeKeep,
} from '../../thunks/TimeKeepThunk'
import Toast from 'react-native-toast-message'
import { TOAST_ERROR } from '../../constants/toast'
import moment from 'moment/moment'
import Icon from 'react-native-vector-icons/FontAwesome6'

const CheckInOutPage = () => {
  const { allTimeKeep } = useSelector((state) => state.timeKeepsReducer)
  const { account, user } = useSelector((state) => state.authReducer)
  const [disabled, setDisabled] = useState(true)
  const [disabledCheckout, setDisabledCheckout] = useState(false)
  const dispatch = useDispatch()
  const [check, setCheck] = useState(2)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [typeData, setTypeData] = useState(1)

  useLayoutEffect(() => {
    if (allTimeKeep?.length <= 0) {
      // if (account.role.roleName === 'ROLE_ADMIN') {
      //   dispatch(getAllTimeKeep())
      // } else if (account.role.roleName === 'ROLE_MANAGER') {
      //   setCheck(1)
      // } else {
      //   dispatch(getUserTimeKeep({ id: user?.id, data: 0 }))
      // }
      if(typeData === 2 ) {
        dispatch(getAllByUserToday({ id: user?.id, shift: 'MORNING' }))
        
      } else if (typeData === 1 ) {
        dispatch(getUserTimeKeep({ id: user?.id, data: 0 }))
      }
    }
  }, [])
  useLayoutEffect(() => {
    if(typeData === 2 ) {
      dispatch(getAllByUserToday({ id: user?.id, shift: 'MORNING' }))
      
    } else if (typeData === 1 ) {
      dispatch(getUserTimeKeep({ id: user?.id, data: 0 }))
    }
  }, [])
  useEffect(() => {
    if(typeData === 2 ) {
      dispatch(getAllByUserToday({ id: user?.id, shift: 'MORNING' }))
      
    } else if (typeData === 1 ) {
      dispatch(getUserTimeKeep({ id: user?.id, data: 0 }))
    }
  }, [typeData])

  

  useEffect(() => {
    const checkNetworkInRange = async () => {
      const netInfo = await NetInfo.fetch()
      const ipAddress = netInfo.details.ipAddress

      const allowedNetworks = ['192.168.69', '192.168.110']

      const ipPrefix = ipAddress.split('.').slice(0, 3).join('.')

      if (allowedNetworks.includes(ipPrefix)) {
        const now = new Date()
        const hours = now.getHours()
        setDisabled(false)
        setDisabledCheckout(false)

        if (hours < 6) {
          Toast.show({
            type: TOAST_ERROR,
            text1: 'Checkin sẽ mở lúc 6h',
          })
        } else if (hours > 8 && hours < 12) {
          Toast.show({
            type: TOAST_ERROR,
            text1: 'Checkin sẽ mở lúc 12h',
          })
        } else if (hours > 13 && hours < 15) {
          Toast.show({
            type: TOAST_ERROR,
            text1: 'Checkin sẽ mở lúc 16h',
          })
        }

        if (
          (hours >= 6 && hours < 8) ||
          (hours >= 12 && hours < 14) ||
          (hours >= 15 && hours < 19)
        ) {
          setDisabled(false)
        } else {
          setDisabled(true)
        }
      } else {
        Toast.show({
          type: TOAST_ERROR,
          text1: 'Bạn không có quyền checkin và checkout từ mạng này.',
        })
        setDisabled(true)
        setDisabledCheckout(true)
      }
    }

    checkNetworkInRange()
  }, [])

  const [canCheckOut, setCanCheckOut] = useState(false)
  const [canCheckIn, setCanCheckIn] = useState(false)

  const handleCheckin = () => {
    const now = new Date()
    const hours = now.getHours()

    // Kiểm tra xem người dùng đã checkin trong ca làm việc hiện tại chưa
    const isAlreadyCheckedIn = allTimeKeep.some(
      (item) =>
        moment(now).format('DD-MM-YYYY') ===
          moment(item.checkInTime).format('DD-MM-YYYY') &&
        item.status === 'CHECKIN' &&
        item.shift === getShiftByHour(hours),
    )

    if (isAlreadyCheckedIn) {
      Toast.show({
        type: TOAST_ERROR,
        text1: 'Bạn đã checkin trong ca làm việc này.',
      })
      const isAlreadyCheckedOut = allTimeKeep.some(
        (item) =>
          moment(now).format('DD-MM-YYYY') ===
            moment(item.checkInTime).format('DD-MM-YYYY') &&
          item.status === 'CHECKOUT' &&
          item.shift === getShiftByHour(hours),
      )

      if (isAlreadyCheckedOut) {
        setCanCheckOut(false)
        return // Không thực hiện thêm hành động
      }
      return // Không thực hiện thêm hành động
    }
    setCanCheckOut(false)
    setCanCheckIn(true)
    setDisabled(false)

    // Tiếp tục thực hiện checkin
    if (hours < 8) {
      setDisabled(true)
      dispatch(CheckIn({ userId: account?.user?.id, shift: 'MORNING' }))
      console.log('MORNING')
    } else if (hours >= 12 && hours < 14) {
      setDisabled(true)
      dispatch(CheckIn({ userId: account?.user?.id, shift: 'AFTERNOON' }))
      console.log('AFTERNOON')
    } else if (hours >= 17 && hours < 19) {
      setDisabled(true)
      dispatch(CheckIn({ userId: account?.user?.id, shift: 'NIGHT' }))
      console.log('NIGHT')
    } else {
      setDisabled(false)
      console.log('Checkin đã đóng')
    }

    setTimeout(() => {
      setDisabled(false)
    }, 3600000) // 1 giờ
  }

  const getShiftByHour = (hour) => {
    if (hour >= 6 && hour < 12) {
      return 'MORNING'
    } else if (hour >= 12 && hour < 17) {
      return 'AFTERNOON'
    } else if (hour >= 17 && hour < 21) {
      return 'NIGHT'
    }
  }

  const tabs = [
    { id: 1, label: 'Tất cả' },
    { id: 2, label: 'Chấm công theo ngày' },
  ]

  const handleCheckout = () => {
    const now = new Date()
    const hour = now.getHours()
    // Kiểm tra xem người dùng đã checkout trong ca làm việc hiện tại chưa
    const isAlreadyCheckedOut = allTimeKeep.some(
      (item) =>
        moment(now).format('DD-MM-YYYY') ===
          moment(item.checkoutTime).format('DD-MM-YYYY') &&
        item.status === 'CHECKOUT' &&
        item.shift === getShiftByHour(hour),
    )

    if (isAlreadyCheckedOut) {
      Toast.show({
        type: TOAST_ERROR,
        text1: 'Bạn đã checkout trong ca làm việc này.',
      })
      return // Không thực hiện thêm hành động
    } else {
      // Tiếp tục thực hiện checkout
      if (hour < 13) {
        dispatch(CheckOut({ userId: account?.user?.id, shift: 'MORNING' }))
        console.log('MORNING')
      } else if (hour < 17) {
        dispatch(CheckOut({ userId: account?.user?.id, shift: 'AFTERNOON' }))
        console.log('AFTERNOON')
      } else if (hour < 24) {
        dispatch(CheckOut({ userId: account?.user?.id, shift: 'NIGHT' }))
        console.log('NIGHT')
      } else {
        console.log('Quá giờ checkout')
      }
    }

    setCanCheckOut(false)
    setDisabledCheckout(true)
  }

  const handleTabChange = (item) => {
    setTypeData(item)
    setIsModalVisible(false)

  }

  return (
    <View style={styles.container}>
      {/* {account?.role?.roleName === 'ROLE_MANAGER' && (
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 20,
            justifyContent: 'flex-end',
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: check === 1 ? '#3b82f6' : '#94a3b8',
              marginHorizontal: 2,
              borderRadius: 10,
              paddingHorizontal: 10,
              paddingVertical: 4,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => setCheck(1)}
          >
            <Text style={{ color: 'white', fontSize: 14 }}>Quản lý</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: check !== 1 ? '#3b82f6' : '#94a3b8',
              borderRadius: 12,
              paddingHorizontal: 10,
              paddingVertical: 4,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => setCheck(2)}
          >
            <Text style={{ color: 'white', fontSize: 14 }}>Cá nhân</Text>
          </TouchableOpacity>
        </View>
      )} */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={{
            backgroundColor: '#2089dc',
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 10,
            elevation: 5,
          }}
          onPress={handleCheckin}
          disabled={disabled}
        >
          <Text style={{ color: 'white', fontWeight: '600' }}>Checkin</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: canCheckOut ? '#2089dc' : '#ccc',
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 10,
            elevation: 5,
          }}
          onPress={handleCheckout}
          disabled={disabledCheckout}
        >
          <Text style={{ color: 'white', fontWeight: '600' }}>Checkout</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingHorizontal: 20,
            borderRadius: 5,
            backgroundColor: 'white',
            paddingVertical: 10,
            elevation: 5,
            marginLeft: 2,
          }}
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

      <View style={styles.historyContainer}>
        <Text style={styles.historyTitle}>Checkin History:</Text>
        <FlatList
          data={allTimeKeep}
          renderItem={({ item }) => (
            <View style={styles.historyItem}>
              <View style={{ flexDirection: 'row', gap: 3, marginVertical: 4 }}>
                <Text style={styles.historyText}>Tên:</Text>
                <Text>{item?.userChecked?.fullName}</Text>
              </View>
              {/* <Text style={styles.historyText}>
                IP Address: {item.ipAddress}
              </Text> */}
              <View style={{ flexDirection: 'row', gap: 3, marginVertical: 4 }}>
                <Text style={styles.historyText}>Type: </Text>
                <Text>{item?.type}</Text>
              </View>
              <View style={{ flexDirection: 'row', gap: 3, marginVertical: 4 }}>
                <Text style={styles.historyText}>Time:</Text>
                <Text>{moment(item?.checkInTime).format('DD-MM-YYYY')}</Text>
              </View>
              <View style={{ flexDirection: 'row', gap: 3, marginVertical: 4 }}>
                <Text style={styles.historyText}>Checkin Type:</Text>
                <Text>{item?.status}</Text>
              </View>
              <View style={{ flexDirection: 'row', gap: 3, marginVertical: 4 }}>
                <Text style={styles.historyText}>Shift:</Text>
                <Text>{item?.shift}</Text>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

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
            <View
              style={{
                paddingVertical: 5,
              }}
            >
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
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  historyContainer: {
    flex: 1,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  historyItem: {
    backgroundColor: '#fff',

    elevation: 5,
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  historyText: {
    fontSize: 16,
    color: '#b2b4b6',
  },
  summaryContainer: {
    flex: 1,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  summaryItem: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  summaryText: {
    fontSize: 16,
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

export default CheckInOutPage
