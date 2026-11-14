import { MdOutlineTrendingUp, MdOutlineTrendingDown, MdOutlineTrendingFlat } from "react-icons/md";

interface HomeCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  trendType?: "up" | "down" | "neutral";
  iconColor?: string;
  iconBg?: string;
  trendColor?: string;
  trendBg?: string;
}

const HomeCard = ({ title, value, icon, trend, trendType = 'neutral', iconColor = 'text-blue-600', iconBg = 'bg-blue-50', trendColor, trendBg }: HomeCardProps) => {

  const trendStyles = {
    up: {
      color: 'text-green-600',
      background: 'bg-green-100',
      icon: <MdOutlineTrendingUp />,

    },
    down: {
      color: 'text-red-600',
      background: 'bg-red-100',
      icon: <MdOutlineTrendingDown />,
    },
    neutral: {
      color: 'text-gray-600',
      background: 'bg-gray-100',
      icon: <MdOutlineTrendingFlat />,
    },
  };

  const currentTrend = trendStyles[trendType];


  return (
    <section className="bg-surface-container-lowest border border-outline-variant/30 group p-6 rounded-xl shadow-sm transition-shadow hover:shadow-md">
      {/* Icono y porcentaje */}
      <section className="flex justify-between items-start mb-4">
        <div className={`${iconBg} p-3 rounded-lg transition-colors`}>
          <span className={iconColor}>
            {icon}
          </span> 
        </div>
        {/* Tendencia  */}
        {trend && (
          <span className={`flex font-bold gap-1 items-center px-2 py-1 rounded-full text-xs ${trendBg || currentTrend.background} ${trendColor || currentTrend.color}`}>
            <span>{currentTrend.icon}</span>
            {trend}
          </span>
        )}
      </section>
      {/* Información */}
      <p className="font-label-sm text-slate-500">{title}</p>
      <h3 className="font-display-xl mt-1 text-3xl text-on-surface">{value}</h3>
    </section>
  );
};
export default HomeCard;