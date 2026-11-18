import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import { AiOutlineMail } from 'react-icons/ai';
import { MdOutlineContactMail, MdOutlineLocalPhone } from 'react-icons/md';
import ErrorSpan from '../../../../components/ui/ErrorSpan';
import type { InstitucionModel } from '../../../../types/institution.model';

interface ContactSectionProps {
    register: UseFormRegister<InstitucionModel>;
    errors: FieldErrors<InstitucionModel>;
}

const inputClass = 'border border-slate-200 bg-slate-50/50 px-4 py-3 rounded-lg text-on-surface transition-all w-full focus:outline-none focus:border-primary focus:bg-white';

const ContactSection = ({ register, errors }: ContactSectionProps) => (
    <section className='bg-surface-container-lowest border border-slate-100 p-8 rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)]'>
        <div className='flex gap-3 items-center mb-6'>
            <div className='bg-emerald-100 flex h-10 items-center justify-center rounded-full text-emerald-800 w-10'>
                <MdOutlineContactMail className='text-xl' />
            </div>
            <h3 className='font-headline-md text-headline-md text-emerald-900'>Datos de contacto</h3>
        </div>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            {/* Teléfono */}
            <div className='space-y-2'>
                <label className='font-label-bold text-label-bold text-slate-700'>Número de teléfono</label>
                <div className='relative mt-2'>
                    <MdOutlineLocalPhone className='absolute left-3 text-slate-400 text-xl top-1/2 -translate-y-1/2' />
                    <input
                        type="tel"
                        className={`${inputClass} pl-10`}
                        placeholder='+57 310 256 8794'
                        {...register('telefono', {
                            required: 'Teléfono requerido',
                            minLength: { value: 10, message: 'Mínimo 10 dígitos' },
                            maxLength: { value: 10, message: 'Máximo 10 dígitos' },
                            pattern: { value: /^[0-9]+$/, message: 'Teléfono inválido' },
                        })}
                    />
                </div>
                {errors.telefono && <ErrorSpan>{errors.telefono.message}</ErrorSpan>}
            </div>
            {/* Email */}
            <div className='space-y-2'>
                <label htmlFor="email" className='font-label-bold text-label-bold text-slate-700'>Correo electrónico</label>
                <div className='relative mt-2'>
                    <AiOutlineMail className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl' />
                    <input
                        id="email"
                        type="email"
                        className={`${inputClass} pl-10`}
                        placeholder='admin@institucion.edu'
                        {...register('email', {
                            required: 'Correo requerido',
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: 'Correo inválido',
                            },
                        })}
                    />
                </div>
                {errors.email && <ErrorSpan>{errors.email.message}</ErrorSpan>}
            </div>
        </div>
    </section>
);
export default ContactSection;