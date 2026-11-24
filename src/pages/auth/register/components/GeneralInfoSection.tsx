import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import { MdDomain } from 'react-icons/md';
import ErrorSpan from '../../../../components/ui/ErrorSpan';
import type { InstitucionModel } from '../../../../types/institution.model';
import type { DepartamentModel } from '../../../../types/department.model';
// UI
import Input from '../../../../components/ui/Input';
import Select from '../../../../components/ui/Select';

interface GeneralInfoSectionProps {
    register: UseFormRegister<InstitucionModel>;
    errors: FieldErrors<InstitucionModel>;
    departament: DepartamentModel[];
    onDeptoChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

// const inputClass = 'border border-slate-200 bg-slate-50/50 duration-200 mt-2 px-4 py-3 rounded-lg text-on-surface transition-all w-full focus:outline-none focus:border-primary focus:bg-white';

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
                <Input
                    id="nombre"
                    type="text"                    
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
                <Input
                    id="director"
                    type="text"                    
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
                    <Select
                        id="departamento"                        
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
                    </Select>                    
                </div>
                {errors.iddepartamento && <ErrorSpan>{errors.iddepartamento.message}</ErrorSpan>}
            </div>
        </div>
    </div>
);
export default GeneralInfoSection;