import { useLayoutEffect, useState } from 'react'
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { login, loginWithAuthToken } from '../../thunks/AuthThunk'
import { loadTokenFromStorage } from '../../services/AuthService'

function Login() {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [user, setUser] = useState({})
  const { isFetching } = useSelector((state) => state.authReducer)
  const { errors } = useSelector((state) => state.authReducer)
  const authToken = loadTokenFromStorage()

  useLayoutEffect(() => {
    if (authToken) {
      dispatch(loginWithAuthToken({ token: authToken }))
    }
  }, [])

  const handleLogin = () => {
    if (!isFetching) {
      dispatch(login(user))
    }
  }

  return (
    <View style={{ height: '100%' }}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          margin: 'auto',
        }}
      >
        <View style={styles.card}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../../../assets/logo.png')}
              style={styles.logo}
            />
          </View>
          <View style={{ marginVertical: 10 }}>
            <Text style={styles.heading}>Đăng nhập</Text>
            <Text style={styles.subHeading}>
              Chào mừng bạn đã đến với phần mềm Fira, hãy đăng nhập để sử dụng
              các dịch vụ của chúng tôi:
            </Text>
          </View>

          <View style={styles.inputContainer}>
            <Icon name="user" size={20} color="#ccc" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Tên đăng nhập"
              onChangeText={(text) => setUser({ ...user, username: text.trim() })}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="lock" size={20} color="#ccc" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Mật khẩu"
              secureTextEntry={true}
              onChangeText={(text) => setUser({ ...user, password: text.trim() })}
            />
          </View>

          <TouchableOpacity>
            <Text
              style={styles.forgotPassword}
              onPress={() => navigation.navigate('forgot-password')}
            >
              Quên mật khẩu?
            </Text>
          </TouchableOpacity>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('register')}
            >
              <Text style={styles.buttonText}>Đăng Ký</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Đăng nhập</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.verifyContainer}>
            <Text style={styles.verifyText}>Chưa xác thực tài khoản?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('verify-email')}
            >
              <Text style={styles.verifyLink}>Xác thực ngay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logoContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    justifyContent: 'center',
    width: '100%',
    flexDirection: 'row',
  },
  logo: {
    marginVertical: 10,
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#367BD6',
    textAlign: 'center',
  },
  subHeading: {
    fontSize: 14,
    color: '#777',
    marginBottom: 10,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginVertical: 10,
    paddingVertical: 5,
  },
  icon: {
    paddingHorizontal: 5,
  },
  input: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginTop: 3,
    width: '92%',
  },
  forgotPassword: {
    fontSize: 14,
    color: '#007bff',
    textDecorationLine: 'underline',
    textAlign: 'right',
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  button: {
    flex: 1,
    backgroundColor: '#007bff',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  verifyContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  verifyText: {
    fontSize: 14,
  },
  verifyLink: {
    color: '#007bff',
    fontSize: 14,
    marginLeft: 5,
  },
})

export default Login
