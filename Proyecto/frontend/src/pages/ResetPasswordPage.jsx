import { useForm } from "react-hook-form";
import { useRecoverPassword } from "../context/RecoverPasswordContext";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CCard,
  CCardBody,
  CCardTitle,
  CCardText,
  CCardSubtitle,
} from "@coreui/react";
import CustomToast from "../components/ui/CustomToast";
import Label from "../components/ui/Label";
import Input from "../components/ui/Input";
import BtnAccept from "../components/ui/BtnAccept";

function ResetPasswordPage() {
  const { register, handleSubmit } = useForm();
  const { resetPassword, errors } = useRecoverPassword();
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;
  const code = location.state?.code;

  const onSubmit = async (data) => {
    try {
      await resetPassword(email, code, data.newPassword);
      navigate("/login");
    } catch (error) {
      CustomToast(errors || "Error al restablecer la contraseña", "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-100 p-4">
      <CCard className="w-full max-w-md shadow-lg bg-white">
        <CCardBody className="p-6">
          <CCardTitle className="text-center text-2xl font-bold text-blue-900 mb-4">
            Restablecer Contraseña
          </CCardTitle>
          <CCardSubtitle className="text-center text-gray-600 mb-6">
            Ingresa tu nueva contraseña.
          </CCardSubtitle>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="newPassword">Nueva Contraseña:</Label>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                register={register}
                validation={{ required: "La nueva contraseña es obligatoria" }}
                placeholder="Ingresa tu nueva contraseña"
                className="w-full"
              />
            </div>
            <BtnAccept type="submit" className="w-full">
              Restablecer Contraseña
            </BtnAccept>
          </form>
        </CCardBody>
      </CCard>
    </div>
  );
}

export default ResetPasswordPage;
