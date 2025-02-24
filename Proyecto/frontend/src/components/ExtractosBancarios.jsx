import { useEffect, useState } from "react";
import { usePeriodo } from "../context/PeriodoContext";
import DataTable from "react-data-table-component";
import "@coreui/coreui/dist/css/coreui.min.css";
import { CCard, CCardBody, CCardHeader } from "@coreui/react";
import { ToastContainer } from "react-toastify";
import { useBanco } from "../context/BancoContext";

export const ExtractosBancarios = () => {
  const { periodos, getPeriodos } = usePeriodo();
  const { bancoTransacciones, getBancoTransaccionesByPeriodo } = useBanco();

  const [records, setRecords] = useState([]);
  const [selectedPeriodo, setSelectedPeriodo] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getPeriodos();
  }, [getPeriodos]);

  useEffect(() => {
    if (selectedPeriodo) {
      getBancoTransaccionesByPeriodo(selectedPeriodo);
    }
  }, [selectedPeriodo, getBancoTransaccionesByPeriodo]);

  useEffect(() => {
    setRecords(bancoTransacciones);
  }, [bancoTransacciones]);

  useEffect(() => {
    if (searchQuery) {
      const newData = bancoTransacciones.filter((row) => {
        return (
          row.nro_cuenta.toLowerCase().includes(searchQuery) ||
          row.descripcion.toLowerCase().includes(searchQuery) ||
          row.debe.toString().includes(searchQuery) ||
          row.haber.toString().includes(searchQuery) ||
          row.saldo.toString().includes(searchQuery)
        );
      });
      setRecords(newData);
    } else {
      setRecords(bancoTransacciones);
    }
  }, [bancoTransacciones, searchQuery]);

  const columns = [
    {
      name: "Número de cuenta",
      selector: (row) => row.nro_cuenta,
      sortable: true,
    },
    {
      name: "Descripción",
      selector: (row) => row.descripcion,
      sortable: true,
    },
    {
      name: "Debe",
      selector: (row) => row.debe,
      sortable: true,
    },
    {
      name: "Haber",
      selector: (row) => row.haber,
      sortable: true,
    },
    {
      name: "Saldo",
      selector: (row) => row.saldo,
      sortable: true,
    },
  ];

  const handleFilter = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const newData = bancoTransacciones.filter((row) => {
      return (
        row.nro_cuenta.toLowerCase().includes(query) ||
        row.descripcion.toLowerCase().includes(query) ||
        row.debe.toString().includes(query) ||
        row.haber.toString().includes(query) ||
        row.saldo.toString().includes(query)
      );
    });

    setRecords(newData);
  };

  const paginationComponentOptions = {
    rowsPerPageText: "Filas por página:",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };

  return (
    <>
      <h1 className="mb-4 text-xl md:text-2xl font-bold text-center">
        EXTRACTO BANCARIO
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
                style={{ minWidth: "150px", maxWidth: "250px" }} // Aumenta el ancho aquí
              />
            </div>
          </div>
          <DataTable
            columns={columns}
            data={records}
            pagination
            paginationComponentOptions={paginationComponentOptions}
            noDataComponent="No hay transacciones del banco para mostrar"
          />
        </CCardBody>
      </CCard>

      <ToastContainer />
    </>
  );
};

export default ExtractosBancarios;
