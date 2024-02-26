import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import MsgItem from '../../component/MsgItem'
import { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome6'
import BoxMsg from '../../component/BoxMsg'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative"
  },
  leftColumn: {
    borderRightColor: '#E5E5E5',
    borderRightWidth: 2,
    paddingLeft: 10,
    backgroundColor: 'white',
  },
  rightColumn: {
    width: '100%',
    position: 'relative',
    left: 0,
    backgroundColor: 'white',
    borderRightColor: '#E5E5E5',
    borderRightWidth: 2,
    height: '100%',
  },
  // scroll: {
  //   maxHeight: 700,
  // },
  // scrollItem: {
  //   maxHeight: '20%',
  // },
  messageButton: {
    overflow: 'hidden',
    backgroundColor: 'gray',
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
    textAlignVertical: 'center',
    padding: 2,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  memberButton: {
    fontSize: 18,
    textDecorationLine: 'underline',
  },
  collapseButton: {
    fontSize: 12,
    textDecorationLine: 'underline',
    marginTop: 5,
  },
})

function Chat() {
  const [leftBox, setLeftBox] = useState(true)
  const [expandBox, setExpandBox] = useState(false)
  const [expand, setExpand] = useState(false)
  const [seeMore, setSeeMore] = useState(false)
  const handleHiddenModalRoom = () => {
    // Xử lý khi người dùng nhấn nút ẩn modal
  }

  const handleExpandBox = ({ navigation, route }) => {
    // Xử lý khi người dùng nhấn nút mở rộng box
    setExpandBox(!expandBox)
    setLeftBox(!leftBox)
  }
  const handleCloseExpandBox = () => {
    setExpandBox(!expandBox)
    setLeftBox(!leftBox)
  }
  const handleExpand = () => {
    setExpand(!expand)
    setExpandBox(!expandBox)
  }

  const handleRemoveImage = (index) => {
    // Xử lý khi người dùng muốn xóa hình ảnh
  }

  const handleIconClick = () => {
    // Xử lý khi người dùng nhấn nút chọn hình ảnh
  }

  const handleImageChange = () => {
    // Xử lý khi người dùng chọn hình ảnh
  }

  const handleSeeMore = () => {
    setSeeMore(!seeMore)
  }

  const data = [
    {
      id: 1,
      name: 'Đăng Văn Nam',
      img:
        'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
      time: '12m',
      content:
        'ABC Đăng Văn Nam Đăng Văn Nam Đăng Văn Nam  m Đăng Văn Nam Đăng Văn Nam Hôm qua Hôm qua em xinh quá trời Đăng Văn Nam Hôm qua e',
    },
    {
      id: 2,
      name: 'Đăng Văn Nam',
      img:
        'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
      time: '12m',
      content:
        'ABC Đăng Văn Nam Đăng Văn Nam Đăng Văn Nam  m Đăng Văn Nam Đăng Văn Nam Hôm qua Hôm qua em xinh quá trời Đăng Văn Nam Hôm qua e',
    },
    {
      id: 1,
      name: 'Đăng Văn Nam',
      img:
        'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
      time: '12m',
      content:
        'ABC Đăng Văn Nam Đăng Văn Nam Đăng Văn Nam  m Đăng Văn Nam Đăng Văn Nam Hôm qua Hôm qua em xinh quá trời Đăng Văn Nam Hôm qua e',
    },
    {
      id: 2,
      name: 'Đăng Văn Nam',
      img:
        'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
      time: '12m',
      content:
        'ABC Đăng Văn Nam Đăng Văn Nam Đăng Văn Nam  m Đăng Văn Nam Đăng Văn Nam Hôm qua Hôm qua em xinh quá trời Đăng Văn Nam Hôm qua e',
    },
    {
      id: 1,
      name: 'Đăng Văn Nam',
      img:
        'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
      time: '12m',
      content:
        'ABC Đăng Văn Nam Đăng Văn Nam Đăng Văn Nam  m Đăng Văn Nam Đăng Văn Nam Hôm qua Hôm qua em xinh quá trời Đăng Văn Nam Hôm qua e',
    },
    {
      id: 2,
      name: 'Đăng Văn Nam',
      img:
        'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
      time: '12m',
      content:
        'ABC Đăng Văn Nam Đăng Văn Nam Đăng Văn Nam  m Đăng Văn Nam Đăng Văn Nam Hôm qua Hôm qua em xinh quá trời Đăng Văn Nam Hôm qua e',
    },
    {
      id: 1,
      name: 'Đăng Văn Nam',
      img:
        'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
      time: '12m',
      content:
        'ABC Đăng Văn Nam Đăng Văn Nam Đăng Văn Nam  m Đăng Văn Nam Đăng Văn Nam Hôm qua Hôm qua em xinh quá trời Đăng Văn Nam Hôm qua e',
    },
    {
      id: 2,
      name: 'Đăng Văn Nam',
      img:
        'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
      time: '12m',
      content:
        'ABC Đăng Văn Nam Đăng Văn Nam Đăng Văn Nam  m Đăng Văn Nam Đăng Văn Nam Hôm qua Hôm qua em xinh quá trời Đăng Văn Nam Hôm qua e',
    },
    {
      id: 1,
      name: 'Đăng Văn Nam',
      img:
        'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
      time: '12m',
      content:
        'ABC Đăng Văn Nam Đăng Văn Nam Đăng Văn Nam  m Đăng Văn Nam Đăng Văn Nam Hôm qua Hôm qua em xinh quá trời Đăng Văn Nam Hôm qua e',
    },
    {
      id: 2,
      name: 'Đăng Văn Nam',
      img:
        'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
      time: '12m',
      content:
        'ABC Đăng Văn Nam Đăng Văn Nam Đăng Văn Nam  m Đăng Văn Nam Đăng Văn Nam Hôm qua Hôm qua em xinh quá trời Đăng Văn Nam Hôm qua e',
    },
    {
      id: 1,
      name: 'Đăng Văn Nam',
      img:
        'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
      time: '12m',
      content:
        'ABC Đăng Văn Nam Đăng Văn Nam Đăng Văn Nam  m Đăng Văn Nam Đăng Văn Nam Hôm qua Hôm qua em xinh quá trời Đăng Văn Nam Hôm qua e',
    },
    {
      id: 2,
      name: 'Đăng Văn Nam',
      img:
        'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
      time: '12m',
      content:
        'ABC Đăng Văn Nam Đăng Văn Nam Đăng Văn Nam  m Đăng Văn Nam Đăng Văn Nam Hôm qua Hôm qua em xinh quá trời Đăng Văn Nam Hôm qua e',
    },
    {
      id: 1,
      name: 'Đăng Văn Nam',
      img:
        'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
      time: '12m',
      content:
        'ABC Đăng Văn Nam Đăng Văn Nam Đăng Văn Nam  m Đăng Văn Nam Đăng Văn Nam Hôm qua Hôm qua em xinh quá trời Đăng Văn Nam Hôm qua e',
    },
    {
      id: 2,
      name: 'Đăng Văn Nam',
      img:
        'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
      time: '12m',
      content:
        'ABC Đăng Văn Nam Đăng Văn Nam Đăng Văn Nam  m Đăng Văn Nam Đăng Văn Nam Hôm qua Hôm qua em xinh quá trời Đăng Văn Nam Hôm qua e',
    },
    {
      id: 1,
      name: 'Đăng Văn Nam',
      img:
        'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
      time: '12m',
      content:
        'ABC Đăng Văn Nam Đăng Văn Nam Đăng Văn Nam  m Đăng Văn Nam Đăng Văn Nam Hôm qua Hôm qua em xinh quá trời Đăng Văn Nam Hôm qua e',
    },
    {
      id: 2,
      name: 'Đăng Văn Nam',
      img:
        'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
      time: '12m',
      content:
        'ABC Đăng Văn Nam Đăng Văn Nam Đăng Văn Nam  m Đăng Văn Nam Đăng Văn Nam Hôm qua Hôm qua em xinh quá trời Đăng Văn Nam Hôm qua e',
    },
    {
      id: 1,
      name: 'Đăng Văn Nam',
      img:
        'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
      time: '12m',
      content:
        'ABC Đăng Văn Nam Đăng Văn Nam Đăng Văn Nam  m Đăng Văn Nam Đăng Văn Nam Hôm qua Hôm qua em xinh quá trời Đăng Văn Nam Hôm qua e',
    },
    {
      id: 2,
      name: 'Đăng Văn Nam',
      img:
        'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
      time: '12m',
      content:
        'ABC Đăng Văn Nam Đăng Văn Nam Đăng Văn Nam  m Đăng Văn Nam Đăng Văn Nam Hôm qua Hôm qua em xinh quá trời Đăng Văn Nam Hôm qua e',
    },
    {
      id: 1,
      name: 'Đăng Văn Nam',
      img:
        'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
      time: '12m',
      content:
        'ABC Đăng Văn Nam Đăng Văn Nam Đăng Văn Nam  m Đăng Văn Nam Đăng Văn Nam Hôm qua Hôm qua em xinh quá trời Đăng Văn Nam Hôm qua e',
    },
    {
      id: 2,
      name: 'Đăng Văn Nam',
      img:
        'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
      time: '12m',
      content:
        'ABC Đăng Văn Nam Đăng Văn Nam Đăng Văn Nam  m Đăng Văn Nam Đăng Văn Nam Hôm qua Hôm qua em xinh quá trời Đăng Văn Nam Hôm qua e',
    },
    {
      id: 1,
      name: 'Đăng Văn Nam',
      img:
        'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
      time: '12m',
      content:
        'ABC Đăng Văn Nam Đăng Văn Nam Đăng Văn Nam  m Đăng Văn Nam Đăng Văn Nam Hôm qua Hôm qua em xinh quá trời Đăng Văn Nam Hôm qua e',
    },
    {
      id: 2,
      name: 'Đăng Văn Nam',
      img:
        'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
      time: '12m',
      content:
        'ABC Đăng Văn Nam Đăng Văn Nam Đăng Văn Nam  m Đăng Văn Nam Đăng Văn Nam Hôm qua Hôm qua em xinh quá trời Đăng Văn Nam Hôm qua e',
    },
  ]

  const chat = [
    {
      id: 1,
      isSender: 1,
      content: 'Hôm qua em xinh quá trời',
      img:
        'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
    },
    {
      id: 2,
      isSender: 2,
      content: 'Hôm qua em xinh quá trời',
      img:
        'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
    },
    {
      id: 3,
      isSender: 1,
      content: 'Hôm qua em xinh quá trời',
      img:
        'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
    },
    {
      id: 4,
      isSender: 2,
      content: 'Hôm qua em xinh quá trời',
      img:
        'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
    },
    {
      id: 5,
      isSender: 1,
      content: 'Hôm qua em xinh quá trời',
      img:
        'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
    },
    {
      id: 6,
      isSender: 2,
      content: 'Hôm qua em xinh quá trời',
      img:
        'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
    },
    {
      id: 7,
      isSender: 1,
      content: 'Hôm qua em xinh quá trời',
      img:
        'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
    },
    {
      id: 8,
      isSender: 2,
      content: 'Hôm qua em xinh quá trời',
      img:
        'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
    },
    {
      id: 9,
      isSender: 1,
      content: 'Hôm qua em xinh quá trời',
      img:
        'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
    },
  ]

  const selectedImages = [
    // Dữ liệu mẫu cho hình ảnh đã chọn
  ]

  const member = [
    {
      id: 1,
      name: 'Đăng Văn Nam',
      img:
        'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
      content: 'abc@gmail.com',
    },
    {
      id: 2,
      name: 'Đăng Văn Nam',
      img:
        'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
      content: 'abc@gmail.com',
    },
    {
      id: 3,
      name: 'Đăng Văn Nam',
      img:
        'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
      content: 'abc@gmail.com',
    },
    {
      id: 4,
      name: 'Đăng Văn Nam',
      img:
        'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
      content: 'abc@gmail.com',
    },
    {
      id: 5,
      name: 'Đăng Văn Nam',
      img:
        'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
      content: 'abc@gmail.com',
    },
    {
      id: 6,
      name: 'Đăng Văn Nam',
      img:
        'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
      content: 'abc@gmail.com',
    },
    {
      id: 7,
      name: 'Đăng Văn Nam',
      img:
        'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
      content: 'abc@gmail.com',
    },
    {
      id: 8,
      name: 'Đăng Văn Nam',
      img:
        'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
      content: 'abc@gmail.com',
    },
    {
      id: 9,
      name: 'Đăng Văn Nam',
      img:
        'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
      content: 'abc@gmail.com',
    },
    {
      id: 10,
      name: 'Đăng Văn Nam',
      img:
        'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
      content: 'abc@gmail.com',
    },
  ]

  const file = [
    {
      id: 1,
      name: 'loremipsum.png',
      img:
        'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
      type: 'PNG',
      capacity: '29MB',
    },
    {
      id: 2,
      name: 'loremipsum.png',
      img:
        'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
      type: 'MP4',
      capacity: '29MB',
    },
    {
      id: 3,
      name: 'loremipsum.png',
      img:
        'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
      type: 'PNG',
      capacity: '29MB',
    },
    {
      id: 4,
      name: 'loremipsum.png',
      img:
        'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
      type: 'MP4',
      capacity: '29MB',
    },
    {
      id: 5,
      name: 'loremipsum.png',
      img:
        'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
      type: 'PNG',
      capacity: '29MB',
    },
    {
      id: 6,
      name: 'loremipsum.png',
      img:
        'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
      type: 'MP4',
      capacity: '29MB',
    },
    {
      id: 7,
      name: 'loremipsum.png',
      img:
        'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
      type: 'PNG',
      capacity: '29MB',
    },
    {
      id: 8,
      name: 'loremipsum.png',
      img:
        'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
      type: 'MP4',
      capacity: '29MB',
    },
    {
      id: 9,
      name: 'loremipsum.png',
      img:
        'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
      type: 'PNG',
      capacity: '29MB',
    },
    {
      id: 10,
      name: 'loremipsum.png',
      img:
        'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
      type: 'MP4',
      capacity: '29MB',
    },
  ]
  return (
    <View style={{ height: '100%' }}>
      <View style={styles.container}>
        <View
          style={[styles.leftColumn, { display: leftBox ? 'flex' : 'none' }]}
        >
          {/* <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderBottomColor: '#E5E5E5',
              borderBottomWidth: 2,
              paddingVertical: 10,
            }}
          >
            <Text style={{ fontWeight: 'bold', fontSize: 26 }}>Message</Text>
            
          </View> */}
          {/* Thay thế SearchComponent bằng component tương ứng trong ứng dụng của bạn */}
          {/* <SearchComponent placeholder="Tìm kiếm người dùng" /> */}
          <ScrollView
            style={[
              {
                maxHeight: '100%',
              },
            ]}
          >
            <View style={styles.scrollItem}>
              <View style={{ marginVertical: 10 }}>
                {/* Thay thế MsgItem bằng component tương ứng trong ứng dụng của bạn */}
                {data.map((item) => (
                  <TouchableOpacity onPress={() => handleExpandBox(item?.id)}>
                    <MsgItem data={item} key={item?.id} />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>
        </View>
        <View
          style={[
            styles.rightColumn,
            {
              display: expandBox ? 'flex' : 'none',
              paddingVertical: 10,
              paddingLeft: 10,
            },
          ]}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderBottomColor: '#E5E5E5',
              borderBottomWidth: 2,
              paddingVertical: 10,
              alignItems: 'center',
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ alignItems: 'center' }}>
                <TouchableOpacity onPress={() => handleCloseExpandBox()}>
                  <Icon
                    name="arrow-left-long"
                    size={20}
                    color="#007bff"
                    style={{ fontWeight: 600 }}
                  />
                </TouchableOpacity>
              </View>
              <Image
                source={{
                  uri:
                    'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
                }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  marginHorizontal: 10,
                }}
              />
              <View>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                  Đăng Văn Nam
                </Text>
                <Text style={{ fontSize: 12, color: 'green' }}>online</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', paddingHorizontal: 10 }}>
              <TouchableOpacity
                style={{
                  paddingHorizontal: 10,
                  marginRight: 5,
                }}
              >
                <Icon name="video" size={26} color="#007bff" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleExpand()}
                style={{
                  paddingHorizontal: 5,
                }}
              >
                <Icon name="ellipsis-vertical" size={26} color="#007bff" />
                {/* <Text>a</Text> */}
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView
            style={[
              {
                maxHeight: '88%',
              },
            ]}
          >
            <View
              style={[
                {
                  maxHeight: '80%',
                },
              ]}
            >
              <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 10 }}>12:33 04/04/2023</Text>
              </View>
              <View>
                {chat.map((item) => (
                  // Thay thế BoxMsg bằng component tương ứng trong ứng dụng của bạn
                  <BoxMsg data={item} />
                ))}
              </View>
            </View>
          </ScrollView>
          <View
            style={{
              position: 'absolute',
              borderBottomColor: '#E5E5E5',
              width: '103%',
              backgroundColor: 'white',
              bottom: 0,
              left: 0,
              right: 0,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <View style={{ width: '75%' }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  {selectedImages.map((image, index) => (
                    <View
                      key={index}
                      style={{ position: 'relative', paddingVertical: 2 }}
                    >
                      <Image
                        source={{ uri: image }}
                        style={{ width: 50, height: 50 }}
                      />
                      <TouchableOpacity
                        style={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          backgroundColor: 'red',
                          borderRadius: 50,
                        }}
                        onPress={() => handleRemoveImage(index)}
                      >
                        <FontAwesomeIcon
                          icon={faTimes}
                          style={{ fontSize: 10, color: 'white' }}
                        />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
                <TextInput
                  style={{
                    fontSize: 16,
                    borderWidth: 1,
                    borderColor: 'gray',
                    borderRadius: 5,
                    width: '100%',
                    paddingLeft: 10,
                    paddingVertical: 4,
                  }}
                  placeholder="Nhập tin nhắn"
                />
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity
                  style={{
                    padding: 10,
                    borderRadius: 5,
                    marginRight: 5,
                  }}
                >
                  <Icon
                    name="paper-plane"
                    color="#007bff"
                    style={{ fontSize: 26 }}
                  ></Icon>
                </TouchableOpacity>
                <TouchableOpacity>
                  {/* <Button title="Chọn ảnh" onPress={handleIconClick} /> */}

                  <Icon
                    name="file-arrow-up"
                    color="#007bff"
                    style={{ fontSize: 24 }}
                  ></Icon>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View
          style={[
            styles.rightColumn,
            {
              display: expand ? 'flex' : 'none',
              paddingVertical: 10,
              paddingHorizontal: 10,
              zIndex: 900,
            },
          ]}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderBottomColor: '#E5E5E5',
              borderBottomWidth: 2,
              paddingVertical: 10,
            }}
          >
            <Text style={{ fontWeight: 'bold', fontSize: 24 }}>Directory</Text>
            <TouchableOpacity onPress={() => handleExpand()}>
              <Text style={{ fontWeight: 'bold', fontSize: 20 }}>X</Text>
            </TouchableOpacity>
          </View>
          <View style={[{ maxHeight: seeMore ? '70%' : '40%' }]}>
            <View
              style={{
                borderBottomColor: '#E5E5E5',
                borderBottomWidth: 2,
                paddingVertical: 10,
              }}
            >
              <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
                Team Members
              </Text>
            </View>
            <ScrollView style={[{ maxHeight: '90%' }]}>
              <View>
                {member.map((item, key) => (
                  // Thay thế MsgItem bằng component tương ứng trong ứng dụng của bạn
                  <MsgItem data={item} key={item?.id} />
                ))}
              </View>
            </ScrollView>
            <TouchableOpacity onPress={handleSeeMore}>
              <Text style={styles.collapseButton}>
                {seeMore ? 'Collapse' : 'See more'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={[{ maxHeight: seeMore ? '25%' : '58%' }]}>
            <View
              style={{
                borderBottomColor: '#E5E5E5',
                borderBottomWidth: 2,
                paddingVertical: 10,
              }}
            >
              <Text style={{ fontSize: 14, fontWeight: 'bold' }}>File</Text>
            </View>
            <ScrollView style={[{ maxHeight: '88%' }]}>
              <View
                style={[
                  styles.scrollItem,
                  { maxHeight: seeMore ? '0vh' : '45vh' },
                ]}
              >
                {file.map((item, key) => (
                  // Thay thế MsgItem bằng component tương ứng trong ứng dụng của bạn
                  <MsgItem data={item} key={item?.id} />
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
        <View style={{ position: 'absolute', bottom: 0, right: 0 }}>
        {/* Toggle Sidebar button */}
        <TouchableOpacity
          style={{
            backgroundColor: '#007bff', // Example background color
            borderRadius: 50, // Round border to make it circular
            width: 50, // Adjust width and height to make it smaller or larger
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 20, // Adjust margin to position it correctly
            marginBottom: 20,
            display: leftBox ? 'flex' : 'none'
          }}
        >
          <Icon name="plus" size={20} color="white" />
          {/* You can replace the Icon component with an Image component if you're using an image */}
        </TouchableOpacity>
      </View>
      </View>
    </View>
  )
}

export default Chat
