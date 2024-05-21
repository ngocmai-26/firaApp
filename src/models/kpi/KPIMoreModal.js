import { useState } from 'react'
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

function KPIMoreModal({ handleMore }) {
  const { listKPIHistory } = useSelector((state) => state.kpisReducer)

  return (
    <Modal animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View
            style={{
              paddingVertical: 5,
              borderBottomWidth: 1,
              borderColor: '#ccc',
            }}
          >
            <Text
              style={{ fontSize: 22, textAlign: 'center', fontWeight: 500 }}
            >
              Chi tiết điểm trong công việc
            </Text>
          </View>
          <View
            style={{
              paddingVertical: 5,
              borderBottomWidth: 1,
              borderColor: '#ccc',
              minHeight: 100,
            }}
          >
            {listKPIHistory.map((item, key) => (
              <View key={key}>
                <Text
                  style={{ }}
                >
                  - {item.content}
                </Text>
              </View>
            ))}
          </View>
          <View
            style={{
              paddingVertical: 5,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginVertical: 15,
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: '#ccc',
                  borderWidth: 1,
                  borderColor: '#ccc',
                  padding: 5,
                  marginLeft: 5,
                  borderRadius: 5,
                  elevation: 5,
                }}
                onPress={() => handleMore(false)}
              >
                <Text
                  style={{
                    color: 'white',
                    fontSize: 16,
                  }}
                >
                  Đóng
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '90%',
  },
  modalItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  addFormContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addFormHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
  },

  avatarContainer: {
    marginRight: 10,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  nameContainer: {
    flex: 1,
  },
  fullName: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 10,
    textAlign: 'center',
    color: 'blue',
  },
})

export default KPIMoreModal
