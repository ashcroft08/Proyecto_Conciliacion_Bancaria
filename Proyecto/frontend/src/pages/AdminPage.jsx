import { useState } from "react";
import RetractingSideBarAdmin from "../components/RetractingSideBarAdmin";
import Dashboard from "../components/Dashboard";
import { RegisterAdmin } from "../components/RegisterAdmin";
import { RegisterGerente } from "../components/RegisterGerente";
import { RegisterAuditor } from "../components/RegisterAuditor";
import { RegisterJefeContador } from "../components/RegisterJefeContador";
import { RegisterContador } from "../components/RegisterContador";
import EditPerfil from "../components/EditPerfil";
import { ConfiguracionToken } from "../components/ConfiguracionToken";

const componentMap = {
  Dashboard: () => <Dashboard />,
  Administradores: () => <RegisterAdmin />,
  Gerente: () => <RegisterGerente />,
  Auditor: () => <RegisterAuditor />, // Receive setErrors as a prop
  "Jefe contable": () => <RegisterJefeContador />,
  Contadores: () => <RegisterContador/>,
  "Configuración token": () => <ConfiguracionToken />,
  Perfil: () => <EditPerfil />,
  "/": () => <div>Logout</div>,
};

function AdminPage() {
  const [component, setComponent] = useState("Dashboard");

  const renderComponent = () => {
    const ComponentToRender =
      componentMap[component] || (() => <div>Not Found</div>);
    // Pass setErrors as a prop if the component needs it
    return <ComponentToRender />;
  };

  return (
    <div className="flex">
      <RetractingSideBarAdmin setComponent={setComponent} />
      <div className="flex-grow p-4 bg-gray-100 min-h-screen">
        {renderComponent()}
      </div>
    </div>
  );
}

export default AdminPage;
