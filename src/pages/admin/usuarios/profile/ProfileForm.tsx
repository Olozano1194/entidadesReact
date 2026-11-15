import { IoPersonOutline } from "react-icons/io5";
import type { AdminFormData } from "./hooks/useAdminProfile";
import type { Rol } from "../../../../types/rol.models";

interface ProfileFormProps {
    formData: AdminFormData;
    roles: Rol[];
    editingUser: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onEdit: () => void;
}

const ProfileForm = ({ formData, roles, editingUser, onChange, onEdit }: ProfileFormProps) => {
    return (
        <section className="border border-emerald-50 bg-white p-8 rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)] w-full">
            <div className="flex items-center justify-between mb-8">
                <h3 className="flex font-headline-md font-semibold gap-3 items-center text-headline-md text-primary md:text-2xl">
                    <IoPersonOutline className="text-primary" /> Información del perfil
                </h3>
            </div>
            <form className="grid grid-cols-1 gap-form-stack md:grid-cols-2">
                <section className="flex flex-col gap-2">
                    <label className="font-label-bold text-label-bold text-on-surface-variant">Nombre Completo <span className="text-red-500">*</span></label>
                    <section className="flex-1 flex items-center gap-4">
                        <div className="w-full">
                            <input type="text" className="border border-outline-variant bg-surface-container-lowest font-body-md py-3 px-4 outline-none rounded-lg text-body-md text-primary transition-all w-full focus:border-primary focus:right-1 focus:ring-primary" placeholder='Nombre(s)' id="name" name='nombre' value={formData.nombre ?? ''} onChange={onChange} disabled={!editingUser} />
                        </div>
                        <div className="w-full">
                            <input type="text" className="border border-outline-variant bg-surface-container-lowest font-body-md py-3 px-4 outline-none rounded-lg text-body-md text-primary transition-all w-full focus:border-primary focus:right-1 focus:ring-primary" placeholder='Apellido(s)' id="lastname" name='apellido' value={formData.apellido ?? ''} onChange={onChange} disabled={!editingUser} />
                        </div>
                    </section>
                </section>
                <section className="flex flex-col gap-2">
                    <label className="font-label-bold text-label-bold text-on-surface-variant"><p>Teléfono <span className="text-red-500">*</span></p></label>
                    <input type="tel" className="border border-outline-variant bg-surface-container-lowest font-body-md py-3 px-4 outline-none rounded-lg text-body-md text-primary transition-all w-full focus:border-primary focus:right-1 focus:ring-primary" id="phone" name='telefono' placeholder="3003213215" value={formData.telefono ?? ''} onChange={onChange} disabled={!editingUser} />
                </section>
                <section className="flex flex-col gap-2">
                    <label className="font-label-bold text-label-bold text-on-surface-variant"><p>Rol <span className="text-red-500">*</span></p></label>
                    <select name="rol" value={formData.rol ?? ''} onChange={onChange} disabled={!editingUser} className="appearance-none border border-outline-variant bg-surface-container-lowest cursor-pointer font-body-md py-3 px-4 outline-none rounded-lg text-body-md text-primary transition-all w-full focus:border-primary focus:right-1 focus:ring-primary">
                        <option value="">Seleccione un rol</option>
                        {roles.map(rol => (<option key={rol._id} value={rol._id}>{rol.nombre}</option>))}
                    </select>
                </section>
                <section className="flex flex-col gap-2">
                    <label className="font-label-bold text-label-bold text-on-surface-variant"><p>Cargo <span className="text-red-500">*</span></p></label>
                    <input type="text" className="border border-outline-variant bg-surface-container-lowest font-body-md py-3 px-4 outline-none rounded-lg text-body-md text-primary transition-all w-full focus:border-primary focus:right-1 focus:ring-primary" id="address" name='cargo' placeholder="Ing de Sistemas" value={formData.cargo ?? ''} onChange={onChange} disabled={!editingUser} />
                </section>
                <section className="flex flex-col gap-2 pt-4 md:col-span-2">
                    <label className="font-label-bold text-label-bold text-on-surface-variant">Breve biografía</label>
                    <textarea name="bio" id="bio" className="border border-outline-variant bg-surface-container-lowest font-body-md px-4 py-3 rounded-lg transition-all text-body-m w-full focus:border-primary focus:ring-1 focus:ring-primary" rows={3} defaultValue="Supervisión de protocolos administrativos a nivel institucional e iniciativas de transformación digitales desde 2018."></textarea>
                </section>
                <section className='flex justify-end items-center'>
                    {!editingUser && (
                        <button type="button" className="mt-4 py-2 px-4 bg-sky-700 cursor-pointer font-bold text-white rounded hover:scale-105 hover:bg-sky-500" onClick={onEdit}>Editar Perfil</button>
                    )}
                </section>
            </form>
        </section>
    );
};
export default ProfileForm;