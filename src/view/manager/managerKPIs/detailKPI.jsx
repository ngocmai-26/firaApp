import React, { useEffect, useState } from "react";
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
import Icon from "react-native-vector-icons/FontAwesome6";
import { GetKPIHistory, getAllKPI, getKpiVerifyById, getKpisById } from "../../../thunks/KPIsThunk";
import KPIMoreModal from "../../../models/kpi/KPIMoreModal";
import ExpertiseKPIModal from "../../../models/kpi/ExpertiseKPIModal";
function DetailKPIEvaluated({ setIsModalDetail }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "DONE":
        return "#FEA837"; // Màu vàng nhạt
      case "EVALUATE":
        return "#A4C3A2"; // Màu xanh lá
      default:
        return "#fff";
    }
  };
  const { singleKPI } = useSelector((state) => state.kpisReducer);
  const dispatch = useDispatch();
  const [kpiMore, setKPIMore] = useState(false);
  const [expertise, setExpertise] = useState(false);
  const { user } = useSelector((state) => state.authReducer);

  const handleMore = (item) => {
    setKPIMore(!kpiMore);
    dispatch(GetKPIHistory(item));
  };
  const handleExpertise = (item) => {
    setExpertise(!expertise);
    dispatch(GetKPIHistory(item));
  };

 

  const handleSubmit = () => {
    dispatch(getKpiVerifyById(singleKPI.id)).then((reps) => {
      if (!reps.error) {
        setIsModalDetail(false);
      }
    });
  };

  return (
    <>
      <Modal animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <ScrollView style={styles.modalContent}>
            <View
              style={{
                paddingVertical: 20,
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
                borderColor: getStatusColor(singleKPI.description),
                borderWidth: 1,
                padding: 3,
                marginRight: 2,
                borderRadius: 5,
                position: "absolute",
                right: 0,
                top: 0,
              }}
            >
              <Text
                style={{
                  color: getStatusColor(singleKPI.description),
                  fontSize: 10,
                }}
              >
                {(singleKPI.description === "DONE" &&
                singleKPI?.verify === false && "Expertise" ) || singleKPI.description}
            
              </Text>
            </View>
            <View
              style={{
                paddingVertical: 5,
                borderBottomWidth: 1,
                borderColor: "#ccc",
              }}
            >
              <Text style={{ fontWeight: 500, fontSize: 20 }}>
                Thông tin cơ bản
              </Text>
              <View>
                <View style={{ flexDirection: "row", paddingVertical: 3 }}>
                  <Text style={{ fontWeight: 500 }}>Họ và tên: </Text>
                  <Text style={{ color: "#AAAAAA" }}>
                    {singleKPI.user.fullName}
                  </Text>
                </View>
                <View style={{ flexDirection: "row", paddingVertical: 3 }}>
                  <Text style={{ fontWeight: 500 }}>Phòng ban: </Text>
                  <Text style={{ color: "#AAAAAA" }}>
                    {singleKPI.user.department}
                  </Text>
                </View>
                <View style={{ flexDirection: "row", paddingVertical: 3 }}>
                  <Text style={{ fontWeight: 500 }}>Email: </Text>
                  <Text style={{ color: "#AAAAAA" }}>
                    {singleKPI.user?.email}
                  </Text>
                </View>
                <View style={{ flexDirection: "row", paddingVertical: 3 }}>
                  <Text style={{ fontWeight: 500 }}>Năm Sinh: </Text>
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
              <Text style={{ fontWeight: 500, fontSize: 20 }}>
                Thông tin phiếu KPI
              </Text>
              <View
                style={{
                  paddingVertical: 5,
                }}
              >
                <View style={{ paddingVertical: 5 }}>
                  <Text style={{ fontWeight: 500 }}>1/</Text>
                  <View>
                    <Text style={{ fontWeight: 500, paddingVertical: 3 }}>
                      Tiêu chí đánh giá:{" "}
                    </Text>
                    <Text style={{ fontSize: 18, color: "#AAAAAA" }}>
                      Tuân thủ giờ giấc làm việc{" "}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontWeight: 500, paddingVertical: 3 }}>
                      Điểm tối đa:{" "}
                    </Text>
                    <Text style={{ color: "#AAAAAA" }}>5</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontWeight: 500, paddingVertical: 3 }}>
                      Điểm tự đánh giá:{" "}
                    </Text>
                    <Text style={{ color: "#AAAAAA" }}>
                      {singleKPI?.user?.checkInPoint}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontWeight: 500, paddingVertical: 3 }}>
                      Tỉ lệ hoàn thành:{" "}
                    </Text>
                    <Text style={{ color: "#AAAAAA" }}>
                      {((singleKPI?.user?.checkInPoint / 95) * 5).toFixed(2)} %
                    </Text>
                  </View>
                </View>
                <View style={{ paddingVertical: 5 }}>
                  <Text style={{ fontWeight: 500 }}>2/</Text>
                  <View>
                    <Text style={{ fontWeight: 500, paddingVertical: 3 }}>
                      Tiêu chí đánh giá:{" "}
                    </Text>
                    <Text style={{ fontSize: 18, color: "#AAAAAA" }}>
                      Công việc hoàn thành{" "}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontWeight: 500, paddingVertical: 3 }}>
                      Điểm tối đa:{" "}
                    </Text>
                    <Text style={{ color: "#AAAAAA" }}>5</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontWeight: 500, paddingVertical: 3 }}>
                      Điểm tự đánh giá:{" "}
                    </Text>
                    <Text style={{ color: "#AAAAAA" }}>
                      {" "}
                      {singleKPI?.user?.jobPoint}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontWeight: 500, paddingVertical: 3 }}>
                      Tỉ lệ hoàn thành:{" "}
                    </Text>
                    <Text style={{ color: "#AAAAAA" }}>
                      {((singleKPI?.user?.jobPoint / 95) * 100).toFixed(2)} %
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#fff",
                      borderWidth: 1,
                      borderColor: "black",
                      padding: 5,
                      borderRadius: 5,
                    }}
                    onPress={() => handleMore(singleKPI?.user?.id)}
                  >
                    <Text
                      style={{
                        color: "black",
                        fontSize: 16,
                      }}
                    >
                      Chi tiết
                    </Text>
                  </TouchableOpacity>
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
              <Text style={{ fontWeight: 500 }}>Ghi chú</Text>
              <View>
                <View
                  style={{ flexDirection: "row", alignItems: "flex-start" }}
                >
                  <Text>{singleKPI?.detail?.note}</Text>
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
                <View
                  style={{ flexDirection: "row", alignItems: "flex-start" }}
                >
                  <Text>{singleKPI?.detail?.comment === "none"? "Chưa có nhận xét": singleKPI?.detail?.comment}</Text>
                </View>
              </View>
            </View>
            <View style={{ paddingVertical: 5 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontWeight: 500 }}>Điểm thẩm định: </Text>
                <Text>{singleKPI?.target || 0}</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                marginBottom: 20,
                paddingBottom: 20,
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
              {singleKPI.description === "DONE" &&
                singleKPI?.verify === false &&
                singleKPI?.user?.id === user.id && 
                (
                  <>
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#ccc",
                        borderWidth: 1,
                        borderColor: "#ccc",
                        padding: 5,
                        marginLeft: 5,
                        borderRadius: 5,
                      }}
                      onPress={() => handleExpertise(singleKPI?.user?.id)}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontSize: 16,
                        }}
                      >
                        Ý kiến
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#2089dc",
                        borderWidth: 1,
                        borderColor: "#2089dc",
                        padding: 5,
                        marginLeft: 5,
                        borderRadius: 5,
                      }}
                      onPress={handleSubmit}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontSize: 16,
                        }}
                      >
                        Đồng Ý
                      </Text>
                    </TouchableOpacity>
                  </>
                )}
            </View>
          </ScrollView>
        </View>
      </Modal>
      {kpiMore && <KPIMoreModal handleMore={handleMore} />}
      {expertise && <ExpertiseKPIModal handleExpertise={handleExpertise} />}
    </>
  );
}

export default DetailKPIEvaluated;

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
    position: "relative",
    width: "95%",
  },
  modalItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});
