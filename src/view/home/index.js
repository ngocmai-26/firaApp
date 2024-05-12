import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native'
import NavBar from '../../layout/navbar'
import { useNavigation } from '@react-navigation/native'

const HomeApp = () => {
  const navigation = useNavigation()
  return (
    <NavBar>
      <View
        style={{
    
        }}
      >
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.container}>
            <View style={styles.rowContainer}>
              <View style={[styles.containerItem]}>
                <TouchableOpacity
                  style={styles.homeBox}
                  onPress={() => navigation.navigate('dashboard')}
                >
                  <Image
                    source={{
                      uri:
                        'https://cdn-icons-png.flaticon.com/256/8899/8899687.png',
                    }}
                    style={{
                      width: 100,
                      height: 100,
                    }}
                  />
                </TouchableOpacity>
              </View>
              <View style={[styles.containerItem]}>
                <TouchableOpacity
                  style={styles.homeBox}
                  onPress={() => navigation.navigate('dashboard')}
                >
                  <Image
                    source={{
                      uri:
                        'https://cdn-icons-png.flaticon.com/256/8899/8899687.png',
                    }}
                    style={{
                      width: 100,
                      height: 100,
                    }}
                  />
                </TouchableOpacity>
              </View>

              <View style={[styles.containerItem]}>
                <TouchableOpacity
                  style={styles.homeBox}
                  onPress={() => navigation.navigate('tai-khoan')}
                >
                  <Image
                    source={{
                      uri:
                        'https://cdn-icons-png.flaticon.com/512/9458/9458848.png',
                    }}
                    style={{
                      width: 100,
                      height: 100,
                    }}
                  />
                </TouchableOpacity>
              </View>
              <View style={[styles.containerItem]}>
                <TouchableOpacity
                  style={styles.homeBox}
                  onPress={() => navigation.navigate('quan-ly-cong-viec')}
                >
                  <Image
                    source={{
                      uri:
                        'https://cdn-icons-png.flaticon.com/512/2936/2936630.png',
                    }}
                    style={{
                      width: 100,
                      height: 100,
                    }}
                  />
                </TouchableOpacity>
              </View>
              <View style={[styles.containerItem]}>
                <TouchableOpacity
                  style={styles.homeBox}
                  onPress={() => navigation.navigate('checkin')}
                >
                  <Image
                    source={{
                      uri:
                        'https://cdn-icons-png.flaticon.com/512/9086/9086371.png',
                    }}
                    style={{
                      width: 100,
                      height: 100,
                    }}
                  />
                </TouchableOpacity>
              </View>
              <View style={[styles.containerItem]}>
                <TouchableOpacity
                  style={styles.homeBox}
                  onPress={() => navigation.navigate('chat')}
                >
                  <Image
                    source={{
                      uri:
                        'https://cdn.iconscout.com/icon/free/png-256/free-chat-2130787-1794829.png?f=webp',
                    }}
                    style={{
                      width: 100,
                      height: 100,
                    }}
                  />
                </TouchableOpacity>
              </View>

              <View style={[styles.containerItem]}>
                <TouchableOpacity
                  style={styles.homeBox}
                  onPress={() => navigation.navigate('notesApp')}
                >
                  <Image
                    source={{
                      uri:
                        'https://mnhoacuc.tptdm.edu.vn/uploads/mghoacuc/news/2021_11/icon-01-1.png',
                    }}
                    style={{
                      width: 100,
                      height: 100,
                    }}
                  />
                </TouchableOpacity>
              </View>

              <View style={[styles.containerItem]}>
                <TouchableOpacity
                  style={styles.homeBox}
                  onPress={() => navigation.navigate('notification')}
                >
                  <Image
                    source={{
                      uri:
                        'https://i.pinimg.com/originals/75/3b/1f/753b1fb340090eca32b57c4db58cc1a8.png',
                    }}
                    style={{
                      width: 100,
                      height: 100,
                    }}
                  />
                </TouchableOpacity>
              </View>

              <View style={[styles.containerItem]}>
                <TouchableOpacity
                  style={styles.homeBox}
                  onPress={() => navigation.navigate('checkin')}
                >
                  <Image
                    source={{
                      uri:
                        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo4psUE8KNrENCfZd35nIhhY47OSbrwn5zCC4_rkTHI1Nnd-gKATc3Tr2-MrrujeRB48E&usqp=CAU',
                    }}
                    style={{
                      width: 100,
                      height: 100,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </NavBar>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    width: Dimensions.get('window').width,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    width: Dimensions.get('window').width * 0.85,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  containerItem: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  homeBox: {
    width: 150,
    height: 150,
    backgroundColor: '#fff',
    elevation: 5,
    marginHorizontal: 10,
    marginVertical: 20,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 'center',
  },
  titleBox: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
})

export default HomeApp
