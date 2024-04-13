import { useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../../../thunks/UserThunk'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'


function DetailJob({setHiddenDetail}) {
  const { singleJob } = useSelector((state) => state.jobsReducer)
  const { allUser } = useSelector((state) => state.usersReducer)
  const dispatch = useDispatch()
  useLayoutEffect(() => {
    if (allUser?.length <= 0) {
      dispatch(getAllUsers())
    }
  }, [])
  return (
    <View style={{ position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center', }}>
      <View
        style={{ backgroundColor: 'white', padding: 20, borderBottomWidth: 1 }}
      >
        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>
          Chi tiết công việc
        </Text>
      </View>

      <ScrollView style={{ padding: 20 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>
          Tiêu đề:
        </Text>
        <Text style={{ fontSize: 16, marginBottom: 20 }}>
          {singleJob?.title}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 20,
          }}
        >
          <View>
            <Text style={{ fontSize: 16, marginBottom: 5 }}>
              Thời gian bắt đầu:
            </Text>
            <Text style={{ fontSize: 16 }}>
              {
                new Date(singleJob?.jobDetail?.timeStart)
                  .toISOString()
                  .split('T')[0]
              }
            </Text>
          </View>
          <View>
            <Text style={{ fontSize: 16, marginBottom: 5 }}>
              Thời gian kết thúc:
            </Text>
            <Text style={{ fontSize: 16 }}>
              {
                new Date(singleJob?.jobDetail?.timeEnd)
                  .toISOString()
                  .split('T')[0]
              }
            </Text>
          </View>
        </View>

        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
            Chi tiết công việc
          </Text>
          <Text style={{ fontSize: 16, marginBottom: 5 }}>
            Mức độ: <Text style={{ color: 'red' }}>{singleJob?.priority}</Text>
          </Text>
          <Text style={{ fontSize: 16, marginBottom: 5 }}>
            Trạng thái:{' '}
            <Text style={{ color: 'red' }}>
              {singleJob?.status || 'Chưa có trạng thái nào'}
            </Text>
          </Text>
          <Text style={{ fontSize: 16, marginBottom: 5 }}>
            Tổng KPI:{' '}
            <Text style={{ color: 'red' }}>{singleJob?.kpiCount}</Text>
          </Text>
          <Text style={{ fontSize: 16, marginBottom: 5 }}>
            Chi tiết công việc
          </Text>
          <Text style={{ color: 'red' }}>
            {singleJob?.jobDetail?.description}
          </Text>
        </View>

        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Phân công</Text>
          <View style={{ maxHeight: 200, overflow: 'scroll' }}>
            {singleJob?.staffs?.map((item) =>
              allUser.some((user) => user.id === item.id) ? (
                <TouchableOpacity
                  key={item.id}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 10,
                  }}
                >
                  <Image
                    source={{ uri: item.avatar }}
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 25,
                      marginRight: 10,
                    }}
                  />
                  <Text style={{ fontSize: 16 }}>{item.fullName}</Text>
                </TouchableOpacity>
              ) : null,
            )}
          </View>
        </View>

        <View>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
            Người chịu trách nhiệm
          </Text>
          <View>
            {allUser.some((user) => user.id === singleJob?.manager?.id) ? (
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 10,
                }}
              >
                <Image
                  source={{ uri: singleJob?.manager?.avatar }}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    marginRight: 10,
                  }}
                />
                <Text style={{ fontSize: 16 }}>
                  {singleJob?.manager?.fullName}
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </ScrollView>

      <View
        style={{
          padding: 20,
          borderTopWidth: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Text style={{ fontSize: 12, color: 'gray' }}>
          Ngày tạo: {new Date(singleJob?.createdAt).toISOString().split('T')[0]}
        </Text>
        <TouchableOpacity
          style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5 }}
          onPress={setHiddenDetail(false)}
        >
          <Text style={{ color: 'white' }}>Quay lại</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default DetailJob
