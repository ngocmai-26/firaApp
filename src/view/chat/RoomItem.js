import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome6'
import NotificationComponent from '../../component/Notification'
import { useNavigation } from '@react-navigation/native'
import RoomItemContainer from '../../component/room/RoomItemContainer'
import { useLayoutEffect, useState } from 'react'

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    paddingTop: 20,
    height: Dimensions.get('window').height,
  },
  leftColumn: {
    borderRightColor: '#E5E5E5',
    borderRightWidth: 2,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
})

function RoomItem({
  rooms,
  handleExpandBox,
  activeRoom,
  handleModalShow,
}) {
  const [hiddenComponent, setHiddenComponent] = useState(false)
  const navigation = useNavigation()
  const handleHidden = () => {
    setHiddenComponent(!hiddenComponent)
  }

  return (
    <View
      style={[
        styles.leftColumn,
        { position: 'relative' },
      ]}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderBottomColor: '#E5E5E5',
          width: '100%',
          borderBottomWidth: 2,
          paddingVertical: 10,
          alignItems: 'center',
        }}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 26 }}>Tin nhắn</Text>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => navigation.navigate('home')}>
            <Icon
              name="house"
              size={25}
              style={{ fontWeight: 600, paddingHorizontal: 5 }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleModalShow}>
            <Icon
              name="user-plus"
              size={25}
              style={{ fontWeight: 600, paddingHorizontal: 5 }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleHidden}>
            <Icon
              name="bell"
              size={25}
              style={{ fontWeight: 600, paddingHorizontal: 5 }}
            />
          </TouchableOpacity>
        </View>
      </View>

      <NotificationComponent
        hiddenComponent={hiddenComponent}
        handleHidden={handleHidden}
        maxheight={350}
      />
      <View
        style={{
          marginVertical: 10,
          width: '100%',
          borderWidth: 1,
          borderColor: '#ccc',
          paddingHorizontal: 10,
          paddingVertical: 5,
          borderRadius: 5,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Icon
            name="magnifying-glass"
            size={16}
            style={{ fontWeight: 600 }}
            color="#ccc"
          />
          <TextInput placeholder="Tìm kiếm" style={{ fontSize: 16, flex: 1 }} />
        </View>
      </View>
      <RoomItemContainer
        rooms={rooms}
        handleExpandBox={handleExpandBox}
        activeRoom={activeRoom}
      />
    </View>
  )
}

export default RoomItem
