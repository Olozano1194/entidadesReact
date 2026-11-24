import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
// Api
import { CreateInstitution, updateInstitution } from '../../../api/institution.api';
import { getDepartment } from '../../../api/department.api';
import { getMunicipalityByDepto } from '../../../api/municipality.api';
import { getStudent } from '../../../api/student.api';
import { getTeacher } from '../../../api/teacher.api';
// Types
import type { InstitucionModel } from '../../../types/institution.model';
import type { CreateInstitucionDto } from '../../../types/dto/institution.dto';
import type { DepartamentModel } from '../../../types/department.model';
import type { MunicipalityModel } from '../../../types/municipality.model';
// Icons
import { MdChevronRight, MdOutlineVerified, MdAssignmentTurnedIn } from 'react-icons/md';
// Sections
import GeneralInfoSection from './components/GeneralInfoSection';
import ContactSection from './components/ContactSection';
import LocationCapacitySection from './components/LocationCapacitySection';
import AssignmentSection from './components/AssignmentSection';
// UI
import ButtonFormLeft from '../../../components/ui/btn/ButtonFormLeft';
import ButtonFormRight from '../../../components/ui/btn/ButtonFormRight';

const RegisterInstitutions = () => {
    const params = useParams<{ id?: string }>();
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<InstitucionModel>();
    const [departament, setDepartement] = useState<DepartamentModel[]>([]);
    const [filteredMunicipality, setFilteredMunicipality] = useState<MunicipalityModel[]>([]);
    // selectedDepto stores the numerical id used by the API, not the Mongo _id
    const [selectedDepto, setSelectedDepto] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const data = await getDepartment();
                setDepartement(data);
            } catch (error) {
                console.error('Error al cargar los departamentos:', error);
            }
        };
        fetchDepartments();
    }, []);

    const handleDeptoChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const mongoId = e.target.value;

        // selectedDepto controls whether the municipio select is enabled.
        // The API (getMunicipalityByDepartament) validates with mongoose.Types.ObjectId.isValid,
        // so it expects the Mongo _id — NOT the numerical id_departamento.
        setSelectedDepto(mongoId);
        setValue('iddepartamento', mongoId, { shouldValidate: true });
        setValue('idmunicipio', '', { shouldValidate: true });
        setFilteredMunicipality([]);

        if (mongoId) {
            try {
                const municipalities = await getMunicipalityByDepto(mongoId);
                setFilteredMunicipality(municipalities);
            } catch (error) {
                const err = error as { response?: { data?: unknown }; message?: string };
                console.error('Error cargando municipios:', err.response?.data ?? err.message ?? error);
                setFilteredMunicipality([]);
            }
        }
    };

    const onSubmit = handleSubmit(async (data: InstitucionModel) => {
        try {
            let studentIds: string[] = [];
            let teacherIds: string[] = [];

            if (data.asignarTodosStudent) {
                const all = await getStudent();
                studentIds = all.map(s => s._id ?? '');
            }
            if (data.asignarTodosTeacher) {
                const all = await getTeacher();
                teacherIds = all.map(t => t._id ?? '');
            }

            // periodos is always a string coming from the select, parseInt is now safe
            const numPeriodos = parseInt(data.periodos ?? '4') || 4;
            const periodos = Array.from({ length: numPeriodos }, (_, i) => ({
                nombre: `Periodo ${i + 1}`,
            }));

            const requestData: CreateInstitucionDto = {
                nombre: data.nombre.trim(),
                direccion: data.direccion.trim(),
                email: data.email.toLowerCase(),
                telefono: data.telefono,
                director: data.director,
                iddepartamento: data.iddepartamento,
                idmunicipio: data.idmunicipio,
                idsecretaria: data.secretaria || undefined,
                nosedes: parseInt(data.nosedes),
                estudiantes: studentIds,
                profesores: teacherIds,
                periodos,
            };

            if (params.id) {
                await updateInstitution(params.id, requestData);
                toast.success('Institución actualizada', { duration: 3000, position: 'bottom-right' });
            } else {
                if (!requestData.iddepartamento) throw new Error('Departamento no seleccionado correctamente');
                if (!requestData.idmunicipio) throw new Error('Municipio no seleccionado correctamente');
                await CreateInstitution(requestData);
                reset();
                toast.success('Institución creada exitosamente', { duration: 3000, position: 'bottom-right' });
            }
            navigate('/admin');
        } catch (error) {
            const msg = error instanceof Error ? error.message : 'Error al registrar la institución';
            toast.error(msg, { duration: 3000, position: 'bottom-right' });
        }
    });

    return (
        <main className='max-w-[1440px] mx-auto p-container-padding'>
            {/* Header */}
            <section className='flex flex-col gap-6 justify-between mb-section-gap md:flex-row md:items-end'>
                <div className='space-y-2'>
                    <nav className='flex font-label-sm gap-2 items-center text-sm text-slate-500'>
                        <a href="#" className='hover:text-emerald-700'>Configuración del sistema</a>
                        <MdChevronRight className='text-xs' />
                        <span className='font-semibold text-emerald-700'>Incorporación de instituciones</span>
                    </nav>
                    <h2 className='font-display-xl text-display-xl text-emerald-900'>Registrar nueva institución</h2>
                    <p className='font-body-lg max-w-2xl text-body-lg text-slate-600'>
                        Crear un nuevo perfil de centro educativo dentro del ecosistema EduControl. Esta acción establece la estructura administrativa fundamental.
                    </p>
                </div>
                <div className='flex gap-4 items-center'>
                    <ButtonFormLeft type="button">
                        Cancelar registro
                    </ButtonFormLeft>
                    <ButtonFormRight type="button">
                        Guardar y continuar
                    </ButtonFormRight>
                </div>
            </section>

            <form className='grid grid-cols-12 gap-gutter' onSubmit={onSubmit}>
                {/* Left column: General info + Contact */}
                <div className='col-span-12 space-y-gutter lg:col-span-8'>
                    <GeneralInfoSection
                        register={register}
                        errors={errors}
                        departament={departament}
                        onDeptoChange={handleDeptoChange}
                    />
                    <ContactSection register={register} errors={errors} />
                </div>

                {/* Right column: Location + Capacity */}
                <LocationCapacitySection
                    register={register}
                    errors={errors}
                    filteredMunicipality={filteredMunicipality}
                    isDeptoSelected={!!selectedDepto}
                />

                {/* Full width: Assignment + periods */}
                <AssignmentSection register={register} />

                {/* Submit */}
                <section className='col-span-12 flex flex-col items-center justify-center py-section-gap'>
                    <div className='bg-white border border-slate-100 p-8 rounded-2xl shadow-xl space-y-6 text-center w-full lg:max-w-2xl'>
                        <div className='bg-emerald-50 flex h-20 items-center justify-center mx-auto rounded-full text-emerald-600 w-20'>
                            <MdAssignmentTurnedIn className='text-4xl' />
                        </div>
                        <div className='space-y-2'>
                            <h4 className='font-headline-lg text-headline-lg text-emerald-900'>Envío de reseña</h4>
                            <p className='font-body-md text-body-md text-slate-500'>
                                Asegúrese de que todos los campos obligatorios estén completados correctamente. La información enviada se utilizará para la verificación de la licencia y la configuración institucional.
                            </p>
                        </div>
                        <div className='flex gap-4 items-center justify-center pt-4'>
                            <button
                                type="submit"
                                className='bg-emerald-800 cursor-pointer flex font-label-bold gap-2 items-center px-8 py-4 rounded-xl shadow-xl shadow-emerald-900/20 transition-all text-white hover:bg-emerald-900'
                            >
                                <MdOutlineVerified className='text-2xl' />
                                Completar el registro de la institución
                            </button>
                        </div>
                    </div>
                </section>
            </form>
        </main>
    );
};
export default RegisterInstitutions;