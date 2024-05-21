import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  FlatList,
  Modal,
  TextInput,
} from "react-native";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import Icon from 'react-native-vector-icons/FontAwesome6'
import { GetKPIHistory } from "../../../thunks/KPIsThunk";
import KPIMoreModal from "../../../models/kpi/KPIMoreModal";
function DetailKPI({ setIsModalDetail }) {
  const { singleKPI } = useSelector((state) => state.kpisReducer);
  const dispatch = useDispatch()
  const [kpiMore, setKPIMore] = useState(false)
  const handleMore = (item) => {
    setKPIMore(!kpiMore)
    dispatch(GetKPIHistory(item))
  }
  return (
    <>
      <Modal animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View
              style={{
                paddingVertical: 5,
                borderBottomWidth: 1,
                borderColor: "#ccc",
              }}
            >
              <Text
                style={{ fontSize: 22, textAlign: "center", fontWeight: 500 }}
              >
                {singleKPI.name}
              </Text>
            </View>
            <View
              style={{
                paddingVertical: 5,
                borderBottomWidth: 1,
                borderColor: "#ccc",
              }}
            >
              <Text style={{ fontWeight: 500 }}>Thông tin cơ bản</Text>
              <View>
                <View style={{ flexDirection: "row" }}>
                  <Text>Họ và tên: </Text>
                  <Text style={{ color: "#AAAAAA" }}>
                    {singleKPI.user.fullName}
                  </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text>Phòng ban: </Text>
                  <Text style={{ color: "#AAAAAA" }}>
                    {singleKPI.user.department}
                  </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text>Email: </Text>
                  <Text style={{ color: "#AAAAAA" }}>
                    {singleKPI.user?.email}
                  </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text>Name Sinh: </Text>
                  <Text style={{ color: "#AAAAAA" }}>
                    {moment(singleKPI?.user?.birthday).format("DD-MM-YYYY")}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                paddingVertical: 5,
                borderBottomWidth: 1,
                borderColor: "#ccc",
              }}
            >
              <Text style={{ fontWeight: 500 }}>Thông tin phiếu KPI</Text>
              <View
              style={{
                paddingVertical: 5,
              }}
            >
              <View>
                <Text style={{ fontWeight: 500 }}>1/</Text>
                <View>
                  <Text>TIÊU CHÍ ĐÁNH GIÁ: </Text>
                  <Text style={{ fontSize: 18, color: '#AAAAAA' }}>
                    Tuân thủ giờ giấc làm việc{' '}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text>ĐIỂM TỐI ĐA: </Text>
                  <Text style={{ color: '#AAAAAA' }}>5</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text>ĐIỂM TỰ ĐÁNH GIÁ: </Text>
                  <Text style={{ color: '#AAAAAA' }}>
                    {singleKPI?.user?.checkInPoint}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text>TỈ LỆ HOÀN THÀNH: </Text>
                  <Text style={{ color: '#AAAAAA' }}>
                    {((singleKPI?.user?.checkInPoint / 95) * 5).toFixed(2)} %
                  </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text>THẨM ĐỊNH: </Text>
                  <TextInput
                      defaultValue="0"
                      style={{
                        borderWidth: 1,
                        borderColor: "#ccc",
                        textAlign: 'center'
                      }}
                    />
                </View>
              </View>
              <View>
                <Text style={{ fontWeight: 500 }}>2/</Text>
                <View>
                  <Text>TIÊU CHÍ ĐÁNH GIÁ: </Text>
                  <Text style={{ fontSize: 18, color: '#AAAAAA' }}>
                    Công việc hoàn thành{' '}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text>ĐIỂM TỐI ĐA: </Text>
                  <Text style={{ color: '#AAAAAA' }}>5</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text>Điểm tự đánh giá: </Text>
                  <Text style={{ color: '#AAAAAA' }}>
                    {' '}
                    {singleKPI?.user?.jobPoint}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text>TỈ LỆ HOÀN THÀNH: </Text>
                  <Text style={{ color: '#AAAAAA' }}>
                    {((singleKPI?.user?.jobPoint / 95) * 100).toFixed(2)} %
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: "center" }}>
                  <Text >THẨM ĐỊNH: </Text>
                  <TextInput
                      defaultValue="0"
                      style={{
                        borderWidth: 1,
                        borderColor: "#ccc",
                        textAlign: 'center'
                      }}
                    />
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#fff',
                      borderWidth: 1,
                      borderColor: '#FFFF33',
                      padding: 5,
                      borderRadius: 5,
                      elevation: 5,
                    }}
                    onPress={() => handleMore(singleKPI?.user?.id)}
                  >
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 16,
                      }}
                    >
                      Chi tiết
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            </View>
            <View
              style={{
                paddingVertical: 5,
                borderBottomWidth: 1,
                borderColor: "#ccc",
              }}
            >
              <Text style={{ fontWeight: 500 }}>Nhận xét</Text>
              <View>
                <View style={{ flexDirection: "row", alignItems: 'flex-start' }}>
                  <TextInput
                      defaultValue="Hãy thêm nhận xét"
                      style={{
                        borderWidth: 1,
                        borderColor: "#ccc",
                        height: 60,
                        width: '100%',
                        paddingHorizontal: 10,
                        paddingVertical: 2
                      }}
                    />
                </View>
               
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                marginVertical: 15,
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "#ccc",
                  borderWidth: 1,
                  borderColor: "#ccc",
                  padding: 5,
                  marginLeft: 5,
                  borderRadius: 5,
                  elevation: 5,
                }}
                onPress={() => setIsModalDetail(false)}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 16,
                  }}
                >
                  Đóng
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "#f8dea7",
                  borderWidth: 1,
                  borderColor: "#f8dea7",
                  padding: 5,
                  marginLeft: 5,
                  borderRadius: 5,
                  elevation: 5,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 16,
                  }}
                >
                  Gửi
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {kpiMore && <KPIMoreModal handleMore={handleMore} />}
    </>
  );
}

export default DetailKPI;

const styles = StyleSheet.create({
  informationPlanContainer: {
    marginTop: 10,
  },
  informationPlanTitle: {
    fontSize: 16,
    fontWeight: "400",
    color: "#b2b4b6",
  },
  scheduleTypeContainer: {
    marginTop: 5,
  },
  calendarItem: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
    marginHorizontal: 2,
  },
  calendarText: {
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "90%",
  },
  modalItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});
