import moment from 'moment'
import { useState } from 'react'
import {
  Image,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { useSelector } from 'react-redux'

function BoxMsg({ data }) {
  const { user } = useSelector((state) => state.authReducer)
  const [showTime, setShowTime] = useState(false)
  return (
    <View
      style={{
        flexDirection: data?.sender?.id === user.id ? 'row-reverse' : 'row',
        gap: 5,
        paddingVertical: 10,
      }}
    >
      {data?.messageTypeInRoom == 2 ? (
        <View style={{ width: '100%' }}>
          <Text style={{ textAlign: 'center' }}>{data?.content}</Text>
        </View>
      ) : (
        <>
          <View style={{ width: 45, height: 45, borderRadius: 100 }}>
            <Image
              source={{
                uri:
                data?.sender.avatar || data.avatar,
              }}
              style={{ width: '100%', height: '100%', borderRadius: 20 }}
            />
          </View>
          <View onPress={() => setShowTime(false)}>
            <View style={{ flex: 1, position: 'relative', minWidth: 40 }}>
              <TouchableOpacity onPress={() => setShowTime(!showTime)}>
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    paddingBottom: 1,
                  }}
                >
                  {data?.media.length > 0 &&
                    data?.media.map((m, index) => (
                      <Image
                        key={index.toString()}
                        source={{ uri: m?.mediaLink || null }}
                        style={[
                          {
                            width: 75,
                            height: 75,
                            minHeight: 70,
                            marginRight: 5,
                            marginBottom: 5,
                            borderRadius: 5,
                            backgroundColor: "red"
                          },
                        ]}
                      />
                    ))}
                </View>

                <View
                  style={{
                    backgroundColor:
                      data?.sender?.id === user.id ? '#3498db' : '#718096',
                    padding: 8,
                    paddingHorizontal: 10,
                    borderRadius: 8,
                  }}
                >
                  <Text style={{ color: '#fff', fontSize: 16 }}>
                    {data?.content}
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
                    paddingHorizontal: 1,
                    borderRadius: 4,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                  }}
                >
                  <Text style={{ fontSize: 10 }}>
                    {moment(data.sentAt).format('HH:mm')}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </>
      )}
    </View>
  )
}

export default BoxMsg
