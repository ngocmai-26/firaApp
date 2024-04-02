import { useLayoutEffect, useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Image,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { logout, setLogged } from '../../slices/AuthSlice'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker'
import { updateUser } from '../../thunks/UserThunk'

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [
    isChangePasswordModalVisible,
    setIsChangePasswordModalVisible,
  ] = useState(false)
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [userData, setUserData] = useState({})
  const dispatch = useDispatch()
  const [image, setImage] = useState(null)

  const [changePassword, setChangePassword] = useState(false);
  const { isFetching, errors, user } = useSelector(
    (state) => state.authReducer
  );
  const [newUserData, setNewUserData] = useState(user);
  const handleSubmit = () => {
    console.log("newUserData", newUserData);
  };


  const handleUpdate = () => {
    setIsEditing(false)
    console.log("newUserData", newUserData)
    dispatch(updateUser(newUserData));
  };

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

  const handleSaveProfile = () => {
    // Logic to save profile information
    setIsEditing(false)
  }

  const handleChangePassword = () => {
    setIsChangePasswordModalVisible(true)
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  const handleSavePassword = () => {
    // Logic to save new password
    setIsChangePasswordModalVisible(false)
  }

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ position: 'relative' }}>
          <Image
            source={{ uri: image || userData?.avatar }}
            style={{ width: 100, height: 100, borderRadius: 100 }}
          />
          {isEditing && <TouchableOpacity
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
          </TouchableOpacity>}
          
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
          onChangeText={(value) => setNewUserData({ ...newUserData, address: value })}
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
        <TextInput
          style={styles.input}
          value={newUserData?.email}
          onChangeText={(value) => setNewUserData({ ...newUserData, email: value })}
          editable={isEditing}
          placeholder="Email"
        />
        <TextInput
          style={styles.input}
          value={newUserData?.phone}
          onChangeText={(value) => setNewUserData({ ...newUserData, phone: value })}
          editable={isEditing}
          placeholder="Phone"
        />
        {isEditing && (
          <TouchableOpacity
            onPress={handleUpdate}
            style={styles.saveButton}
          >
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
      <Modal visible={isChangePasswordModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Old Password"
              secureTextEntry
              value={oldPassword}
              onChangeText={setOldPassword}
            />
            <TextInput
              style={styles.input}
              placeholder="New Password"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm New Password"
              secureTextEntry
              value={confirmNewPassword}
              onChangeText={setConfirmNewPassword}
            />
            <TouchableOpacity
              onPress={handleSavePassword}
              style={styles.saveButton}
            >
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsChangePasswordModalVisible(false)}
              style={styles.cancelButton}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
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
