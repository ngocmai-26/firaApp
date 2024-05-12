import React from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  FlatList,
} from 'react-native'
import moment from 'moment'
import { useSelector } from 'react-redux'
function DetailPlanModal({ handleGetPlanById }) {
  const { singlePlan } = useSelector((state) => state.plansReducer)
  return (
    <View
      style={{
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        width: '100%',
        height: Dimensions.get('window').height,
      }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 15,
            elevation: 5,
            marginBottom: 10,
          }}
        >
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: '#ccc',
              paddingVertical: 10,
              marginBottom: 10,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Text
                style={{ fontSize: 16, fontWeight: '400', color: '#b2b4b6' }}
              >
                Tiêu đề:
              </Text>
              <View
                style={{
                  backgroundColor:
                    singlePlan?.planDetail?.planType === 'ONCE'
                      ? '#e5e5e5'
                      : singlePlan?.planDetail?.planType === 'LOOP'
                      ? '#c6e2c6'
                      : '',
                  padding: 5,
                  marginRight: 2,
                  borderRadius: 5,
                }}
              >
                <Text style={{ color: 'white', fontSize: 12 }}>
                  {singlePlan?.planDetail?.planType === 'ONCE'
                    ? '1 LẦN'
                    : singlePlan?.planDetail?.planType === 'LOOP'
                    ? 'ĐỊNH KỲ'
                    : ''}
                </Text>
              </View>
            </View>
            <Text style={{ fontSize: 20, fontWeight: '500' }}>
              {singlePlan?.title}
            </Text>
          </View>
          <View style={{ marginBottom: 16 }}>
            <Text style={styles.informationPlanTitle}>Thời gian:</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 16, fontWeight: '400', color: '#333' }}>
                Từ:{' '}
                {moment(singlePlan?.planDetail?.timeStart).format('DD-MM-YYYY')}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '400',
                  color: '#333',
                  marginLeft: 16,
                }}
              >
                Đến:{' '}
                {moment(singlePlan?.planDetail?.timeEnd).format('DD-MM-YYYY')}
              </Text>
            </View>
          </View>
          <View style={{ marginBottom: 16 }}>
            <Text style={styles.informationPlanTitle}>Trạng thái:</Text>
            <Text style={{ fontSize: 16, fontWeight: '400', color: '#333' }}>
              {singlePlan?.planDetail?.status === 'ACTIVE'
                ? 'Đang hoạt động'
                : 'Đang tạm ngưng'}
            </Text>
          </View>

          <View style={{ marginBottom: 16 }}>
            <Text style={styles.informationPlanTitle}>Mô tả:</Text>
            <Text style={{ fontSize: 16, fontWeight: '400', color: '#333' }}>
              {singlePlan?.planDetail?.description}
            </Text>
          </View>
          {singlePlan?.planDetail?.planType === 'LOOP' && (
            <View style={styles.informationPlanContainer}>
              <Text style={styles.informationPlanTitle}>
                Lịch trình lặp lại:
              </Text>
              <View style={styles.scheduleTypeContainer}>
                <FlatList
                  data={singlePlan?.planDetail?.planSchedules}
                  renderItem={({ item }) => (
                    <View style={styles.calendarItem}>
                      <Text style={styles.calendarText}>
                        {item.scheduleType === 'DAY' ? 'Ngày' : 'Tháng'}{' '}
                        {item.timeStart}
                      </Text>
                    </View>
                  )}
                  keyExtractor={(item, index) => index.toString()}
                  numColumns={4} // Số cột bạn muốn hiển thị trên mỗi hàng
                />
              </View>
            </View>
          )}
        </View>

        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 15,
            elevation: 5,
            marginBottom: 10,
          }}
        >
          <View
            style={{
              marginBottom: 16,
              marginTop: 5,
            }}
          >
            <View
              style={{
                borderBottomWidth: 1,
                borderColor: '#ccc',
                marginBottom: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '400',
                  color: '#333',
                  marginBottom: 10,
                }}
              >
                Công việc:
              </Text>
            </View>

            <ScrollView
              style={{ maxHeight: 200 }}
              contentContainerStyle={{ paddingBottom: 20 }}
              showsVerticalScrollIndicator={false}
            >
              {singlePlan?.planJobs?.length > 0 ? (
                singlePlan?.planJobs?.map((item) => (
                  <View
                    key={item.id}
                    style={{
                      borderWidth: 1,
                      borderColor: '#ccc',
                      borderRadius: 8,
                      marginBottom: 16,
                      padding: 16,
                    }}
                  >
                    <View
                      style={{ width: Dimensions.get('window').width * 0.8 }}
                    >
                      <Text style={[styles.jobTitle, styles.lineJob]}>
                        {item?.title}
                      </Text>
                      <Text style={[styles.lineJob, { fontSize: 10 }]}>
                        {item?.jobDetail?.description}
                      </Text>
                      <View
                        style={[
                          styles.lineJob,
                          { flexDirection: 'row', gap: 2 },
                        ]}
                      >
                        <Text
                          style={[
                            styles.lineJob,
                            { fontWeight: 500, fontSize: 15 },
                          ]}
                        >
                          Người phụ trách:
                        </Text>
                        <Text style={[styles.lineJob, { color: 'red' }]}>
                          {item.manager.fullName}
                        </Text>
                      </View>
                      <View style={{ gap: 2 }}>
                        <Text
                          style={[
                            styles.lineJob,
                            { fontWeight: 500, fontSize: 15 },
                          ]}
                        >
                          Người thực hiện:
                        </Text>
                        <Text
                          style={[
                            styles.lineJob,
                            { fontWeight: 400, fontSize: 15 },
                          ]}
                        >
                          {item.staffs.length !== 0
                            ? item.staffs.map((props) => props.fullName)
                            : 'Chưa có người thực hiện'}
                        </Text>
                      </View>
                      <View
                        style={[
                          styles.lineJob,
                          {
                            gap: 4,
                            flexDirection: 'row',
                            borderTopWidth: 1,
                            borderColor: '#ccc',
                            paddingTop: 10,
                            marginTop: 10,
                          },
                        ]}
                      >
                        <Text style={{ fontSize: 12, color: '#888' }}>
                          Từ ngày:{' '}
                          {
                            new Date(item?.jobDetail?.timeStart)
                              .toISOString()
                              .split('T')[0]
                          }
                        </Text>
                        <Text style={{ fontSize: 12, color: '#888' }}>
                          Đến ngày:{' '}
                          {
                            new Date(item?.jobDetail?.timeStart)
                              .toISOString()
                              .split('T')[0]
                          }
                        </Text>
                      </View>
                    </View>
                  </View>
                ))
              ) : (
                <Text style={{ color: 'red' }}>
                  Chưa có công việc liên quan
                </Text>
              )}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default DetailPlanModal

const styles = StyleSheet.create({
  informationPlanContainer: {
    marginTop: 10,
  },
  informationPlanTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#b2b4b6',
  },
  scheduleTypeContainer: {
    marginTop: 5,
  },
  calendarItem: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
    marginHorizontal: 2,
  },
  calendarText: {
    fontSize: 14,
  },
})
