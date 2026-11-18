import type { UseFormRegister } from 'react-hook-form';
import { MdOutlineVerified } from 'react-icons/md';
import type { InstitucionModel } from '../../../../types/institution.model';

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
                <div className='flex items-center gap-3'>
                    <input
                        type="checkbox"
                        id="asignarTodosStudent"
                        {...register('asignarTodosStudent')}
                        className='h-5 w-5 accent-emerald-700'
                    />
                    <label htmlFor="asignarTodosStudent" className='font-label-bold text-label-bold text-slate-700'>
                        Asignar todos los estudiantes
                    </label>
                </div>
                <div className='flex items-center gap-3'>
                    <input
                        type="checkbox"
                        id="asignarTodosTeacher"
                        {...register('asignarTodosTeacher')}
                        className='h-5 w-5 accent-emerald-700'
                    />
                    <label htmlFor="asignarTodosTeacher" className='font-label-bold text-label-bold text-slate-700'>
                        Asignar todos los profesores
                    </label>
                </div>
                <div className='space-y-2'>
                    <label className='font-label-bold text-label-bold text-slate-700'>Secretaría</label>
                    <input
                        type="text"
                        className='border border-slate-200 bg-slate-50/50 px-4 py-3 rounded-lg text-on-surface transition-all w-full focus:outline-none focus:border-primary focus:bg-white'
                        placeholder='Nombre de la secretaria'
                        {...register('secretaria')}
                    />
                </div>
                {/* Periodos — el valor del select siempre es string en HTML,
                    por eso casteamos periodos a string en el modelo */}
                <div className='space-y-2'>
                    <label className='font-label-bold text-label-bold text-slate-700'>Número de periodos</label>
                    <select
                        className='appearance-none border border-slate-200 bg-slate-50 cursor-pointer px-4 py-3 rounded-lg text-on-surface transition-all w-full focus:outline-none focus:border-primary focus:bg-white'
                        {...register('periodos')}
                        defaultValue="4"
                    >
                        <option value="1">1 periodo</option>
                        <option value="2">2 periodos</option>
                        <option value="3">3 periodos</option>
                        <option value="4">4 periodos</option>
                    </select>
                </div>
            </div>
        </div>
    </section>
);
export default AssignmentSection;