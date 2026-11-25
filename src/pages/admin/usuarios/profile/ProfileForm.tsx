import { IoPersonOutline } from "react-icons/io5";
import type { AdminFormData } from "./hooks/useAdminProfile";
import type { Rol } from "../../../../types/rol.models";
import FormField from "../../../../components/form/FormField";
import Label from "../../../../components/ui/Label";


interface ProfileFormProps {
    formData: AdminFormData;
    roles: Rol[];
    editingUser: boolean;
    isSuperAdmin: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    onSubmit?: (e: React.FormEvent) => void;
}

const ProfileForm = ({ formData, roles, editingUser, isSuperAdmin, onChange, onSubmit }: ProfileFormProps) => {
    const disabledStyle = "disabled:opacity-70 disabled:cursor-not-allowed";

    return (
        <section className="border border-emerald-50 bg-white p-8 rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)] w-full">
            <div className="flex items-center justify-between mb-8">
                <h3 className="flex font-headline-md font-semibold gap-3 items-center text-headline-md text-primary md:text-2xl">
                    <IoPersonOutline className="text-primary" /> Información del perfil
                </h3>
            </div>
            <form onSubmit={onSubmit} className="grid grid-cols-1 gap-form-stack md:grid-cols-2">
                <section className="flex flex-col gap-2">
                    <Label htmlFor="name" required>Nombre Completo</Label>
                    <section className="flex-1 flex items-center gap-4 mt-1">
                        <div className="w-full">
                            <input
                                type="text"
                                className={`border border-slate-200 bg-slate-50/50 duration-200 px-4 py-3 rounded-lg text-on-surface transition-all w-full focus:bg-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30 ${disabledStyle}`}
                                placeholder="Nombre(s)"
                                id="name"
                                name="nombre"
                                value={formData.nombre ?? ''}
                                onChange={onChange}
                                disabled={!editingUser}
                            />
                        </div>
                        <div className="w-full">
                            <input
                                type="text"
                                className={`border border-slate-200 bg-slate-50/50 duration-200 px-4 py-3 rounded-lg text-on-surface transition-all w-full focus:bg-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30 ${disabledStyle}`}
                                placeholder="Apellido(s)"
                                id="lastname"
                                name="apellido"
                                value={formData.apellido ?? ''}
                                onChange={onChange}
                                disabled={!editingUser}
                            />
                        </div>
                    </section>
                </section>

                <FormField
                    label="Teléfono"
                    required
                    id="phone"
                    name="telefono"
                    type="tel"
                    placeholder="3003213215"
                    value={formData.telefono ?? ''}
                    onChange={onChange}
                    disabled={!editingUser}
                    className={disabledStyle}
                />

                <FormField
                    as="select"
                    label="Rol"
                    required
                    id="rol"
                    name="rol"
                    value={formData.rol ?? ''}
                    onChange={onChange}
                    disabled={!editingUser || !isSuperAdmin}
                    className={disabledStyle}
                    helpText={!isSuperAdmin ? "Solo un Super Administrador puede modificar el rol." : undefined}
                >
                    <option value="">Seleccione un rol</option>
                    {roles.map((rol) => (
                        <option key={rol._id} value={rol._id}>
                            {rol.nombre}
                        </option>
                    ))}
                </FormField>

                <FormField
                    label="Cargo"
                    required
                    id="cargo"
                    name="cargo"
                    type="text"
                    placeholder="Ing de Sistemas"
                    value={formData.cargo ?? ''}
                    onChange={onChange}
                    disabled={!editingUser}
                    className={disabledStyle}
                />

                <div className="md:col-span-2 pt-2">
                    <FormField
                        as="textarea"
                        label="Breve biografía"
                        id="biografia"
                        name="biografia"
                        rows={3}
                        placeholder="Supervisión de protocolos administrativos a nivel institucional e iniciativas de transformación digitales desde 2018."
                        value={formData.biografia ?? ''}
                        onChange={onChange}
                        disabled={!editingUser}
                        className={disabledStyle}
                    />
                </div>
            </form>
        </section>
    );
};
export default ProfileForm;
