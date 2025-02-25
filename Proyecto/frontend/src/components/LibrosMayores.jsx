import { useEffect, useState } from "react";
import { usePeriodo } from "../context/PeriodoContext";
import { useForm } from "react-hook-form";
import {
  createTransaccionSchema,
  updateTransaccionSchema,
} from "../schemas/transaccion";
import { zodResolver } from "@hookform/resolvers/zod";
import DataTable from "react-data-table-component";
import "@coreui/coreui/dist/css/coreui.min.css";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CButton,
  CInputGroup,
  CInputGroupText,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import Label from "../components/ui/Label";
import Input from "../components/ui/Input";
import { ToastContainer } from "react-toastify";
import CustomToast from "./ui/CustomToast";
import { useTransaccion } from "../context/TransaccionContext";
import "../css/table.css";

export const LibrosMayores = () => {
  const { periodos, getPeriodos } = usePeriodo();
  const {
    transacciones,
    createTransaccion,
    getTransaccionesByPeriodo,
    updateTransaccion,
    deleteTransaccion,
  } = useTransaccion();

  const [records, setRecords] = useState([]);
  const [visible, setVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [currentTransaccion, setCurrentTransaccion] = useState(null);
  const [editVisible, setEditVisible] = useState(false);
  const [editTransaccion, setEditTransaccion] = useState(null);
  const [selectedPeriodo, setSelectedPeriodo] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getPeriodos();
  }, [getPeriodos]);

  useEffect(() => {
    if (selectedPeriodo) {
      getTransaccionesByPeriodo(selectedPeriodo);
    }
  }, [selectedPeriodo, getTransaccionesByPeriodo]);

  useEffect(() => {
    setRecords(transacciones);
  }, [transacciones]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(createTransaccionSchema) });

  const onSubmit = async (values) => {
    console.log("Valores del formulario:", values);
    try {
      await createTransaccion({ ...values, cod_periodo: selectedPeriodo });
      CustomToast("¡Transacción creada exitosamente!", "success");
      setVisible(false);
      reset();
    } catch (error) {
      CustomToast("Error al crear la transacción", "error");
    }
  };

  const handleEdit = (transaccion) => {
    setEditTransaccion(transaccion);
    setEditVisible(true);
  };

  const handleDelete = (transaccion) => {
    setCurrentTransaccion(transaccion);
    setDeleteVisible(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteTransaccion(currentTransaccion.cod_transaccion);
      CustomToast("¡Transacción eliminada exitosamente!", "success");
      setDeleteVisible(false);
    } catch (error) {
      CustomToast("Error al eliminar la transacción", "error");
    }
  };

  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    formState: { errors: editErrors },
    reset: resetEdit,
  } = useForm({ resolver: zodResolver(updateTransaccionSchema) });

  useEffect(() => {
    if (editTransaccion) {
      resetEdit(editTransaccion);
    }
  }, [editTransaccion, resetEdit]);

  const onSubmitEdit = async (values) => {
    try {
      await updateTransaccion(editTransaccion.cod_transaccion, values);
      CustomToast("¡Transacción actualizada exitosamente!", "success");
      setEditVisible(false);
    } catch (error) {
      CustomToast("Error al actualizar la transacción", "error");
    }
  };

  useEffect(() => {
    if (searchQuery) {
      const newData = transacciones.filter((row) => {
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
      setRecords(transacciones);
    }
  }, [transacciones, searchQuery]);

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

  // Verifica el estado del periodo seleccionado
  const estadoPeriodo = periodos.find(
    (periodo) => periodo.cod_periodo === Number(selectedPeriodo)
  )?.cod_estado;

  //console.log("selectedPeriodo:", selectedPeriodo);
  //console.log("estadoPeriodo:", estadoPeriodo);
  //console.log("periodos:", periodos);

  if (estadoPeriodo === 1) {
    columns.push({
      name: "Acciones",
      cell: (row) => (
        <div>
          <CButton
            color="warning"
            className="me-2"
            onClick={() => handleEdit(row)}
          >
            <FaEdit />
          </CButton>
          <CButton color="danger" onClick={() => handleDelete(row)}>
            <FaTrash />
          </CButton>
        </div>
      ),
    });
  }

  const handleFilter = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const newData = transacciones.filter((row) => {
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
        LIBRO MAYOR
      </h1>
      <CCard>
        {estadoPeriodo === 1 && (
          <CCardHeader>
            <div className="d-flex justify-content-end mt-1">
              <CInputGroup>
                <CInputGroupText>
                  <FaPlus />
                </CInputGroupText>

                <CButton
                  color="success"
                  style={{ color: "white" }}
                  onClick={() => setVisible(true)}
                  className="fw-bold"
                >
                  Agregar nueva transacción
                </CButton>
              </CInputGroup>
            </div>
          </CCardHeader>
        )}
        <CCardBody>
          <div className="mb-6 flex items-center space-x-4">
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
            noDataComponent="No hay transacciones para mostrar"
            style={{
              border: "1px solid #ddd", // Borde de la tabla
            }}
            customStyles={{
              cells: {
                style: {
                  border: "1px solid #ddd", // Borde de las celdas
                  padding: "8px", // Espaciado interno
                },
              },
              headCells: {
                style: {
                  backgroundColor: "#f2f2f2", // Fondo del encabezado
                  border: "1px solid #ddd", // Borde del encabezado
                },
              },
            }}
          />
        </CCardBody>
      </CCard>

      {/* Modal para crear nueva transacción */}
      <CModal
        backdrop="static"
        alignment="center"
        visible={visible}
        onClose={() => setVisible(false)}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <CModalHeader>
            <CModalTitle className="fw-bold">Nueva Transacción</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <div className="mt-2">
              <Label htmlFor="nro_cuenta">Número de cuenta</Label>
              <Input
                id="nro_cuenta"
                name="nro_cuenta"
                type="text"
                register={register}
                validation={{ required: true }}
              />
              {errors.nro_cuenta && (
                <p className="text-red-500">{errors.nro_cuenta.message}</p>
              )}
            </div>
            <div className="mt-2">
              <Label htmlFor="descripcion">Descripción</Label>
              <Input
                id="descripcion"
                name="descripcion"
                type="text"
                register={register}
                validation={{ required: true }}
              />
              {errors.descripcion && (
                <p className="text-red-500">La descripción es obligatoria</p>
              )}
            </div>
            <div className="mt-2">
              <Label htmlFor="debe">Debe</Label>
              <Input id="debe" name="debe" type="text" register={register} />
              {errors.debe && (
                <p className="text-red-500">{errors.debe.message}</p>
              )}
            </div>
            <div className="mt-2">
              <Label htmlFor="haber">Haber</Label>
              <Input id="haber" name="haber" type="text" register={register} />
              {errors.haber && (
                <p className="text-red-500">{errors.haber.message}</p>
              )}
            </div>
            <div className="mt-2">
              <Label htmlFor="saldo">Saldo</Label>
              <Input id="saldo" name="saldo" type="text" register={register} />
              {errors.saldo && (
                <p className="text-red-500">{errors.saldo.message}</p>
              )}
            </div>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)}>
              Cerrar
            </CButton>
            <CButton type="submit" color="primary">
              Guardar
            </CButton>
          </CModalFooter>
        </form>
      </CModal>

      {/* Modal de Edición */}
      <CModal
        backdrop="static"
        alignment="center"
        visible={editVisible}
        onClose={() => setEditVisible(false)}
      >
        <form onSubmit={handleSubmitEdit(onSubmitEdit)}>
          <CModalHeader>
            <CModalTitle className="fw-bold">Editar Transacción</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <div className="mt-2">
              <Label htmlFor="nro_cuenta">Número de cuenta</Label>
              <Input
                id="nro_cuenta"
                name="nro_cuenta"
                type="text"
                register={registerEdit}
                validation={{ required: true }}
              />
              {editErrors.nro_cuenta && (
                <p className="text-red-500">{editErrors.nro_cuenta.message}</p>
              )}
            </div>
            <div className="mt-2">
              <Label htmlFor="descripcion">Descripción</Label>
              <Input
                id="descripcion"
                name="descripcion"
                type="text"
                register={registerEdit}
                validation={{ required: true }}
              />
              {editErrors.descripcion && (
                <p className="text-red-500">La descripción es obligatoria</p>
              )}
            </div>
            <div className="mt-2">
              <Label htmlFor="debe">Debe</Label>
              <Input
                id="debe"
                name="debe"
                type="text"
                register={registerEdit}
                validation={{ required: true }}
              />
              {editErrors.debe && (
                <p className="text-red-500">El debe es obligatorio</p>
              )}
            </div>
            <div className="mt-2">
              <Label htmlFor="haber">Haber</Label>
              <Input
                id="haber"
                name="haber"
                type="text"
                register={registerEdit}
                validation={{ required: true }}
              />
              {editErrors.haber && (
                <p className="text-red-500">El haber es obligatorio</p>
              )}
            </div>
            <div className="mt-2">
              <Label htmlFor="saldo">Saldo</Label>
              <Input
                id="saldo"
                name="saldo"
                type="text"
                register={registerEdit}
                validation={{ required: true }}
              />
              {editErrors.saldo && (
                <p className="text-red-500">El saldo es obligatorio</p>
              )}
            </div>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setEditVisible(false)}>
              Cancelar
            </CButton>
            <CButton type="submit" color="primary">
              Guardar Cambios
            </CButton>
          </CModalFooter>
        </form>
      </CModal>

      {/* Modal para confirmar eliminación */}
      <CModal
        backdrop="static"
        alignment="center"
        visible={deleteVisible}
        onClose={() => setDeleteVisible(false)}
      >
        <CModalHeader>
          <CModalTitle className="fw-bold">Confirmar Eliminación</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>
            ¿Estás seguro de que deseas eliminar la transacción{" "}
            {currentTransaccion?.descripcion}?
          </p>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setDeleteVisible(false)}>
            Cancelar
          </CButton>
          <CButton color="danger" onClick={handleConfirmDelete}>
            Eliminar
          </CButton>
        </CModalFooter>
      </CModal>

      <ToastContainer />
    </>
  );
};

export default LibrosMayores;
