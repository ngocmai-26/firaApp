import { useNavigation } from '@react-navigation/native'
import { useEffect, useLayoutEffect, useState } from 'react'
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
} from 'react-native'
import Stomp from 'stompjs'

import Icon from 'react-native-vector-icons/FontAwesome6'
import { useDispatch, useSelector } from 'react-redux'
import {
  ADMIN_NAVBAR_ITEMS,
  ANONYMOUS,
  CONTACT_NOTI_EVENT_TYPE,
  MANAGER_NAVBAR_ITEMS,
  STAFF_NAVBAR_ITEMS,
} from '../app/static'
import {
  getAllAddContactRequestByUser,
  getAllAddContactRequestByUserRelate,
  getAllContactByUser,
} from '../thunks/ContractThunk'
import { getAllRoomByUser } from '../thunks/RoomThunk'
import { pushMessageToRoom } from '../slices/RoomSlice'
import SockJS from 'sockjs-client'
import AdminSideNavItem from '../component/nav/AdminSideNavItem'
import { getAllNotification } from '../thunks/NotificationThunk'

function NavBar({ children, hidden }) {
  const navigation = useNavigation()
  const [showSidebar, setShowSidebar] = useState(false)
  const { user, account } = useSelector((state) => state.authReducer)
  const dispatch = useDispatch()

  const handleOutsidePress = () => {
    setShowSidebar(false)
  }
  const RenderAdminItem = () => {
    if (account?.role?.roleName === 'ROLE_ADMIN') {
      // If the user is an admin, render all items
      return ADMIN_NAVBAR_ITEMS.map((item) => (
        <AdminSideNavItem key={item.id} item={item} />
      ))
    } else if (account?.role?.roleName === 'ROLE_STAFF') {
      // If the user is an admin, render all items
      return STAFF_NAVBAR_ITEMS.map((item) => (
        <AdminSideNavItem key={item.id} item={item} />
      ))
    } else if (account?.role?.roleName === 'ROLE_MANAGER') {
      // If the user is an admin, render all items
      return MANAGER_NAVBAR_ITEMS.map((item) => (
        <AdminSideNavItem key={item.id} item={item} />
      ))
    } else if (account?.role?.roleName === 'ANONYMOUS') {
      // If the user is an admin, render all items
      return ANONYMOUS?.map((item) => (
        <AdminSideNavItem key={item.id} item={item} />
      ))
    } else {
      // If the user is not an admin, check permissions to render items accordingly
      const permissions = account?.role?.permissions
      return ADMIN_NAVBAR_ITEMS.map((item) => {
        if (
          item.id === 3 &&
          permissions.some(
            (permission) => permission.name === 'MANAGE_JOB_READ',
          )
        ) {
          return <AdminSideNavItem key={item.id} item={item} />
        }
        if (
          item.id === 5 &&
          permissions.some(
            (permission) => permission.name === 'MANAGE_ROLE_READ',
          )
        ) {
          return <AdminSideNavItem key={item.id} item={item} />
        }
        if (
          item.id === 6 &&
          permissions.some(
            (permission) => permission.name === 'MANAGE_PERMISSION_READ',
          )
        ) {
          return <AdminSideNavItem key={item.id} item={item} />
        }
        if (
          item.id === 7 &&
          permissions.some(
            (permission) => permission.name === 'MANAGE_KPI_READ',
          )
        ) {
          return <AdminSideNavItem key={item.id} item={item} />
        }
        // Always render chat and schedule items
        if (item.id === 8 || item.id === 4) {
          return <AdminSideNavItem key={item.id} item={item} />
        }
        return null
      })
    }
  }

  const { notifications } = useSelector((state) => state.notificationReducer)

  useEffect(() => {
    if (notifications?.length <= 0) {
      dispatch(getAllNotification())
    }
  }, [])

  useLayoutEffect(() => {
    const ws = new SockJS('http://192.168.69.144:8082/ws')
    const client = Stomp.over(ws)
    client.connect(
      {},
      function () {
        client.subscribe('/contact', (resp) => {
          const respBody = JSON.parse(resp.body)
          if (respBody?.type == CONTACT_NOTI_EVENT_TYPE.NEW_REQUEST) {
            if (respBody?.contact?.relate?.id == user?.id) {
              dispatch(getAllAddContactRequestByUserRelate(user?.id))
            }
          }
          if (respBody.type == CONTACT_NOTI_EVENT_TYPE.RESPONSE_REQUEST) {
            dispatch(getAllContactByUser(user?.id))
            dispatch(getAllAddContactRequestByUser(user?.id))
          }
        })
        client.subscribe('/notification', (resp) => {
          console.log('resp.body', JSON.parse(resp.body))
        })
        client.subscribe('/room', (resp) => {
          const newMessage = JSON.parse(resp.body)
          dispatch(pushMessageToRoom(newMessage))
        })
      },
      (error) => {
        console.log(error)
      },
    )
    dispatch(getAllAddContactRequestByUser(user?.id))
    dispatch(getAllAddContactRequestByUserRelate(user?.id))
    dispatch(getAllContactByUser(user?.id))
    dispatch(getAllRoomByUser())
  }, [])

  const unreadCount = notifications?.filter((item) => item?.read === false)
    .length

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
                  <RenderAdminItem />
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
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                paddingVertical: 10,
              }}
            >
              {/* Nội dung chính của ứng dụng ở đây */}
              {children}

              {/* <NotificationComponent hiddenComponent={hiddenComponent} handleHidden={handleHidden}   /> */}
            </View>
          </View>

          {/* Header ở cuối màn hình */}
          {!hidden ? (
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
              <TouchableOpacity
                onPress={() => navigation.navigate('tai-khoan')}
              >
                <Icon name="user" size={25} color="#3498db" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('chat')}>
                <Icon name="comments" size={25} color="#3498db" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('notification')}
                style={{ position: 'relative' }}
              >
                <Icon name="bell" size={25} color="#3498db" />
                <View
                  style={{
                    position: 'absolute',
                    top: -10,
                    right: -10,
                    backgroundColor: 'red',
                    alignItems: 'center',
                    borderRadius: 20,
                     width: 20
                  }}
                >
                  <Text style={{ color: 'white' }}>{unreadCount}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowSidebar(!showSidebar)}>
                <Icon name="bars" size={20} color="#3498db" />
              </TouchableOpacity>
            </View>
          ) : (
            <></>
          )}
        </View>
        
      </View>
      
    </TouchableWithoutFeedback>
  )
}

export default NavBar
