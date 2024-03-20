import React from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';

const FileItem = ({ data, type }) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 }}>
      {type === 1 ? (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ width: 50, height: 50, backgroundColor: '#C6F6D5', borderRadius: 4, justifyContent: 'center', alignItems: 'center' }}>
           <Text>e</Text>
          </View>
          <View style={{ marginLeft: 10 }}>
            <Text numberOfLines={1} style={{ fontSize: 12, fontWeight: 'bold' }}>
                {/* {data?.mediaName?.replace("-", "_")} */}
              {data?.mediaName?.replace("-", "_").replace(/\.(jpg|jpeg|png|gif)$/gm, "").slice(0, 20)}.{data.mediaType.split("/")[1]}
              
            </Text>
            <Text style={{ fontSize: 10 }}>
              {data.mediaSize}
            </Text>
            <Text style={{ fontSize: 10 }}>
              {data.mediaType.split("/")[1].toUpperCase()}
            </Text>
          </View>
        </View>
      ) : null}
      {type === 1 ? (
        <TouchableOpacity onPress={() => Linking.openURL(data.mediaLink)}>
        <Text>1</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default FileItem;
