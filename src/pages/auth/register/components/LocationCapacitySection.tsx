import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import { MdOutlineLocationOn, MdOutlineCorporateFare, MdAdd, MdOutlineRemove } from 'react-icons/md';
import ErrorSpan from '../../../../components/ui/ErrorSpan';
import type { InstitucionModel } from '../../../../types/institution.model';
import type { MunicipalityModel } from '../../../../types/municipality.model';
// UI
import Select from '../../../../components/ui/Select';

interface LocationCapacitySectionProps {
    register: UseFormRegister<InstitucionModel>;
    errors: FieldErrors<InstitucionModel>;
    filteredMunicipality: MunicipalityModel[];
    isDeptoSelected: boolean;
}

const LocationCapacitySection = ({ register, errors, filteredMunicipality, isDeptoSelected }: LocationCapacitySectionProps) => (
    <section className='col-span-12 space-y-gutter lg:col-span-4'>
        {/* Ubicación */}
        <div className='bg-surface-container-lowest border border-slate-100 p-8 rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)]'>
            <div className='flex gap-3 items-center mb-6'>
                <div className='bg-emerald-100 flex h-10 items-center justify-center rounded-full text-emerald-800 w-10'>
                    <MdOutlineLocationOn className='text-xl' />
                </div>
                <h3 className='font-headline-md text-headline-md text-emerald-900'>Ubicación</h3>
            </div>
            <div className='space-y-6'>
                {/* Municipio */}
                <div className='space-y-2'>
                    <label htmlFor="municipio" className='font-label-bold text-label-bold text-slate-700'>
                        Municipio
                    </label>
                    <div className='relative'>
                        <Select
                            id="municipio"
                            className='disabled:cursor-not-allowed'
                            {...register('idmunicipio', { required: 'Municipio requerido' })}
                            disabled={!isDeptoSelected}
                        >
                            <option value="">
                                {isDeptoSelected ? 'Seleccione municipio' : 'Primero seleccione un departamento'}
                            </option>
                            {filteredMunicipality.map(muni => (
                                <option key={muni._id} value={muni._id}>
                                    {muni.descripcion}
                                </option>
                            ))}
                        </Select>                        
                    </div>
                    {errors.idmunicipio && <ErrorSpan>{errors.idmunicipio.message}</ErrorSpan>}
                </div>
                {/* Dirección */}
                <div className='space-y-2'>
                    <label className='font-label-bold text-label-bold text-slate-700'>
                        Dirección física completa
                    </label>
                    <textarea
                        id="direccion"
                        className='appearance-none border border-slate-200 bg-slate-50 duration-200 mt-2 px-4 py-3 rounded-lg text-on-surface transition-all w-full focus:outline-none focus:border-emerald-700 focus:bg-white'
                        placeholder='Nombre de la calle, número del edificio, punto de referencia...'
                        {...register('direccion', {
                            required: 'Dirección requerida',
                            minLength: { value: 8, message: 'Mínimo 8 caracteres' },
                        })}
                    />
                    {errors.direccion && <ErrorSpan>{errors.direccion.message}</ErrorSpan>}
                </div>
            </div>
        </div>
        {/* Capacidad */}
        <div className='bg-emerald-900 p-8 rounded-xl shadow-lg text-white'>
            <div className='flex gap-3 items-center mb-6'>
                <div className='bg-emerald-700/50 flex h-10 items-center justify-center rounded-full text-emerald-300 w-10'>
                    <MdOutlineCorporateFare className='text-xl' />
                </div>
                <h3 className='font-headline-md text-headline-md'>Escala y capacidad</h3>
            </div>
            <div className='space-y-6'>
                <div className='space-y-2'>
                    <label className='font-label-bold text-label-bold text-emerald-200'>Número de sedes</label>
                    <div className='flex gap-4 items-center'>
                        <button type="button" className='border border-emerald-700 bg-emerald-800 flex h-10 items-center justify-center rounded-lg transition-colors w-10 hover:bg-emerald-700'>
                            <MdOutlineRemove />
                        </button>
                        <input
                            type="number"
                            className='bg-emerald-800 border-emerald-700 font-bold rounded-lg text-center text-emerald-100 w-full focus:ring-emerald-500'
                            {...register('nosedes', { required: true, min: 1 })}
                            defaultValue={1}
                        />
                        <button type="button" className='border border-emerald-700 bg-emerald-800 flex h-10 items-center justify-center rounded-lg transition-colors w-10 hover:bg-emerald-700'>
                            <MdAdd />
                        </button>
                    </div>
                </div>
                <div className='bg-emerald-800/40 border border-emerald-700/50 p-4 rounded-lg'>
                    <p className='font-body-md leading-relaxed italic text-sm text-emerald-200'>
                        Especificar el número de sedes ayuda a configurar automáticamente nodos administrativos independientes para instituciones con múltiples sedes.
                    </p>
                </div>
            </div>
        </div>
    </section>
);
export default LocationCapacitySection;