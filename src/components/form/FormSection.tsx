import type { ReactNode } from "react";

interface FormSectionProps {
    title: string;
    description?: string;
    icon?: ReactNode;
    badge?: string;
    children: ReactNode;
}

const FormSection = ({ title, description, icon, badge, children }: FormSectionProps) => {
    return (
        <section className="bg-surface-container-lowest rounded-xl p-6 sm:p-8 shadow-sm flex flex-col gap-6">
            <div className="flex items-center justify-between pb-4 border-b border-surface-container">
                <div className="flex items-center gap-3">
                    {icon && (
                        <div className="w-10 h-10 rounded-lg bg-primary-fixed flex items-center justify-center text-on-primary-fixed">
                            {icon}
                        </div>
                    )}
                    <div>
                        <h2 className="font-headline-md text-headline-md text-on-surface">{title}</h2>
                        {description && (
                            <p className="font-label-sm text-label-sm text-on-surface-variant">{description}</p>
                        )}
                    </div>
                </div>
                {badge && (
                    <span className="font-label-sm text-label-sm text-primary font-medium bg-secondary-fixed/50 px-2.5 py-1 rounded">
                        {badge}
                    </span>
                )}
            </div>
            {children}
        </section>
    );
};
export default FormSection;