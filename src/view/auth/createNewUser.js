import React, { useState } from 'react'
import {
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  View,
  Button,
  Image,
} from 'react-native'
import { useDispatch } from 'react-redux'
import { createNewUser } from '../../thunks/AuthThunk'
import { setLogged } from '../../slices/AuthSlice'
import * as ImagePicker from 'expo-image-picker'
import { useNavigation } from '@react-navigation/native'
import { generateRandomCharacters, resolveFilename } from '../../app/ultis.js'
import moment from 'moment'
import Icon from 'react-native-vector-icons/FontAwesome6'
import DateTimePicker from '@react-native-community/datetimepicker'

function CreateNewUser() {
  const dispatch = useDispatch()
  const [newUserData, setNewUserData] = useState({})
  const [errors, setErrors] = useState({})
  const [image, setImage] = useState('')
  const [birthday, setBirthday] = useState(new Date())
  const [mode, setMode] = useState('date')
  const [show, setShow] = useState(false)
  

  const navigation = useNavigation()
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
      // fileName = resolveFilename("png", generateRandomCharacters(12))
      let newFileName = fileName
      if (fileName == null ) {
        newFileName = uri.substring(uri.lastIndexOf('/')+1)
      }
      setImage({ fileName: newFileName, uri })
    }
  }

  const handleCreateNewUser = () => {
    const validationErrors = {}
    if (!newUserData.firstName) {
      validationErrors.firstName = 'Không được bỏ trống'
    }
    if (!newUserData.lastName) {
      validationErrors.lastName = 'Không được bỏ trống'
    }
    if (!newUserData.address) {
      validationErrors.address = 'Không được bỏ trống'
    }
    if (!newUserData.birthday) {
      validationErrors.birthday = 'Không được bỏ trống'
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(newUserData.birthday)) {
      validationErrors.birthday =
        'Định dạng ngày sinh không hợp lệ (VD: 2002-02-02)'
    } else {
      const parts = newUserData.birthday.split('-')
      const year = parseInt(parts[0], 10)
      const month = parseInt(parts[1], 10)
      const day = parseInt(parts[2], 10)
      const dateObject = new Date(year, month - 1, day)

      if (
        dateObject.getFullYear() !== year ||
        dateObject.getMonth() !== month - 1 ||
        dateObject.getDate() !== day
      ) {
        validationErrors.birthday = 'Ngày sinh không hợp lệ'
      }
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    dispatch(createNewUser({ ...newUserData, avatar: image })).then((data) => {
      if (!data.error) {
        navigation.navigate('home')
      }
    })
  }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate
    setShow(false)
    setBirthday(currentDate)
    setNewUserData({ ...newUserData, birthday: moment(currentDate).format('YYYY-MM-DD') })
    
  }

  const showMode = (currentMode) => {
    setShow(true)
    setMode(currentMode)
  }

  const showDatepicker = () => {
    showMode('date')
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ height: '100%' }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              width: '80%',
              backgroundColor: 'white',
              borderRadius: 10,
              padding: 20,
              margin: 20,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            <View style={{ alignItems: 'center' }}>
              <Text
                style={{ fontWeight: 'bold', fontSize: 22, color: '#367BD6' }}
              >
                Thông tin người dùng
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 16,
                  marginBottom: 10,
                  textAlign: 'center',
                  marginVertical: 5,
                }}
              >
                Vui lòng nhập đầy đủ thông tin
              </Text>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {image && (
                  <Image
                    source={{ uri: image.uri }}
                    style={{ width: 200, height: 200, marginVertical: 20 }}
                  />
                )}
                <Button title="Cập nhật ảnh đại diện" onPress={pickImage} />
              </View>
              <View style={{ marginBottom: 10 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    marginVertical: 5,
                  }}
                >
                  FirstName:
                </Text>
                <TextInput
                  style={{
                    fontSize: 16,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    marginTop: 3,
                    width: '100%',
                    borderWidth: 1,
                    borderColor: errors.firstName ? 'red' : '#ccc',
                    borderRadius: 5,
                    marginVertical: 5,
                  }}
                  onChangeText={(value) =>
                    setNewUserData({ ...newUserData, firstName: value })
                  }
                  placeholder="VD: Mai"
                />
                {errors.firstName && (
                  <Text style={{ color: 'red' }}>{errors.firstName}</Text>
                )}
              </View>

              <View style={{ marginBottom: 10 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    marginVertical: 5,
                  }}
                >
                  LastName:
                </Text>
                <TextInput
                  style={{
                    fontSize: 16,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    marginTop: 3,
                    width: '100%',
                    borderWidth: 1,
                    borderColor: errors.lastName ? 'red' : '#ccc',
                    borderRadius: 5,
                    marginVertical: 5,
                  }}
                  onChangeText={(value) =>
                    setNewUserData({ ...newUserData, lastName: value })
                  }
                  placeholder="VD: Nguyễn"
                />
                {errors.lastName && (
                  <Text style={{ color: 'red' }}>{errors.lastName}</Text>
                )}
              </View>

              <View style={{ marginBottom: 10 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    marginVertical: 5,
                  }}
                >
                  Address:
                </Text>
                <TextInput
                  style={{
                    fontSize: 16,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    marginTop: 3,
                    width: '100%',
                    borderWidth: 1,
                    borderColor: errors.address ? 'red' : '#ccc',
                    borderRadius: 5,
                    marginVertical: 5,
                  }}
                  onChangeText={(value) =>
                    setNewUserData({ ...newUserData, address: value })
                  }
                  placeholder="VD: Hồ Chí Minh"
                />
                {errors.address && (
                  <Text style={{ color: 'red' }}>{errors.address}</Text>
                )}
              </View>

              <View style={{ marginBottom: 10 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    marginVertical: 5,
                  }}
                >
                  Birthday:
                </Text>
                 <View
                  style={{
                    flexDirection: 'row',
                    borderWidth: 1,
                    borderColor: '#CCCCCC',
                    borderRadius: 5,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <TextInput
                    style={{
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                    }}
                    placeholder="DD-MM-YYYY"
                    defaultValue={moment(birthday).format('DD-MM-YYYY')}
                   
                  />
                  <TouchableOpacity onPress={showDatepicker} style={{flexDirection: 'row', paddingHorizontal: 5}}>
                    <Icon
                      name="calendar-days"
                      size={20}
                      style={{ color: 'black', alignItems: 'center', marginVertical: 'auto' }}
                    />
                  </TouchableOpacity>
                </View>
                {errors.birthday && (
                  <Text style={{ color: 'red' }}>{errors.birthday}</Text>
                )}
                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={birthday}
                    mode={mode}
                    is24Hour={true}
                    onChange={onChange}
                  />
                )}
              </View>

              <View style={{ marginBottom: 10 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    marginVertical: 5,
                  }}
                >
                  Department:
                </Text>
                <TextInput
                  style={{
                    fontSize: 16,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    marginTop: 3,
                    width: '100%',
                    borderWidth: 1,
                    borderColor: errors.department ? 'red' : '#ccc',
                    borderRadius: 5,
                    marginVertical: 5,
                  }}
                  placeholder="VD: Khoa Công Nghệ Thông Tin"
                  onChangeText={(value) =>
                    setNewUserData({ ...newUserData, department: value })
                  }
                />
                {errors.department && (
                  <Text style={{ color: 'red' }}>{errors.department}</Text>
                )}
              </View>

              <View style={{ marginBottom: 10 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    marginVertical: 5,
                  }}
                >
                  Phone:
                </Text>
                <TextInput
                  style={{
                    fontSize: 16,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    marginTop: 3,
                    width: '100%',
                    borderWidth: 1,
                    borderColor: errors.phone ? 'red' : '#ccc',
                    borderRadius: 5,
                    marginVertical: 5,
                  }}
                  onChangeText={(value) =>
                    setNewUserData({ ...newUserData, phone: value })
                  }
                  placeholder="VD: 0378556845"
                />
                {errors.phone && (
                  <Text style={{ color: 'red' }}>{errors.phone}</Text>
                )}
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 20,
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: '#4a90e2',
                    padding: 10,
                    borderRadius: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '45%',
                  }}
                  onPress={() => {
                    dispatch(setLogged(false))
                  }}
                >
                  <Text style={{ color: 'white', fontSize: 16 }}>
                    Quay lại{' '}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#4a90e2',
                    padding: 10,
                    borderRadius: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '45%',
                  }}
                  onPress={handleCreateNewUser}
                >
                  <Text style={{ color: 'white', fontSize: 16 }}>Tiếp tục</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default CreateNewUser
