import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
  Image,
} from 'react-native'
import { RadioButton } from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome6'

const ModalRoomChat = ({ handleHiddenModalRoom, hiddenModalRoom }) => {
  const [selectedButtons, setSelectedButtons] = useState([])
  const [selectedTag, setSelectedTag] = useState(null)
  const [user, setUser] = useState({})
  const [selectedValue, setSelectedValue] = useState('option1')

  const handleRadioClick = (item) => {
    if (selectedButtons.some((button) => button.id === item.id)) {
      setSelectedButtons(
        selectedButtons.filter((button) => button.id !== item.id),
      )
    } else {
      setSelectedButtons([...selectedButtons, item])
    }
  }

  const handleRemoveSelectUser = (item) => {
    setSelectedButtons(
      selectedButtons.filter((button) => button.id !== item.id),
    )
  }

  const handleTagClick = (tagId) => {
    setSelectedTag(tagId)
  }

  const handleCreateGroup = () => {
    console.log('Các thành viên đã chọn:', selectedButtons)
  }

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
      name: 'Đăng Văn Nam Đăng Văn Nam Đăng Văn Nam',
      img:
        'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
      content: 'abc@gmail.com',
    },
    {
      id: 3,
      name: 'Đăng Văn x',
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
      name: 'Đăng Văn Nam Đăng Văn Nam  Đăng Văn Nam',
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
  ]

  const tags = [
    {
      id: 1,
      nameTag: 'Gia đình',
    },
    {
      id: 2,
      nameTag: 'Bạn bè',
    },
    {
      id: 3,
      nameTag: 'Công việc',
    },
    {
      id: 4,
      nameTag: 'Khách hàng',
    },
    {
      id: 5,
      nameTag: 'Trả lời sau',
    },
    {
      id: 1,
      nameTag: 'Gia đình',
    },
    {
      id: 2,
      nameTag: 'Bạn bè',
    },
    {
      id: 3,
      nameTag: 'Công việc',
    },
    {
      id: 4,
      nameTag: 'Khách hàng',
    },
    {
      id: 5,
      nameTag: 'Trả lời sau',
    },
  ]

  return (
    <View
      style={[
        {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#b5b3b354',
          margin: 'auto',
          borderRadius: 5,
        },
        hiddenModalRoom ? { display: 'flex' } : { display: 'none' },
      ]}
    >
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View
          style={{
            backgroundColor: 'white',
            width: '90%',
            borderRadius: 8,
            padding: 16,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Tạo nhóm</Text>
            <TouchableOpacity onPress={handleHiddenModalRoom}>
              <Icon name="xmark" size={20} color="#ccc" />
            </TouchableOpacity>
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#ccc',
              marginVertical: 8,
            }}
          />
          <View
            style={{
              marginVertical: 10,
              width: '100%',
              borderWidth: 1,
              borderColor: '#ccc',
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 5,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <TextInput
                placeholder="Nhập tên nhóm"
                style={{ fontSize: 16, flex: 1 }}
              />
            </View>
          </View>
          <View
            style={{
              marginVertical: 10,
              width: '100%',
              borderWidth: 1,
              borderColor: '#ccc',
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 5,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <Icon
                name="magnifying-glass"
                size={16}
                style={{ fontWeight: 600 }}
                color="#ccc"
              />
              <TextInput
                placeholder="Tìm kiếm"
                style={{ fontSize: 16, flex: 1 }}
              />
            </View>
          </View>

          <View>
            <ScrollView horizontal={true}>
              {tags.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={{
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    backgroundColor:
                      selectedTag === item.id ? '#4a90e2' : '#ddd',
                    borderRadius: 4,
                    marginRight: 8,
                    marginBottom: 8,
                  }}
                  onPress={() => handleTagClick(item.id)}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      color: selectedTag === item.id ? 'white' : 'black',
                    }}
                  >
                    {item.nameTag}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <View
            style={{
              alignItems: 'center',
              marginVertical: 8,
              borderWidth: 1,
              borderRadius: 4,
              borderColor: '#ccc',
            }}
          >
            <ScrollView style={{ width: '100%', height: 260 }}>
              {member.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={{
                    width: Dimensions.get('window').width * 0.85,
                    paddingVertical: 5,
                  }}
                  onPress={() => handleRadioClick(item)}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingHorizontal: 5,
                      width: '100%',
                      alignSelf: 'stretch',
                    }}
                  >
                    <RadioButton.Android
                      value={item.id}
                      status={
                        selectedButtons.some((button) => button.id === item.id)
                          ? 'checked'
                          : 'unchecked'
                      }
                      onPress={() => handleRadioClick(item)}
                      color="#007BFF"
                    />
                    <View
                      style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                      <View
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 25,
                          overflow: 'hidden',
                          marginHorizontal: 6,
                        }}
                      >
                        <Image
                          source={{ uri: item.img }}
                          style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: 20,
                          }}
                        />
                      </View>
                      <View style={{ overflow: 'hidden', flex: 1 }}>
                        <Text numberOfLines={1} style={{ fontSize: 14 }}>
                          {item.name}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginTop: 16,
            }}
          >
            <TouchableOpacity
              onPress={handleHiddenModalRoom}
              style={{
                backgroundColor: '#ddd',
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderRadius: 4,
                marginRight: 8,
              }}
            >
              <Text>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleCreateGroup}
              style={{
                backgroundColor: '#4a90e2',
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderRadius: 4,
              }}
            >
              <Text style={{ color: 'white' }}>Tạo nhóm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

export default ModalRoomChat
