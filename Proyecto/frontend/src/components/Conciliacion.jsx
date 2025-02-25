import { useEffect, useState } from "react";
import { usePeriodo } from "../context/PeriodoContext";
import { useConciliacion } from "../context/ConciliacionContext";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CBadge,
  CButton,
} from "@coreui/react";
import { ToastContainer, toast } from "react-toastify";
import { ImWarning } from "react-icons/im"; // Icono para warning
import { FaCheck } from "react-icons/fa"; // Icono para éxito
import { RiCloseLargeFill } from "react-icons/ri"; // Icono para peligro

export const Conciliacion = () => {
  const { periodos, getPeriodos } = usePeriodo();
  const { conciliaciones, verificarConciliacion, realizarConciliacion } =
    useConciliacion();

  const [records, setRecords] = useState([]);
  const [selectedPeriodo, setSelectedPeriodo] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showRealizarConciliacion, setShowRealizarConciliacion] =
    useState(false);

  // Obtener los períodos al cargar el componente
  useEffect(() => {
    getPeriodos();
  }, [getPeriodos]);

  // Verificar si hay datos de conciliación cuando se selecciona un período
  useEffect(() => {
    if (selectedPeriodo) {
      verificarConciliacion(selectedPeriodo).then((data) => {
        if (!data.existeDatos) {
          setShowRealizarConciliacion(true); // Mostrar opción de realizar conciliación
        } else {
          setShowRealizarConciliacion(false);
          setRecords(data.conciliaciones); // Mostrar las conciliaciones existentes
        }
      });
    }
  }, [selectedPeriodo, verificarConciliacion]);

  // Filtrar los registros según la búsqueda
  useEffect(() => {
    if (searchQuery) {
      const newData = conciliaciones.filter((row) => {
        return (
          row.nro_cuenta.toLowerCase().includes(searchQuery) ||
          row.descripcion.toLowerCase().includes(searchQuery) ||
          row.banco_debe.toString().includes(searchQuery) ||
          row.banco_haber.toString().includes(searchQuery) ||
          row.libro_debe.toString().includes(searchQuery) ||
          row.libro_haber.toString().includes(searchQuery) ||
          row.sistema.toString().includes(searchQuery) ||
          row.auditor.toString().includes(searchQuery)
        );
      });
      setRecords(newData);
    } else {
      setRecords(conciliaciones);
    }
  }, [searchQuery, conciliaciones]);

  // Función para realizar la conciliación
  const handleRealizarConciliacion = async () => {
    try {
      // Lógica para obtener las transacciones (puedes obtenerlas de otro contexto o API)
      const transacciones = []; // Aquí debes obtener las transacciones
      await realizarConciliacion(selectedPeriodo, transacciones);
      toast.success("Conciliación realizada exitosamente");
    } catch (error) {
      toast.error("Error al realizar la conciliación");
    }
  };

  // Función para manejar la búsqueda
  const handleFilter = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const newData = conciliaciones.filter((row) => {
      return (
        row.nro_cuenta.toLowerCase().includes(query) ||
        row.descripcion.toLowerCase().includes(query) ||
        row.banco_debe.toString().includes(query) ||
        row.banco_haber.toString().includes(query) ||
        row.libro_debe.toString().includes(query) ||
        row.libro_haber.toString().includes(query) ||
        row.sistema.toString().includes(query) ||
        row.auditor.toString().includes(query)
      );
    });

    setRecords(newData);
  };

  return (
    <>
      <h1 className="mb-4 text-xl md:text-2xl font-bold text-center">
        CONCILIACIÓN BANCARIA
      </h1>
      <CCard>
        <CCardHeader>
          <div className="flex items-center space-x-4">
            <h3 className="text-lg font-semibold text-gray-700">Periodos</h3>
            <div className="flex items-center space-x-2">
              <select
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                value={selectedPeriodo}
                onChange={(e) => setSelectedPeriodo(e.target.value)}
              >
                <option value="">-- Selecciona un periodo --</option>
                {periodos.map((periodo) => (
                  <option key={periodo.cod_periodo} value={periodo.cod_periodo}>
                    {periodo.nombre_periodo}
                  </option>
                ))}
              </select>
              {showRealizarConciliacion && (
                <CButton color="primary" onClick={handleRealizarConciliacion}>
                  Realizar Conciliación
                </CButton>
              )}
            </div>
          </div>
        </CCardHeader>
        <CCardBody>
          <div className="d-flex justify-content-end mb-2">
            <div className="input-group" style={{ width: "auto" }}>
              <span className="input-group-text">Buscar:</span>
              <input
                type="text"
                onChange={handleFilter}
                className="form-control"
                style={{ minWidth: "150px", maxWidth: "250px" }}
              />
            </div>
          </div>
          <CTable striped bordered responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell
                  rowSpan={2}
                  style={{ verticalAlign: "middle", textAlign: "center" }}
                >
                  Número de cuenta
                </CTableHeaderCell>
                <CTableHeaderCell
                  rowSpan={2}
                  style={{ verticalAlign: "middle", textAlign: "center" }}
                >
                  Descripción
                </CTableHeaderCell>
                <CTableHeaderCell
                  colSpan={2}
                  style={{ verticalAlign: "middle", textAlign: "center" }}
                >
                  Banco
                </CTableHeaderCell>
                <CTableHeaderCell
                  colSpan={2}
                  style={{ verticalAlign: "middle", textAlign: "center" }}
                >
                  Libro
                </CTableHeaderCell>
                <CTableHeaderCell
                  rowSpan={2}
                  style={{ verticalAlign: "middle", textAlign: "center" }}
                >
                  Sistema
                </CTableHeaderCell>
                <CTableHeaderCell
                  rowSpan={2}
                  style={{ verticalAlign: "middle", textAlign: "center" }}
                >
                  Auditor
                </CTableHeaderCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell
                  style={{ verticalAlign: "middle", textAlign: "center" }}
                >
                  Debe
                </CTableHeaderCell>
                <CTableHeaderCell
                  style={{ verticalAlign: "middle", textAlign: "center" }}
                >
                  Haber
                </CTableHeaderCell>
                <CTableHeaderCell
                  style={{ verticalAlign: "middle", textAlign: "center" }}
                >
                  Debe
                </CTableHeaderCell>
                <CTableHeaderCell
                  style={{ verticalAlign: "middle", textAlign: "center" }}
                >
                  Haber
                </CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {records.length > 0 ? (
                records.map((row, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell
                      style={{ verticalAlign: "middle", textAlign: "center" }}
                    >
                      {row.nro_cuenta}
                    </CTableDataCell>
                    <CTableDataCell
                      style={{ verticalAlign: "middle", textAlign: "center" }}
                    >
                      {row.descripcion}
                    </CTableDataCell>
                    <CTableDataCell
                      style={{ verticalAlign: "middle", textAlign: "center" }}
                    >
                      {row.banco_debe}
                    </CTableDataCell>
                    <CTableDataCell
                      style={{ verticalAlign: "middle", textAlign: "center" }}
                    >
                      {row.banco_haber}
                    </CTableDataCell>
                    <CTableDataCell
                      style={{ verticalAlign: "middle", textAlign: "center" }}
                    >
                      {row.libro_debe}
                    </CTableDataCell>
                    <CTableDataCell
                      style={{ verticalAlign: "middle", textAlign: "center" }}
                    >
                      {row.libro_haber}
                    </CTableDataCell>
                    <CTableDataCell
                      style={{ verticalAlign: "middle", textAlign: "center" }}
                    >
                      {row.sistema === false ? (
                        <CBadge color="warning">
                          <ImWarning />
                        </CBadge>
                      ) : (
                        <CBadge color="success">
                          <FaCheck />
                        </CBadge>
                      )}
                    </CTableDataCell>
                    <CTableDataCell
                      style={{ verticalAlign: "middle", textAlign: "center" }}
                    >
                      {row.auditor === null ? (
                        <CBadge color="info">En proceso</CBadge>
                      ) : row.auditor === true ? (
                        <CBadge color="success">
                          <FaCheck />
                        </CBadge>
                      ) : (
                        <CBadge color="danger">
                          <RiCloseLargeFill />
                        </CBadge>
                      )}
                    </CTableDataCell>
                  </CTableRow>
                ))
              ) : (
                <CTableRow>
                  <CTableDataCell
                    colSpan={7}
                    style={{ verticalAlign: "middle", textAlign: "center" }}
                  >
                    No hay conciliaciones para mostrar
                  </CTableDataCell>
                </CTableRow>
              )}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>

      <ToastContainer />
    </>
  );
};

export default Conciliacion;
