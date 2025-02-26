import { useState } from "react";
import RetractingSideBarJefeContador from "../components/RetractingSideBarJefeContador";
import Dashboard from "../components/Dashboard";
import EditPerfil from "../components/EditPerfil";
import Conciliacion from "../components/Conciliacion";

const componentMap = {
  //Dashboard: () => <Dashboard />,
  Conciliaciones: () => <Conciliacion />,
  Perfil: () => <EditPerfil />,
  "/": () => <div>Logout</div>,
};

function JefeContadorPage() {
  const [component, setComponent] = useState("Dashboard");

  const renderComponent = () => {
    const ComponentToRender =
      componentMap[component] || (() => <div>Not Found</div>);
    // Pass setErrors as a prop if the component needs it
    return <ComponentToRender />;
  };

  return (
    <div className="flex">
      <RetractingSideBarJefeContador setComponent={setComponent} />
      <div className="flex-grow p-4 bg-gray-100 min-h-screen">
        {renderComponent()}
      </div>
    </div>
  );
}

export default JefeContadorPage;
