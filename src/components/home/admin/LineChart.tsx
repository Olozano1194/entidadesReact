import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement,
  Filler,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

type LineChartProps = {
  stats: {
    totalUsers: number;
    totalStudents: number;
    totalTeachers: number;
    totalInstitutions: number;
  };
};

const LineChart: React.FC<LineChartProps> = ({ stats }) => {  
  const data = {
    labels: ['Usuarios', 'Estudiantes', 'Docentes', 'Instituciones'],
    datasets: [
      {
        label: 'Cantidad Usuarios, Estudiantes, Docentes e Instituciones',
        data: [
          stats.totalUsers,
          stats.totalStudents,
          stats.totalTeachers,
          stats.totalInstitutions,
        ],
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.3)",
        tension: 0.3,
        fill: true       
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Estadisticas del sistema",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <section className="border-emerald-100 border border-dashed chart-gradient h-64 min-w-0 w-full overflow-hidden p-4 relative rounded-xl shadow-md">      
      <Line data={data} options={options} />        
    </section>
  );
};
export default LineChart;