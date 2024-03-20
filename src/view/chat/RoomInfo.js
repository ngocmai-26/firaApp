import { useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import MsgItem from "../../component/MsgItem";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
import { ScrollView } from "react-native";
import FileItem from "../../component/FileItem";


const styles = StyleSheet.create({
    rightColumn: {
      width: '100%',
      position: 'relative',
      left: 0,
      backgroundColor: 'white',
      borderRightColor: '#E5E5E5',
      borderRightWidth: 2,
      height: '100%',
    },
    messageButton: {
      overflow: 'hidden',
      backgroundColor: 'gray',
      fontSize: 18,
      color: 'gray',
      textAlign: 'center',
      textAlignVertical: 'center',
      padding: 2,
    },
    buttonText: {
      fontSize: 18,
      color: 'white',
      fontWeight: 'bold',
    },
    memberButton: {
      fontSize: 18,
      textDecorationLine: 'underline',
    },
    collapseButton: {
      fontSize: 12,
      textDecorationLine: 'underline',
      marginTop: 5,
    },
  })


function RoomInfo({ activeRoom, room, handleExpand }) {
    
  const { expandFileMedia } = useSelector((state) => state.toggleReducer).room;
  useLayoutEffect(() => {}, [expandFileMedia]);
    return ( 
        <View
            style={[
              styles.rightColumn,
              {
                display: expandFileMedia && activeRoom == room.id ? 'flex' : 'none',
                paddingVertical: 10,
                paddingHorizontal: 10,
                zIndex: 900,
              },
            ]}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottomColor: '#E5E5E5',
                borderBottomWidth: 2,
                paddingVertical: 10,
              }}
            >
              <Text style={{ fontWeight: 'bold', fontSize: 24 }}>
                Thông tin
              </Text>
              <TouchableOpacity onPress={() => handleExpand()}>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>X</Text>
              </TouchableOpacity>
            </View>
            <View style={[{ height: '40%' }]}>
              <View
                style={{
                  paddingVertical: 10,
                }}
              >
                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
                  Thành viên nhóm
                </Text>
              </View>
              <ScrollView style={[{ maxHeight: '90%' }]}>
                <View>
                {room.members.map((item) => (
                <MsgItem data={item} type={2} />
              ))}
                </View>
              </ScrollView>
            </View>

            <View style={[{ height: '60%' }]}>
              <View
                style={{
                  paddingVertical: 10,
                }}
              >
                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>File</Text>
              </View>
              <ScrollView style={[{ maxHeight: '85%' }]}>
                <View
                  style={[
                    { maxHeight: '100%' },
                  ]}
                >
                  {room.media.map((item) => (
                  <FileItem data={item} type={1} />
                ))}
                </View>
              </ScrollView>
            </View>
          </View>
     );
}

export default RoomInfo;