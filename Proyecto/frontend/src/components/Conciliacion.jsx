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
import "react-toastify/dist/ReactToastify.css";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { ImWarning } from "react-icons/im"; // Icono para warning
import { FaCheck } from "react-icons/fa"; // Icono para éxito
import { RiCloseLargeFill } from "react-icons/ri"; // Icono para peligro

export const Conciliacion = () => {
  const { periodos, getPeriodos } = usePeriodo();
  const {
    verificarConciliacion,
    realizarConciliacion,
    actualizarConciliacion,
  } = useConciliacion();

  const [records, setRecords] = useState([]);
  const [selectedPeriodo, setSelectedPeriodo] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showRealizarConciliacion, setShowRealizarConciliacion] =
    useState(false);
  const [showActualizarConciliacion, setShowActualizarConciliacion] =
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
          setShowActualizarConciliacion(false);
        } else {
          setShowRealizarConciliacion(false);
          setShowActualizarConciliacion(true);
          setRecords(data.conciliaciones); // Mostrar las conciliaciones existentes
        }
      });
    }
  }, [selectedPeriodo, verificarConciliacion]);

  // Filtrar los registros según la búsqueda
  useEffect(() => {
    if (searchQuery) {
      const newData = records.filter((row) => {
        return (
          row.nro_cuenta.toLowerCase().includes(searchQuery) ||
          row.descripcion.toLowerCase().includes(searchQuery) ||
          row.banco_debe.toString().includes(searchQuery) ||
          row.banco_haber.toString().includes(searchQuery) ||
          row.libro_debe.toString().includes(searchQuery) ||
          row.libro_haber.toString().includes(searchQuery) ||
          row.sistema.toString().includes(searchQuery) ||
          row.auditor?.toString().includes(searchQuery)
        );
      });
      setRecords(newData);
    }
  }, [searchQuery, records]);

  // Función para realizar la conciliación
  const handleRealizarConciliacion = async () => {
    try {
      await realizarConciliacion(selectedPeriodo);
      toast.success("Conciliación realizada exitosamente");
      setShowRealizarConciliacion(false);
      setShowActualizarConciliacion(true);
    } catch (error) {
      toast.error("Error al realizar la conciliación");
    }
  };

  // Función para actualizar la conciliación
  const handleActualizarConciliacion = async () => {
    try {
      await actualizarConciliacion(selectedPeriodo);
      toast.success("Conciliación actualizada exitosamente");
    } catch (error) {
      toast.error("Error al actualizar la conciliación");
    }
  };

  // Función para manejar la búsqueda
  const handleFilter = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
  };

  // Verifica el estado del periodo seleccionado
  const estadoPeriodo = periodos.find(
    (periodo) => periodo.cod_periodo === Number(selectedPeriodo)
  )?.cod_estado;

  return (
    <div>
      <h1 className="mb-4 text-xl md:text-2xl font-bold text-center">
        CONCILIACIÓN
      </h1>
      <CCard>
        <CCardBody>
          {/* Selector de período */}
          <div className="flex items-center space-x-4">
            <h3 className="text-lg font-semibold text-gray-700">Periodos</h3>
            <div className="flex items-center space-x-2">
              <select
                id="periodo"
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
            </div>
          </div>

          {/* Botones de acción */}
          {showRealizarConciliacion && (
            <CButton color="primary" onClick={handleRealizarConciliacion}>
              Realizar Conciliación
            </CButton>
          )}
          {showActualizarConciliacion && estadoPeriodo === 1 && (
            <CButton color="success" onClick={handleActualizarConciliacion}>
              Actualizar Conciliación
            </CButton>
          )}
          {showActualizarConciliacion && estadoPeriodo === 2 && (
            <CButton color="success" onClick={handleActualizarConciliacion}>
              Aprobar Conciliación
            </CButton>
          )}
          {showActualizarConciliacion && estadoPeriodo === 2 && (
            <CButton color="danger" onClick={handleActualizarConciliacion}>
              Reprobar Conciliación
            </CButton>
          )}
          {/* Barra de búsqueda */}
          <div className="d-flex justify-content-end mb-2">
            <div className="input-group" style={{ width: "auto" }}>
              <span className="input-group-text">Buscar:</span>
              <input
                type="text"
                value={searchQuery}
                onChange={handleFilter}
                className="form-control"
                style={{ minWidth: "150px", maxWidth: "250px" }}
              />
            </div>
          </div>

          {/* Tabla de conciliaciones */}
          <CTable striped hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Número de cuenta</CTableHeaderCell>
                <CTableHeaderCell>Descripción</CTableHeaderCell>
                <CTableHeaderCell>Banco Debe</CTableHeaderCell>
                <CTableHeaderCell>Banco Haber</CTableHeaderCell>
                <CTableHeaderCell>Libro Debe</CTableHeaderCell>
                <CTableHeaderCell>Libro Haber</CTableHeaderCell>
                <CTableHeaderCell>Sistema</CTableHeaderCell>
                <CTableHeaderCell>Auditor</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {records.length > 0 ? (
                records.map((row, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell>{row.nro_cuenta}</CTableDataCell>
                    <CTableDataCell>{row.descripcion}</CTableDataCell>
                    <CTableDataCell>{row.banco_debe}</CTableDataCell>
                    <CTableDataCell>{row.banco_haber}</CTableDataCell>
                    <CTableDataCell>{row.libro_debe}</CTableDataCell>
                    <CTableDataCell>{row.libro_haber}</CTableDataCell>
                    <CTableDataCell>
                      {row.sistema === false ? (
                        <CBadge color="success">
                          <FaCheck />
                        </CBadge>
                      ) : (
                        <CBadge color="warning">
                          <IoMdInformationCircleOutline />
                        </CBadge>
                      )}
                    </CTableDataCell>
                    <CTableDataCell>
                      {row.auditor === null ? (
                        <CBadge color="info">En proceso</CBadge>
                      ) : row.auditor === true ? (
                        <CBadge color="success">Aprobado</CBadge>
                      ) : (
                        <CBadge color="danger">Rechazado</CBadge>
                      )}
                    </CTableDataCell>
                  </CTableRow>
                ))
              ) : (
                <CTableRow>
                  <CTableDataCell colSpan="8" className="text-center">
                    No hay conciliaciones para mostrar
                  </CTableDataCell>
                </CTableRow>
              )}
            </CTableBody>
          </CTable>
        </CCardBody>
        <ToastContainer />
      </CCard>
    </div>
  );
};

export default Conciliacion;
