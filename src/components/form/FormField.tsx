import type { ReactNode, InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

interface BaseProps {
    label: string;
    required?: boolean;
    error?: string;
    icon?: ReactNode;
    helpText?: string;
    trailing?: ReactNode;
}

type InputProps = BaseProps & InputHTMLAttributes<HTMLInputElement> & { as?: 'input' };
type SelectProps = BaseProps & SelectHTMLAttributes<HTMLSelectElement> & { as: 'select'; children: ReactNode };
type TextareaProps = BaseProps & TextareaHTMLAttributes<HTMLTextAreaElement> & { as: 'textarea' };

type FormFieldProps = InputProps | SelectProps | TextareaProps;

const FormField = (props: FormFieldProps) => {
    const { label, required, error, icon, helpText, as = 'input', ...rest } = props;
    const baseClass = "w-full bg-surface-container-low rounded-lg px-3.5 py-2.5 text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary focus:outline-none transition-all";

    return (
        <div className="flex flex-col gap-2">
            <label className="font-label-bold text-label-bold text-on-surface flex items-center gap-1">
                {label} {required && <span className="text-error">*</span>}
            </label>
            <div className="relative">
                {icon && <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-outline">{icon}</span>}
                {as === 'select' ? (
                    <select {...(rest as SelectHTMLAttributes<HTMLSelectElement>)} className={`${baseClass} appearance-none cursor-pointer pr-10 ${icon ? 'pl-10' : ''}`}>
                        {(props as SelectProps).children}
                    </select>
                ) : as === 'textarea' ? (
                    <textarea {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)} className={`${baseClass} resize-none ${icon ? 'pl-10' : ''}`} />
                ) : (
                    <input {...(rest as InputHTMLAttributes<HTMLInputElement>)} className={`${baseClass} ${icon ? 'pl-10' : ''} ${props.trailing ? 'pr-12' : ''}`} />
                )}
                {as === 'select' && (
                    <MdKeyboardArrowDown className="absolute right-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none text-base" />
                )}
                {props.trailing && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">{props.trailing}</div>
                )}
            </div>
            {helpText && <p className="font-label-sm text-label-sm text-on-surface-variant">{helpText}</p>}
            {error && <span className="text-red-500 text-sm">{error}</span>}
        </div>
    );
};
export default FormField;