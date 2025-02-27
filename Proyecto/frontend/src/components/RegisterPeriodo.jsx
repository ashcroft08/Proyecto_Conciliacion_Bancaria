import { useEffect, useRef, useState } from "react";
import { usePeriodo } from "../context/PeriodoContext";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { periodoSchema, updateperiodoSchema } from "../schemas/periodo";
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
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa"; // Importar iconos
import Label from "../components/ui/Label";
import Input from "../components/ui/Input";
import { ToastContainer } from "react-toastify";
import CustomToast from "./ui/CustomToast";
import { IoArchive } from "react-icons/io5";
import { RiInboxUnarchiveLine } from "react-icons/ri";

export const RegisterPeriodo = () => {
  const {
    periodos,
    getPeriodos,
    getPeriodoById,
    updatePeriodo,
    archivarPeriodo,
    desarchivarPeriodo,
    deletePeriodo,
  } = usePeriodo();
  const { user } = useAuth();
  const [records, setRecords] = useState([]);
  const [visible, setVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [archiveVisible, setArchiveVisible] = useState(false);
  const [unarchiveVisible, setUnarchiveVisible] = useState(false);
  const [currentPeriodo, setCurrentPeriodo] = useState(null);
  const hasFetchedPeriodos = useRef(false);
  const [editVisible, setEditVisible] = useState(false);
  const [editPeriodo, setEditPeriodo] = useState(null);

  // Cargar usuarios inicialmente
  useEffect(() => {
    const fetchPeriodos = async () => {
      if (!hasFetchedPeriodos.current) {
        // Solo llama a la API si no se ha hecho antes
        await getPeriodos();
        hasFetchedPeriodos.current = true; // Marca que ya se han obtenido los usuarios
      }
    };
    fetchPeriodos();
  }, [getPeriodos]); // Solo se ejecuta una vez al montar el componente

  // Actualiza los registros cuando 'periodos' cambie
  useEffect(() => {
    setRecords(periodos); // Inicializa los registros con los usuarios obtenidos
  }, [periodos]); // Solo se ejecuta cuando 'periodos' cambia

  const {
    register,
    handleSubmit,
    formState: { errors }, // Renombrar para evitar confusión
    reset,
  } = useForm({ resolver: zodResolver(periodoSchema) });

  const { createPeriodo, errors: registerErrors } = usePeriodo(); // Obtén los errores

  const onSubmit = async (values) => {
    console.log("Datos enviados:", values); // Verifica que los datos sean correctos
    const success = await createPeriodo(values);
    if (success) {
      CustomToast("¡Periodo registrado exitosamente!", "success");
      setVisible(false);
      await getPeriodos();
      reset();
    } else {
      console.log("Error al registrar usuario.");
    }
  };

  const handleCloseEdit = () => {
    setEditVisible(false);
    setEditPeriodo(null); // Limpiar usuario
    resetEdit(); // Resetear formulario
  };

  // Formulario de edición
  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    formState: { errors: editErrors },
    reset: resetEdit,
  } = useForm({ resolver: zodResolver(updateperiodoSchema) });

  // Cargar datos del usuario a editar
  useEffect(() => {
    if (editPeriodo) {
      resetEdit(editPeriodo);
    }
  }, [editPeriodo, resetEdit]);

  // Manejar edición
  const handleEdit = async (periodo) => {
    try {
      const periodoData = await getPeriodoById(periodo.cod_periodo);
      console.log("Datos del usuario a editar:", periodoData); // Verifica los datos
      setEditPeriodo(periodoData);
      setEditVisible(true);
    } catch (error) {
      console.error("Error al obtener datos del usuario:", error);
    }
  };

  // Enviar edición
  const onSubmitEdit = async (values) => {
    try {
      const success = await updatePeriodo(editPeriodo.cod_periodo, values);
      if (success) {
        CustomToast("¡Periodo actualizado exitosamente!", "success");
        setEditVisible(false);
        await getPeriodos(); // Actualizar lista
      }
    } catch (error) {
      CustomToast(
        error.response?.data?.message || "Error al actualizar",
        "error"
      );
    }
  };

  const handleDelete = (periodo) => {
    setCurrentPeriodo(periodo);
    setDeleteVisible(true);
  };

  const handleConfirmDelete = async () => {
    const success = await deletePeriodo(currentPeriodo.cod_periodo); // Esperar a que deletePeriodo se complete
    if (success) {
      // Solo mostrar el mensaje de éxito si la eliminación fue exitosa
      CustomToast("¡Periodo eliminado exitosamente!", "success");
      setDeleteVisible(false);
      await getPeriodos();
    }
    setDeleteVisible(false);
  };

  //Archivar
  const handleArchivar = (periodo) => {
    setCurrentPeriodo(periodo);
    setArchiveVisible(true);
  };

  const handleConfirmArchivar = async () => {
    const success = await archivarPeriodo(currentPeriodo.cod_periodo); // Esperar a que deletePeriodo se complete
    if (success) {
      // Solo mostrar el mensaje de éxito si la eliminación fue exitosa
      CustomToast("¡Periodo archivado exitosamente!", "success");
      setArchiveVisible(false);
      await getPeriodos();
    }
    setArchiveVisible(false);
  };

  //Desarchivar
  const handleDesarchivar = (periodo) => {
    setCurrentPeriodo(periodo);
    setUnarchiveVisible(true);
  };

  const handleConfirmDesarchivar = async () => {
    const success = await desarchivarPeriodo(currentPeriodo.cod_periodo); // Esperar a que deletePeriodo se complete
    if (success) {
      // Solo mostrar el mensaje de éxito si la eliminación fue exitosa
      CustomToast("¡Periodo desarchivado exitosamente!", "success");
      setUnarchiveVisible(false);
      await getPeriodos();
    }
    setUnarchiveVisible(false);
  };

  const columns = [
    {
      name: "Nombre del periodo",
      selector: (row) => row.nombre_periodo,
      sortable: true,
    },
    {
      name: "Fecha inicio",
      selector: (row) => row.fecha_inicio,
      sortable: true,
    },
    {
      name: "Fecha fin",
      selector: (row) => row.fecha_fin,
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <>
          {/* Botón de Editar */}
          <CButton
            color="warning"
            className="me-2"
            onClick={() => handleEdit(row)}
          >
            <FaEdit />
          </CButton>

          {/* Botón de Eliminar */}
          <CButton
            color="danger"
            className="me-2"
            onClick={() => handleDelete(row)}
          >
            <FaTrash />
          </CButton>

          {/* Botón de Archivar/Desarchivar según cod_estado */}
          {user?.cod_rol === 3 && row.cod_estado === 1 && (
            <CButton
              color="primary"
              className="me-2"
              onClick={() => handleArchivar(row)}
            >
              <IoArchive />
            </CButton>
          )}

          {user?.cod_rol === 3 && row.cod_estado === 2 && (
            <CButton color="info" onClick={() => handleDesarchivar(row)}>
              <RiInboxUnarchiveLine />
            </CButton>
          )}
        </>
      ),
    },
  ];

  const handleFilter = (event) => {
    const query = event.target.value.toLowerCase();
    const newData = periodos.filter((row) => {
      return (
        row.nombre_periodo.toLowerCase().includes(query) ||
        row.fecha_inicio.toLowerCase().includes(query) ||
        row.fecha_fin.toLowerCase().includes(query)
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
        PERIODOS CONTABLES
      </h1>
      <CCard>
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
                Crear nuevo periodo
              </CButton>
            </CInputGroup>
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
            noDataComponent="No hay registros para mostrar"
          />
        </CCardBody>

        {/* Modal para crear nuevo periodo */}
        <CModal
          backdrop="static"
          alignment="center"
          visible={visible}
          onClose={() => setVisible(false)}
          aria-labelledby="VerticallyCenteredExample"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <CModalHeader>
              <CModalTitle id="VerticallyCenteredExample" className="fw-bold">
                Crear Periodo
              </CModalTitle>
            </CModalHeader>
            <CModalBody>
              {registerErrors.length > 0 && (
                <div className="bg-red-500 p-2 text-white mb-4 rounded">
                  {registerErrors.map((error, i) => (
                    <p key={i}>{error}</p>
                  ))}
                </div>
              )}
              <div className="mt-2">
                <Label htmlFor="nombre_periodo">Nombre del periodo</Label>
                <Input
                  id="nombre_periodo"
                  name="nombre_periodo"
                  type="text"
                  register={register}
                  validation={{ required: true }}
                />
                {errors.nombre_periodo && (
                  <p className="text-red-500">El periodo es obligatorio</p>
                )}
              </div>
              <div className="mt-2">
                <Label htmlFor="fecha_inicio">Fecha inicio</Label>
                <Input
                  id="fecha_inicio"
                  name="fecha_inicio"
                  type="date"
                  register={register}
                  validation={{ required: true }}
                />
                {errors.fecha_inicio && (
                  <p className="text-red-500">{errors.fecha_inicio.message}</p>
                )}
              </div>
              <div className="mt-2">
                <Label htmlFor="fecha_fin">Fecha fin</Label>
                <Input
                  id="fecha_fin"
                  name="fecha_fin"
                  type="date"
                  register={register}
                  validation={{ required: true }}
                />
                {errors.fecha_fin && (
                  <p className="text-red-500">{errors.fecha_fin.message}</p>
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
          onClose={handleCloseEdit} // Usar el nuevo handler
          aria-labelledby="EditModal"
        >
          <form onSubmit={handleSubmitEdit(onSubmitEdit)}>
            <CModalHeader>
              <CModalTitle className="fw-bold">Editar Periodo</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <div className="mt-2">
                <Label htmlFor="nombre_periodo">Nombre del periodo</Label>
                <Input
                  id="nombre_periodo"
                  name="nombre_periodo"
                  type="text"
                  register={registerEdit}
                  validation={{ required: true }}
                />
                {editErrors.nombre_periodo && (
                  <p className="text-red-500">El periodo es obligatorio</p>
                )}
              </div>
              <div className="mt-2">
                <Label htmlFor="fecha_inicio">Fecha inicio</Label>
                <Input
                  id="fecha_inicio"
                  name="fecha_inicio"
                  type="date"
                  register={registerEdit}
                  validation={{ required: true }}
                />
                {editErrors.fecha_inicio && (
                  <p className="text-red-500">
                    {editErrors.fecha_inicio.message}
                  </p>
                )}
              </div>
              <div className="mt-2">
                <Label htmlFor="fecha_fin">Fecha fin</Label>
                <Input
                  id="fecha_fin"
                  name="fecha_fin"
                  type="date"
                  register={registerEdit}
                  validation={{ required: true }}
                />
                {editErrors.fecha_fin && (
                  <p className="text-red-500">{editErrors.fecha_fin.message}</p>
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
          aria-labelledby="deletePeriodo Modal"
        >
          <CModalHeader>
            <CModalTitle id="deletePeriodo Modal" className="fw-bold">
              Confirmar Eliminación
            </CModalTitle>
          </CModalHeader>
          <CModalBody>
            <p>
              ¿Estás seguro de que deseas eliminar a{" "}
              {currentPeriodo?.nombre_periodo}?
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

        {/* Modal para confirmar archivado */}
        <CModal
          backdrop="static"
          alignment="center"
          visible={archiveVisible}
          onClose={() => setArchiveVisible(false)}
          aria-labelledby="archivePeriodo Modal"
        >
          <CModalHeader>
            <CModalTitle id="archivePeriodo Modal" className="fw-bold">
              Confirmar Archivado
            </CModalTitle>
          </CModalHeader>
          <CModalBody>
            <p>
              ¿Estás seguro de que deseas archivar a{" "}
              {currentPeriodo?.nombre_periodo}?
            </p>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setArchiveVisible(false)}>
              Cancelar
            </CButton>
            <CButton color="primary" onClick={handleConfirmArchivar}>
              Archivar
            </CButton>
          </CModalFooter>
        </CModal>

        {/* Modal para confirmar desarchivado */}
        <CModal
          backdrop="static"
          alignment="center"
          visible={unarchiveVisible}
          onClose={() => setUnarchiveVisible(false)}
          aria-labelledby="archivePeriodo Modal"
        >
          <CModalHeader>
            <CModalTitle id="archivePeriodo Modal" className="fw-bold">
              Confirmar Archivado
            </CModalTitle>
          </CModalHeader>
          <CModalBody>
            <p>
              ¿Estás seguro de que deseas desarchivar a{" "}
              {currentPeriodo?.nombre_periodo}?
            </p>
          </CModalBody>
          <CModalFooter>
            <CButton
              color="secondary"
              onClick={() => setUnarchiveVisible(false)}
            >
              Cancelar
            </CButton>
            <CButton color="primary" onClick={handleConfirmDesarchivar}>
              Desarchivar
            </CButton>
          </CModalFooter>
        </CModal>
      </CCard>
      <ToastContainer />
    </>
  );
};

export default RegisterPeriodo;
