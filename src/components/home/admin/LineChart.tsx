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
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
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
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Estadisticas del sistemas",        
      },
    },    
  };

  return (
    <section className="w-full max-w-3xl p-4 bg-white rounded-2xl shadow-md">      
      <Line data={data} options={options} />        
    </section>
  );
};
export default LineChart;
