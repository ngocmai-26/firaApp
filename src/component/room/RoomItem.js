import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6'

const RoomItem = ({ room, activeRoom }) => {
  return (
    <View
      style={{
        width: '100%',
        padding: 8,
        backgroundColor: activeRoom == room.id ? '#f0f0f0' : 'transparent',
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 4,
        flex: 1,
      }}>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginRight: 8 }}>
        <Image
          style={{ width: 40, height: 40, borderRadius: 20 }}
          source={{ uri: room.leader.avatar }}
        />
        <View style={{ flexDirection: 'column', marginLeft: 8 }}>
          <Text style={{ fontSize: 16 }}>{room.roomName.charAt(0).toUpperCase() + room.roomName.slice(1)}</Text>
          <Text numberOfLines={1} ellipsizeMode="tail" style={{ fontSize: 12, maxWidth: '90%', color: '#999' }}>{room.lastMessage.content}</Text>
        </View>
      </View>

      <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }}>
        
      <Icon name="ellipsis" size={18} color="#ccc" />
      </TouchableOpacity>
    </View>
  );
};

export default RoomItem;