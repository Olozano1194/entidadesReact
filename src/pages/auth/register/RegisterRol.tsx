import {useForm} from 'react-hook-form';
import { useNavigate } from "react-router-dom";
//Mensajes
import { toast } from 'react-hot-toast';
//ui
import Main from '../../../components/ui/Main';
import Form from '../../../components/ui/Form';
import Title from '../../../components/ui/Title';
import Span from '../../../components/ui/Span';
import ErrorSpan from '../../../components/ui/ErrorSpan';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
//img
import icons from '../../../assets/favicon-32x32.png'
//icons
import { TbFileDescription } from "react-icons/tb";
import { RiLockPasswordLine, RiLoginBoxLine, RiUserSettingsLine } from "react-icons/ri";
//Api
import { createRol } from '../../../api/roles.api';
//Model
import type { CreateRolDto } from '../../../types/dto/rol.dto';
import type { Rol } from '../../../types/rol.models';


const RegisterRol = () => {
    const { register, handleSubmit, formState: {errors}, reset } = useForm<Rol>();
    const navigate = useNavigate();  
    
    const objectPermissions = [
        { value: 'crear', label: 'Crear' },
        { value: 'leer', label: 'Leer' },
        { value: 'actualizar', label: 'Actualizar' },
        { value: 'eliminar', label: 'Eliminar' },
    ];
    
    const onSubmit = handleSubmit(async (data: Rol) => {        
        try {            
            const requestData: CreateRolDto = {                
                nombre: data.nombre.toLowerCase(),
                descripcion: data.descripcion,
                permisos: data.permisos || [],                                
            };           

            await createRol(requestData);                        
            reset();

            toast.success('Rol Creado', {
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
            const errorMessage = error instanceof Error ? error.message : 'Error al registrar el rol';
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
                    <Title><img className="w-8 h-6 rounded-lg" src={icons} alt="logo del desarrollador" />Crear <span className="pl-2 text-teal-800">Roles</span></Title>
                </div>                              
                {/* name */}
                <label htmlFor="nombre">
                    <Span><RiUserSettingsLine className='lg:text-2xl' />Nombre</Span>
                    <Input type="text" placeholder="Escriba el nombre del rol"
                        {...register('nombre',{
                            required: {
                                value: true,
                                message: 'Nombre requerido'
                                },
                            pattern: {
                                value: /^[a-zA-Z]+$/,
                                message: 'Nombre invalido'
                            },
                        })}  
                    />
                </label>
                {
                    errors.nombre && <ErrorSpan>{errors.nombre.message}</ErrorSpan>
                }
                {/* Descriptions */}
                <label htmlFor="descripcion"><Span><TbFileDescription/>Descripción</Span>
                    <Input type="text" placeholder="Escriba una descripción del rol"
                        {...register('descripcion',{
                            required: {
                                value: true,
                                message: 'Descripción requerida'
                            },
                            minLength: {
                                value: 10,
                                message: 'La descripción debe tener al menos 10 caracteres'
                            },
                            maxLength: {
                                value: 60,
                                message: 'La descripción debe tener como maximo 60 caracteres'
                            },
                        })}  
                    />
                </label>
                {
                    errors.descripcion && <span className='text-red-500 text-sm'>{errors.descripcion.message}</span>
                }                                
                {/* Permission */}
                <div className='mb-4'>
                    <Span><RiLockPasswordLine className='lg:text-2xl' />Permisos</Span>
                    <div className="grid grid-cols-2 gap-2 mt-2 ">
                        {objectPermissions.map(permiso => (
                            <label key={permiso.value} className="flex items-center justify-center space-x-2">
                                <input
                                type="checkbox"
                                value={permiso.value}
                                {...register('permisos')}
                                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <span>{permiso.label}</span>
                            </label>
                        ))}
                    </div>
                    {
                        errors.permisos && <ErrorSpan>{errors.permisos.message}</ErrorSpan>
                    } 
                </div>
                               
                {/* Btn */}
                <Button type="submit">
                    <RiLoginBoxLine className='text-purple-500 hover:text-purple-900'/>                    
                        Registrar                                   
                </Button>
            </Form>
        </Main>
    );
};
export default RegisterRol;