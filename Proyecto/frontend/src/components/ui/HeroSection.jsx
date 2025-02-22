import { CRow, CCol, CButton } from "@coreui/react";

export const HeroSection = ({ onLogin }) => {
  return (
    <CRow className="text-center p-5 bg-light">
      <CCol md={12}>
        <h1 className="display-4">📚 Bienvenido a la Plataforma Educativa</h1>
        <p className="lead">
          Gestiona evaluaciones, calificaciones, foros y actividades de manera eficiente.
        </p>
        <CButton color="primary" size="lg" className="mt-3" onClick={onLogin}>
          🚀 Iniciar Sesión
        </CButton>
      </CCol>
    </CRow>
  );
};

export default HeroSection;