import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { useDispatch } from 'react-redux'
import { confirmForgotPassword, requestNewCode } from '../../thunks/AuthThunk'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: '80%',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logo: {
    paddingBottom: 20,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#367BD6',
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FDF7DF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FEEC6F',
    marginBottom: 25,
  },
  toastIcon: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  toastText: {
    flex: 1,
    color: '#C9971C',
  },
  formGroup: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#4a90e2',
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
})
function ConfirmForgotPassword() {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const [code, setCode] = useState({})

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('email')

      return jsonValue != null ? JSON.parse(jsonValue) : null
    } catch (e) {
      console.log('get', e)
    }
  }
  const remove = async () => {
    try {
      await AsyncStorage.removeItem('email')
    } catch (e) {
      console.log('Error when removing..')
    }
  }

  useEffect(() => {
    getData().then((data) => {
      setCode({ ...code, email: data })
    })
  }, [code])

  ///Code đang bị bug

  const handleSubmit = () => {
    dispatch(confirmForgotPassword(code)).then((reps) => {
      if (!reps.error) {
        remove()
        navigation.navigate('login')
      }
    })
  }
  const handleSendAgain = () => {
    getData().then((data) => {
      dispatch(requestNewCode(data))
    })
  }
  return (
    <View style={{ height: '100%' }}>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <View style={styles.logo}>
            <Text style={styles.heading}>Xác thực địa chỉ Email</Text>
          </View>
          <View style={styles.toast}>
            {/* Icon và thông báo của toast */}
            <Text style={styles.toastText}>
              Mã code đã được gửi về email của bạn. Hãy check email và nhập mã
              code để hệ thống gửi mật khẩu mới cho bạn
            </Text>
          </View>
          <View style={styles.formGroup}>
            <TextInput
              style={styles.input}
              placeholder="Nhập mã code"
              onChangeText={(value) => setCode({ code: value })}
            />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <TouchableOpacity
              style={{ marginRight: 8 }}
              onPress={handleSendAgain}
            >
              <View style={[styles.button, { backgroundColor: '#FF5E5E' }]}>
                <Text style={styles.buttonText}>Gửi lại mã code</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSubmit}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Gửi</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

export default ConfirmForgotPassword
