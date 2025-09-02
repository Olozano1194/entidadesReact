interface HomeCardProps {
  title: string;
  value: string | number;
  icon: string;
  trend?: string;
  color?: string;
}

const HomeCard = ({ title, value, icon, trend }: HomeCardProps) => {
  return (
    <div className="bg-primary p-6 rounded-lg shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-white">{title}</p>
          <p className="text-3xl text-secondary-500 font-bold">{value}</p>
          {trend && <span className="text-sm text-green-500">{trend}</span>}
        </div>
        <div className="text-3xl">{icon}</div>
      </div>
    </div>
  );
};
export default HomeCard;
