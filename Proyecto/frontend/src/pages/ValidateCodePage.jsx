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
import { useState, useEffect } from "react";

function ValidateCodePage() {
  const { register, handleSubmit } = useForm();
  const { validateRecoveryCode, errors } = useRecoverPassword();
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutos en segundos

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const onSubmit = async (data) => {
    try {
      await validateRecoveryCode(email, data.code);
      navigate("/reset-password", { state: { email, code: data.code } });
    } catch (error) {
      CustomToast(errors || "Código incorrecto, intente de nuevo", "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-100 p-4">
      <CCard className="w-full max-w-md shadow-lg bg-white">
        <CCardBody className="p-6">
          <CCardTitle className="text-center text-2xl font-bold text-blue-900 mb-4">
            Validar Código
          </CCardTitle>
          <CCardSubtitle className="text-center text-gray-600 mb-6">
            Ingresa el código que recibiste en tu correo electrónico.
          </CCardSubtitle>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="code">Código de Recuperación:</Label>
              <Input
                id="code"
                name="code"
                type="text"
                register={register}
                validation={{ required: "El código es obligatorio" }}
                placeholder="Ingresa el código"
                className="w-full"
              />
            </div>
            <p className="text-center text-sm text-gray-500">
              Tiempo restante: {minutes}:
              {seconds < 10 ? `0${seconds}` : seconds}
            </p>
            <BtnAccept type="submit" className="w-full">
              Validar Código
            </BtnAccept>
          </form>
        </CCardBody>
      </CCard>
    </div>
  );
}

export default ValidateCodePage;
