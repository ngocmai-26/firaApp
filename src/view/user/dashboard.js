
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { LineChart } from 'react-native-chart-kit';
import { BarChart } from 'react-native-chart-kit';

const Dashboard = () => {
  // Dữ liệu mẫu cho biểu đồ tròn
  const pieChartData = [
    { name: 'Hoàn thành', percentage: 70, color: '#63c2de' },
    { name: 'Chưa hoàn thành', percentage: 30, color: '#f86c6b' },
  ];

  // Dữ liệu mẫu cho biểu đồ cột và biểu đồ đường
  const lineChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // màu của biểu đồ đường
        strokeWidth: 2, // độ dày của đường
      },
    ],
  };

  const barChartData = {
    labels: ['Task 1', 'Task 2', 'Task 3', 'Task 4', 'Task 5'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99],
      },
    ],
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Phần trăm công việc hoàn thành</Text>
          <PieChart
            data={pieChartData}
            width={300}
            height={200}
            chartConfig={{
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            }}
            accessor="percentage"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        </View>
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Biểu đồ cột</Text>
          <BarChart
            style={styles.barChart}
            data={barChartData}
            width={300}
            height={200}
            yAxisLabel="%"
            chartConfig={{
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
          />
        </View>
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Biểu đồ đường</Text>
          <LineChart
            data={lineChartData}
            width={300}
            height={200}
            chartConfig={{
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    elevation: 5,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default Dashboard;
