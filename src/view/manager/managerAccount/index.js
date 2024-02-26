import { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome6'

const AccountBox = ({ account, onApprove, onViewProfile }) => {
  const navigation = useNavigation()

  const handlePress = () => {
    // Chuyển đến trang hiển thị thông tin chi tiết của tài khoản
    navigation.navigate('accountDetail')
  }

  const handleViewProfile = () => {
    // Kiểm tra nếu status của tài khoản là 2, thì chuyển thành 0
    if (account.status === 2) {
      onViewProfile(account)
    } else {
      handlePress()
    }
  }

  const truncatedEmail =
    account.email.length > 20
      ? account.email.substring(0, 20) + '...'
      : account.email

  return (
    <View
      style={[
        styles.box,
        account.status === 1 && {
          backgroundColor: '#ff7c7ca6',
          borderColor: '#ff7c7ca6',
        },
      ]}
    >
      <View style={styles.boxItem}>
        <Image
          source={{
            uri:
              'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg',
          }}
          style={{ width: 65, height: 65, borderRadius: 100 }}
        />
      </View>
      <View style={[styles.boxItem, { flex: 1 }]}>
        <Text style={styles.name}>{account.name}</Text>
        <Text style={styles.email} numberOfLines={1}>
          {truncatedEmail}
        </Text>
      </View>
      <View style={styles.boxItem}>
        <TouchableOpacity
          style={{ paddingHorizontal: 5, paddingVertical: 1 }}
          onPress={handleViewProfile} // Thay đổi sự kiện onPress thành handleViewProfile
        >
          <Icon
            name={account.status === 2 ? 'user' : 'eye'}
            size={18}
            color="#4F4F4F"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ paddingHorizontal: 5, paddingVertical: 1 }}
          onPress={() => onApprove(account)}
        >
          <Icon name="trash-can" size={20} color="#4F4F4F" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const ManagerAccount = () => {
  const accountList = [
    { name: 'John Doe', email: 'john.doe@example.com', status: 0 },
    { name: 'Jane Smith', email: 'jane.smith@example.com', status: 1 },
    { name: 'John Doe', email: 'john.doe@example.com', status: 0 },
    { name: 'Jane Smith', email: 'jane.smith@example.com', status: 0 },
    { name: 'Jane Smith', email: 'jane.smith@example.com', status: 1 },
    { name: 'John Doe', email: 'john.doe@example.com', status: 0 },
    { name: 'Jane Smith', email: 'jane.smith@example.com', status: 0 },
    { name: 'Jane Smith', email: 'jane.smith@example.com', status: 0 },
    { name: 'John Doe', email: 'john.doe@example.com', status: 1 },
    { name: 'Jane Smith', email: 'jane.smith@example.com', status: 1 },
    { name: 'Jane Smith', email: 'jane.smith@example.com', status: 2 },
    { name: 'John Doe', email: 'john.doe@example.com', status: 2 },
    { name: 'Jane Smith', email: 'jane.smith@example.com', status: 2 },
    { name: 'Jane Smith', email: 'jane.smith@example.com', status: 2 },
    { name: 'Jane Smith', email: 'jane.smith@example.com', status: 2 },
    // Thêm các tài khoản khác vào đây
  ]
  const [accounts, setAccounts] = useState(
    accountList.filter((account) => account.status !== 2),
  )
  const [showApproved, setShowApproved] = useState(false)

  const handleApprove = (accountToApprove) => {
    setAccounts(accountList.filter((account) => account.status !== 2))
  }
  const handleApproved = (accountToApprove) => {
    // Lọc ra các tài khoản không có status là 2
    const approvedAccounts = accountList.filter(
      (account) => account.status !== 2,
    )
    setAccounts(accountList.filter((account) => account.status === 2))
  }

  const toggleShowApproved = () => {
    setShowApproved(!showApproved)
  }

  const onViewProfile = (accountToUpdate) => {
    // Cập nhật status của tài khoản thành 0
    const updatedAccounts = accounts.map((account) => {
      if (account === accountToUpdate) {
        return { ...account, status: 0 }
      }
      return account
    })
    setAccounts(updatedAccounts)
  }

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          padding: 10,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: '#007bff',
            padding: 10,
            borderRadius: 5,
          }}
          onPress={() => {
            if (showApproved) {
              setShowApproved(false)
              handleApprove()
            } else {
              setShowApproved(true)
              handleApproved()
            }
            toggleShowApproved()
          }}
        >
          <Text style={{ color: 'white' }}>
            {showApproved ? 'Tài khoản đã duyệt' : 'Duyệt tài khoản'}
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        {accounts.map((account, index) => (
          <AccountBox
            key={index}
            account={account}
            onApprove={handleApprove}
            onViewProfile={onViewProfile} // Truyền hàm onViewProfile vào AccountBox
          />
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  box: {
    width: '100%',
    height: 100,
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#4F4F4F',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxItem: {
    paddingHorizontal: 5,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  email: {
    fontSize: 14,
    color: '#888',
  },
})

export default ManagerAccount
