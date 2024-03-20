import { useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { register } from '../../thunks/AuthThunk'
import { useDispatch } from 'react-redux'
import Storage from 'expo-storage'
import AsyncStorage from '@react-native-async-storage/async-storage'

function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [registerData, setRegisterData] = useState({})
  const [error, setError] = useState('')
  const navigation = useNavigation()

  const dispatch = useDispatch()

  useEffect(() => {
    const item = { username, password, confirmPassword }

    setRegisterData(item)
  }, [username, password, confirmPassword])

  const handleRegister = () => {
    // Kiểm tra xem các trường đã được điền đầy đủ thông tin chưa
    if (!username || !password || !confirmPassword) {
      setError('Vui lòng điền đầy đủ thông tin.')
      return
    }

    // Kiểm tra mật khẩu có đủ mạnh không
    const strongRegex = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
    )
    if (!strongRegex.test(password)) {
      setError(
        'Mật khẩu phải chứa ít nhất 8 ký tự bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.',
      )
      return
    }

    // Kiểm tra xem mật khẩu có khớp với mật khẩu nhập lại không
    if (password !== confirmPassword) {
      setError('Mật khẩu không khớp. Vui lòng nhập lại.')
      return
    }
    const save = async () => {
      try {
        const jsonValue = JSON.stringify(registerData.username)
        await AsyncStorage.setItem('email', jsonValue)
      } catch (e) {
        console.log(e)
      }
    }

    dispatch(register(registerData)).then((reps) => {
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
            width: '80%',
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
          <View style={{ marginVertical: 10 }}>
            <Text
              style={{
                fontSize: 32,
                fontWeight: 'bold',
                marginBottom: 10,
                color: 'black',
                textAlign: 'center',
                color: '#367BD6',
              }}
            >
              Đăng ký
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: '#777',
                marginBottom: 5,
                textAlign: 'center',
              }}
            >
              Vui lòng nhập đầy đủ thông tin thông tin:
            </Text>
          </View>
          <View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderBottomColor: '#ccc',
                marginVertical: 10,
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
                <Icon name="user" size={20} color="#ccc" />
              </Text>
              <TextInput
                style={{
                  fontSize: 16,
                  paddingHorizontal: 10,
                  paddingVertical: 2,
                  marginTop: 3,
                  width: '92%',
                }}
                placeholder="Tên đăng nhập"
                onChangeText={(value) => setUsername(value)}
              />
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderBottomColor: '#ccc',
                marginVertical: 5,
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
                <Icon name="lock" size={20} color="#ccc" />
              </Text>
              <TextInput
                style={{
                  fontSize: 16,
                  paddingHorizontal: 10,
                  paddingVertical: 2,
                  marginTop: 3,
                  width: '92%',
                  marginVertical: 5,
                  paddingVertical: 5,
                }}
                placeholder="Mật khẩu"
                secureTextEntry={true}
                onChangeText={(value) => setPassword(value.trim())}
              />
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderBottomColor: '#ccc',
                marginVertical: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  paddingHorizontal: 5,
                }}
              >
                <Icon name="lock" size={20} color="#ccc" />
              </Text>
              <TextInput
                style={{
                  fontSize: 16,
                  paddingHorizontal: 10,
                  paddingVertical: 2,
                  marginTop: 3,
                  width: '92%',
                  marginVertical: 5,
                }}
                placeholder="Nhập lại mật khẩu"
                secureTextEntry={true}
                onChangeText={(value) => setConfirmPassword(value.trim())}
              />
            </View>
            {error && (
              <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>
            )}
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginVertical: 20,
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: '#3498db',
                padding: 10,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
                width: '45%',
                marginRight: 10,
              }}
              onPress={() => navigation.navigate('Đăng Nhập')}
            >
              <Text style={{ color: 'white', fontSize: 16 }}>Đăng Nhập</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: '#3498db',
                padding: 10,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
                width: '45%',
                marginRight: 10,
              }}
              onPress={handleRegister}
            >
              <Text style={{ color: 'white', fontSize: 16 }}>Đăng Ký</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Register
