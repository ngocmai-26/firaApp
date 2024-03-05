import React, { useState } from 'react'
import { View, Text, ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native'
import MsgItem from './MsgItem'

import Icon from 'react-native-vector-icons/FontAwesome6'

const NotificationComponent = ({hiddenComponent, handleHidden, maxheight}) => {
    const [hidden, setHidden] = useState(hiddenComponent)
    console.log('hiddenComponent',hiddenComponent)
  const data = [
    {
      id: 1,
      name: 'Đăng Văn Nam',
      img:
        'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
      time: '12m',
      typeNotify: 1,
      content:
        'ABC Đăng Văn Nam Đăng Văn Nam Đăng Văn Nam  m Đăng Văn Nam Đăng Văn Nam Hôm qua Hôm qua em xinh quá trời Đăng Văn Nam Hôm qua e',
    },
    {
      id: 2,
      name: 'Đăng Văn Nam',
      img:
        'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
      time: '12m',
      typeNotify: 2,
      content:
        'ABC Đăng Văn Nam Đăng Văn Nam Đăng Văn Nam  m Đăng Văn Nam Đăng Văn Nam Hôm qua Hôm qua em xinh quá trời Đăng Văn Nam Hôm qua e',
    },
    {
      id: 2,
      name: 'Đăng Văn Nam',
      img:
        'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
      time: '12m',
      typeNotify: 2,
      content:
        'ABC Đăng Văn Nam Đăng Văn Nam Đăng Văn Nam  m Đăng Văn Nam Đăng Văn Nam Hôm qua Hôm qua em xinh quá trời Đăng Văn Nam Hôm qua e',
    },
    {
      id: 2,
      name: 'Đăng Văn Nam',
      img:
        'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
      time: '12m',
      typeNotify: 2,
      content:
        'ABC Đăng Văn Nam Đăng Văn Nam Đăng Văn Nam  m Đăng Văn Nam Đăng Văn Nam Hôm qua Hôm qua em xinh quá trời Đăng Văn Nam Hôm qua e',
    },
    {
      id: 2,
      name: 'Đăng Văn Nam',
      img:
        'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
      time: '12m',
      typeNotify: 2,
      content:
        'ABC Đăng Văn Nam Đăng Văn Nam Đăng Văn Nam  m Đăng Văn Nam Đăng Văn Nam Hôm qua Hôm qua em xinh quá trời Đăng Văn Nam Hôm qua e',
    },
    {
      id: 2,
      name: 'Đăng Văn Nam',
      img:
        'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
      time: '12m',
      typeNotify: 2,
      content:
        'ABC Đăng Văn Nam Đăng Văn Nam Đăng Văn Nam  m Đăng Văn Nam Đăng Văn Nam Hôm qua Hôm qua em xinh quá trời Đăng Văn Nam Hôm qua e',
    },
    {
      id: 2,
      name: 'Đăng Văn Nam',
      img:
        'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
      time: '12m',
      typeNotify: 2,
      content:
        'ABC Đăng Văn Nam Đăng Văn Nam Đăng Văn Nam  m Đăng Văn Nam Đăng Văn Nam Hôm qua Hôm qua em xinh quá trời Đăng Văn Nam Hôm qua e',
    },
  ]

  return (
    <View
      style={{
        position: 'absolute',
        alignItems: 'center',
        marginHorizontal: 'auto',
        top: 15,
        right: 5,
        backgroundColor: '#fff',
        width: Dimensions.get('window').width * 0.95,
        maxHeight: maxheight,
        zIndex: 30,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        display: hiddenComponent ? "block": "none"
      }}
    >
      <View style={{ zIndex: 30 }}>
        {/* <FontAwesomeIcon icon={faBell} size={30} color="#888" /> */}
      </View>
      <View
        style={{
          paddingHorizontal: 6,
        }}
      >
        <View
          style={{
            padding: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Thông báo</Text>
          <TouchableOpacity style={{ zIndex: 30 }} onPress={handleHidden}>
            <Icon name="xmark" size={24} color="#ccc" />
          </TouchableOpacity>
        </View>
        <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc' }} />
        <ScrollView style={{ flex: 1 }}>
          <View style={{ paddingVertical: 5 }}>
            {data.map((item, index) => (
              <MsgItem key={index} data={item} />
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  )
}

export default NotificationComponent
