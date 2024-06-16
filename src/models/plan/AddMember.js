import React, { useEffect, useLayoutEffect, useState } from 'react'
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
import { addNewMember, createNewRoom } from '../thunks/RoomThunk'
import Toast from 'react-native-toast-message'
import { TOAST_ERROR } from '../constants/toast'

const AddMember = ({
  handleHiddenModalRoom,
  hiddenModalRoom,
  roomAddMember,
}) => {
  const [selectedButtons, setSelectedButtons] = useState([])
  const [room, setRoom] = useState('')
  const [searchContact, setSearchContact] = useState([])

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

    console.log("roomAddMember.id", roomAddMember.id)
    console.log("roomAddMember",  { userId: buttonId.id, adderId: user.id })
    dispatch(
      addNewMember({
        roomId: roomAddMember.id,
        data: { userId: buttonId.id, adderId: user.id },
      })
    );
  }

  const handleRemoveSelectUser = (item) => {
    setSelectedButtons(selectedButtons.filter((props) => item.id !== props.id))
  }


  useEffect(() => {

    const accountRoom = roomAddMember?.members?.filter((item1) =>
      allContact?.some(
        (item2) =>
          item2?.relate?.id === item1?.id || item2?.owner?.id === item1?.id,
      ),
    )

    setSelectedButtons(accountRoom)
  }, [roomAddMember])

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
                          selectedButtons?.some((button) => button.id === me.id)
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
          {/* <View
            style={{
              alignItems: 'center',
              marginVertical: 8,
              borderWidth: 1,
              borderRadius: 4,
              borderColor: '#ccc',
            }}
          >
            <Text>Đã chọn</Text>
            <ScrollView style={{ width: '100%', height: 260 }}>
              {searchContact.map((item) => {
                const me =
                  user?.id == item?.owner.id ? item?.relate : item?.owner
                return (
                  <>
                    {selectedButtons?.some((button) => button.id === me.id) && (
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
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}
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
                          <TouchableOpacity>
                            <Text>X</Text>
                          </TouchableOpacity>
                        </View>
                      </TouchableOpacity>
                    )}
                  </>
                )
              })}
            </ScrollView>
          </View> */}
        </View>
      </View>
    </View>
  )
}

export default AddMember
