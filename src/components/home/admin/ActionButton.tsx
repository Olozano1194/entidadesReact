// components/ui/ActionButton.tsx
interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  description: string;
  onClick: () => void;
  color?: 'blue' | 'green' | 'purple' | 'orange';
}

const ActionButton = ({ icon, label, description, onClick, color = 'blue' }: ActionButtonProps) => {
  const colorClasses = {
    blue: 'bg-blue-50 hover:bg-blue-100 text-blue-700',
    green: 'bg-green-50 hover:bg-green-100 text-green-700',
    purple: 'bg-purple-50 hover:bg-purple-100 text-purple-700',
    orange: 'bg-orange-50 hover:bg-orange-100 text-orange-700'
  };

  return (
    <button
      onClick={onClick}
      className={`border border-outline-variant/30 flex gap-4 group items-center p-4 rounded-xl transition-all duration-200 w-full ${colorClasses[color]} hover:bg-emerald-50 hover:border-emerald-200`}
    >
      <div className="bg-emerald-100  flex group-hover:bg-emerald-600 group-hover:text-white h-10 items-center justify-center rounded-lg transition-colors w-10">
        <span className="text-2xl mb-2">{icon}</span>
      </div>
      <div className="text-left">
        <p className="font-bold text-sm text-on-surface">{label}</p>
        <p className="text-xs text-slate-500">{description}</p>
      </div>
    </button>
  );};
export default ActionButton;