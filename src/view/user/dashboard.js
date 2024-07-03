// Import necessary libraries
import React, { useEffect, useState } from 'react'
import {
  ScrollView,
  Text,
  View,
  Dimensions,
  StyleSheet,
  Image,
} from 'react-native'
import { PieChart, LineChart, BarChart } from 'react-native-chart-kit'
import { useDispatch, useSelector } from 'react-redux'
import { getAllDashboard } from '../../thunks/DashboardThunk'

const screenWidth = Dimensions.get('window').width

const getDaysInMonth = (year, month) => {
  const date = new Date(year, month, 1)
  const days = []
  while (date.getMonth() === month) {
    days.push(new Date(date).getDate())
    date.setDate(date.getDate() + 1)
  }
  return days
}

const JobStatusDoughnutChart = ({ data }) => {
  if (!data || !data.statusJobInMonth || !data.statusJobInMonth.jobsInMonth) {
    return <Text>Loading...</Text>
  }

  const jobStatuses = data.statusJobInMonth.jobsInMonth.map((job) => job.status)
  const jobStatusCounts = jobStatuses.reduce((acc, status) => {
    acc[status] = (acc[status] || 0) + 1
    return acc
  }, {})

  const allStatuses = ["Đang chờ xử lý", "Đang xử lý", "Hoàn thành"]
  const pieData = allStatuses.map((status, index) => ({
    name: status,
    count: jobStatusCounts[status] || 0,
    color: ['#FF6384', '#FFCD56', '#4BC0C0'][index],
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  }))

  return (
    <ScrollView
      horizontal={true} // Cho phép cuộn ngang
      showsHorizontalScrollIndicator={false} // Ẩn thanh cuộn ngang
      contentContainerStyle={styles.scrollViewContent}
    >
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Trạng thái công việc</Text>
        <PieChart
          data={pieData}
          width={screenWidth - 16}
          height={220}
          chartConfig={{
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="count"
          backgroundColor="transparent"
          paddingLeft="10"
          absolute
        />
      </View>
    </ScrollView>
  )
}

const DailyJobCreationChart = ({ data }) => {
  if (!data || !data.statusJobInMonth || !data.statusJobInMonth.jobsInMonth) {
    return <Text>Loading...</Text>
  }

  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth()
  const daysInMonth = getDaysInMonth(currentYear, currentMonth)

  const jobCreationCounts = daysInMonth.map((day) => {
    const jobsCreatedOnDay = data.statusJobInMonth.jobsInMonth.filter(
      (job) => new Date(job.createdAt).getDate() === day,
    ).length
    return jobsCreatedOnDay
  })

  return (
    <ScrollView
      horizontal={true} // Cho phép cuộn ngang
      showsHorizontalScrollIndicator={false} // Ẩn thanh cuộn ngang
      contentContainerStyle={styles.scrollViewContent}
    >
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Số lượng công việc theo ngày</Text>
        <LineChart
          data={{
            labels: daysInMonth.map((day) => `${day}`),
            datasets: [
              {
                data: jobCreationCounts,
              },
            ],
          }}
          width={800}
          height={220}
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          bezier
          style={{
            marginVertical: 12,
          }}
        />
      </View>
    </ScrollView>
  )
}

const KPIChart = ({ data }) => {
  if (
    !data ||
    !data.statusKPI ||
    !data.statusKPI.Kpi ||
    data.statusKPI.Kpi.length === 0
  ) {
    return (
      <Text style={{ textAlign: 'center' }}>
        Hiện tại bạn chưa có phần đánh giá nào của bản thân
      </Text>
    )
  }

  const kpis = data.statusKPI.Kpi
  const doneKpis = kpis.filter((kpi) => kpi.description === 'DONE').length
  const evaluateKpis = kpis.filter((kpi) => kpi.description === 'EVALUATE')
    .length
  const totalKpis = kpis.length

  const doneRate = (doneKpis / totalKpis) * 100
  const evaluateRate = (evaluateKpis / totalKpis) * 100
  const notCompletedRate = 100 - doneRate - evaluateRate

  const pieData = [
    {
      name: "Hoàn thành",
      count: doneRate,
      color: '#4BC0C0',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: "Đang đánh giá",
      count: evaluateRate,
      color: '#FF6384',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: "Chưa hoàn thành",
      count: notCompletedRate,
      color: '#36A2EB',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ]

  return (
    <ScrollView
      horizontal={true} // Cho phép cuộn ngang
      showsHorizontalScrollIndicator={false} // Ẩn thanh cuộn ngang
      contentContainerStyle={styles.scrollViewContent}
    >
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Tỷ lệ hoàn thành KPI</Text>
        <PieChart
          data={pieData}
          width={screenWidth - 16}
          height={220}
          chartConfig={{
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="count"
          backgroundColor="transparent"
          paddingLeft="10"
          absolute
        />
      </View>
    </ScrollView>
  )
}

const JobEvaluateChart = ({ data }) => {
  const jobs = data?.statusJobInMonth?.jobsInMonth || []
  const jobEvaluates = jobs
    .filter((job) => job.status === 'done')
    .map((job) => job.jobEvaluate)
    .filter((evaluate) => evaluate !== null)
  const notDoneCount = jobs.filter((job) => job.status !== 'done').length

  const evaluateCounts = {
    BAD: 0,
    MEDIUM: 0,
    GOOD: 0,
    'NOT DONE': notDoneCount,
  }

  jobEvaluates.forEach((evaluate) => {
    evaluateCounts[evaluate] += 1
  })

  const allStatuses = ["Xấu", "Trung bình", "Tốt", "Không"]
  const barData = {
    labels: allStatuses,
    datasets: [
      {
        data: allStatuses.map((status) => evaluateCounts[status] || 0),
      },
    ],
  }

  return (
    <ScrollView
      horizontal={true} // Cho phép cuộn ngang
      showsHorizontalScrollIndicator={false} // Ẩn thanh cuộn ngang
      contentContainerStyle={styles.scrollViewContent}
    >
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Đánh giá công việc</Text>
        <BarChart
          data={barData}
          width={screenWidth - 16}
          height={220}
          chartConfig={{
            backgroundColor: '#FF6384',
            backgroundGradientFrom: '#FFCD56',
            backgroundGradientTo: '#4BC0C0',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          verticalLabelRotation={30}
        />
      </View>
    </ScrollView>
  )
}

const JobStatusManagerDoughnutChart = ({ data }) => {
  if (!data || !data.statusJobInMonth || !data.statusJobInMonth.jobsInMonth) {
    return null
  }

  const jobs = data.statusJobInMonth.jobsInMonth
  const jobStatusCounts = {
    PENDING: 0,
    PROCESSING: 0,
    DONE: 0,
  }

  jobs.forEach((job) => {
    job.userJobs.forEach((userJob) => {
      jobStatusCounts[userJob.status] += 1
    })
  })

  const doughnutData = Object.keys(jobStatusCounts).map((status) => ({
    name: status,
    count: jobStatusCounts[status],
    color:
      status === 'PENDING'
        ? '#FF6384'
        : status === 'PROCESSING'
        ? '#FFCE56'
        : '#4BC0C0',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  }))

  return (
    <ScrollView
      horizontal={true} // Cho phép cuộn ngang
      showsHorizontalScrollIndicator={false} // Ẩn thanh cuộn ngang
      contentContainerStyle={styles.scrollViewContent}
    >
      <View style={styles.chartContainer}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: 10,
          }}
        >
          Biểu đồ trạng thái công việc
        </Text>
        <PieChart
          data={doughnutData}
          width={screenWidth}
          height={220}
          chartConfig={{
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="count"
          backgroundColor="transparent"
          paddingLeft="10"
          absolute
        />
      </View>
    </ScrollView>
  )
}
const DailyJobManagerCreationChart = ({ data }) => {
  if (!data || !data.statusJobInMonth || !data.statusJobInMonth.jobsInMonth) {
    return null
  }

  const jobs = data.statusJobInMonth.jobsInMonth
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth()
  const daysInMonth = getDaysInMonth(currentYear, currentMonth)

  const jobCreationCounts = daysInMonth.map((day) => {
    const jobsCreatedOnDay = jobs.filter(
      (job) => new Date(job.createdAt).getDate() === day,
    ).length
    return jobsCreatedOnDay
  })

  const lineData = {
    labels: daysInMonth.map((day) => `${day}`),
    datasets: [
      {
        data: jobCreationCounts,
        color: (opacity = 1) => `rgba(153, 102, 255, ${opacity})`, // Điều chỉnh màu sắc ở đây
        strokeWidth: 2, // Độ dày của đường biểu đồ
      },
    ],
  }

  const chartConfig = {
    backgroundGradientFrom: '#ffffff', // Màu nền từ trái sang phải
    backgroundGradientTo: '#ffffff', // Màu nền từ phải sang trái
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Màu chữ
    strokeWidth: 2, // Độ dày của đường biểu đồ (tuỳ chọn)
  }

  return (
    <ScrollView
      horizontal={true} // Cho phép cuộn ngang
      showsHorizontalScrollIndicator={false} // Ẩn thanh cuộn ngang
      contentContainerStyle={styles.scrollViewContent}
    >
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>
          Số lượng công việc được tạo ra trong tháng
        </Text>
        <LineChart
          data={lineData}
          width={900}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />
      </View>
    </ScrollView>
  )
}
const Dashboard = () => {
  const dispatch = useDispatch()
  const { allDashboard } = useSelector((state) => state.dashboardReducer)
  const { account } = useSelector((state) => state.authReducer)

  useEffect(() => {
    dispatch(getAllDashboard())
  }, [dispatch])

  if (!allDashboard) {
    return <Text>Loading...</Text>
  }
  const [jobsDoneCount, setJobsDoneCount] = useState(0)

  useEffect(() => {
    dispatch(getAllDashboard())
  }, [dispatch])

  useEffect(() => {
    if (
      allDashboard &&
      allDashboard.statusJobInMonth &&
      allDashboard.statusJobInMonth.jobsInMonth
    ) {
      let doneCount = 0
      allDashboard.statusJobInMonth.jobsInMonth.forEach((job) => {
        job.userJobs.forEach((userJob) => {
          if (userJob.status === 'DONE') {
            doneCount++
          }
        })
      })
      setJobsDoneCount(doneCount)
    }
  }, [allDashboard])
  return (
    <ScrollView style={styles.container}>
      {account.role.roleName === 'ROLE_ADMIN' ||
      account.role.roleName === 'ANONYMOUS' ? (
        <View style={{height: "100%"}}>
          <View style={styles.logoWrapper}>
          <Image
            source={require('../../../assets/loading.png')}
            style={styles.logo}
          />
          <View style={{ textAlign: 'center' }}>
            <Text style={{ textAlign: 'center', fontSize: 16 }}>
              Hiện tại trang web đang được nâng cấp và sửa chữa vui lòng quay
              lại sau
            </Text>
          </View>
        </View>
        </View>
      ) : (
        <>
          <View style={styles.gridContainer}>
            <View style={styles.card}>
              <Text style={styles.number}>{allDashboard?.myJob || 0}</Text>
              <Text style={styles.label}>Công việc của tôi</Text>
            </View>

            {account.role.roleName === 'ROLE_MANAGER' && (
              <>
                <View style={styles.card}>
                  <Text style={styles.number}>{allDashboard?.giveJob}</Text>
                  <Text style={styles.label}>Công việc đã giao</Text>
                </View>
                <View style={styles.card}>
                  <Text style={styles.number}>{jobsDoneCount}</Text>
                  <Text style={styles.label}>
                    Tổng số công việc đã hoàn thành
                  </Text>
                </View>
              </>
            )}

            <View style={styles.card}>
              <Text style={styles.number}>{allDashboard?.runningPlan}</Text>
              <Text style={styles.label}>Kế hoạch đang chạy</Text>
            </View>

            {account.role.roleName !== 'ROLE_MANAGER' && (
              <>
                <View style={styles.card}>
                  <Text style={styles.number}>
                    {allDashboard?.dataJobInMonth?.jobDone || 0}
                  </Text>
                  <Text style={styles.label}>
                    Việc đã hoàn thành trong tháng
                  </Text>
                </View>

                <View style={styles.card}>
                  <Text style={styles.number}>
                    {allDashboard?.checkedIn || 0}
                  </Text>
                  <Text style={styles.label}>Đã chấm công</Text>
                </View>
              </>
            )}
          </View>

          {/* Biểu đồ Doughnut */}
          {account.role.roleName === 'ROLE_STAFF' && (
            <View style={styles.container}>
              <JobStatusDoughnutChart data={allDashboard} />
              <DailyJobCreationChart data={allDashboard} />
              <KPIChart data={allDashboard} />
              {/* <JobEvaluateChart data={allDashboard} /> */}
            </View>
          )}
          {account.role.roleName === 'ROLE_MANAGER' && (
            <View style={styles.container}>
              <JobStatusManagerDoughnutChart data={allDashboard} />
              <DailyJobManagerCreationChart data={allDashboard} />
            </View>
          )}
        </>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  number: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  label: {
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
  },
  chartContainer: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chartTitle: {
    textAlign: 'center',
    marginBottom: 10,
  },
  logoWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    height: Dimensions.get('window').height * 0.8
  },
})

export default Dashboard
