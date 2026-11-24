import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import { AiOutlineMail } from 'react-icons/ai';
import { MdOutlineContactMail, MdOutlineLocalPhone } from 'react-icons/md';
import type { InstitucionModel } from '../../../../types/institution.model';
import FormField from '../../../../components/form/FormField';

interface ContactSectionProps {
    register: UseFormRegister<InstitucionModel>;
    errors: FieldErrors<InstitucionModel>;
}

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
            <FormField
                label='Número de teléfono'
                required
                id='telefono'
                type='tel'
                icon={<MdOutlineLocalPhone className='text-xl' />}
                placeholder='+57 310 256 8794'
                error={errors.telefono?.message}
                {...register('telefono', {
                    required: 'Teléfono requerido',
                    minLength: { value: 10, message: 'Mínimo 10 dígitos' },
                    maxLength: { value: 10, message: 'Máximo 10 dígitos' },
                    pattern: { value: /^[0-9]+$/, message: 'Teléfono inválido' },
                })}
            />
            {/* Email */}
            <FormField
                label='Correo electrónico'
                required
                id='email'
                type='email'
                icon={<AiOutlineMail className='text-xl' />}
                placeholder='admin@institucion.edu'
                error={errors.email?.message}
                {...register('email', {
                    required: 'Correo requerido',
                    pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: 'Correo inválido',
                    },
                })}
            />
        </div>
    </section>
);
export default ContactSection;
