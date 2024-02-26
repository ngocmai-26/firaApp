import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome6'

function AccountDetail({ account }) {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity style={styles.avatarContainer}>
          <Image
            source={{
              uri:
                'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
            }}
            style={{ width: 100, height: 100, borderRadius: 100 }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderColor: 'blue',
            flexDirection: 'row',
            borderWidth: 1,
            position: 'absolute',
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 5,
            borderColor: '#ccc',
            top: 5,
            right: 5,
          }}
        >
          <Icon
            name="eye"
            size={15}
            style={{
              color: '#ccc',
              alignItems: 'center',
            }}
          />
          <Text
            style={{
              color: '#ccc',
              marginLeft: 5,
            }}
          >
            Còn hoạt động
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.row}>
          <Icon name="user" size={20} style={styles.icon} />
          <Text style={styles.input}>aaaaaaaaaaa</Text>
        </View>
        <View style={styles.row}>
          <Icon name="envelope" size={20} style={styles.icon} />
          <Text style={styles.input}>aaaaaaaaaaa</Text>
        </View>
        <View style={styles.row}>
          <Icon name="shield-halved" size={20} style={styles.icon} />
          <Text style={styles.input}>aaaaaaaaaaa</Text>
        </View>
        <View style={styles.row}>
          <Icon name="house-user" size={20} style={styles.icon} />
          <Text style={styles.input}>aaaaaaaaaaa</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  infoContainer: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginVertical: 5,
  },
  icon: {
    color: '#ccc',
    marginRight: 10,
  },
  input: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  saveButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  changePasswordButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  cancelButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
})

export default AccountDetail
