import { useLayoutEffect, useState } from 'react'
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { cancelKPI, updateKPIDetail } from '../../thunks/KPIsThunk';
import moment from 'moment';

function ExpertiseKPIModal({ handleExpertise }) {
    const { singleKPI } = useSelector((state) => state.kpisReducer);
    const dispatch = useDispatch();
    const [dataUpdate, setDataUpdate] = useState({
        name: singleKPI?.name,
        description: singleKPI?.description,
        target: 0,
        kpiTypeId: singleKPI?.kpiType?.id,
      });
      const [changeNote, setChangeNote] = useState("");
    
      const [dataUpdateDetail, setDataUpdateDetail] = useState({
        note: singleKPI?.detail?.note,
        comment: singleKPI?.detail?.comment,
        timeStart: moment(singleKPI?.detail?.timeStart).format("YYYY-MM-DD"),
        timeEnd: moment(singleKPI?.detail?.timeEnd).format("YYYY-MM-DD"),
      });
    

    const handleCancel = () => {
        dispatch(
          cancelKPI({
            id: singleKPI.id,
            data: { ...dataUpdate, description: "EVALUATE" },
          })
        ).then((reps) => {
          if (!reps.error) {
            console.log("a")
            dispatch(
              updateKPIDetail(
                {id: singleKPI.id,
                  data: { ...dataUpdateDetail, note: changeNote }})
            ).then((reps) => {
              if (!reps.error) {
                console.log("aaa")
                handleExpertise()
              }
            });
          }
        });
      };

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
              Ý kiến của bạn
            </Text>
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: '#ccc',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 2,
                borderWidth: 1,
                borderColor: '#ccc',
                paddingVertical: 2,
                paddingHorizontal: 10,
                borderRadius: 10,
                marginVertical: 5,
              }}
            >
              <TextInput
                multiline={true}
                numberOfLines={3}
                style={styles.textInput}
                placeholder="Hãy nêu ý kiến của bạn"
              />
            </View>
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
                onPress={handleExpertise}
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
              <TouchableOpacity
                style={{
                  backgroundColor: '#2089dc',
                  borderWidth: 1,
                  borderColor: '#2089dc',
                  padding: 5,
                  marginLeft: 5,
                  borderRadius: 5,
                  elevation: 5,
                }}
                onPress={handleCancel}
              >
                <Text
                  style={{
                    color: 'white',
                    fontSize: 16,
                  }}
                >
                  Phản hồi
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
export default ExpertiseKPIModal
