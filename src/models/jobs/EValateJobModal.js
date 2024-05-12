import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { evaluateJob } from '../../thunks/JobsThunk';

const EValueJobModal = ({ handleHiddenEValue, evaluateData }) => {
  const dispatch = useDispatch();
  const eValueList = [
    { id: 1, value: "BAD", eValuate: "Xấu", bg: "red" },
    { id: 2, value: "MEDIUM", eValuate: "Trung Bình", bg: "amber" },
    { id: 3, value: "GOOD", eValuate: "Tốt", bg: "green" },
  ];

  const [eValuate, setEValuate] = useState(
    evaluateData?.jobDetail?.jobEvaluate ? evaluateData?.jobDetail?.jobEvaluate : ""
  );

  const handleEValuate = (item) => {
    setEValuate(item);
  };

  const handleSubmitEvaluate = () => {
    dispatch(
      evaluateJob({ id: evaluateData.id, data: { jobEvaluate: eValuate, status: "DONE" } })
    ).then((reps) => {
      if (!reps.error) {
        handleHiddenEValue();
      }
    });
  };

  return (
    <Modal visible={true} transparent={true} animationType="slide">
      <View style={styles.container}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Chi tiết tiến độ công việc</Text>
            <TouchableOpacity onPress={() => handleHiddenEValue()} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.content}>
            <Text style={styles.subtitle}>Mô tả công việc đã hoàn thành</Text>
            <Text>{evaluateData?.jobDetail?.note || "chưa có báo cáo"}</Text>
            <Text style={styles.subtitle}>Tiến độ hoàn thành</Text>
            <Text style={styles.progress}>{evaluateData?.progress}%</Text>
            <Text style={styles.subtitle}>Đường link tài liệu báo cáo</Text>
            <Text style={styles.link}>{evaluateData?.jobDetail?.instructionLink || "Chưa có báo cáo"}</Text>
            <View style={styles.eValueButtons}>
              {eValueList.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.eValueButton, { backgroundColor: eValuate === item.value ? item.bg : 'gray' }]}
                  onPress={() => handleEValuate(item.value)}
                >
                  <Text style={styles.eValueButtonText}>{item.eValuate}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={styles.footer}>
            <TouchableOpacity style={styles.reassessButton} onPress={() => handleReassess()}>
              <Text style={styles.reassessButtonText}>Đánh giá lại</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmButton} onPress={handleSubmitEvaluate}>
              <Text style={styles.confirmButtonText}>Xác nhận</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    paddingBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    color: 'blue',
  },
  content: {
    marginTop: 16,
  },
  subtitle: {
    fontWeight: 'bold',
    marginTop: 8,
  },
  progress: {
    fontWeight: 'bold',
    color: 'blue',
    marginTop: 8,
  },
  link: {
    color: 'blue',
    marginTop: 8,
  },
  eValueButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  eValueButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 4,
  },
  eValueButtonText: {
    color: 'white',
    fontSize: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  reassessButton: {
    backgroundColor: 'red',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  reassessButtonText: {
    color: 'white',
    fontSize: 12,
  },
  confirmButton: {
    backgroundColor: 'blue',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 12,
  },
});

export default EValueJobModal;
