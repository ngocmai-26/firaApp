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
import { useDispatch, useSelector } from 'react-redux'
import { getJobById } from '../../thunks/JobsThunk'
import { useNavigation } from '@react-navigation/native'
function DetailPlanModal({ handleGetPlanById }) {
  const { singlePlan } = useSelector((state) => state.plansReducer)
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const handleDetailJob = (item) => {
    dispatch(getJobById(item)).then((reps) => {
      if (!reps.error) {
        navigation.navigate('chi-tiet-cong-viec')
      }
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'ONCE':
        return '#FEA837' // Màu vàng nhạt
      case 'LOOP':
        return '#A4C3A2' // Màu xanh lá
      default:
        return '#fff'
    }
  }
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
                  borderColor: getStatusColor(singlePlan?.planDetail?.planType),

                  borderWidth: 1,
                  padding: 5,
                  marginRight: 2,
                  borderRadius: 5,
                }}
              >
                <Text
                  style={{
                    color: getStatusColor(singlePlan?.planDetail?.planType),
                    fontSize: 12,
                  }}
                >
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
                  <TouchableOpacity
                    key={item.id}
                    style={{
                      borderWidth: 1,
                      borderColor: '#ccc',
                      borderRadius: 8,
                      marginBottom: 16,
                      padding: 16,
                    }}
                    
                onPress={() => handleDetailJob(item.id)}
                  >
                    <View
                      style={{ width: Dimensions.get('window').width * 0.8 }}
                    >
                      <View style={{borderBottomColor: "#ccc", borderBottomWidth: 1, paddingBottom: 5, marginBottom: 5}}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: 600,
                          paddingVertical: 5,
                        }}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        {item?.title}
                      </Text>
                      <Text
                        style={[styles.lineJob, { fontSize: 12 }]}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        {item?.jobDetail?.description}
                      </Text>
                      </View>
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
                  </TouchableOpacity>
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
