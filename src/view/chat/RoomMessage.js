import {
  Dimensions,
  Image,
  ScrollView,
  TextInput,
} from 'react-native'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import * as ImagePicker from 'expo-image-picker'

import Icon from 'react-native-vector-icons/FontAwesome6'
import BoxMsg from '../../component/BoxMsg'
import {  useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sendMessage } from '../../thunks/RoomThunk'
import Toast from 'react-native-toast-message'
import { TOAST_ERROR } from '../../constants/toast'
const styles = StyleSheet.create({
  rightColumn: {
    width: '100%',
    position: 'relative',
    left: 0,
    backgroundColor: 'white',
    borderRightColor: '#E5E5E5',
    borderRightWidth: 2,
    height: '100%',
  },
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
})
function RoomMessage({
  room,
  activeRoom,
  handleCloseExpandBox,
  handleExpand,
}) {
  const contentRef = useRef(null)

  return (
    <RoomMessageContainer active={activeRoom == room?.id}>
      <RoomHeader
        room={room}
        handleCloseExpandBox={handleCloseExpandBox}
        handleExpand={handleExpand}
      />
      <RoomMessageContent
        messages={room.allMessages.content}
        contentRef={contentRef}
      />
      <RoomInput room={room} contentRef={contentRef} />
    </RoomMessageContainer>
  )
}

export default RoomMessage

const RoomMessageContainer = (props) => {
  return (
    <View
      style={[
        styles.rightColumn,
        {
          display: 'flex' ,
          paddingVertical: 10,
          paddingLeft: 10,
        },
      ]}
    >
      {props.children}
    </View>
  )
}

const RoomHeader = ({ room, handleCloseExpandBox, handleExpand }) => {
  return (
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
          <TouchableOpacity onPress={handleCloseExpandBox}>
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
            {room.roomName}
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
          onPress={() => {
            handleExpand()
          }}
          style={{
            paddingHorizontal: 5,
          }}
        >
          <Icon name="ellipsis-vertical" size={26} color="#007bff" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const RoomMessageContent = ({ messages, contentRef }) => {
  
  return (
    <View>
      <ScrollView
        style={{
          maxHeight: Dimensions.get('window').height * 0.85,
          width: '100%',
        }}
      >
        <View
          style={{
            maxHeight: '80%',
          }}
        >
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 10 }}>12:33 04/04/2023</Text>
          </View>
          <View>
            {[...messages].reverse().map((item) => (
              <BoxMsg data={item} />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const RoomStatus = ({ room }) => {}
const RoomInput = ({ room, contentRef }) => {
  const { user } = useSelector((state) => state.authReducer)
  const [selectedImages, setSelectedImages] = useState([])
  const fileInputRef = useRef(null)
  const addImageInputRef = useRef(null)
  const handleRemoveImage = (index) => {
    const tem = [...selectedImages]
    tem.splice(index, 1)
    setSelectedImages(tem)
  }
  const handleImageChange = (e) => {
    setSelectedImages([...e.target.files])
  }
  const [message, setMessage] = useState('')
  const dispatch = useDispatch()
  const [imageAdd, setImage] = useState('')

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      const { fileName, uri } = result.assets[0]
      let newFileName = fileName
      if (fileName == null) {
        newFileName = uri.substring(uri.lastIndexOf('/') + 1)
      }
      setSelectedImages([...selectedImages, ...result.assets])
      setImage([...imageAdd, { fileName: newFileName, uri }])
    }
  }

  const handleSendMessage = () => {
    if (message.length == 0) {
      Toast.show({
        type: TOAST_ERROR,
        text1: 'Hãy nhập gì đó',
      })
      return
    }
    const selectedMedia = selectedImages.map((image) => {
      return {
        mediaLink: imageAdd.fileName,
        mediaType: image.mimeType,
        senderId: user.id,
        sendAt: new Date(),
        mediaName: imageAdd.fileName,
        mediaSize: image.filesize,
      }
    })

    const msgData = {
      content: message,
      media: [...selectedMedia],
      roomId: room.id,
    }
    const dataNew = {
      image: imageAdd,
      msgData:msgData,
    }
    dispatch(sendMessage(dataNew)).then((resp) => {
      if (resp?.payload) {
        setMessage('')
      }
    })
    setSelectedImages([])
    setImage([])
  }

  return (
    <View
      style={{
        position: 'absolute',
        borderBottomColor: '#E5E5E5',
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
              justifyContent: '',
              gap: 10,
            }}
          >
            {selectedImages.map((image, index) => (
              <View
                key={index}
                style={{ position: 'relative', paddingVertical: 2 }}
              >
                <Image
                  source={{ uri: image.uri }}
                  style={{ width: 70, height: 70 }}
                />
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    top: -5,
                    right: -5,
                    backgroundColor: 'red',
                    borderRadius: 50,
                  }}
                  onPress={() => handleRemoveImage(index)}
                >
                  <Icon
                    name="xmark"
                    color="black"
                    style={{
                      fontSize: 16,
                      paddingHorizontal: 5,
                      paddingVertical: 3,
                    }}
                  ></Icon>
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
            defaultValue={message}
            onChangeText={(value) => setMessage(value)}
          />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            style={{
              padding: 10,
              borderRadius: 5,
              marginRight: 5,
            }}
            onPress={handleSendMessage}
          >
            <Icon
              name="paper-plane"
              color="#007bff"
              style={{ fontSize: 26 }}
            ></Icon>
          </TouchableOpacity>
          <TouchableOpacity onPress={pickImage}>
            <Icon
              name="file-arrow-up"
              color="#007bff"
              style={{ fontSize: 24 }}
            ></Icon>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
