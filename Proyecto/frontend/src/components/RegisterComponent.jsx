import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { registerSchema } from "../schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";

function RegisterComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors }, // Renombrar para evitar confusión
    reset,
  } = useForm({ resolver: zodResolver(registerSchema) });

  const { signup, errors: registerErrors, setErrors } = useAuth(); // Obtén los errores y la función setErrors

  const onSubmit = async (values) => {
    console.log("Datos enviados:", values);
    const success = await signup(values); // Llama a signup y espera la respuesta
    if (success) {
      alert("Usuario registrado exitosamente");
      reset(); // Limpia el formulario después de un registro exitoso
      setErrors([]); // Limpia los errores en el contexto
    } else {
      console.log("Error al registrar usuario.");
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      {/* Mensajes de error del backend (si aún necesitas alguna validación allá) */}
      {registerErrors.length > 0 && (
        <div className="bg-red-500 p-2 text-white mb-4 rounded">
          {registerErrors.map((error, i) => (
            <p key={i}>{error}</p>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Registro de Usuarios
          </h2>
          <p className="text-sm text-gray-600">
            Proporcione la información requerida para completar el registro.
          </p>

          {/* Campo de Cédula */}
          <div>
            <label
              htmlFor="cedula"
              className="block text-sm font-medium text-gray-900"
            >
              Cédula
            </label>
            <input
              type="text"
              id="cedula"
              {...register("cedula", { required: "La cédula es obligatoria" })}
              className={`block w-full rounded-md px-3 py-1.5 text-base text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.cedula ? "border-red-500" : "border-gray-300"
              }`}
              aria-invalid={errors.cedula ? "true" : "false"}
            />
            {errors.cedula && (
              <p className="mt-1 text-sm text-red-600">
                {errors.cedula.message}
              </p>
            )}
          </div>

          {/* Campo de Nombres */}
          <div>
            <label
              htmlFor="nombres"
              className="block text-sm font-medium text-gray-900"
            >
              Nombres
            </label>
            <input
              type="text"
              id="nombres"
              {...register("nombres", {
                required: "Los nombres son obligatorios",
              })}
              className="block w-full rounded-md px-3 py-1.5 text-base text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.nombres && (
              <p className="mt-1 text-sm text-red-600">
                {errors.nombres.message}
              </p>
            )}
          </div>

          {/* Campo de Apellidos */}
          <div>
            <label
              htmlFor="apellidos"
              className="block text-sm font-medium text-gray-900"
            >
              Apellidos
            </label>
            <input
              type="text"
              id="apellidos"
              {...register("apellidos", {
                required: "Los apellidos son obligatorios",
              })}
              className={`block w-full rounded-md px-3 py-1.5 text-base text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.apellidos ? "border-red-500" : "border-gray-300"
              }`}
              aria-invalid={errors.apellidos ? "true" : "false"}
            />
            {errors.apellidos && (
              <p className="mt-1 text-sm text-red-600">
                {errors.apellidos.message}
              </p>
            )}
          </div>

          {/* Campo de Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-900"
            >
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              {...register("email", { required: "El correo es obligatorio" })}
              className={`block w-full rounded-md px-3 py-1.5 text-base text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Campo de Contraseña */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-900"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              {...register("password", {
                required: "La contraseña es obligatoria",
              })}
              className={`block w-full rounded-md px-3 py-1.5 text-base text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              aria-invalid={errors.password ? "true" : "false"}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Campo de Rol */}
          <div>
            <label
              htmlFor="rol"
              className="block text-sm font-medium text-gray-900"
            >
              Rol
            </label>
            <select
              id="cod_rol"
              {...register("cod_rol", {
                required: "Por favor selecciona un rol",
              })}
              className={`...`}
            >
              <option value="">Selecciona un rol</option>
              <option value="1">Administrador</option>
              <option value="2">Profesor</option>
              <option value="3">Estudiante</option>
            </select>
            {errors.cod_rol && (
              <p className="mt-1 text-sm text-red-600">
                {errors.cod_rol.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-x-4">
          <button type="button" className="text-sm font-semibold text-gray-900">
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-500 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
          >
            Registrar
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterComponent;
