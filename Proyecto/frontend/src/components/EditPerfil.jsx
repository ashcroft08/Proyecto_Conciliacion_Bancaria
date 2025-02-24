import { useState } from "react";
import { useForm } from "react-hook-form";
import { useUser } from "../context/UserContext";
import { useAuth } from "../context/AuthContext";
import { editSchema, passwordSchema } from "../schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CCard,
  CCardBody,
  CButton,
  CCardSubtitle,
  CCardTitle,
} from "@coreui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importar iconos de ojo
import Label from "./ui/Label";
import { ToastContainer } from "react-toastify";
import CustomToast from "./ui/CustomToast";

function EditPerfil() {
  const { updateUser, updatePassword } = useUser(); // Asegúrate de tener updatePassword en el contexto
  const { user, errors: registerErrors } = useAuth();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Funciones para alternar la visibilidad de las contraseñas
  const toggleCurrentPasswordVisibility = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Formulario de edición
  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    formState: { errors: editErrors },
    reset: resetEdit,
  } = useForm({ resolver: zodResolver(editSchema) });

  // Enviar edición
  const onSubmitEdit = async (values) => {
    try {
      const success = await updateUser(user.cod_usuario, values);
      if (success) {
        CustomToast(
          "¡Información del perfil actualizada exitosamente!",
          "success"
        );
        resetEdit();
      }
    } catch (error) {
      CustomToast(
        error.response?.data?.message || "Error al actualizar",
        "error"
      );
    }
  };

  // Formulario de contraseña
  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: passwordErrors },
    reset: resetPassword,
  } = useForm({ resolver: zodResolver(passwordSchema) });

  // Enviar cambio de contraseña
  const onSubmitPassword = async (values) => {
    try {
      const success = await updatePassword(user.cod_usuario, {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword, // Asegúrate de incluir esto
      });
      if (success) {
        CustomToast("¡Contraseña actualizada exitosamente!", "success");
        resetPassword();
      }
    } catch (error) {
      // Mostrar el mensaje de error en la interfaz de usuario
      CustomToast(
        error.response?.data?.message || "Error al actualizar la contraseña",
        "error"
      );
    }
  };

  return (
    <>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="mb-4 text-xl md:text-2xl font-bold text-center">
          PERFIL
        </h1>

        {/* Sección Información del Perfil */}
        <CCard className="mb-6">
          <CCardBody>
            {registerErrors.length > 0 && (
              <div className="bg-red-500 p-2 text-white mb-4 rounded">
                {registerErrors.map((error, i) => (
                  <p key={i}>{error}</p>
                ))}
              </div>
            )}
            <div className="space-y-4">
              <div>
                <CCardTitle className="text-base md:text-lg font-semibold">
                  Información del perfil
                </CCardTitle>
                <CCardSubtitle className="text-xs md:text-sm text-gray-600">
                  Actualice la información de perfil y correo electrónico
                </CCardSubtitle>
              </div>

              <form
                autoComplete="off"
                className="space-y-4"
                onSubmit={handleSubmitEdit(onSubmitEdit)}
              >
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="col-span-full">
                    <Label htmlFor="email">Correo electrónico</Label>
                    <input
                      name="email"
                      id="email"
                      type="email"
                      {...registerEdit("email")}
                      className="w-full p-2 mt-1 border rounded-md focus:ring-2 focus:ring-indigo-500 text-sm md:text-base"
                    />
                    {editErrors.email && (
                      <p className="mt-1 text-red-600">
                        {editErrors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="nombres">Nombres</Label>
                    <input
                      type="text"
                      id="nombres"
                      name="nombres"
                      {...registerEdit("nombres")}
                      className="w-full p-2 mt-1 border rounded-md focus:ring-2 focus:ring-indigo-500 text-sm md:text-base"
                    />
                    {editErrors.nombres && (
                      <p className="mt-1 text-red-600">
                        <p className="text-red-500">
                          Los nombres son obligatorios
                        </p>
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="apellidos">Apellidos</Label>
                    <input
                      type="text"
                      id="apellidos"
                      name="apellidos"
                      {...registerEdit("apellidos")}
                      className="w-full p-2 mt-1 border rounded-md focus:ring-2 focus:ring-indigo-500 text-sm md:text-base"
                    />
                    {editErrors.apellidos && (
                      <p className="mt-1 text-red-600">
                        <p className="text-red-500">
                          Los apellidos son obligatorios
                        </p>
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end">
                  <CButton
                    type="submit"
                    color="primary"
                    className="px-4 py-2 text-sm md:px-6 md:py-2 md:text-base font-medium"
                  >
                    Guardar cambios
                  </CButton>
                </div>
              </form>
            </div>
          </CCardBody>
        </CCard>

        {/* Sección Contraseña */}
        <CCard>
          <CCardBody>
            <div className="space-y-4">
              <div>
                <CCardTitle className="text-base md:text-lg font-semibold">
                  Actualizar contraseña
                </CCardTitle>
                <CCardSubtitle className="text-xs md:text-sm text-gray-600">
                  Use una contraseña segura para proteger su cuenta
                </CCardSubtitle>
              </div>

              <form
                className="space-y-4"
                onSubmit={handleSubmitPassword(onSubmitPassword)}
              >
                <div>
                  <Label htmlFor="currentPassword">Contraseña actual</Label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      id="currentPassword"
                      {...registerPassword("currentPassword")}
                      className="w-full p-2 mt-1 border rounded-md focus:ring-2 focus:ring-indigo-500 text-sm md:text-base pr-10"
                    />
                    <button
                      type="button"
                      onClick={toggleCurrentPasswordVisibility}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                    >
                      {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {passwordErrors.currentPassword && (
                    <p className="mt-1 text-red-600">
                      {passwordErrors.currentPassword.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="newPassword">Nueva contraseña</Label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        id="newPassword"
                        {...registerPassword("newPassword")}
                        className="w-full p-2 mt-1 border rounded-md focus:ring-2 focus:ring-indigo-500 text-sm md:text-base pr-10"
                      />
                      <button
                        type="button"
                        onClick={toggleNewPasswordVisibility}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                      >
                        {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    {passwordErrors.newPassword && (
                      <p className="mt-1 text-red-600">
                        {passwordErrors.newPassword.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="confirmPassword">
                      Confirmar contraseña
                    </Label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        {...registerPassword("confirmPassword")}
                        className="w-full p-2 mt-1 border rounded-md focus:ring-2 focus:ring-indigo-500 text-sm md:text-base pr-10"
                      />
                      <button
                        type="button"
                        onClick={toggleConfirmPasswordVisibility}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    {passwordErrors.confirmPassword && (
                      <p className="mt-1 text-red-600">
                        {passwordErrors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end">
                  <CButton
                    type="submit"
                    color="primary"
                    className="px-4 py-2 text-sm md:px-6 md:py-2 md:text-base font-medium"
                  >
                    Cambiar contraseña
                  </CButton>
                </div>
              </form>
            </div>
          </CCardBody>
        </CCard>
        <ToastContainer />
      </div>
    </>
  );
}

export default EditPerfil;
