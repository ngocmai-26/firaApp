import React, { useState, useEffect, useLayoutEffect } from 'react'
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import NetInfo from '@react-native-community/netinfo'
import { useDispatch, useSelector } from 'react-redux'
import {
  CheckIn,
  CheckOut,
  getAllTimeKeep,
  getUserManagerTimeKeep,
  getUserTimeKeep,
} from '../../thunks/TimeKeepThunk'
import Toast from 'react-native-toast-message'
import { TOAST_ERROR } from '../../constants/toast'
import moment from 'moment/moment'

const CheckInOutPage = () => {
  const { allTimeKeep } = useSelector((state) => state.timeKeepsReducer)
  const { account, user } = useSelector((state) => state.authReducer)
  const [disabled, setDisabled] = useState(true)
  const [disabledCheckout, setDisabledCheckout] = useState(false)
  const dispatch = useDispatch()
  const [check, setCheck] = useState(2)

  useLayoutEffect(() => {
    if (allTimeKeep?.length <= 0) {
      if (account.role.roleName === 'ROLE_ADMIN') {
        dispatch(getAllTimeKeep())
      } else if (account.role.roleName === 'ROLE_MANAGER') {
        setCheck(1)
      } else {
        dispatch(getUserTimeKeep({ id: user?.id, data: 0 }))
      }
    }
  }, [])
  useLayoutEffect(() => {
    if (account.role.roleName === 'ROLE_ADMIN') {
      dispatch(getAllTimeKeep())
    } else if (account.role.roleName === 'ROLE_MANAGER') {
      setCheck(2)
    } else {
      dispatch(getUserTimeKeep({ id: user?.id, data: 0 }))
    }
  }, [])
  console.log('allTimeKeep', allTimeKeep)

  console.log('account', account)
  console.log('account', check)
  useEffect(() => {
    if (account?.role?.roleName === 'ROLE_MANAGER') {
      if (check === 1) {
        console.log('â')
        dispatch(getUserManagerTimeKeep({ id: user?.id, data: 0 }))
      } else {
        console.log('âdd')
        dispatch(getUserTimeKeep({ id: user?.id, data: 0 }))
      }
    }
  }, [check])

  useEffect(() => {
    const checkNetworkInRange = async () => {
      const netInfo = await NetInfo.fetch()
      const ipAddress = netInfo.details.ipAddress

      const allowedNetworks = ['192.168.69', '192.168.1']

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
        } else if (hours < 12) {
          Toast.show({
            type: TOAST_ERROR,
            text1: 'Checkin sẽ mở lúc 12h',
          })
        } else if (hours < 15) {
          Toast.show({
            type: TOAST_ERROR,
            text1: 'Checkin sẽ mở lúc 16h',
          })
        } else {
          Toast.show({
            type: TOAST_ERROR,
            text1: 'Checkin đã đóng',
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

  const handleCheckin = () => {
    const now = new Date()
    const hours = now.getHours()
    if (
      (hours >= 7 && hours < 8) ||
      (hours >= 13 && hours < 14) ||
      (hours >= 17 && hours < 19)
    ) {
      Toast.show({
        type: TOAST_ERROR,
        text1: 'Đi trễ',
      })
      console.log('Đi trễ')
    }

    if (hours < 7) {
      dispatch(CheckIn({ userId: account?.user?.id, shift: 'MORNING' }))
      console.log('MORNING')
    } else if (hours < 13) {
      dispatch(CheckIn({ userId: account?.user?.id, shift: 'AFTERNOON' }))
      console.log('AFTERNOON')
    } else if (hours < 19) {
      dispatch(CheckIn({ userId: account?.user?.id, shift: 'NIGHT' }))
      console.log('NIGHT')
    } else {
      console.log('Checkin đã đóng')
    }

    setDisabled(true)

    setTimeout(() => {
      setDisabled(false)
    }, 3600000) // 1 giờ
  }

  const [isCheckedOut, setIsCheckedOut] = useState(false)

  const handleCheckout = () => {
    const now = new Date()
    const hour = now.getHours()

    if (hour < 13) {
      dispatch(CheckOut({ userId: account?.user?.id, shift: 'MORNING' }))
      console.log('MORNING')
    } else if (hour < 17) {
      dispatch(Checkout({ userId: account?.user?.id, shift: 'AFTERNOON' }))
      console.log('AFTERNOON')
    } else if (hour < 24) {
      dispatch(Checkout({ userId: account?.user?.id, shift: 'EVENING' }))
      console.log('NIGHT')
    } else {
      console.log('Quá giờ checkout')
    }

    setIsCheckedOut(true)
  }

  return (
    <View style={styles.container}>
      {account?.role?.roleName === 'ROLE_MANAGER' && (
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
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={{
            backgroundColor: disabled ? '#ccc' : '#2089dc',
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 10,
            elevation: 5,
          }}
          onPress={handleCheckin}
        >
          <Text style={{ color: 'white', fontWeight: '600' }}>Checkin</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: disabledCheckout ? '#ccc' : '#2089dc',
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 10,
            elevation: 5,
          }}
          onPress={handleCheckout}
        >
          <Text style={{ color: 'white', fontWeight: '600' }}>Checkout</Text>
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
                <Text>
                {moment(item?.checkInTime).format('DD-MM-YYYY')}</Text>
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
      {/* <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Shift Summary:</Text>
        <FlatList
          data={summary}
          renderItem={({ item }) => (
            <View style={styles.summaryItem}>
              <Text style={styles.summaryText}>Shift: {item[0]}</Text>
              {item[1].checkin && (
                <Text style={styles.summaryText}>
                  Checkin Time: {item[1].checkin.checkinTime}
                </Text>
              )}
              {item[1].checkout && (
                <Text style={styles.summaryText}>
                  Checkout Time: {item[1].checkout.checkinTime}
                </Text>
              )}
              <Text style={styles.summaryText}>
                Total Working Time: {typeof item[1].totalWorkingTime === 'number' ? item[1]?.totalWorkingTime?.toFixed(2) : 'N/A'} hours
              </Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View> */}
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
    color: "#b2b4b6"
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
})

export default CheckInOutPage
