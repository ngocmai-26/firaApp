import { useState } from 'react'
import { Text, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import { View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { createNewUser } from '../../thunks/AuthThunk'
import { useNavigation } from '@react-navigation/native'
import { logout } from '../../slices/AuthSlice'

function CreateNewUser() {
  const dispatch = useDispatch()
  const [newUserData, setNewUserData] = useState({})

  const { isFetching, errors } = useSelector((state) => state.authReducer)
  const handleCreateNewUser = () => {
    dispatch(createNewUser(newUserData))
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
                    borderColor: '#ccc',
                    borderRadius: 5,
                    marginVertical: 5,
                  }}
                  onChangeText={(value) =>
                    setNewUserData({ ...newUserData, firstName: value })
                  }
                  placeholder="VD: Mai"
                />
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
                    borderColor: '#ccc',
                    borderRadius: 5,
                    marginVertical: 5,
                  }}
                  onChangeText={(value) =>
                    setNewUserData({ ...newUserData, lastName: value })
                  }
                  placeholder="VD: Nguyễn"
                />
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
                    borderColor: '#ccc',
                    borderRadius: 5,
                    marginVertical: 5,
                  }}
                  onChangeText={(value) =>
                    setNewUserData({ ...newUserData, address: value })
                  }
                  placeholder="VD: Hồ Chí Minh"
                />
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
                <TextInput
                  style={{
                    fontSize: 16,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    marginTop: 3,
                    width: '100%',
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 5,
                    marginVertical: 5,
                  }}
                  placeholder="VD: 2002-20-12"
                  onChangeText={(value) =>
                    setNewUserData({ ...newUserData, birthday: value })
                  }
                />
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
                    borderColor: '#ccc',
                    borderRadius: 5,
                    marginVertical: 5,
                  }}
                  placeholder="VD: Khoa Công Nghệ Thông Tin"
                  onChangeText={(value) =>
                    setNewUserData({ ...newUserData, department: value })
                  }
                />
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
                    borderColor: '#ccc',
                    borderRadius: 5,
                    marginVertical: 5,
                  }}
                  onChangeText={(value) =>
                    setNewUserData({ ...newUserData, phone: value })
                  }
                  placeholder="VD: 0378556845"
                />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  marginTop: 20,
                }}
              >
                {/* <TouchableOpacity
                  onPress={() => dispatch(logout())}
                  style={{
                    flex: 1,
                    backgroundColor: '#4a90e2',
                    padding: 10,
                    borderRadius: 5,
                    marginRight: 10,
                  }}
                >
                  <Text style={{ color: 'white', textAlign: 'center' }}>
                    Quay lại
                  </Text>
                </TouchableOpacity> */}

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
