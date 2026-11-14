// components/ui/ActionButton.tsx
interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  description: string;
  onClick: () => void;
  color?: 'blue' | 'green' | 'purple' | 'orange';
}

const ActionButton = ({ icon, label, description, onClick, color = 'green' }: ActionButtonProps) => {
  const colorClasses = {
    blue: {
    normal: 'bg-blue-100 text-blue-700',
    hover: 'group-hover:bg-blue-600',
    },
    green: {
      normal: 'bg-emerald-100 text-emerald-700',
      hover: 'group-hover:bg-emerald-600',
    },
    purple: {
      normal: 'bg-purple-100 text-purple-700',
      hover: 'group-hover:bg-purple-600',
    },
    orange: {
      normal: 'bg-amber-100 text-amber-700',
      hover: 'group-hover:bg-amber-600',
    },
  };

  const selectedColor = colorClasses[color];

  return (
    <button
      onClick={onClick}
      className={`border border-outline-variant/30 cursor-pointer flex gap-4 group items-center p-4 rounded-xl transition-all w-full hover:bg-emerald-50 hover:border-emerald-200`}
    >
      <div className={`duration-300 flex h-10 items-center justify-center rounded-lg transition-all w-10 ${selectedColor.normal} ${selectedColor.hover} group-hover:!text-white`}>
        <span className="text-2xl mb-2">{icon}</span>
      </div>
      <div className="text-left">
        <p className="font-bold text-sm text-on-surface">{label}</p>
        <p className="text-xs text-slate-500">{description}</p>
      </div>
    </button>
  );
};
export default ActionButton;