import { useState, useEffect } from "react";
import { useToken } from "../context/ConfiguracionTokenContext";
import { ToastContainer, toast } from "react-toastify"; // Importar toast
import CustomToast from "./ui/CustomToast";
import { CForm, CFormInput, CFormLabel, CButton, CAlert } from "@coreui/react";
import { z } from "zod"; // Importar Zod

// Esquema de validación con Zod
const expiresInSchema = z.string().refine((value) => {
  // Validar que el valor sea un número seguido de 'h', 'd' o 'm'
  const regex = /^\d+[hdm]$/;
  return regex.test(value);
}, {
  message: "Formato inválido. Usa '1h', '2d' o '30m'.",
});

export function ConfiguracionToken() {
  const {
    token,
    errors,
    obtenerConfiguracionToken,
    actualizarConfiguracionToken,
  } = useToken();
  const [expiresIn, setExpiresIn] = useState("");

  // Obtener la configuración del token al cargar el componente
  useEffect(() => {
    obtenerConfiguracionToken();
  }, []);

  // Actualizar el estado local cuando cambia el token
  useEffect(() => {
    if (token) {
      setExpiresIn(token.expiresIn);
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validar el campo expiresIn con Zod
      expiresInSchema.parse(expiresIn);

      // Si la validación es exitosa, actualizar el token
      const success = await actualizarConfiguracionToken(expiresIn);
      if (success) {
        CustomToast("¡Tiempo de expiración del token actualizado!", "success");
      }
    } catch (error) {
      // Si hay un error de validación, mostrarlo en un toast
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          //CustomToast(err.message, "warning");
          toast.warning(err.message); // Mostrar cada mensaje de error en un toast
        });
      } else {
        toast.error("Error al actualizar el tiempo de expiración."); // Error genérico
      }
    }
  };

  return (
    <>
      <div className="p-4 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Configuración del Token</h1>
        <CForm onSubmit={handleSubmit}>
          <div className="mb-4">
            <CFormLabel className="block text-sm font-medium text-gray-700">
              Tiempo de expiración:
            </CFormLabel>
            <CFormInput
              type="text"
              value={expiresIn}
              onChange={(e) => setExpiresIn(e.target.value)}
              className="mt-1 block w-64 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Ejemplo: 1h, 2d, 30m"
            />
            <p className="text-sm text-gray-500 mt-2">
              Ingresa el tiempo de expiración en formato de horas (h), días (d) o minutos (m). Ejemplo: 1h para 1 hora, 2d para 2 días, 30m para 30 minutos.
            </p>
          </div>
          <CButton
            type="submit"
            color="primary"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
          >
            Actualizar
          </CButton>
        </CForm>
        {errors.length > 0 && (
          <div className="mt-4">
            {errors.map((error, index) => (
              <CAlert key={index} color="danger" className="mb-2">
                {error}
              </CAlert>
            ))}
          </div>
        )}
      </div>
      <ToastContainer />
    </>
  );
}

export default ConfiguracionToken;