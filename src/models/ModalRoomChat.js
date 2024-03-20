import React, { useLayoutEffect, useState } from 'react'
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
import { useDispatch, useSelector } from 'react-redux'
import { DEFAULT_AVATAR } from '../app/static'
import { createNewRoom } from '../thunks/RoomThunk'
import Toast from 'react-native-toast-message'
import { TOAST_ERROR } from '../constants/toast'

const ModalRoomChat = ({ handleHiddenModalRoom, hiddenModalRoom }) => {
  const [selectedButtons, setSelectedButtons] = useState([])
  const [selectedTag, setSelectedTag] = useState([])
  const [room, setRoom] = useState('')
  const [searchContact, setSearchContact] = useState([])

  const { roomTags, isLoading } = useSelector((state) => state.roomReducer)
  const { allContact } = useSelector((state) => state.contactReducer)
  const { user } = useSelector((state) => state.authReducer)
  const dispatch = useDispatch()

  const [query, setQuery] = useState('')
  const [searching, setSearching] = useState(false)

  // useLayoutEffect((), [allContact])

  const handleSearch = (q) => {
    const temp = []
    q = q.trim()

    if (q == '') {
      setSearchContact(allContact)
      return
    }

    allContact.forEach((element) => {
      const me =
        user?.id == element?.owner.id ? element?.relate : element?.owner
      if (
        me?.fullName?.includes(q) ||
        me?.email?.includes(q) ||
        me?.phone?.includes(q)
      ) {
        temp.push(element)
      }
    })

    setSearchContact(temp)
  }

  const handleRadioClick = (buttonId) => {
    if (selectedButtons.some((item) => item.id === buttonId.id)) {
      setSelectedButtons(
        selectedButtons.filter((item) => item.id !== buttonId.id),
      )
    } else {
      setSelectedButtons([...selectedButtons, buttonId])
    }
  }

  const handleRemoveSelectUser = (item) => {
    setSelectedButtons(selectedButtons.filter((props) => item.id !== props.id))
  }

  const handleTagClick = (tagId) => {
    const sel = [...selectedTag]
    if (sel.includes(tagId)) {
      sel.splice(sel.indexOf(tagId), 1)
    } else {
      sel.push(tagId)
    }
    setSelectedTag(sel)
  }
  const handleCreateRoom = () => {
    if (selectedButtons.length == 0) {
      Toast.show({
        type: TOAST_ERROR,
        text1: 'Hãy chọn một thành viên',
      })
      return
    }
    if (selectedTag.length == 0) {
      Toast.show({
        type: TOAST_ERROR,
        text1: 'Hãy chọn một thẻ',
      })
      return
    }

    if (room.trim().length == 0) {
      Toast.show({
        type: TOAST_ERROR,
        text1: 'Hãy nhập tên nhóm',
      })
      return
    }
    const selectedMember = selectedButtons.map((btn) => btn.id)
    selectedMember.push(user?.id)

    const roomData = {
      roomName: room,
      maxCountMember: 50,
      roomTagsId: selectedTag,
      initMember: selectedMember,
    }

    dispatch(createNewRoom(roomData)).then((resp) => {
      if (resp?.payload) {
        setRoom('')
        setSelectedButtons([])
        handleHiddenModalRoom(false)
      }
    })
  }

  useLayoutEffect(() => {
    setSearchContact(allContact)
  }, [allContact])
  useLayoutEffect(() => {
    handleSearch(query)
  }, [query])

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
                onChangeText={(value) => setRoom(value)}
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
                onChangeText={(value) => setQuery(value)}
              />
            </View>
          </View>

          <View>
            <ScrollView horizontal={true}>
              {roomTags.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={{
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    backgroundColor: selectedTag.includes(item.id)
                      ? '#4a90e2'
                      : '#ddd',
                    borderRadius: 4,
                    marginRight: 8,
                    marginBottom: 8,
                  }}
                  onPress={() => handleTagClick(item.id)}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      color: selectedTag.includes(item.id) ? 'white' : 'black',
                    }}
                  >
                    {item.name}
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
              {searchContact.map((item) => {
                const me =
                  user?.id == item?.owner.id ? item?.relate : item?.owner
                return (
                  <TouchableOpacity
                    key={me.id}
                    style={{
                      width: Dimensions.get('window').width * 0.85,
                      paddingVertical: 5,
                    }}
                    onPress={() => handleRadioClick(me)}
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
                        value={me.id}
                        status={
                          selectedButtons.some((button) => button.id === me.id)
                            ? 'checked'
                            : 'unchecked'
                        }
                        onPress={() => handleRadioClick(me)}
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
                            source={{ uri: me?.avatar || DEFAULT_AVATAR }}
                            style={{
                              width: '100%',
                              height: '100%',
                              borderRadius: 20,
                            }}
                          />
                        </View>
                        <View style={{ overflow: 'hidden', flex: 1 }}>
                          <Text
                            numberOfLines={1}
                            style={{ fontSize: 14, fontWeight: 600 }}
                          >
                            {me.fullName}
                          </Text>
                          <Text numberOfLines={1} style={{ fontSize: 12 }}>
                            {me.email}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                )
              })}
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
              style={{
                backgroundColor: '#4a90e2',
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderRadius: 4,
              }}
              onPress={handleCreateRoom}
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
