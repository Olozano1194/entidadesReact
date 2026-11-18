import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import { MdDomain, MdExpandMore } from 'react-icons/md';
import ErrorSpan from '../../../../components/ui/ErrorSpan';
import type { InstitucionModel } from '../../../../types/institution.model';
import type { DepartamentModel } from '../../../../types/department.model';

interface GeneralInfoSectionProps {
    register: UseFormRegister<InstitucionModel>;
    errors: FieldErrors<InstitucionModel>;
    departament: DepartamentModel[];
    onDeptoChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const inputClass = 'border border-slate-200 bg-slate-50/50 duration-200 mt-2 px-4 py-3 rounded-lg text-on-surface transition-all w-full focus:outline-none focus:border-primary focus:bg-white';

const GeneralInfoSection = ({ register, errors, departament, onDeptoChange }: GeneralInfoSectionProps) => (
    <div className='bg-surface-container-lowest border border-slate-100 p-8 rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)]'>
        <div className='flex gap-3 items-center mb-6'>
            <div className='bg-emerald-100 flex h-10 items-center justify-center rounded-full text-emerald-800 w-10'>
                <MdDomain className='text-xl' />
            </div>
            <h3 className='font-headline-md text-headline-md text-emerald-900'>Información general</h3>
        </div>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            {/* Nombre */}
            <div className='col-span-2 space-y-2'>
                <label htmlFor="nombre" className='font-label-bold text-label-bold text-slate-700'>
                    Nombre de la institución
                </label>
                <input
                    id="nombre"
                    type="text"
                    className={inputClass}
                    placeholder='e.g., St. Andrews International Academy'
                    {...register('nombre', {
                        required: 'Nombre de la institución requerido',
                        minLength: { value: 6, message: 'Mínimo 6 caracteres' },
                        maxLength: { value: 70, message: 'Máximo 70 caracteres' },
                        pattern: {
                            value: /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s'-]+(?:\s+[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s'-]+)*$/,
                            message: 'Nombre inválido',
                        },
                    })}
                />
                {errors.nombre && <ErrorSpan>{errors.nombre.message}</ErrorSpan>}
            </div>
            {/* Director */}
            <div className='space-y-2'>
                <label htmlFor="director" className='font-label-bold text-label-bold text-slate-700'>
                    Nombre completo del director
                </label>
                <input
                    id="director"
                    type="text"
                    className={inputClass}
                    placeholder='Dr. Sarah Jenkins'
                    {...register('director', {
                        required: 'Director requerido',
                        minLength: { value: 10, message: 'Mínimo 10 caracteres' },
                        pattern: {
                            value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ.\s'-]+$/,
                            message: 'Nombre del director inválido',
                        },
                    })}
                />
                {errors.director && <ErrorSpan>{errors.director.message}</ErrorSpan>}
            </div>
            {/* Departamento */}
            <div className='space-y-2'>
                <label htmlFor="departamento" className='font-label-bold text-label-bold text-slate-700'>
                    Departamento
                </label>
                <div className='relative'>
                    <select
                        id="departamento"
                        className='appearance-none border border-slate-200 bg-slate-50 cursor-pointer duration-200 mt-2 pl-4 pr-10 py-3 rounded-lg text-on-surface transition-all w-full focus:outline-none focus:border-primary focus:bg-white'
                        {...register('iddepartamento', {
                            required: 'Departamento requerido',
                            onChange: onDeptoChange,
                        })}
                    >
                        <option value="">Seleccione departamento</option>
                        {departament.map(depto => (
                            <option
                                key={depto._id}
                                value={depto._id}
                                data-numerical-id={depto.id_departamento}
                            >
                                {depto.descripcion}
                            </option>
                        ))}
                    </select>
                    <MdExpandMore className='absolute pointer-events-none right-4 top-1/2 text-slate-400 -translate-y-1/2' />
                </div>
                {errors.iddepartamento && <ErrorSpan>{errors.iddepartamento.message}</ErrorSpan>}
            </div>
        </div>
    </div>
);
export default GeneralInfoSection;