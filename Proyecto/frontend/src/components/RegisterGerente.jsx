import { useForm } from "react-hook-form";
import { CCard, CCardBody, CCardTitle, CCardSubtitle } from "@coreui/react";
import Label from "../components/ui/Label";
import Input from "../components/ui/Input";
import BtnSuccess from "../components/ui/BtnSuccess";
import CustomToast from "../components/ui/CustomToast";

export function RegisterGerente() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Datos del gerente:", data);
    CustomToast("Gerente registrado con éxito", "success");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <CCard className="w-full max-w-2xl shadow-lg bg-white">
        <CCardBody className="p-8">
          <CCardTitle className="text-center text-3xl font-bold text-blue-900 mb-4">
            Registrar Gerente
          </CCardTitle>
          <CCardSubtitle className="text-center text-gray-600 mb-8">
            Completa el formulario para registrar un nuevo gerente.
          </CCardSubtitle>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Nombre */}
            <div>
              <Label htmlFor="nombre">Nombre:</Label>
              <Input
                id="nombre"
                name="nombre"
                type="text"
                register={register}
                validation={{ required: "El nombre es obligatorio" }}
                placeholder="Ingresa el nombre"
                className="w-full"
              />
              {errors.nombre && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.nombre.message}
                </p>
              )}
            </div>

            {/* Apellido */}
            <div>
              <Label htmlFor="apellido">Apellido:</Label>
              <Input
                id="apellido"
                name="apellido"
                type="text"
                register={register}
                validation={{ required: "El apellido es obligatorio" }}
                placeholder="Ingresa el apellido"
                className="w-full"
              />
              {errors.apellido && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.apellido.message}
                </p>
              )}
            </div>

            {/* Correo Electrónico */}
            <div>
              <Label htmlFor="email">Correo Electrónico:</Label>
              <Input
                id="email"
                name="email"
                type="email"
                register={register}
                validation={{
                  required: "El correo es obligatorio",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Correo electrónico no válido",
                  },
                }}
                placeholder="Ingresa el correo electrónico"
                className="w-full"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Contraseña */}
            <div>
              <Label htmlFor="password">Contraseña:</Label>
              <Input
                id="password"
                name="password"
                type="password"
                register={register}
                validation={{
                  required: "La contraseña es obligatoria",
                  minLength: {
                    value: 8,
                    message: "La contraseña debe tener al menos 8 caracteres",
                  },
                }}
                placeholder="Ingresa la contraseña"
                className="w-full"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            {/* Botón de Registro */}
            <BtnSuccess type="submit" className="w-full">
              Registrar Gerente
            </BtnSuccess>
          </form>
        </CCardBody>
      </CCard>
    </div>
  );
}

export default RegisterGerente;
