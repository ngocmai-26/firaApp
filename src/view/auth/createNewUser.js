import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, ScrollView, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { createNewUser } from '../../thunks/AuthThunk';
import { setLogged } from '../../slices/AuthSlice';

function CreateNewUser() {
  const dispatch = useDispatch();
  const [newUserData, setNewUserData] = useState({});
  const [errors, setErrors] = useState({});

  const handleCreateNewUser = () => {
    const validationErrors = {};
    if (!newUserData.firstName) {
      validationErrors.firstName = "Không được bỏ trống";
    }
    if (!newUserData.lastName) {
      validationErrors.lastName = "Không được bỏ trống";
    }
    if (!newUserData.address) {
      validationErrors.address = "Không được bỏ trống";
    }
    if (!newUserData.birthday) {
      validationErrors.birthday = "Không được bỏ trống";
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(newUserData.birthday)) {
      validationErrors.birthday = "Định dạng ngày sinh không hợp lệ (VD: 2002-02-02)";
    } else {
      const parts = newUserData.birthday.split('-');
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10);
      const day = parseInt(parts[2], 10);
      const dateObject = new Date(year, month - 1, day);

      if (
        dateObject.getFullYear() !== year ||
        dateObject.getMonth() !== month - 1 ||
        dateObject.getDate() !== day
      ) {
        validationErrors.birthday = "Ngày sinh không hợp lệ";
      }
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    dispatch(createNewUser(newUserData));
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ height: '100%' }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              width: '80%',
              backgroundColor: 'white',
              borderRadius: 10,
              padding: 20,
              margin: 20,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            <View style={{ alignItems: 'center' }}>
              <Text
                style={{ fontWeight: 'bold', fontSize: 22, color: '#367BD6' }}
              >
                Thông tin người dùng
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 16,
                  marginBottom: 10,
                  textAlign: 'center',
                  marginVertical: 5,
                }}
              >
                Vui lòng nhập đầy đủ thông tin
              </Text>

              <View style={{ marginBottom: 10 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    marginVertical: 5,
                  }}
                >
                  FirstName:
                </Text>
                <TextInput
                  style={{
                    fontSize: 16,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    marginTop: 3,
                    width: '100%',
                    borderWidth: 1,
                    borderColor: errors.firstName ? 'red' : '#ccc',
                    borderRadius: 5,
                    marginVertical: 5,
                  }}
                  onChangeText={(value) =>
                    setNewUserData({ ...newUserData, firstName: value })
                  }
                  placeholder="VD: Mai"
                />
                {errors.firstName && (
                  <Text style={{ color: 'red' }}>{errors.firstName}</Text>
                )}
              </View>

              <View style={{ marginBottom: 10 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    marginVertical: 5,
                  }}
                >
                  LastName:
                </Text>
                <TextInput
                  style={{
                    fontSize: 16,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    marginTop: 3,
                    width: '100%',
                    borderWidth: 1,
                    borderColor: errors.lastName ? 'red' : '#ccc',
                    borderRadius: 5,
                    marginVertical: 5,
                  }}
                  onChangeText={(value) =>
                    setNewUserData({ ...newUserData, lastName: value })
                  }
                  placeholder="VD: Nguyễn"
                />
                {errors.lastName && (
                  <Text style={{ color: 'red' }}>{errors.lastName}</Text>
                )}
              </View>

              <View style={{ marginBottom: 10 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    marginVertical: 5,
                  }}
                >
                  Address:
                </Text>
                <TextInput
                  style={{
                    fontSize: 16,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    marginTop: 3,
                    width: '100%',
                    borderWidth: 1,
                    borderColor: errors.address ? 'red' : '#ccc',
                    borderRadius: 5,
                    marginVertical: 5,
                  }}
                  onChangeText={(value) =>
                    setNewUserData({ ...newUserData, address: value })
                  }
                  placeholder="VD: Hồ Chí Minh"
                />
                {errors.address && (
                  <Text style={{ color: 'red' }}>{errors.address}</Text>
                )}
              </View>

              <View style={{ marginBottom: 10 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    marginVertical: 5,
                  }}
                >
                  Birthday:
                </Text>
                <TextInput
                  style={{
                    fontSize: 16,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    marginTop: 3,
                    width: '100%',
                    borderWidth: 1,
                    borderColor: errors.birthday ? 'red' : '#ccc',
                    borderRadius: 5,
                    marginVertical: 5,
                  }}
                  placeholder="VD: 2002-20-12"
                  onChangeText={(value) =>
                    setNewUserData({ ...newUserData, birthday: value })
                  }
                />
                {errors.birthday && (
                  <Text style={{ color: 'red' }}>{errors.birthday}</Text>
                )}
              </View>

              <View style={{ marginBottom: 10 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    marginVertical: 5,
                  }}
                >
                  Department:
                </Text>
                <TextInput
                  style={{
                    fontSize: 16,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    marginTop: 3,
                    width: '100%',
                    borderWidth: 1,
                    borderColor: errors.department ? 'red' : '#ccc',
                    borderRadius: 5,
                    marginVertical: 5,
                  }}
                  placeholder="VD: Khoa Công Nghệ Thông Tin"
                  onChangeText={(value) =>
                    setNewUserData({ ...newUserData, department: value })
                  }
                />
                {errors.department && (
                  <Text style={{ color: 'red' }}>{errors.department}</Text>
                )}
              </View>

              <View style={{ marginBottom: 10 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    marginVertical: 5,
                  }}
                >
                  Phone:
                </Text>
                <TextInput
                  style={{
                    fontSize: 16,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    marginTop: 3,
                    width: '100%',
                    borderWidth: 1,
                    borderColor: errors.phone ? 'red' : '#ccc',
                    borderRadius: 5,
                    marginVertical: 5,
                  }}
                  onChangeText={(value) =>
                    setNewUserData({ ...newUserData, phone: value })
                  }
                  placeholder="VD: 0378556845"
                />
                {errors.phone && (
                  <Text style={{ color: 'red' }}>{errors.phone}</Text>
                )}
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 20,
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: '#4a90e2',
                    padding: 10,
                    borderRadius: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '45%',
                  }}
                  onPress={()=> {dispatch(setLogged(false))}}
                >
                  <Text style={{ color: 'white', fontSize: 16 }}>Quay lại </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#4a90e2',
                    padding: 10,
                    borderRadius: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '45%',
                  }}
                  onPress={handleCreateNewUser}
                >
                  <Text style={{ color: 'white', fontSize: 16 }}>Tiếp tục</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default CreateNewUser;
