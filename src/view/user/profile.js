import { useState } from 'react'
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
import { logout } from '../../slices/AuthSlice'
import { useDispatch } from 'react-redux'

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [
    isChangePasswordModalVisible,
    setIsChangePasswordModalVisible,
  ] = useState(false)
  const [name, setName] = useState('John Doe')
  const [address, setAddress] = useState('123 Main Street')
  const [department, setDepartment] = useState('Engineering')
  const [email, setEmail] = useState('john.doe@example.com')
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const dispatch = useDispatch();

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
        <TouchableOpacity style={styles.avatarContainer}>
          <Image
            source={{
              uri:
                'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
            }}
            style={{ width: 100, height: 100, borderRadius: 100 }}
          />
        </TouchableOpacity>
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
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          editable={isEditing}
          placeholder="Name"
        />
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={setAddress}
          editable={isEditing}
          placeholder="Address"
        />
        <TextInput
          style={styles.input}
          value={department}
          onChangeText={setDepartment}
          editable={isEditing}
          placeholder="Department"
        />
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          editable={isEditing}
          placeholder="Email"
        />
        {isEditing && (
          <TouchableOpacity
            onPress={handleSaveProfile}
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
