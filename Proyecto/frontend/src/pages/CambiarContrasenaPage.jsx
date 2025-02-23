import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Label from "../components/ui/Label";
import Input from "../components/ui/Input";
import BtnSuccess from "../components/ui/BtnSuccess";
import ErrorMessages from "../components/ui/ErrorMessages";

function CambiarContrasenaPage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { user, cambiarContrasena, errors } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    await cambiarContrasena(user.cod_usuario, newPassword);
    navigate("/"); // Redirige al usuario a la página principal después de cambiar la contraseña
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Cambiar Contraseña
        </h2>
        <ErrorMessages errors={errors} />
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="newPassword">Nueva Contraseña</Label>
            <Input
              id="newPassword"
              name="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <BtnSuccess type="submit">Cambiar Contraseña</BtnSuccess>
        </form>
      </div>
    </div>
  );
}

export default CambiarContrasenaPage;
