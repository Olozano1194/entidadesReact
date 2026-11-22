import type { ReactNode } from "react";

export interface MetricCard {
    id: string;
    title: string;
    icon: ReactNode;
    value: ReactNode;
    indicator?: ReactNode;
    footer?: ReactNode;
    blurColor?: string;
    iconContainerClass?: string;
}

export interface MetricsSectionProps {
    metrics: MetricCard[];
    columns?: 2 | 3 | 4;
}

const MetricsSection = ({ metrics, columns = 4 }: MetricsSectionProps) => {
    const gridColumns = {
        2: 'sm:grid-cols-2',
        3: 'sm:grid-cols-2 lg:grid-cols-3',
        4: 'sm:grid-cols-2 lg:grid-cols-4',
    };

    return (
        <section className={`grid grid-cols-1 gap-6 mb-10 ${gridColumns[columns]}`}>
            {metrics.map((metric) => (
                <article
                    key={metric.id}
                    className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between relative overflow-hidden group"
                >
                    <div className={`absolute -right-4 -top-4 w-24 h-24 ${metric.blurColor ?? 'bg-primary-fixed/30'} rounded-full blur-xl group-hover:scale-125 transition-transform duration-500`}></div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                        <span className="font-label-bold text-label-sm text-outline tracking-wider uppercase">
                            {metric.title}
                        </span>
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${metric.iconContainerClass ?? 'bg-surface-container text-primary'}`}>
                            {metric.icon}
                        </div>
                    </div>
                    {/* Value and indicator */}
                    <div>
                        <div className="flex items-baseline gap-2">
                            <span className="font-display-xl text-display-xl text-on-surface">
                                {metric.value}
                            </span>
                            {metric.indicator}
                        </div>
                        {metric.footer && (
                            <div className="font-label-sm text-label-sm text-on-surface-variant mt-1">
                                {metric.footer}
                            </div>
                        )}
                    </div>
                </article>
            ))}
        </section>
    );
};

export default MetricsSection;
