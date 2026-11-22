// Icons
import { MdOutlineChevronRight } from "react-icons/md";
import type { ReactNode } from "react";

interface HeaderSectionProps {
    breadcrumbs?: string[];
    title?: string;
    description?: string;
    badge?: string;
    actions?: ReactNode;
}

const HeaderSection = ({
    breadcrumbs = [],
    title,
    description ,
    badge,
    actions,
}: HeaderSectionProps) => {
    return (
        <section className="flex flex-col gap-6 justify-between pb-10 lg:flex-row lg:items-end">
            <div className="space-y-2">
                <div className="flex font-label-sm gap-2 items-center text-label-sm text-outline">
                    {breadcrumbs.map((b, i) => (
                        <span key={i} className="flex items-center gap-2">
                            {i > 0 && <MdOutlineChevronRight className="text-outline-variant text-[14px]" />}
                            <span className={i === breadcrumbs.length - 1 ? "font-semibold text-primary" : "cursor-pointer transition-colors hover:text-primary"}>
                                {b}
                            </span>
                        </span>
                    ))}
                </div>
                <div className="flex gap-3 items-baseline">
                    <h2 className="font-headline-lg font-semibold text-headline-lg text-on-surface tracking-tight">
                        {title}
                    </h2>
                    {badge && (
                        <span className="bg-secondary-container font-label-sm font-medium inline-flex items-center px-2 py-0.5 rounded-full text-label-sm text-on-secondary-container">
                            {badge}
                        </span>
                    )}
                </div>
                <p className="font-body-md max-w-2xl text-body-md text-on-surface-variant">
                    {description}
                </p>
            </div>
            {actions && (
                <div className="flex gap-3 items-center self-start lg:self-auto">
                    {actions}
                </div>
            )}
        </section>
    )
}
export default HeaderSection;