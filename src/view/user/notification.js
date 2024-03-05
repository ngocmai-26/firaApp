import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome6'
import NavBar from "../../layout/navbar";

function Notification({}) {
    const data = [
        {
          id: 1,
          name: 'Đăng Văn Nam',
          img:
            'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
          time: '12m',
          typeNotify: 1,
          content:
            'ABC Đăng Văn Nam Đăng Văn Nam Đăng Văn Nam  m Đăng Văn Nam Đăng Văn Nam Hôm qua Hôm qua em xinh quá trời Đăng Văn Nam Hôm qua e',
        },
        {
          id: 2,
          name: 'Đăng Văn Nam',
          img:
            'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
          time: '12m',
          typeNotify: 2,
          content:
            'ABC Đăng Văn Nam Đăng Văn Nam Đăng Văn Nam  m Đăng Văn Nam Đăng Văn Nam Hôm qua Hôm qua em xinh quá trời Đăng Văn Nam Hôm qua e',
        },
        {
          id: 2,
          name: 'Đăng Văn Nam',
          img:
            'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
          time: '12m',
          typeNotify: 2,
          content:
            'ABC Đăng Văn Nam Đăng Văn Nam Đăng Văn Nam  m Đăng Văn Nam Đăng Văn Nam Hôm qua Hôm qua em xinh quá trời Đăng Văn Nam Hôm qua e',
        },
        {
          id: 2,
          name: 'Đăng Văn Nam',
          img:
            'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
          time: '12m',
          typeNotify: 2,
          content:
            'ABC Đăng Văn Nam Đăng Văn Nam Đăng Văn Nam  m Đăng Văn Nam Đăng Văn Nam Hôm qua Hôm qua em xinh quá trời Đăng Văn Nam Hôm qua e',
        },
        {
          id: 2,
          name: 'Đăng Văn Nam',
          img:
            'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
          time: '12m',
          typeNotify: 2,
          content:
            'ABC Đăng Văn Nam Đăng Văn Nam Đăng Văn Nam  m Đăng Văn Nam Đăng Văn Nam Hôm qua Hôm qua em xinh quá trời Đăng Văn Nam Hôm qua e',
        },
        {
          id: 2,
          name: 'Đăng Văn Nam',
          img:
            'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
          time: '12m',
          typeNotify: 2,
          content:
            'ABC Đăng Văn Nam Đăng Văn Nam Đăng Văn Nam  m Đăng Văn Nam Đăng Văn Nam Hôm qua Hôm qua em xinh quá trời Đăng Văn Nam Hôm qua e',
        },
        {
          id: 2,
          name: 'Đăng Văn Nam',
          img:
            'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
          time: '12m',
          typeNotify: 2,
          content:
            'ABC Đăng Văn Nam Đăng Văn Nam Đăng Văn Nam  m Đăng Văn Nam Đăng Văn Nam Hôm qua Hôm qua em xinh quá trời Đăng Văn Nam Hôm qua e',
        },
        {
          id: 2,
          name: 'Đăng Văn Nam',
          img:
            'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
          time: '12m',
          typeNotify: 2,
          content:
            'ABC Đăng Văn Nam Đăng Văn Nam Đăng Văn Nam  m Đăng Văn Nam Đăng Văn Nam Hôm qua Hôm qua em xinh quá trời Đăng Văn Nam Hôm qua e',
        },
        {
          id: 2,
          name: 'Đăng Văn Nam',
          img:
            'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
          time: '12m',
          typeNotify: 2,
          content:
            'ABC Đăng Văn Nam Đăng Văn Nam Đăng Văn Nam  m Đăng Văn Nam Đăng Văn Nam Hôm qua Hôm qua em xinh quá trời Đăng Văn Nam Hôm qua e',
        },
        {
          id: 2,
          name: 'Đăng Văn Nam',
          img:
            'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
          time: '12m',
          typeNotify: 2,
          content:
            'ABC Đăng Văn Nam Đăng Văn Nam Đăng Văn Nam  m Đăng Văn Nam Đăng Văn Nam Hôm qua Hôm qua em xinh quá trời Đăng Văn Nam Hôm qua e',
        },
        {
          id: 2,
          name: 'Đăng Văn Nam',
          img:
            'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
          time: '12m',
          typeNotify: 2,
          content:
            'ABC Đăng Văn Nam Đăng Văn Nam Đăng Văn Nam  m Đăng Văn Nam Đăng Văn Nam Hôm qua Hôm qua em xinh quá trời Đăng Văn Nam Hôm qua e',
        },
        {
          id: 2,
          name: 'Đăng Văn Nam',
          img:
            'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
          time: '12m',
          typeNotify: 2,
          content:
            'ABC Đăng Văn Nam Đăng Văn Nam Đăng Văn Nam  m Đăng Văn Nam Đăng Văn Nam Hôm qua Hôm qua em xinh quá trời Đăng Văn Nam Hôm qua e',
        },
        {
          id: 2,
          name: 'Đăng Văn Nam',
          img:
            'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
          time: '12m',
          typeNotify: 2,
          content:
            'ABC Đăng Văn Nam Đăng Văn Nam Đăng Văn Nam  m Đăng Văn Nam Đăng Văn Nam Hôm qua Hôm qua em xinh quá trời Đăng Văn Nam Hôm qua e',
        },
        {
          id: 2,
          name: 'Đăng Văn Nam',
          img:
            'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
          time: '12m',
          typeNotify: 2,
          content:
            'ABC Đăng Văn Nam Đăng Văn Nam Đăng Văn Nam  m Đăng Văn Nam Đăng Văn Nam Hôm qua Hôm qua em xinh quá trời Đăng Văn Nam Hôm qua e',
        },
        {
          id: 2,
          name: 'Đăng Văn Nam',
          img:
            'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
          time: '12m',
          typeNotify: 2,
          content:
            'ABC Đăng Văn Nam Đăng Văn Nam Đăng Văn Nam  m Đăng Văn Nam Đăng Văn Nam Hôm qua Hôm qua em xinh quá trời Đăng Văn Nam Hôm qua e',
        },
        {
          id: 2,
          name: 'Đăng Văn Nam',
          img:
            'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
          time: '12m',
          typeNotify: 2,
          content:
            'ABC Đăng Văn Nam Đăng Văn Nam Đăng Văn Nam  m Đăng Văn Nam Đăng Văn Nam Hôm qua Hôm qua em xinh quá trời Đăng Văn Nam Hôm qua e',
        },
        {
          id: 2,
          name: 'Đăng Văn Nam',
          img:
            'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
          time: '12m',
          typeNotify: 2,
          content:
            'ABC Đăng Văn Nam Đăng Văn Nam Đăng Văn Nam  m Đăng Văn Nam Đăng Văn Nam Hôm qua Hôm qua em xinh quá trời Đăng Văn Nam Hôm qua e',
        },
        {
          id: 2,
          name: 'Đăng Văn Nam',
          img:
            'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
          time: '12m',
          typeNotify: 2,
          content:
            'ABC Đăng Văn Nam Đăng Văn Nam Đăng Văn Nam  m Đăng Văn Nam Đăng Văn Nam Hôm qua Hôm qua em xinh quá trời Đăng Văn Nam Hôm qua e',
        },
        {
          id: 2,
          name: 'Đăng Văn Nam',
          img:
            'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
          time: '12m',
          typeNotify: 2,
          content:
            'ABC Đăng Văn Nam Đăng Văn Nam Đăng Văn Nam  m Đăng Văn Nam Đăng Văn Nam Hôm qua Hôm qua em xinh quá trời Đăng Văn Nam Hôm qua e',
        },
      ]
    return ( 
     <NavBar>
           <View
      style={{
        flex: 1,
        position: 'relative',
        paddingVertical: 30,
        width: Dimensions.get('window').width,
        paddingHorizontal: 15,
        

      }}
    >
      <View
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Text style={{ fontWeight: 'bold', fontSize: 24 }}>Thông báo</Text>
        </View>
        <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc' }} />
        <ScrollView style={{ flex: 1 }}>
          <View>
            {data.map((data, index) => (
              <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: 10,
              }}
            >
              <View style={{ flexDirection: 'row' }}>
              <View style={{ marginRight: 5 }}>
                    {/* Hiển thị hình ảnh nếu có, thay thế 'data?.img' bằng đường dẫn hình ảnh thực tế */}
                    {data?.img && (
                      <Image
                        source={{ uri: data?.img }}
                        style={{ width: 50, height: 50, borderRadius: 5 }}
                      />
                    )}
                  </View>
                <View style={{ maxWidth: 250 }}>
                  <View style={{ marginBottom: 3 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                      {data?.name}
                    </Text>
                  </View>
                  <View
                    style={{
                      overflow: 'hidden',
                      display: data?.content ? 'block' : 'none',
                    }}
                  >
                    <Text style={{ fontSize: 14 }} numberOfLines={1}>
                      {data?.content}
                    </Text>
                  </View>
                  {data?.type && (
                    <View style={{ flexDirection: 'row' }}>
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
                    <View style={{  flexDirection: 'row' , alignItems: "center", justifyContent: "center"}}>
                      <Icon name="circle" size={10} color="#3498db" />
                    </View>
                  )}
                </View>
              </View>
            </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
     </NavBar>
     );
}

export default Notification;