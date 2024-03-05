import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome6'
import NotificationComponent from '../component/Notification'

function NavBar({ children }) {
  const navigation = useNavigation()
  const [showSidebar, setShowSidebar] = useState(false)
  const [hiddenComponent, setHiddenComponent] = useState(false)

  const handleOutsidePress = () => {
    setShowSidebar(false)
  }
  const handleHidden = () => {
    setHiddenComponent(!hiddenComponent)
  }

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <View style={{ width: '100%', height: '100%' }}>
        <View style={{ position: 'relative', flex: 1 }}>
          {/* thanh điều hướng ở đây */}
          {showSidebar && (
            <View
              style={{
                width: '60%',
                backgroundColor: 'white',
                borderRightWidth: 1,
                borderColor: '#eee',
                zIndex: 999,
                position: 'absolute',
                top: 0,
                bottom: 0,
                paddingVertical: 10,
              }}
            >
              {/* Nội dung thanh điều hướng ở đây */}
              <View style={{ paddingTop: 10 }}>
                <View style={{ paddingHorizontal: 10 }}>
                  <Image
                    source={require('../../assets/logo.png')}
                    style={{
                      marginVertical: 10,
                      marginHorizontal: 'auto',
                      width: '50%',
                      height: 60,
                    }}
                  />
                </View>
                <View
                  style={{
                    paddingVertical: 20,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingVertical: 20,
                      width: '100%',
                      paddingHorizontal: 10,
                    }}
                    onPress={() => navigation.navigate('dashboard')}
                  >
                    <View style={{ width: 30 }}>
                      <Icon name="chart-pie" size={20} color="#3498db" />
                    </View>
                    <Text
                      style={{
                        marginLeft: 10,
                        fontSize: 16,
                        fontWeight: '700',
                      }}
                    >
                      Dashboards
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingVertical: 20,
                      paddingHorizontal: 10,
                    }}
                    onPress={() => navigation.navigate('quan-ly-tai-khoan')}
                  >
                    <View style={{ width: 30 }}>
                      <Icon name="users-gear" size={20} color="#3498db" />
                    </View>
                    <Text
                      style={{
                        marginLeft: 10,
                        fontSize: 16,
                        fontWeight: '700',
                      }}
                    >
                      Quản lý tài khoản
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingVertical: 20,
                      paddingHorizontal: 10,
                    }}
                  >
                    <View style={{ width: 30 }}>
                      <Icon name="clipboard-list" size={20} color="#3498db" />
                    </View>
                    <Text
                      style={{
                        marginLeft: 10,
                        fontSize: 16,
                        fontWeight: '700',
                      }}
                    >
                      Quản lý công việc
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingVertical: 20,
                      paddingHorizontal: 10,
                    }}
                    onPress={() => navigation.navigate('quan-ly-chuc-vu')}
                  >
                    <View style={{ width: 30 }}>
                      <Icon name="user-pen" size={20} color="#3498db" />
                    </View>
                    <Text
                      style={{
                        marginLeft: 10,
                        fontSize: 16,
                        fontWeight: '700',
                      }}
                    >
                      Quản lý chức vụ
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingVertical: 20,
                      paddingHorizontal: 10,
                    }}
                    onPress={() => navigation.navigate('quan-ly-chuc-nang')}
                  >
                    <View style={{ width: 30 }}>
                      <Icon name="user-gear" size={20} color="#3498db" />
                    </View>
                    <Text
                      style={{
                        marginLeft: 10,
                        fontSize: 16,
                        fontWeight: '700',
                      }}
                    >
                      Quản lý chức năng
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingVertical: 20,
                      paddingHorizontal: 10,
                    }}
                  >
                    <View style={{ width: 30 }}>
                      <Icon name="square-pen" size={20} color="#3498db" />
                    </View>
                    <Text
                      style={{
                        marginLeft: 10,
                        fontSize: 16,
                        fontWeight: '700',
                      }}
                    >
                      Quản lý danh sách kpi
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingVertical: 20,
                      paddingHorizontal: 10,
                    }}
                    onPress={() => navigation.navigate('checkin')}
                  >
                    <View style={{ width: 30 }}>
                      <Icon name="square-pen" size={20} color="#3498db" />
                    </View>
                    <Text
                      style={{
                        marginLeft: 10,
                        fontSize: 16,
                        fontWeight: '700',
                      }}
                    >
                      checkin
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingVertical: 20,
                      paddingHorizontal: 10,
                    }}
                    onPress={() => navigation.navigate('notesApp')}
                  >
                    <View style={{ width: 30 }}>
                      <Icon name="calendar" size={20} color="#3498db" />
                    </View>
                    <Text
                      style={{
                        marginLeft: 10,
                        fontSize: 16,
                        fontWeight: '700',
                      }}
                    >
                      Quản lý kế hoạch
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}

          <View
            style={{
              position: 'relative',
              flex: 2,
              paddingHorizontal: 15,
              backgroundColor: 'white',
            }}
          >
            <View
              style={{
                borderRightWidth: 1,
                borderColor: '#eee',
                zIndex: 999,
                position: 'absolute',

                paddingVertical: 10,
              }}
            >
              {/* Nội dung chính của ứng dụng ở đây */}
              {children}

              {/* <NotificationComponent hiddenComponent={hiddenComponent} handleHidden={handleHidden}   /> */}
            </View>
          </View>

          {/* Header ở cuối màn hình */}
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              height: 60,
              backgroundColor: '#eee',
            }}
          >
            <TouchableOpacity onPress={() => navigation.navigate('home')}>
              <Icon name="house" size={25} color="#3498db" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('tai-khoan')}>
              <Icon name="user" size={25} color="#3498db" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('chat')}>
              <Icon name="comments" size={25} color="#3498db" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('notification')}
            >
              <Icon name="bell" size={25} color="#3498db" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowSidebar(!showSidebar)}>
              <Icon name="bars" size={20} color="#3498db" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default NavBar
