import { useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../../thunks/UserThunk';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { comFirmJob, deleteJob } from '../../../thunks/JobsThunk';
import EValueJobModal from '../../../models/jobs/EValateJobModal';
import ReportJobModel from '../../../models/jobs/ReportJobModal';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

function DetailJob({ handleDetailJob }) {
  const { singleJob } = useSelector((state) => state.jobsReducer);
  const { allUser } = useSelector((state) => state.usersReducer);
  const { account } = useSelector((state) => state.authReducer);
  const [isHiddenReport, setIsHiddenReport] = useState(false);
  const [report, setReport] = useState({});
  const [evaluateData, setEvaluateData] = useState({});
  const [hiddenEValue, setHiddenEValue] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    if (allUser?.length <= 0) {
      dispatch(getAllUsers());
    }
  }, [allUser, dispatch]);

  const handleConfirm = (item) => {
    dispatch(comFirmJob({ id: item, data: { status: 'PROCESSING' } })).then(
      (reps) => {
        if (!reps.error) {
          handleDetailJob();
        }
      }
    );
  };

  const handleHiddenReport = (item) => {
    setReport(item);
    setIsHiddenReport(!isHiddenReport);
  };

  const handleHiddenEValue = (item) => {
    setHiddenEValue(!hiddenEValue);
    setEvaluateData(item);
  };

  const handleDelete = (item) => {
    dispatch(deleteJob(item)).then((reps) => {
      if (!reps.error) {
        navigation.navigate('quan-ly-cong-viec');
      }
    });
  };

  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ScrollView style={{ padding: 20, width: Dimensions.get('window').width }}>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 10,
            elevation: 5,
            marginBottom: 10,
          }}
        >
          <View style={{ marginBottom: 20 }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: '400', color: '#b2b4b6' }}>
                Tiêu đề:
              </Text>
              <View
                style={{
                  backgroundColor:
                    singleJob?.status === 'PENDING'
                      ? '#e5e5e5'
                      : singleJob?.status === 'PROCESSING'
                      ? '#c6e2c6'
                      : singleJob?.status === 'DONE'
                      ? '#c9d7e1'
                      : 'white',
                  padding: 5,
                  marginRight: 2,
                  borderRadius: 5,
                }}
              >
                <Text style={{ color: 'white', fontSize: 12 }}>
                  {singleJob?.status === 'PENDING'
                    ? 'CHỜ XỬ LÝ'
                    : singleJob?.status === 'PROCESSING'
                    ? 'ĐANG LÀM'
                    : singleJob?.status === 'DONE'
                    ? 'ĐÃ HOÀN THÀNH'
                    : ''}
                </Text>
              </View>
            </View>
            <Text style={{ fontSize: 20, fontWeight: '600', marginTop: 15 }}>
              {singleJob?.title}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}
          >
            <View>
              <Text style={styles.textTitle}>Thời gian bắt đầu:</Text>
              <Text style={{ fontSize: 16 }}>
                {moment(singleJob?.jobDetail?.timeStart).format('DD-MM-YYYY')}
              </Text>
            </View>
            <View>
              <Text style={styles.textTitle}>Thời gian kết thúc:</Text>
              <Text style={{ fontSize: 16 }}>
                {moment(singleJob?.jobDetail?.timeEnd).format('DD-MM-YYYY')}
              </Text>
            </View>
          </View>

          <View style={{ marginBottom: 20 }}>
            <Text style={styles.textTitle}>
              Mức độ:{' '}
              <Text style={{ color: '#000' }}>
                {singleJob?.priority === 1
                  ? 'Cần gấp'
                  : singleJob?.priority === 2
                  ? 'Quan trọng'
                  : singleJob?.priority === 3
                  ? 'Bình thường'
                  : 'Ưu tiên sau'}
              </Text>
            </Text>
            <Text style={styles.textTitle}>
              Trạng thái:{' '}
              <Text style={{ color: '#000' }}>
                {singleJob?.status || 'Chưa có trạng thái nào'}
              </Text>
            </Text>
            <Text style={styles.textTitle}>
              Tổng KPI:{' '}
              <Text style={{ color: '#000' }}>{singleJob?.kpiCount}</Text>
            </Text>
            <Text style={styles.textTitle}>
              Điểm công việc:{' '}
              <Text style={{ color: '#000' }}>{singleJob?.pointPerJob}</Text>
            </Text>
            <Text style={styles.textTitle}>Chi tiết công việc: </Text>
            <Text style={{ color: '#000' }}>
              {singleJob?.jobDetail?.description}
            </Text>
          </View>
          <View
            style={{
              borderTopWidth: 1,
              borderColor: '#ccc',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              paddingVertical: 10,
            }}
          >
            <Text style={{ fontSize: 12, color: 'gray' }}>
              Ngày tạo: {moment(singleJob?.createdAt).format('DD-MM-YYYY')}
            </Text>
          </View>
        </View>

        <View
          style={{
            marginBottom: 10,
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 10,
            elevation: 5,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Phân công</Text>
          <View
            style={{
              maxHeight: 200,
              overflow: 'scroll',
              borderTopWidth: 1,
              borderColor: '#ccc',
              marginTop: 10,
              paddingTop: 10,
            }}
          >
            {singleJob?.userJobs?.length > 0 ? (
              singleJob?.userJobs?.map((item, index) =>
                allUser.some((user) => user.id === item.user.id) ? (
                  <TouchableOpacity
                    key={index}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 10,
                    }}
                  >
                    <Image
                      source={{ uri: item?.user.avatar }}
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        marginRight: 10,
                      }}
                    />
                    <Text style={{ fontSize: 16 }}>{item?.user.fullName}</Text>
                  </TouchableOpacity>
                ) : null
              )
            ) : (
              <Text style={{ color: 'red' }}>Công việc chưa được phân công</Text>
            )}
          </View>
        </View>

        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 10,
            elevation: 5,
            marginBottom: 10,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
            Người chịu trách nhiệm
          </Text>
          <View
            style={{
              borderTopWidth: 1,
              borderColor: '#ccc',
              marginTop: 10,
              paddingTop: 10,
            }}
          >
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
        {singleJob.status === 'DONE' && (
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 10,
              padding: 10,
              elevation: 5,
              marginBottom: 25,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
              Kết quả đánh giá
            </Text>
            <View
              style={{
                borderTopWidth: 1,
                borderColor: '#ccc',
                marginTop: 10,
                paddingTop: 10,
                flexDirection: 'row',
              }}
            >
              <View style={{ marginBottom: 20 }}>
                <Text style={styles.textTitle}>
                  Điểm tự đánh giá:{' '}
                  <Text style={{ color: '#000' }}>
                    {singleJob?.cachedProgress}
                  </Text>
                </Text>
                <Text style={styles.textTitle}>
                  Điểm đánh giá:{' '}
                  <Text style={{ color: '#000' }}>{singleJob?.progress}</Text>
                </Text>
                <View>
                  <Text style={styles.textTitle}>Link minh chứng: </Text>
                  <Text style={{ color: '#000' }}>
                    {singleJob?.jobDetail?.verifyLink ||
                      'Chưa upload link minh chứng'}
                  </Text>
                </View>
                <Text style={styles.textTitle}>
                  Xếp loại:{' '}
                  <Text style={{ color: '#000' }}>
                    {singleJob?.jobDetail?.jobEvaluate ||
                      'Chưa có đánh giá xếp loại công việc'}
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        )}

        {((singleJob.jobDetail.note &&
          singleJob.cachedProgress !== 0 &&
          singleJob.jobDetail.instructionLink &&
          singleJob.manager.id === account.user.id) ||
          (account.role.roleName === 'ROLE_ADMIN')) && (
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 10,
              padding: 10,
              elevation: 5,
              marginBottom: 25,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
              Thao tác đánh giá
            </Text>
            <View
              style={{
                borderTopWidth: 1,
                borderColor: '#ccc',
                marginTop: 10,
                paddingTop: 10,
                flexDirection: 'row',
              }}
            >
              <View style={{ marginBottom: 20 }}>
                <Text style={styles.textTitle}>
                  Điểm tự đánh giá:{' '}
                  <Text style={{ color: '#000' }}>
                    {singleJob?.cachedProgress}
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  textTitle: {
    fontSize: 16,
    marginBottom: 5,
    color: '#b2b4b6',
  },
});

export default DetailJob;
