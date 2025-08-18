import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
//Mensajes
import { toast } from 'react-hot-toast';
//ui
import Main from '../../../components/ui/Main';
import Form from '../../../components/ui/Form';
import Title from '../../../components/ui/Title';
import Span from '../../../components/ui/Span';
import ErrorSpan from '../../../components/ui/ErrorSpan';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
//img
import icons from '../../../assets/favicon-32x32.png'
//icons
import { RiLoginBoxLine, RiUser3Line } from "react-icons/ri";
import { FaMapMarkerAlt, FaHome, FaSchool, FaMobileAlt } from "react-icons/fa";
import { GiVillage } from "react-icons/gi";
import { AiOutlineMail } from 'react-icons/ai';
//Api
import { CreateInstitution } from '../../../api/institution.api';
import { getDepartment } from '../../../api/department.api';
import { getMunicipalityByDepto } from '../../../api/municipality.api';
import { getStudent } from '../../../api/student.api';
import { getTeacher } from '../../../api/teacher.api';
//Model
import type { InstitucionModel } from '../../../model/institution.model';
import type { CreateInstitucionDto } from '../../../model/dto/institution.dto';
import type { DepartamentModel } from '../../../model/department.model';
import type { MunicipalityModel } from '../../../model/municipality.model';

const RegisterInstitutions = () => {
    const { register, handleSubmit, formState: {errors}, reset, setValue } = useForm<InstitucionModel>();
    const [ departament, setDepartement ] = useState<DepartamentModel[]>([]);
    const [ filteredMunicipality, setFilteredMunicipality] = useState<MunicipalityModel[]> ([]);   
    const [ selectedDepto, setSelectedDepto ] = useState<string>('');
    const [ totalStudent, setTotalStudent ] = useState<number>(0);
    const [ totalTeacher, setTotalTeacher ] = useState<number>(0);
    const [ asignarTodosStudent, setAsignarTodosStudent ] = useState<boolean>(false);
    const [ asignarTodosTeacher, setAsignarTodosTeacher ] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const load = async () => {
            try {
                const departamentData = await getDepartment();                
                setDepartement(departamentData);             
                                            
            } catch (error) {
                console.error('Error al cargar roles:', error);            
            }
        }        
        load();
    }, []);

    useEffect(() => {
        const fetchStudentandTeacher = async () => {
            try {
                const [ studentData, teacherData ] = await Promise.all([
                    getStudent(),
                    getTeacher()
                ]);

                setTotalStudent(studentData.length);
                setTotalTeacher(teacherData.length);
            } catch (error) {
                console.error('Error al cargar estudiantes y profesores:', error);
                toast.error('Error al cargar estudiantes y profesores');                
            } 
        };
        fetchStudentandTeacher();
    }, []);
    
    const handleDeptoChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const deptoId = e.target.value;
        setSelectedDepto(deptoId);
        setValue('id_municipio', '');

        if (deptoId) {
             try {
                const response = await getMunicipalityByDepto(deptoId);               
                setFilteredMunicipality(response);
                          
            } catch (error) {
                console.error('Error cargando municipios:', error);
                setFilteredMunicipality([]);                
            }           
        }                    
    };

    const onSubmit = handleSubmit(async (data: InstitucionModel) => {        
        try {
            let studentIds: string[] = [];
            let teacherIds: string[] = [];
            
            if (asignarTodosStudent) {
                const todosStudent = await getStudent();
                studentIds = todosStudent.map((student) => student._id ?? '');
            }

            if (asignarTodosTeacher) {
                const todosTeacher = await getTeacher();
                teacherIds = todosTeacher.map((teacher) => teacher._id ?? '');
            }

            const requestData: CreateInstitucionDto = {
                nombre: data.nombre.trim(),
                direccion: data.direccion.trim(),
                email: data.email.toLowerCase(),
                telefono: data.telefono,
                director: data.director,
                id_departamento: data.id_departamento,
                id_municipio: data.id_municipio,
                nosede: data.nosede,
                idestudiante: studentIds,
                iddocente: teacherIds
            };           

            await CreateInstitution(requestData);                        
            reset();
            setAsignarTodosStudent(false);
            setAsignarTodosTeacher(false);

            toast.success('Institución Creada Exitosamente', {
                duration: 3000,
                position: 'bottom-right',
                style: {
                    background: '#4b5563',   // Fondo negro
                    color: '#fff',           // Texto blanco
                    padding: '16px',
                    borderRadius: '8px',
                },

            });
            navigate('/admin');
            
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error al registrar la institución';
            toast.error(errorMessage, {
                duration: 3000,
                position: 'bottom-right',
            });            
        }        
    });
    
    return (
        <Main>
            <Form onSubmit={onSubmit}>
                <div className='w-full flex justify-center'>
                    <Title><img className="w-8 h-6 rounded-lg" src={icons} alt="logo del desarrollador" />Crear <span className="pl-2 text-teal-800">institución</span></Title>
                </div>                
                {/* name */}
                <label htmlFor="name">
                    <Span><FaSchool className='lg:text-2xl' />Nombre</Span>
                    <Input type="text" placeholder="Escribe el nombre de la institución"
                        {...register('nombre',{
                            required: {
                                value: true,
                                message: 'Nombre de la institución requerido'
                                },
                                    minLength: {
                                            value: 4,
                                            message: 'El nombre de la institución debe tener minimo 4 carácteres'
                                        },
                                        maxLength: {
                                            value: 70,
                                            message: 'El nombre de la institución debe tener como máximo 20 carácteres'
                                        },
                                pattern: {
                                    value: /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s'-]+(?:\s+[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s'-]+)*$/,
                                    message: 'Nombre de la institución invalido'
                                },
                        })}  
                    />
                </label>
                {
                    errors.nombre && <ErrorSpan>{errors.nombre.message}</ErrorSpan>
                }
                {/* address */}
                <label htmlFor="address">
                    <Span><FaHome className='lg:text-2xl'/>Dirección</Span>
                    <Input type="text" placeholder="Escribe la dirección"
                        {...register('direccion',{
                            required: {
                                value: true,
                                message: 'Dirección requerido'
                                },
                            minLength: {
                                value: 8,
                                message: 'La dirección debe tener minimo 8 carácteres'
                            },                            
                        })}  
                    />
                </label>
                {
                    errors.direccion && <ErrorSpan>{errors.direccion.message}</ErrorSpan>
                }
                {/* phone */}
                <label htmlFor="phone">
                    <Span><FaMobileAlt className='lg:text-2xl'/>Teléfono</Span>
                    <Input type="tel" placeholder="Escribe el teléfono"
                        {...register('telefono',{
                            required: {
                                value: true,
                                message: 'Telefono requerido'
                                },
                            minLength: {
                                value: 10,
                                message: 'El telefono debe tener minimo 10 números'
                            },
                            maxLength: {
                                value: 10,
                                message: 'El telefono debe tener maximo 10 números'
                            },
                            pattern: {
                                value: /^[0-9]+$/,
                                message: 'Telefono invalido'
                            },
                        })}  
                    />
                </label>
                {
                    errors.telefono && <ErrorSpan>{errors.telefono.message}</ErrorSpan>
                }                                    
                {/* email */}
                <label htmlFor="email">
                    <Span><AiOutlineMail className='lg:text-2xl' />Correo</Span>
                    <Input type="email" placeholder="Escribe su correo"
                        {...register('email',{
                            required: {
                                value: true,
                                message: 'Correo requerido'
                                },
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: 'Correo invalido'
                            },
                        })}  
                    />
                </label>
                {
                    errors.email && <ErrorSpan>{errors.email.message}</ErrorSpan>
                }
                {/* director */}
                <label htmlFor="director">
                    <Span><RiUser3Line className='lg:text-2xl'/>Director</Span>
                    <Input type="text" placeholder="Escribe el nombre del director"
                        {...register('director',{
                            required: {
                                value: true,
                                message: 'Director requerido'
                                },
                            minLength: {
                                value: 10,
                                message: 'El director debe tener minimo 10 carácteres'
                            },
                            pattern: {
                                value: /^[A-Za-z]+(?:\s[A-Za-z]+)?$/,
                                message: 'Director invalido'
                            },
                        })}  
                    />
                </label>
                {
                    errors.director && <ErrorSpan>{errors.director.message}</ErrorSpan>
                }
                {/* department */}
                <label htmlFor="department"><Span><FaMapMarkerAlt className='lg:text-2xl' />Departamento</Span>
                <Select
                    {...register('id_departamento',{
                        required: {
                            value: true,
                            message: 'Departamento requerido'
                        }                        
                    })}
                    onChange={handleDeptoChange}
                >
                    <option value="">Seleccione el departamento</option>
                    { departament.map(depto => (                    
                                                
                            <option key={depto._id} value={depto.id_departamento}>
                                {depto.descripcion}
                            </option>
                            )
                        )
                    }                    
                </Select>
                </label>
                {
                    errors.id_departamento && <span className='text-red-500 text-sm'>{errors.id_departamento.message}</span>
                }
                {/* municipality */}
                <label htmlFor="municipality"><Span><FaMapMarkerAlt className='lg:text-2xl' />Municipio</Span>
                <Select
                    {...register('id_municipio',{
                        required: {
                            value: true,
                            message: 'Municipio requerido'
                        }                        
                    })}  
                    disabled={!selectedDepto}                  
                >
                    <option value="">Seleccione un municipio</option>
                    { filteredMunicipality.map(muni => (                    
                                                
                            <option key={muni._id} value={muni._id}>
                                {muni.descripcion}
                            </option>
                            )
                        )
                    }                    
                </Select>
                </label>
                {
                    errors.id_municipio && <span className='text-red-500 text-sm'>{errors.id_municipio.message}</span>
                }
                {/* sedes */}
                <label htmlFor="sedes">
                    <Span><GiVillage className='lg:text-2xl' />NoSede</Span>
                    <Input type="text" placeholder="Escribe El número de sedes"
                        {...register('nosede',{
                            required: {
                                value: true,
                                message: 'Numero de sede requerido'
                                },
                            minLength: {
                                value: 1,
                                message: 'El número de sedes debe tener minimo 1 carácteres'
                            },
                            pattern: {
                                value: /^[0-9]+$/,
                                message: 'Numero de sede invalido'
                            },
                        })}  
                    />                
                </label>
                {
                    errors.nosede && <span className='text-red-500 text-sm'>{errors.nosede.message}</span>
                }
                {/* Student  */}
                <label htmlFor="estudiantes">
                    <Span><RiUser3Line className='lg:text-2xl' />Estudiantes</Span>
                    <div className="space-y-2">
                        <div className="p-3 border border-gray-300 rounded-lg bg-gray-50">
                            <div className="text-sm text-gray-600 mb-2">
                                Total de estudiantes disponibles: <strong>{totalStudent}</strong>
                            </div>
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={asignarTodosStudent}
                                    onChange={(e) => setAsignarTodosStudent(e.target.checked)}
                                    className="w-4 h-4 text-blue-600"
                                />
                                <span className="text-sm">
                                    Asignar todos los estudiantes ({totalStudent}) a esta institución
                                </span>
                            </label>
                        </div>
                    </div>
                </label>
                {/* Teacher */}
                <label htmlFor="profesores">
                    <Span><RiUser3Line className='lg:text-2xl' />Profesores</Span>
                    <div className="space-y-2">
                        <div className="p-3 border border-gray-300 rounded-lg bg-gray-50">
                            <div className="text-sm text-gray-600 mb-2">
                                Total de profesores disponibles: <strong>{totalTeacher}</strong>
                            </div>
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={asignarTodosTeacher}
                                    onChange={(e) => setAsignarTodosTeacher(e.target.checked)}
                                    className="w-4 h-4 text-blue-600"
                                />
                                <span className="text-sm">
                                    Asignar todos los profesores ({totalTeacher}) a esta institución
                                </span>
                            </label>
                        </div>
                    </div>
                </label>
                {/* Btn */}
                <Button type="submit">
                    <RiLoginBoxLine className='text-purple-500 hover:text-purple-900'/>                    
                        Registrar                                   
                </Button>
            </Form>
        </Main>
    );
};
export default RegisterInstitutions;