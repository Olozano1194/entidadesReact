import Span from './Span';
import ErrorSpan from './ErrorSpan';

interface FormFieldProps {
    /** Texto del label */
    label: string;
    /** id del input asociado */
    htmlFor: string;
    /** Icono que se muestra dentro del input (a la izquierda) */
    icon?: React.ReactNode;
    /** Mensaje de error de validación */
    error?: string;
    /** Contenido a la derecha del label (ej. "¿Olvidaste tu contraseña?") */
    labelRight?: React.ReactNode;
    /** Elemento extra dentro del contenedor relative (ej. botón de mostrar contraseña) */
    trailing?: React.ReactNode;
    /** El input o select */
    children: React.ReactNode;
}

const FormField = ({ label, htmlFor, icon, error, labelRight, trailing, children }: FormFieldProps) => {
    return (
        <section className="mb-gutter">
            {labelRight ? (
                <div className="flex items-center justify-between mb-form-stack">
                    <label htmlFor={htmlFor} className="block font-label-bold text-label-bold text-on-surface-variant">
                        {label}
                    </label>
                    {labelRight}
                </div>
            ) : (
                <label htmlFor={htmlFor} className="block font-label-bold text-label-bold text-on-surface-variant mb-form-stack">
                    {label}
                </label>
            )}
            <div className="relative">
                {icon && <Span>{icon}</Span>}
                {children}
                {trailing}
            </div>
            {error && <ErrorSpan>{error}</ErrorSpan>}
        </section>
    );
};
export default FormField;