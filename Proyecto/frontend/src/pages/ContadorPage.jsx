import { useState } from "react";
import RetractingSideBarContador from "../components/RetractingSideBarContador";
import Dashboard from "../components/Dashboard";
import { LibrosMayores } from "../components/LibrosMayores";
import EditPerfil from "../components/EditPerfil";
import ExtractosBancarios from "../components/ExtractosBancarios";
import RegisterPeriodo from "../components/RegisterPeriodo";
import Conciliacion from "../components/Conciliacion";

const componentMap = {
  Dashboard: () => <Dashboard />,
  Periodos: () => <RegisterPeriodo />,
  "Libros mayores": () => <LibrosMayores />,
  "Extractos Bancarios": () => <ExtractosBancarios />,
  Conciliaciones: () => <Conciliacion />,
  Perfil: () => <EditPerfil />,
  "/": () => <div>Logout</div>,
};

function ContadorPage() {
  const [component, setComponent] = useState("Dashboard");

  const renderComponent = () => {
    const ComponentToRender =
      componentMap[component] || (() => <div>Not Found</div>);
    // Pass setErrors as a prop if the component needs it
    return <ComponentToRender />;
  };

  return (
    <div className="flex">
      <RetractingSideBarContador setComponent={setComponent} />
      <div className="flex-grow p-4 bg-gray-100 min-h-screen">
        {renderComponent()}
      </div>
    </div>
  );
}

export default ContadorPage;
