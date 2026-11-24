import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import { MdDomain } from 'react-icons/md';
import type { InstitucionModel } from '../../../../types/institution.model';
import type { DepartamentModel } from '../../../../types/department.model';
import FormField from '../../../../components/form/FormField';

interface GeneralInfoSectionProps {
    register: UseFormRegister<InstitucionModel>;
    errors: FieldErrors<InstitucionModel>;
    departament: DepartamentModel[];
    onDeptoChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

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
            <div className='col-span-2'>
                <FormField
                    label='Nombre de la institución'
                    required
                    id='nombre'
                    type='text'
                    placeholder='e.g., St. Andrews International Academy'
                    error={errors.nombre?.message}
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
            </div>
            {/* Director */}
            <FormField
                label='Nombre completo del director'
                required
                id='director'
                type='text'
                placeholder='Dr. Sarah Jenkins'
                error={errors.director?.message}
                {...register('director', {
                    required: 'Director requerido',
                    minLength: { value: 10, message: 'Mínimo 10 caracteres' },
                    pattern: {
                        value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ.\s'-]+$/,
                        message: 'Nombre del director inválido',
                    },
                })}
            />
            {/* Departamento */}
            <FormField
                as='select'
                label='Departamento'
                required
                id='departamento'
                error={errors.iddepartamento?.message}
                {...register('iddepartamento', {
                    required: 'Departamento requerido',
                    onChange: onDeptoChange,
                })}
            >
                <option value=''>Seleccione departamento</option>
                {departament.map(depto => (
                    <option
                        key={depto._id}
                        value={depto._id}
                        data-numerical-id={depto.id_departamento}
                    >
                        {depto.descripcion}
                    </option>
                ))}
            </FormField>
        </div>
    </div>
);
export default GeneralInfoSection;
