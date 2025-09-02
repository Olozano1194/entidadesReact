// components/ui/ActionButton.tsx
interface ActionButtonProps {
  icon: string;
  label: string;
  onClick: () => void;
  color?: 'blue' | 'green' | 'purple' | 'orange';
}

const ActionButton = ({ icon, label, onClick, color = 'blue' }: ActionButtonProps) => {
  const colorClasses = {
    blue: 'bg-blue-50 hover:bg-blue-100 text-blue-700',
    green: 'bg-green-50 hover:bg-green-100 text-green-700',
    purple: 'bg-purple-50 hover:bg-purple-100 text-purple-700',
    orange: 'bg-orange-50 hover:bg-orange-100 text-orange-700'
  };

  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center p-4 rounded-lg transition-all duration-200 ${colorClasses[color]} hover:shadow-md`}
    >
      <span className="text-2xl mb-2">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
};
export default ActionButton;
