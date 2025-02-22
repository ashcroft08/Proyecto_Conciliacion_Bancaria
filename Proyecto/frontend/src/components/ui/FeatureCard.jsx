import { CCol, CCard, CCardBody, CCardHeader } from "@coreui/react";

export const FeatureCard = ({ icon, title, description }) => {
  return (
    <CCol md={4} className="mb-4">
      <CCard className="shadow-lg text-center">
        <CCardHeader>
          <h2>{icon} {title}</h2>
        </CCardHeader>
        <CCardBody>
          <p>{description}</p>
        </CCardBody>
      </CCard>
    </CCol>
  );
};

export default FeatureCard;
