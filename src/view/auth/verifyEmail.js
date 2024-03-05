import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useDispatch } from 'react-redux'
import { requestNewCode } from '../../thunks/AuthThunk'
import AsyncStorage from '@react-native-async-storage/async-storage'

function VerifyEmail() {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [email, setEmail] = useState({})

  const save = async () => {
    try {
      const jsonValue = JSON.stringify(email.email)
      await AsyncStorage.setItem('email', jsonValue)
    } catch (e) {
      console.log(e)
    }
  }

  const handleSubmit = () => {
    console.log(email)
    dispatch(requestNewCode(email?.email)).then((reps) => {
      if (!reps.error) {
        save()
        navigation.navigate('confirm-account')
      }
    })
  }

  return (
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
            width: '90%',
            backgroundColor: 'white',
            borderRadius: 10,
            paddingHorizontal: 20,
            paddingVertical: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          <View style={{ alignItems: 'center', paddingVertical: 10 }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 26,
                color: '#367BD6',
                marginVertical: 2,
              }}
            >
              Xác thực tài khoản
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: '#777',
                textAlign: 'center',
              }}
            >
              Vui lòng nhập email mà bạn muốn xác thực:
            </Text>
          </View>
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: 5,
              right: 10,
            }}
            onPress={() => navigation.navigate('Đăng Nhập')}
          >
          <Icon name="close" size={20} color="#ccc" />
          </TouchableOpacity>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 10,
                borderBottomWidth: 1,
                borderBottomColor: '#ccc',
                paddingVertical: 5,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  paddingHorizontal: 5,
                }}
              >
                <Icon name="at" size={20} color="#ccc" />
              </Text>
              <TextInput
                style={{
                  fontSize: 16,
                  paddingHorizontal: 10,
                  paddingVertical: 2,
                  marginTop: 3,
                  width: '90%',
                }}
                placeholder="Email"
                keyboardType="email-address"
                onChangeText={(value) => setEmail({ email: value })}
              />
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: '#3498db',
                padding: 10,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 10,
                marginVertical: 10,
              }}
              onPress={handleSubmit}
            >
              <Text style={{ color: 'white', fontSize: 16 }}>Gửi</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

export default VerifyEmail
