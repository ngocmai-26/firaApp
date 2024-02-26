import { useState } from 'react'
import {
  Image,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'

function BoxMsg({ data }) {
  const [showTime, setShowTime] = useState(false)
  return (
    <View
      style={{
        flexDirection: data.isSender === 2 ? 'row-reverse' : 'row',
        gap: 5,
        paddingVertical: 10,
      }}
    >
      <View style={{ width: 45, height: 45, borderRadius: 100 }}>
        <Image
          source={{
            uri:
              'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
          }}
          style={{ width: '100%', height: '100%', borderRadius: 20 }}
        />
      </View>
      <TouchableWithoutFeedback onPress={() => setShowTime(false)}>
        <View style={{ flex: 1, position: 'relative' }}>
          <TouchableOpacity onPress={() => setShowTime(!showTime)} >
            <View
              style={{
                backgroundColor: data.isSender === 2 ? '#3498db' : '#718096',
                padding: 8,
                maxWidth: '100%',
                borderRadius: 8,
              }}
            >
              <Text style={{ color: '#fff', fontSize: 16, }}>
                Hôm nay trời đẹp quá trời ạ ahihih đồ ngốc Hôm nay trời đẹp quá
                trời ạ ahihih đồ ngốc Hôm nay trời đẹp quá trời ạ ahihih đồ ngốc
              </Text>
            </View>
          </TouchableOpacity>

          {showTime && (
            <View
              style={{
                position: 'absolute',
                zIndex: 100,
                bottom: -15,
                backgroundColor: '#edf2f7',
                paddingVertical: 1,
                paddingHorizontal: 8,
                borderRadius: 4,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}
            >
              <Text style={{ fontSize: 10 }}>17:55</Text>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

export default BoxMsg
