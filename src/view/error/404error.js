import { Image, Text, TouchableOpacity, View } from 'react-native'

function NotFoundPage() {
  return (
    <View
      style={{
        paddingHorizontal: 16,
        paddingVertical: 24,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column-reverse',
        height: "100%",
      }}
    >
      <View
        style={{
          paddingTop: 24,
          width: '100%',
          paddingBottom: 12,
          position: 'relative',
          flexDirection: 'row',
        }}
      >
        <View style={{ width: '100%', marginBottom: 12 }}>
          <Text
            style={{
              color: '#333',
              fontWeight: 'bold',
              fontSize: 18,
              marginBottom: 8,
            }}
          >
            Looks like you've found the doorway to the great nothing
          </Text>
          <Text style={{ color: '#333', marginBottom: 8 }}>
            Sorry about that! Please visit our homepage to get where you need to
            go.
          </Text>
          <TouchableOpacity
            style={{
              width: '100%',
              borderWidth: 1,
              borderColor: '#333',
              borderRadius: 8,
              paddingVertical: 12,
              paddingHorizontal: 24,
              backgroundColor: '#3f50b5',
            }}
          >
            <Text style={{ color: '#fff', textAlign: 'center' }}>
              Take me back!
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <Image
            source={{ uri: 'https://i.ibb.co/G9DC8S0/404-2.png' }}
            style={{ width: 200, height: 200 }}
          />
        </View>
      </View>
      <View>
        <Image
          source={{ uri: 'https://i.ibb.co/ck1SGFJ/Group.png' }}
          style={{ width: 150, height: 150 }}
        />
      </View>
    </View>
  )
}

export default NotFoundPage
