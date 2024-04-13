import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import moment from 'moment';
function DetailPlanModal({ singlePlan, handleGetPlanById }) {
    return ( 
        <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ padding: 16 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{singlePlan?.title}</Text>
            <TouchableOpacity
              onPress={handleGetPlanById}
              style={{ position: 'absolute', right: 16, top: 16 }}
            >
              <Text style={{ color: '#666', fontSize: 16 }}>Đóng</Text>
            </TouchableOpacity>
          </View>
  
          <View style={{ backgroundColor: '#fff', padding: 16 }}>
            <View style={{ marginBottom: 16 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Loại kế hoạch:</Text>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#333' }}>
                {singlePlan?.planDetail?.planType === 'ONCE' ? '1 lần' : 'định kì'}
              </Text>
            </View>
            <View style={{ marginBottom: 16 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Trạng thái:</Text>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#333' }}>
                {singlePlan?.planDetail?.status === 'ACTIVE' ? 'Đang hoạt động' : 'Đang tạm ngưng'}
              </Text>
            </View>
            <View style={{ marginBottom: 16 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Thời gian:</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#333' }}>
                  Từ: {moment(singlePlan?.planDetail?.timeStart).format('DD-MM-YYYY')}
                </Text>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#333', marginLeft: 16 }}>
                  Đến: {moment(singlePlan?.planDetail?.timeEnd).format('DD-MM-YYYY')}
                </Text>
              </View>
            </View>
            <View style={{ marginBottom: 16 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Mô tả:</Text>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#333' }}>
                {singlePlan?.planDetail?.description}
              </Text>
            </View>
            <View style={{ marginBottom: 16, borderLeftWidth: 1, borderColor: '#ccc', paddingLeft: 16 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#333' }}>Công việc:</Text>
              <ScrollView
                style={{ maxHeight: 200 }}
                contentContainerStyle={{ paddingBottom: 20 }}
                showsVerticalScrollIndicator={false}
              >
                {singlePlan?.planJobs?.map((item) => (
                  <View key={item.id} style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginBottom: 16, padding: 16 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'red' }}>Tên công việc: {item.title}</Text>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'red' }}>Trạng thái công việc: {item?.status}</Text>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'red' }}>Người quản lý công việc: {item?.manager?.fullName}</Text>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'red' }}>Liên lạc quản lý: {item?.manager?.phone}</Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          </View>
        </ScrollView>
      </View>
     );
}

export default DetailPlanModal;