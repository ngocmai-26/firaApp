import React, { useState, useEffect, useLayoutEffect } from 'react'
import { View, Text, Button, FlatList, StyleSheet } from 'react-native'
import NetInfo from '@react-native-community/netinfo'
import { useDispatch, useSelector } from 'react-redux'
import { CheckIn, CheckOut, getAllTimeKeep } from '../../thunks/TimeKeepThunk'
import Toast from 'react-native-toast-message'
import { TOAST_ERROR } from '../../constants/toast'

const CheckInOutPage = () => {
  // const [isAllowedToCheckin, setIsAllowedToCheckin] = useState(false);
  // const [checkinHistory, setCheckinHistory] = useState([]);
  // const [summary, setSummary] = useState([]);

  // const checkNetworkInRange = async (type) => {
  //   const netInfo = await NetInfo.fetch();
  //   const ipAddress = netInfo.details.ipAddress;

  //   const allowedNetworks = ['192.168.69', '192.168.1'];

  //   const ipPrefix = ipAddress.split('.').slice(0, 3).join('.');

  //   if (allowedNetworks.includes(ipPrefix)) {
  //     const currentTime = new Date();
  //     const currentHour = currentTime.getHours();

  //     let checkinType = 'Checkin on time';
  //     if (currentHour < 7 || (currentHour >= 11 && currentHour < 13)) {
  //       checkinType = 'Checkin on time';
  //     } else {
  //       checkinType = 'Late checkin';
  //     }

  //     // Lấy thông tin về ca làm dựa trên giờ checkin
  //     let shift = '';
  //     if (currentHour >= 7 && currentHour < 12) {
  //       shift = 'Morning';
  //     } else if (currentHour >= 12 && currentHour < 17) {
  //       shift = 'Afternoon';
  //     } else if (currentHour >= 17 && currentHour < 21) {
  //       shift = 'Evening';
  //     }

  //     // Tạo bản ghi mới
  //     const newRecord = {
  //       name: 'Your Name',
  //       ipAddress: ipAddress,
  //       checkinTime: currentTime.toLocaleString(),
  //       type: type,
  //       checkinType: checkinType,
  //       shift: shift, // Lưu thông tin về ca làm
  //     };

  //     // Thêm bản ghi mới vào lịch sử checkin
  //     setCheckinHistory([...checkinHistory, newRecord]);

  //     setIsAllowedToCheckin(true);
  //   } else {
  //     setIsAllowedToCheckin(false);
  //   }
  // };

  // const handleCheckin = () => {
  //   checkNetworkInRange('Checkin');
  // };

  // const handleCheckout = () => {
  //   checkNetworkInRange('Checkout');
  // };

  // useEffect(() => {
  //   calculateSummary();
  // }, [checkinHistory]);

  // const calculateSummary = () => {
  //   const shifts = {}; // Lưu trữ tổng kết cho mỗi ca làm

  //   checkinHistory.forEach((record) => {
  //     // Lấy thông tin về ca làm từ bản ghi
  //     const shift = record.shift;

  //     // Nếu ca làm chưa được tổng kết, thì khởi tạo
  //     if (!shifts[shift]) {
  //       shifts[shift] = {
  //         checkin: null,
  //         checkout: null,
  //         totalWorkingTime: 0,
  //       };
  //     }

  //     // Nếu là checkin
  //     if (record.type === 'Checkin') {
  //       // Nếu chưa có checkin cho ca làm này
  //       if (!shifts[shift].checkin) {
  //         shifts[shift].checkin = record;
  //       }
  //     } else if (record.type === 'Checkout') {
  //       // Nếu chưa có checkout cho ca làm này
  //       shifts[shift].checkout = record;
  //     }

  //     // Tính tổng thời gian làm việc của ca làm
  //     if (shifts[shift].checkin && shifts[shift].checkout) {
  //       const checkin = convertToDateTimeString(shifts[shift].checkin.checkinTime)
  //       const checkout = convertToDateTimeString(shifts[shift].checkout.checkinTime)
  //       const checkinTime = new Date(checkin);
  //       const checkoutTime = new Date(checkout);
  //       const workingTime = (checkoutTime - checkinTime) / (1000 * 60 * 60); // Đổi thành giờ
  //       shifts[shift].totalWorkingTime += workingTime;
  //     }
  //   });

  //   // Cập nhật tổng kết
  //   setSummary(Object.entries(shifts));
  // };

  // const convertToDateTimeString = (timeString) => {
  //   // Tách phần thời gian và phần ngày
  //   const [timePart, datePart] = timeString.split(","); // Tách phần thời gian và phần ngày

  //   // Tách giờ, phút và giây từ phần thời gian
  //   const [hour, minute, second] = timePart.split(":"); // Tách giờ, phút và giây

  //   // Tách ngày, tháng và năm từ phần ngày
  //   const [day, month, year] = datePart.trim().split("/"); // Loại bỏ dấu cách và tách ngày, tháng và năm

  //   // Tạo chuỗi định dạng mới
  //   const dateTimeString = `${year}-${month}-${day}T${hour}:${minute}:${second}`;

  //   return dateTimeString;
  // };

  const { allTimeKeep } = useSelector((state) => state.timeKeepsReducer)
  const { account } = useSelector((state) => state.authReducer);
  console.log("account", account)
  const [disabled, setDisabled] = useState(true)
  const [disabledCheckout, setDisabledCheckout] = useState(false)
  const dispatch = useDispatch()

  useLayoutEffect(() => {
    if (allTimeKeep?.length <= 0) {
      dispatch(getAllTimeKeep())
    }
  }, [])

  useLayoutEffect(() => {
    dispatch(getAllTimeKeep(0))
  }, [])

  useEffect(() => {
    const checkNetworkInRange = async () => {
      const netInfo = await NetInfo.fetch();
      const ipAddress = netInfo.details.ipAddress;
  
      const allowedNetworks = ['192.168.69', '192.168.1'];
      const ip = '192.168.78'
  
      const ipPrefix = ipAddress.split('.').slice(0, 3).join('.');
  
      if (allowedNetworks.includes(ipPrefix)) {
        const now = new Date();
        const hours = now.getHours();
        setDisabled(false);
        setDisabledCheckout(false)
  
        if (hours < 6) {
          Toast.show({
            type: TOAST_ERROR,
            text1: 'Checkin sẽ mở lúc 6h',
          });
        } else if (hours < 12) {
          Toast.show({
            type: TOAST_ERROR,
            text1: 'Checkin sẽ mở lúc 12h',
          });
        } else if (hours < 15) {
          Toast.show({
            type: TOAST_ERROR,
            text1: 'Checkin sẽ mở lúc 16h',
          });
        } else {
          Toast.show({
            type: TOAST_ERROR,
            text1: 'Checkin đã đóng',
          });
        }
  
        if ((hours >= 6 && hours < 8) || (hours >= 12 && hours < 14) || (hours >= 15 && hours < 17)) {
          setDisabled(false);
        } else {
          setDisabled(true);
        }
      } else {
        Toast.show({
          type: TOAST_ERROR,
          text1: 'Bạn không có quyền checkin và checkout từ mạng này.',
        });
        setDisabled(true);
        setDisabledCheckout(true)
      }
    };
  
    checkNetworkInRange();
  }, [])

  const handleCheckin = () => {
    const now = new Date()
    const hours = now.getHours()
    if (
      (hours >= 7 && hours < 8) ||
      (hours >= 13 && hours < 14) ||
      (hours >= 17 && hours < 18)
    ) {
      Toast.show({
        type: TOAST_ERROR,
        text1: 'Đi trễ',
      })
      console.log('Đi trễ')
    }

    if (hours < 7) {
      dispatch(CheckIn({userId: account?.user?.id, shift: "MORNING"}));
      console.log('MORNING')
    } else if (hours < 13) {
      dispatch(CheckIn({userId: account?.user?.id, shift: "AFTERNOON"}));
      console.log('AFTERNOON')
    } else if (hours < 16) {
      dispatch(CheckIn({userId: account?.user?.id, shift: "NIGHT"}));
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
      dispatch(CheckOut({userId: account?.user?.id, shift: "MORNING"}));
      console.log('MORNING')
    } else if (hour < 17) {
      dispatch(Checkout({userId: account?.user?.id, shift: "AFTERNOON"}));
      console.log('AFTERNOON')
    } else if (hour < 24) {
      dispatch(Checkout({userId: account?.user?.id, shift: "EVENING"}));
      console.log('NIGHT')
    } else {
      console.log('Quá giờ checkout')
    }

    setIsCheckedOut(true)
  }

  return (
    <View style={styles.container}>
      {/* <View style={styles.titleContainer}>
        <Text style={styles.title}>Check In/Out</Text>
      </View> */}
      <View style={styles.buttonContainer}>
        <Button title="Checkin" onPress={handleCheckin} disabled={disabled} />
        <Button title="Checkout" onPress={handleCheckout} disabled={disabledCheckout} />
      </View>
      <View style={styles.historyContainer}>
        <Text style={styles.historyTitle}>Checkin History:</Text>
        {/* <FlatList
          data={checkinHistory}
          renderItem={({ item }) => (
            <View style={styles.historyItem}>
              <Text style={styles.historyText}>Name: {item.name}</Text>
              <Text style={styles.historyText}>
                IP Address: {item.ipAddress}
              </Text>
              <Text style={styles.historyText}>Type: {item.type}</Text>
              <Text style={styles.historyText}>Time: {item.checkinTime}</Text>
              <Text style={styles.historyText}>
                Checkin Type: {item.checkinType}
              </Text>
              <Text style={styles.historyText}>
                Shift: {item.shift} 
              </Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        /> */}
      </View>
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Shift Summary:</Text>
        {/* <FlatList
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
        /> */}
      </View>
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
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  historyText: {
    fontSize: 16,
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
