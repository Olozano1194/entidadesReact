import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from "react-router-dom";
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
import { CreateInstitution, updateInstitution } from '../../../api/institution.api';
import { getDepartment } from '../../../api/department.api';
import { getMunicipalityByDepto } from '../../../api/municipality.api';
import { getStudent } from '../../../api/student.api';
import { getTeacher } from '../../../api/teacher.api';
//Model
import type { InstitucionModel } from '../../../types/institution.model';
import type { CreateInstitucionDto } from '../../../types/dto/institution.dto';
import type { DepartamentModel } from '../../../types/department.model';
import type { MunicipalityModel } from '../../../types/municipality.model';

const RegisterInstitutions = () => {
    const params = useParams<{ id?: string }>();
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
        const fetchdate = async () => {
            try {
                const [ departmentData, studentData, teacherData ] = await Promise.all([
                    getDepartment(), getStudent(), getTeacher()
                ]);                 
                setDepartement(departmentData);
                setTotalStudent(studentData.length);
                setTotalTeacher(teacherData.length);             
                                            
            } catch (error) {
                console.error('Error al cargar roles:', error);            
            }
        }        
        fetchdate();
    }, []);    
    
    const handleDeptoChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = e.target.selectedOptions[0];
        const objectId = e.target.value;
        const numericalId = selectedOption.getAttribute('data-numerical-id') ?? ''; 

        
        setSelectedDepto(numericalId);
        setValue('iddepartamento', objectId, { shouldValidate: true });
        setValue('idmunicipio', '', { shouldValidate: true }); 

        if (numericalId) {
            try {
                const response = await getMunicipalityByDepto(numericalId);
                // console.log('🏘️ Municipios cargados:', response);               
                setFilteredMunicipality(response);
                         
            } catch (error) {
                console.error('Error cargando municipios:', error);
                setFilteredMunicipality([]);                
            }                 
        } else {
            setFilteredMunicipality([]);                
        }                       
    };

    const onSubmit = handleSubmit(async (data: InstitucionModel) => {        
        try {
            let studentIds: string[] = [];
            let teacherIds: string[] = [];
            
            if (data.asignarTodosStudent || asignarTodosStudent) {
                const todosStudent = await getStudent();
                studentIds = todosStudent.map((student) => student._id ?? '');
            }

            if (data.asignarTodosTeacher || asignarTodosTeacher) {
                const todosTeacher = await getTeacher();
                teacherIds = todosTeacher.map((teacher) => teacher._id ?? '');
            }
            const requestData: CreateInstitucionDto = {
                    nombre: data.nombre.trim(),
                    direccion: data.direccion.trim(),
                    email: data.email.toLowerCase(),
                    telefono: data.telefono,
                    director: data.director,
                    iddepartamento: data.iddepartamento,
                    idmunicipio: data.idmunicipio,
                    nosedes: parseInt(data.nosedes),
                    estudiantes: studentIds,
                    profesores: teacherIds
            };  

            if (params.id) {
                await updateInstitution(params.id!, requestData);
                //console.log('Actualizando miembro:', params.id);
                toast.success('Institución actualizada Actualizada', {
                    duration: 3000,
                    position: 'bottom-right',
                    style: {
                        background: '#4b5563',   // Fondo negro
                        color: '#fff',           // Texto blanco
                        padding: '16px',
                        borderRadius: '8px',
                    },
                });                           
            } else {
                // Validar antes de enviar
                if (!requestData.iddepartamento) {
                    throw new Error('Departamento no seleccionado correctamente');
                }
                if (!requestData.idmunicipio) {
                    throw new Error('Municipio no seleccionado correctamente');
                }
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
            }
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
                    <Title><img className="w-8 h-6 rounded-lg" src={icons} alt="logo del desarrollador" />
                    { 
                        params.id ? (
                            <>
                            Actualizar
                            <span className='pl-2 text-teal-800'>Membresía</span>
                            </>) 
                            : (
                            <>
                            Registrar
                            <span className='pl-2 text-teal-800'>Membresía</span>
                            </>
                        )
                    }
                    </Title>
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
                    {...register('iddepartamento',{
                        required: {
                            value: true,
                            message: 'Departamento requerido'
                        }                        
                    })}
                    // value={selectedDepto}
                    onChange={handleDeptoChange}
                >
                    <option value="">Seleccione el departamento</option>
                    { departament.map(depto => (                    
                                                
                            <option key={depto._id} value={depto._id} data-numerical-id={depto.id_departamento}>
                                {depto.descripcion}
                            </option>
                            )
                        )
                    }                    
                </Select>
                </label>
                {
                    errors.iddepartamento && <span className='text-red-500 text-sm'>{errors.iddepartamento.message}</span>
                }
                {/* municipality */}
                <label htmlFor="municipality"><Span><FaMapMarkerAlt className='lg:text-2xl' />Municipio</Span>
                <Select
                    {...register('idmunicipio',{
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
                    errors.idmunicipio && <span className='text-red-500 text-sm'>{errors.idmunicipio.message}</span>
                }
                {/* sedes */}
                <label htmlFor="sedes">
                    <Span><GiVillage className='lg:text-2xl' />NoSede</Span>
                    <Input type="text" placeholder="Escribe El número de sedes"
                        {...register('nosedes',{
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
                    errors.nosedes && <span className='text-red-500 text-sm'>{errors.nosedes.message}</span>
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
                                    {...register('asignarTodosStudent')}
                                    onChange={(e) => {
                                        setAsignarTodosStudent(e.target.checked);
                                        setValue('asignarTodosStudent', e.target.checked);
                                    }}
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
                                    {...register('asignarTodosTeacher')}
                                    onChange={(e) => {
                                        setAsignarTodosTeacher(e.target.checked);
                                        setValue('asignarTodosTeacher', e.target.checked);
                                    }}
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