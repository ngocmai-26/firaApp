import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { useDispatch } from 'react-redux'
import { updateDetailJob, updateJob } from '../../thunks/JobsThunk'

const ReportJobModel = ({ handleHiddenReport, report }) => {
  const [dataReportJob, setDataReportJob] = useState({
    note: '',
    progress: 0,
    instructionLink: '',
  })

  const dispatch = useDispatch()

  const handleSubmit = () => {
    dispatch(
      updateJob({
        id: report.id,
        data: { progress: dataReportJob?.progress, status: 'PROCESSING' },
      }),
    ).then((reps) => {
      if (!reps.error) {
        dispatch(
          updateDetailJob({
            id: report.id,
            data: {
              note: dataReportJob?.note,
              instructionLink: dataReportJob?.instructionLink,
            },
          }),
        ).then((reps) => {
          handleHiddenReport()
        })
      }
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.modalContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Báo cáo tiến độ công việc</Text>
          <TouchableOpacity
            onPress={handleHiddenReport}
            style={styles.closeButton}
          >
            <Text style={styles.closeButtonText}>Đóng</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Công việc đã hoàn thành"
              value={dataReportJob.note}
              onChangeText={(text) =>
                setDataReportJob({ ...dataReportJob, note: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Đường dẫn tài liệu báo cáo"
              value={dataReportJob.instructionLink}
              onChangeText={(text) =>
                setDataReportJob({ ...dataReportJob, instructionLink: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Cập nhật mức độ hoàn thành"
              value={dataReportJob.progress}
              onChangeText={(text) =>
                setDataReportJob({ ...dataReportJob, progress: parseInt(text) })
              }
              keyboardType="numeric"
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Lưu</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
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
  form: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
})

export default ReportJobModel
