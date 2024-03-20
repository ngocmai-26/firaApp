import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import MsgItem from '../../component/MsgItem'
import { useEffect, useLayoutEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome6'
import BoxMsg from '../../component/BoxMsg'
import { useNavigation } from '@react-navigation/native'
import ModalRoomChat from '../../models/ModalRoomChat'
import NotificationComponent from '../../component/Notification'
import ContactModel from '../../models/ContactModal'
import NavBar from '../../layout/navbar'
import { useDispatch, useSelector } from 'react-redux'
import { getRoomTags } from '../../thunks/RoomThunk'
import RoomItem from './RoomItem'
import RoomMessageGenerator from './RoomMessageGenerator'
import RoomInfo from './RoomInfo'
import { EXPAND_FILE_MEDIA, setRoomToggle } from '../../slices/ToggleSlice'

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    paddingTop: 20,
    height: Dimensions.get('window').height,
  },
  leftColumn: {
    borderRightColor: '#E5E5E5',
    borderRightWidth: 2,
    paddingHorizontal: 10,
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
  const { userRoom } = useSelector((state) => state.roomReducer)
  const [leftBox, setLeftBox] = useState(true)
  const [expandBox, setExpandBox] = useState(false)
  const [expand, setExpand] = useState(false)
  const [seeMore, setSeeMore] = useState(false)
  const [hiddenComponent, setHiddenComponent] = useState(false)
  const [modalSearch, setModalSearch] = useState(false)
  const [room, setRoom] = useState(false)

  const [activeRoom, setActiveRoom] = useState('')

  const dispatch = useDispatch()

  const [hiddenModalRoom, setHiddenModalRoom] = useState(false)

  const handleHiddenModalRoom = () => {
    setHiddenModalRoom(!hiddenModalRoom)
    setExpandBox(!expandBox)
    setLeftBox(!leftBox)
  }
  const navigation = useNavigation()

  const { expandFileMedia } = useSelector((state) => state.toggleReducer).room

  useLayoutEffect(() => {
    dispatch(getRoomTags())
    if (activeRoom == '' && userRoom.length > 0) {
      setActiveRoom(userRoom[0].id)
    }
  }, [])

  useLayoutEffect(() => {
    setRoom(userRoom)
  }, [])

  const handleExpandBox = (id) => {
    setExpandBox(true)
    setLeftBox(false)
    setActiveRoom(id)
  }
  const handleCloseExpandBox = () => {
    setExpandBox(false)
    setLeftBox(true)
    setActiveRoom('')
  }
  const handleExpand = () => {
    dispatch(
      setRoomToggle({
        type: EXPAND_FILE_MEDIA,
        value: !expandFileMedia,
      }),
    )
    setExpand(!expand)
    setExpandBox(!expandBox)
  }

  const handleModalShow = () => {
    setModalSearch(!modalSearch)
  }
  return (
    <NavBar hidden={true}>
      <View style={{ width: Dimensions.get('window').width }}>
        <View style={styles.container}>
          <RoomItem
            activeRoom={activeRoom}
            leftBox={leftBox}
            handleExpandBox={handleExpandBox}
            rooms={userRoom}
            handleModalShow={handleModalShow}
            setActiveRoom={setActiveRoom}
          />

          <RoomMessageGenerator
            rooms={userRoom}
            expandBox={expandBox}
            activeRoom={activeRoom}
            handleCloseExpandBox={handleCloseExpandBox}
            handleExpand={handleExpand}
          />

          {userRoom.map((room, index) => {
            return (
              <RoomInfo
                room={room}
                key={index.toString()}
                activeRoom={activeRoom}
                handleExpand={handleExpand}
              />
            )
          })}
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
                display: leftBox ? 'flex' : 'none',
              }}
              onPress={handleHiddenModalRoom}
            >
              <Icon name="plus" size={20} color="white" />
              {/* You can replace the Icon component with an Image component if you're using an image */}
            </TouchableOpacity>
          </View>
        </View>
        <ModalRoomChat
          hiddenModalRoom={hiddenModalRoom}
          handleHiddenModalRoom={handleHiddenModalRoom}
        />
        {modalSearch && <ContactModel setOpen={setModalSearch} />}
      </View>
    </NavBar>
  )
}

export default Chat
