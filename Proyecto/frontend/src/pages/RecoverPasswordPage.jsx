import { useForm } from "react-hook-form";
import { useRecoverPassword } from "../context/RecoverPasswordContext";
import { useNavigate, Link } from "react-router-dom";
import { CCard, CCardBody, CCardTitle, CCardText, CCardSubtitle } from "@coreui/react";
import CustomToast from "../components/ui/CustomToast";
import Label from "../components/ui/Label";
import Input from "../components/ui/Input";
import BtnAccept from "../components/ui/BtnAccept";

function RecoverPasswordPage() {
  const { register, handleSubmit } = useForm();
  const { sendRecoveryCode, errors } = useRecoverPassword();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await sendRecoveryCode(data.email);
      navigate("/validate-recovery-code", { state: { email: data.email } });
    } catch (error) {
      CustomToast(errors || "Error al enviar el código de recuperación", "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-100 p-4">
      <CCard className="w-full max-w-md shadow-lg bg-white">
        <CCardBody className="p-6">
          <CCardTitle className="text-center text-2xl font-bold text-blue-900 mb-4">
            Recuperar Contraseña
          </CCardTitle>
          <CCardSubtitle className="text-center text-gray-600 mb-6">
            Ingresa tu correo electrónico para recibir un código de recuperación.
          </CCardSubtitle>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="email">Correo Electrónico:</Label>
              <Input
                id="email"
                name="email"
                type="email"
                register={register}
                validation={{ required: "El correo es obligatorio" }}
                placeholder="Ingresa tu correo electrónico"
                className="w-full"
              />
            </div>
            <BtnAccept type="submit" className="w-full">
              Enviar Código
            </BtnAccept>
          </form>
          <p className="mt-6 text-center text-sm text-gray-500">
            ¿Recuerdas tu contraseña?{" "}
            <Link to="/login" className="text-blue-600 hover:text-blue-500">
              Iniciar sesión
            </Link>
          </p>
        </CCardBody>
      </CCard>
    </div>
  );
}

export default RecoverPasswordPage;