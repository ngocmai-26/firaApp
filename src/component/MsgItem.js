import { TouchableOpacity, View, Text, Image } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome6'

function MsgItem({ data, key }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
      }}
    >
      <View style={{ flexDirection: 'row' }}>
        {data?.type ? (
          <View style={{ marginRight: 5 }}>
            {data?.type === 'PNG' ? (
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 20,
                  backgroundColor: '#C6F6D5',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 2,
                }}
              >
                {/* Thay thế phần SVG bằng hình ảnh hoặc biểu tượng tương ứng */}
                <Text>PNG</Text>
              </View>
            ) : data?.type === 'JPG' ? (
              <View style={{
                width: 50,
                height: 50,
                borderRadius: 20,
                backgroundColor: '#C6F6D5',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 2,
              }}>
                {/* Thay thế phần SVG bằng hình ảnh hoặc biểu tượng tương ứng */}
                <Text>JPG</Text>
              </View>
            ) : data?.type === 'PDF' ? (
              <View style={{
                width: 50,
                height: 50,
                borderRadius: 20,
                backgroundColor: '#C6F6D5',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 2,
              }}>
                {/* Thay thế phần SVG bằng hình ảnh hoặc biểu tượng tương ứng */}
                <Text>PDF</Text>
              </View>
            ) : data?.type === 'MP4' ? (
              <View style={{
                width: 50,
                height: 50,
                borderRadius: 20,
                backgroundColor: '#C6F6D5',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 2,
              }}>  
                {/* Thay thế phần SVG bằng hình ảnh hoặc biểu tượng tương ứng */}
                <Text>MP4</Text>
              </View>
            ) : (
              <></>
            )}
          </View>
        ) : (
          <View style={{ marginRight: 5 }}>
            {/* Hiển thị hình ảnh nếu có, thay thế 'data?.img' bằng đường dẫn hình ảnh thực tế */}
            {data?.img && (
              <Image
                source={{ uri: data?.img }}
                style={{ width: 50, height: 50, borderRadius: 5 }}
              />
            )}
          </View>
        )}
        <View style={{ maxWidth: 250 }}>
          <View style={{ marginBottom: 3 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
              {data?.name}
            </Text>
          </View>
          <View style={{ overflow: 'hidden', display: data?.content? "block": "none"  }}>
            <Text style={{ fontSize: 14 }} numberOfLines={1}>
              {data?.content}
            </Text>
          </View>
          {data?.type && (
            <View style={{ flexDirection: 'row'}}>
              <Text style={{ fontSize: 14, marginRight: 5 }}>{data?.type}</Text>
              <Text style={{ fontSize: 14 }}>{data?.capacity}</Text>
            </View>
          )}
        </View>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <View>
          <Text style={{ fontSize: 12, color: '#888888' }}>{data?.time}</Text>
          {data?.typeNotify && data?.typeNotify !== 1 && (
            // <FontAwesomeIcon icon={faCircle} style={{ fontSize: 10, color: '#3498db' }} />
            <Icon name="circle" size={26} color="#3498db" />
          )}
        </View>
        <TouchableOpacity style={{ marginLeft: 10 }}>
          {data?.capacity && (
            <View>
              {/* <FontAwesomeIcon icon={faDownload} style={{ fontSize: 24, color: '#FF7607' }} /> */}
              <Icon name="file-arrow-down" size={26} color="#FF7607" />
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default MsgItem
