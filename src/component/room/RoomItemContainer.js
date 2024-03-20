import { Dimensions, Text, TouchableOpacity, View } from "react-native"
import RoomItem from "./RoomItem"
import { ScrollView } from "react-native"

function RoomItemContainer({ rooms, handleExpandBox, activeRoom }) {
  return (
    <ScrollView
    style={{
      maxHeight: Dimensions.get('window').height * 0.85,
    }}
  >
    <View
      style={{
        maxHeight: '80%',
      }}
    >
      {/* Thay thế MsgItem bằng component tương ứng trong ứng dụng của bạn */}
      {rooms.map((item) => (
        <TouchableOpacity onPress={() => handleExpandBox(item?.id, item.members)}>
          <RoomItem room={item} activeRoom={activeRoom} />
        </TouchableOpacity>
      ))}
      {rooms.length == 0 && (
        <Text>
          Bạn chưa có cuộc trò chuyện nào.
        </Text>
      )}
    </View>
  </ScrollView>)
}

export default RoomItemContainer
