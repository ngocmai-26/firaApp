import React, { useEffect } from 'react'
import { Dimensions, Image, Text, View, FlatList, Button, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllNotification,
  readNotification,
} from '../../thunks/NotificationThunk'
import NavBar from '../../layout/navbar'

function Notification() {
  const dispatch = useDispatch()
  const { notifications } = useSelector((state) => state.notificationReducer)

  useEffect(() => {
    if (notifications?.length <= 0) {
      dispatch(getAllNotification())
    }
  }, [])

  console.log('notifications', notifications)

 
  const handleReadNotification = (item) => {
    dispatch(readNotification(item))
  }

  const renderItem = ({ item }) => (
  <View>
  <TouchableOpacity onPress={()=>handleReadNotification(item.id)} >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 10,
          backgroundColor: item.read ? '' : 'bg-gray-200',
          paddingHorizontal: 15,
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          <View style={{ marginRight: 5 }}>
            {/* Hiển thị hình ảnh nếu có, thay thế 'item?.img' bằng đường dẫn hình ảnh thực tế */}
            {item?.type && (
              <Image
                source={{
                  uri:
                    'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
                }}
                style={{ width: 50, height: 50, borderRadius: 5 }}
              />
            )}
          </View>
          <View style={{ maxWidth: 300 }}>
            <View style={{ marginBottom: 3 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                {item?.content}
              </Text>
            </View>
            <View style={{ overflow: 'hidden' }}>
              <Text style={{ fontSize: 14 }} numberOfLines={1}>
                Bạn đã được giao việc từ {item?.from?.fullName}
              </Text>
            </View>
          </View>
        </View>
        <View>
          <Text style={{ fontSize: 12, color: '#888888' }}>{item?.time}</Text>
          {item?.typeNotify && item?.typeNotify !== 1 && (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {/* Thêm biểu tượng thông báo tại đây */}
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  </View>
  )

  return (
    <NavBar>
      <View
        style={{
          flex: 1,
          position: 'relative',
          width: Dimensions.get('window').width,
        }}
      >
        <View>
          <View>
            <FlatList
              data={notifications}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        </View>
      </View>
    </NavBar>
  )
}

export default Notification
