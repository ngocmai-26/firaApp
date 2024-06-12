import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllNotification,
  readNotification,
} from '../../thunks/NotificationThunk';
import NavBar from '../../layout/navbar';

function Notification() {
  const dispatch = useDispatch();
  const { notifications } = useSelector((state) => state.notificationReducer);
  const unreadCount = notifications?.filter((item) => !item?.read).length;
  const [data, setData] = useState(notifications);

  useEffect(() => {
    if (notifications?.length <= 0) {
      dispatch(getAllNotification());
    }
  }, []);

  useLayoutEffect(() => {

  }, [])

  const handleReadNotification = (item) => {
    dispatch(readNotification(item)).then((resp) => {
      if (!resp.error) {
        console.log('notifications', notifications)
      }
    });
  };

  const renderItem = ({ item }) => (
    <View
      style={{
        backgroundColor: item.read ? '' : '#DDDDDD',
      }}>
      <TouchableOpacity onPress={() => handleReadNotification(item.id)}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 10,
            paddingHorizontal: 15,
          }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ marginRight: 5 }}>
              {item?.type && (
                <Image
                  source={{
                    uri: item?.type === 1
                      ? 'https://cdn1.iconfinder.com/data/icons/ui-colored-2-of-3/100/UI_2__1-512.png'
                      : item?.type === 2
                        ? 'https://upload.tanca.io/api/image/news/611bed5f035cef73103a6107?name=2021-08-18-000951-quan-ly-cong-viec.jpg'
                        : item?.type === 3
                          ? 'https://freepngimg.com/save/97427-logo-chat-png-file-hd/640x492'
                          : '',
                  }}
                  style={{ width: 50, height: 50, borderRadius: 5 }}
                />
              )}
            </View>
            <View style={{ maxWidth: 300 }}>
              <View style={{ marginBottom: 3 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                  {item?.content}
                </Text>
              </View>
              <View style={{ overflow: 'hidden' }}>
                <Text style={{ fontSize: 14 }} numberOfLines={1}>
                  Bạn đã được giao việc từ {item?.from?.fullName}
                </Text>
              </View>
            </View>
          </View>
          <View>
            <Text style={{ fontSize: 12, color: '#888888' }}>{item?.time}</Text>
            {item?.typeNotify && item?.typeNotify !== 1 && (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {/* Add notification icon here */}
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <NavBar>
      <View
        style={{
          flex: 1,
          position: 'relative',
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height * 0.9,
        }}>
        <FlatList
          data={notifications?.slice().reverse()}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </NavBar>
  );
}

export default Notification;
