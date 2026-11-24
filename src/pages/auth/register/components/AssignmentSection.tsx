import type { UseFormRegister } from 'react-hook-form';
import { MdOutlineVerified } from 'react-icons/md';
import type { InstitucionModel } from '../../../../types/institution.model';
import FormField from '../../../../components/form/FormField';
import Label from '../../../../components/ui/Label';

interface AssignmentSectionProps {
    register: UseFormRegister<InstitucionModel>;
}

const AssignmentSection = ({ register }: AssignmentSectionProps) => (
    <section className='col-span-12 space-y-gutter lg:col-span-8'>
        <div className='bg-surface-container-lowest border border-slate-100 p-8 rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)]'>
            <div className='flex gap-3 items-center mb-6'>
                <div className='bg-emerald-100 flex h-10 items-center justify-center rounded-full text-emerald-800 w-10'>
                    <MdOutlineVerified className='text-xl' />
                </div>
                <h3 className='font-headline-md text-headline-md text-emerald-900'>Asignación y periodos académicos</h3>
            </div>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                {/* Checkbox estudiantes */}
                <div className='flex items-center gap-3'>
                    <input
                        type='checkbox'
                        id='asignarTodosStudent'
                        {...register('asignarTodosStudent')}
                        className='h-5 w-5 accent-emerald-700'
                    />
                    <Label htmlFor='asignarTodosStudent'>
                        Asignar todos los estudiantes
                    </Label>
                </div>
                {/* Checkbox profesores */}
                <div className='flex items-center gap-3'>
                    <input
                        type='checkbox'
                        id='asignarTodosTeacher'
                        {...register('asignarTodosTeacher')}
                        className='h-5 w-5 accent-emerald-700'
                    />
                    <Label htmlFor='asignarTodosTeacher'>
                        Asignar todos los profesores
                    </Label>
                </div>
                {/* Secretaría */}
                <FormField
                    label='Secretaría'
                    id='secretaria'
                    type='text'
                    placeholder='Nombre de la secretaría'
                    {...register('secretaria')}
                />
                {/* Periodos */}
                <FormField
                    as='select'
                    label='Número de periodos'
                    id='periodos'
                    defaultValue='4'
                    {...register('periodos')}
                >
                    <option value='1'>1 periodo</option>
                    <option value='2'>2 periodos</option>
                    <option value='3'>3 periodos</option>
                    <option value='4'>4 periodos</option>
                </FormField>
            </div>
        </div>
    </section>
);
export default AssignmentSection;
