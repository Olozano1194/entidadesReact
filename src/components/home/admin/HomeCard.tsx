interface HomeCardProps {
  title: string;
  value: string | number;
  icon: string;
  trend?: string;
  color?: string;
}

const HomeCard = ({ title, value, icon, trend, color = 'bg-gradient-to-tr from-slate-600 to-slate-800' }: HomeCardProps) => {
  return (
    <div className={ `p-4 rounded-lg shadow text-white ${color}` }>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-white md:text-lg lg:text-xl">{title}</p>
          <p className="text-3xl text-primary font-bold md:text-4xl">{value}</p>
          {trend && <span className="text-sm text-gray-900 md:text-base">{trend}</span>}
        </div>
        <div className="text-3xl">{icon}</div>
      </div>
    </div>
  );
};
export default HomeCard;
