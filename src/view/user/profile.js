import { useLayoutEffect, useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome6'
import { logout, setLogged } from '../../slices/AuthSlice'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker'
import { updateUser } from '../../thunks/UserThunk'
import { changePasswordAuth } from '../../thunks/AuthThunk'
import Toast from 'react-native-toast-message'
import { TOAST_ERROR, TOAST_SUCCESS } from '../../constants/toast'
import moment from 'moment'
import DateTimePicker from '@react-native-community/datetimepicker'

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [
    isChangePasswordModalVisible,
    setIsChangePasswordModalVisible,
  ] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState('')
  const [userData, setUserData] = useState({})
  const dispatch = useDispatch()
  const [image, setImage] = useState(null)
  const { user } = useSelector((state) => state.authReducer)
  const [newUserData, setNewUserData] = useState(user)
  const [newDataPassword, setNewDataPassword] = useState({
    email: newUserData?.email,
    oldPassword: '',
    newPassword: '',
  })

  const isStrongPassword = (password) => {
    // Độ dài ít nhất là 8 ký tự
    const isLengthValid = password.length >= 8

    // Kiểm tra xem mật khẩu có chứa ít nhất một chữ cái viết hoa, một chữ cái viết thường, một số và một ký tự đặc biệt hay không
    const containsUpperCase = /[A-Z]/.test(password)
    const containsLowerCase = /[a-z]/.test(password)
    const containsDigit = /[0-9]/.test(password)
    const containsSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
      password,
    )

    // Kiểm tra tất cả các tiêu chí
    return (
      isLengthValid &&
      containsUpperCase &&
      containsLowerCase &&
      containsDigit &&
      containsSpecialCharacter
    )
  }
  const isAdult = (birthdate) => {
    const today = moment();
    const dob = moment(birthdate, 'YYYY-MM-DD');
    const age = today.diff(dob, 'years');
    return age >= 18;
  };
  const handleUpdate = () => {
    if (!isAdult(newUserData.birthday)) {
      Toast.show({
        type: TOAST_ERROR,
        text1: 'Bạn phải đủ 18 tuổi để cập nhật thông tin',
      })
      return
    }

    dispatch(updateUser(newUserData)).then((reps) => {
      if (!reps.error) {
        setIsEditing(false)
      }
    })
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }

  useLayoutEffect(() => {
    const user = async () => {
      try {
        return await AsyncStorage.getItem('user')
      } catch (e) {
        console.log('Error when removing..')
      }
    }
    user().then((data) => {
      setUserData(JSON.parse(data))
    })
  }, [])

  const handleChangePassword = () => {
    setIsChangePasswordModalVisible(true)
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  const handleSavePassword = () => {
    if (
      !newDataPassword?.oldPassword ||
      !newDataPassword.newPassword ||
      !confirmPassword
    ) {
      Toast.show({
        type: TOAST_ERROR,
        text1:
          'Vui lòng nhập cả mật khẩu cũ, mật khẩu mới và xác nhận mật khẩu',
      })
      return
    }

    if (newDataPassword.newPassword !== confirmPassword) {
      Toast.show({
        type: TOAST_ERROR,
        text1: 'Mật khẩu mới và xác nhận mật khẩu không khớp',
      })
      return
    }

    // Kiểm tra mật khẩu mới có đủ mạnh không
    if (!isStrongPassword(newDataPassword.newPassword)) {
      Toast.show({
        type: TOAST_ERROR,
        text1: 'Mật khẩu mới không đủ mạnh',
      })
      return
    }

    // Thực hiện thay đổi mật khẩu
    dispatch(changePasswordAuth(newDataPassword))
  }

  const [birthday, setBirthday] = useState(new Date())
  const [mode, setMode] = useState('date')
  const [show, setShow] = useState(false)
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate
    setShow(false)
    setBirthday(currentDate)
    setNewUserData({
      ...newUserData,
      birthday: moment(currentDate).format('YYYY-MM-DD'),
    })
  }

  const showMode = (currentMode) => {
    setShow(true)
    setMode(currentMode)
  }

  const showDatepicker = () => {
    showMode('date')
  }

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ position: 'relative' }}>
          <Image
            source={{ uri: image || userData?.avatar }}
            style={{ width: 100, height: 100, borderRadius: 100 }}
          />
          {/* {isEditing && (
            <TouchableOpacity
              style={[
                styles.avatarContainer,
                {
                  flexDirection: 'row',
                  borderWidth: 1,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 5,
                  borderColor: '#3498db',
                  marginVertical: 5,
                },
              ]}
              onPress={pickImage}
            >
              <Icon name="upload" size={20} color="#3498db" />
              <Text
                style={{
                  marginLeft: 5,
                }}
              >
                Upload ảnh
              </Text>
            </TouchableOpacity>
          )} */}
        </View>

        <TouchableOpacity
          onPress={() => setIsEditing(!isEditing)}
          style={{
            borderColor: 'blue',
            flexDirection: 'row',
            borderWidth: 1,
            position: 'absolute',
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 5,
            borderColor: isEditing ? '#ccc' : '#3498db',
            top: 5,
            right: 5,
          }}
        >
          <Icon
            name="edit"
            size={20}
            style={{
              color: isEditing ? '#ccc' : '#3498db',
            }}
          />
          {isEditing ? (
            <Text
              style={{
                color: '#ccc',
                marginLeft: 5,
              }}
            >
              Cancel
            </Text>
          ) : (
            <Text
              style={{
                color: '#3498db',
                marginLeft: 5,
              }}
            >
              Edit profile
            </Text>
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.infoContainer}>
        <View style={{ flexDirection: 'row', gap: 5 }}>
          <View style={{ flex: 0.5 }}>
            <TextInput
              style={styles.input}
              value={newUserData?.firstName}
              onChangeText={(value) =>
                setNewUserData({ ...newUserData, firstName: value })
              }
              editable={isEditing}
              placeholder="First Name"
            />
          </View>
          <View style={{ flex: 0.5 }}>
            <TextInput
              style={styles.input}
              value={newUserData?.lastName}
              onChangeText={(value) =>
                setNewUserData({ ...newUserData, lastName: value })
              }
              editable={isEditing}
              placeholder="Last Name"
            />
          </View>
        </View>
        <TextInput
          style={styles.input}
          value={newUserData?.address}
          onChangeText={(value) =>
            setNewUserData({ ...newUserData, address: value })
          }
          editable={isEditing}
          placeholder="Address"
        />
        <TextInput
          style={styles.input}
          value={newUserData?.department}
          onChangeText={(value) =>
            setNewUserData({ ...newUserData, department: value })
          }
          editable={isEditing}
          placeholder="Department"
        />

        {!isEditing ? (
          <TextInput
            style={styles.input}
            value={moment(newUserData?.birthday).format('DD-MM-YYYY')}
            onChangeText={(value) =>
              setNewUserData({ ...newUserData, department: value })
            }
            editable={isEditing}
            placeholder="Department"
          />
        ) : (
          <View style={{ marginBottom: 10 }}>
            <View
              style={{
                flexDirection: 'row',
                borderRadius: 5,
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderColor: '#ccc',
                marginBottom: 10,
                paddingVertical: 8,
              }}
            >
              <TextInput
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}
                placeholder="DD-MM-YYYY"
                defaultValue={moment(newUserData?.birthday).format(
                  'DD-MM-YYYY',
                )}
              />
              <TouchableOpacity
                onPress={showDatepicker}
                style={{ flexDirection: 'row', paddingHorizontal: 5 }}
              >
                <Icon
                  name="calendar-days"
                  size={20}
                  style={{
                    color: 'black',
                    alignItems: 'center',
                    marginVertical: 'auto',
                  }}
                />
              </TouchableOpacity>
            </View>
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
        )}
        <TextInput
          style={styles.input}
          value={newUserData?.email}
          onChangeText={(value) =>
            setNewUserData({ ...newUserData, email: value })
          }
          editable={isEditing}
          placeholder="Email"
        />
        <TextInput
          style={styles.input}
          value={newUserData?.phone}
          onChangeText={(value) =>
            setNewUserData({ ...newUserData, phone: value })
          }
          editable={isEditing}
          placeholder="Phone"
        />
        {isEditing && (
          <TouchableOpacity onPress={handleUpdate} style={styles.saveButton}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity
        onPress={handleChangePassword}
        style={styles.changePasswordButton}
      >
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleLogout}
        style={styles.changePasswordButton}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 5,
          padding: 10,
          backgroundColor: 'white',
          width: Dimensions.get('window').width,
          position: 'absolute',
          height: Dimensions.get('window').height,
          display: isChangePasswordModalVisible ? 'flex' : 'none',
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Mật khẩu cũ"
              secureTextEntry
              defaultValue={newDataPassword?.oldPassword}
              onChangeText={(e) =>
                setNewDataPassword({ ...newDataPassword, oldPassword: e })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Mật khẩu mới"
              secureTextEntry
              defaultValue={newDataPassword?.newPassword}
              onChangeText={(e) =>
                setNewDataPassword({ ...newDataPassword, newPassword: e })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Nhập lại mật khẩu mới"
              secureTextEntry
              defaultValue={confirmPassword}
              onChangeText={(e) => setConfirmPassword(e)}
            />
            <TouchableOpacity
              onPress={handleSavePassword}
              style={styles.saveButton}
            >
              <Text style={styles.buttonText}>Lưu</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsChangePasswordModalVisible(false)}
              style={styles.cancelButton}
            >
              <Text style={styles.buttonText}>Hủy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    position: 'relative',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  //   editIcon: {
  //     position: 'absolute',

  //   },
  infoContainer: {
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  saveButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  changePasswordButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  modal: {},
  modalContainer: {
    flex: 1,
    paddingTop: 50,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  cancelButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
})

export default Profile
