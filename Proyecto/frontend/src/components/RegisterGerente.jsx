import { useEffect, useRef, useState } from "react";
import { useUser } from "../context/UserContext";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { registerSchema, editSchema } from "../schemas/auth";
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
  CPopover,
} from "@coreui/react";
import { FaPlus, FaEdit, FaTrash, FaEye, FaEyeSlash } from "react-icons/fa"; // Importar iconos
import Label from "../components/ui/Label";
import Input from "../components/ui/Input";
import { ToastContainer } from "react-toastify";
import CustomToast from "./ui/CustomToast";

export const RegisterGerente = () => {
  const { users, getUserGerente, getUser, updateUser, deleteUser } =
    useUser();
  const { user } = useAuth();
  const [records, setRecords] = useState([]);
  const [visible, setVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const hasFetchedUsers = useRef(false);
  const [editVisible, setEditVisible] = useState(false);
  const [editUser, setEditUser] = useState(null);

  //Para visualizar contraseñas
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Cargar usuarios inicialmente
  useEffect(() => {
    const fetchUsers = async () => {
      if (!hasFetchedUsers.current) {
        // Solo llama a la API si no se ha hecho antes
        await getUserGerente();
        hasFetchedUsers.current = true; // Marca que ya se han obtenido los usuarios
      }
    };
    fetchUsers();
  }, [getUserGerente]); // Solo se ejecuta una vez al montar el componente

  // Actualiza los registros cuando 'users' cambie
  useEffect(() => {
    setRecords(users); // Inicializa los registros con los usuarios obtenidos
  }, [users]); // Solo se ejecuta cuando 'users' cambia

  const {
    register,
    handleSubmit,
    formState: { errors }, // Renombrar para evitar confusión
    reset,
  } = useForm({ resolver: zodResolver(registerSchema) });

  const { signup, errors: registerErrors } = useAuth(); // Obtén los errores

  const onSubmit = async (values) => {
    console.log("Datos enviados:", values);
    const success = await signup(values);
    if (success) {
      CustomToast("¡Gerente registrado exitosamente!", "success");
      setVisible(false); // Cierra el modal
      await getUserGerente(); // Actualiza la lista de usuarios después de registrar uno nuevo
      reset(); // Limpia el formulario después de un registro exitoso
    } else {
      console.log("Error al registrar usuario.");
    }
  };

  const handleCloseEdit = () => {
    setEditVisible(false);
    setEditUser(null); // Limpiar usuario
    resetEdit(); // Resetear formulario
  };

  // Formulario de edición
  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    formState: { errors: editErrors },
    reset: resetEdit,
  } = useForm({ resolver: zodResolver(editSchema) });

  // Cargar datos del usuario a editar
  useEffect(() => {
    if (editUser) {
      resetEdit(editUser);
    }
  }, [editUser, resetEdit]);

  // Manejar edición
  const handleEdit = async (user) => {
    try {
      const userData = await getUser(user.cod_usuario);
      setEditUser(userData);
      setEditVisible(true);
    } catch (error) {
      console.error("Error al obtener datos del usuario:", error);
    }
  };

  // Enviar edición
  const onSubmitEdit = async (values) => {
    try {
      const success = await updateUser(editUser.cod_usuario, values);
      if (success) {
        CustomToast("¡Gerente actualizado exitosamente!", "success");
        setEditVisible(false);
        await getUserGerente(); // Actualizar lista
      }
    } catch (error) {
      CustomToast(
        error.response?.data?.message || "Error al actualizar",
        "error"
      );
    }
  };

  const handleDelete = (user) => {
    setCurrentUser(user);
    setDeleteVisible(true);
  };

  const handleConfirmDelete = async () => {
    const success = await deleteUser(currentUser.cod_usuario); // Esperar a que deleteUser se complete
    if (success) {
      // Solo mostrar el mensaje de éxito si la eliminación fue exitosa
      CustomToast("¡Gerente eliminado exitosamente!", "success");
      setDeleteVisible(false);
      await getUserGerente();
    }
    setDeleteVisible(false);
  };

  const columns = [
    {
      name: "Nombres",
      selector: (row) => row.nombres,
      sortable: true,
    },
    {
      name: "Apellidos",
      selector: (row) => row.apellidos,
      sortable: true,
    },
    {
      name: "Correo",
      selector: (row) => row.email,
      sortable: true,
    },
    {
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
          {/* Mostrar el botón de eliminar solo si el rol del usuario es 1 */}
          {user?.cod_rol === 1 && ( // Usa && para condicionalmente renderizar
            <CButton color="danger" onClick={() => handleDelete(row)}>
              <FaTrash />
            </CButton>
          )}
        </div>
      ),
    },
  ];

  const handleFilter = (event) => {
    const query = event.target.value.toLowerCase();
    const newData = users.filter((row) => {
      return (
        row.nombres.toLowerCase().includes(query) ||
        row.apellidos.toLowerCase().includes(query) ||
        row.email.toLowerCase().includes(query)
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
        GERENTE
      </h1>
      <CCard>
        <CCardHeader>
          <div className="d-flex justify-content-end mt-1">
            <CInputGroup>
              <CInputGroupText>
                <FaPlus />
              </CInputGroupText>
              {users.length > 0 ? ( // Renderizar el popover solo si el botón está deshabilitado
                <CPopover
                  content="Gerente agregado, botón desactivado"
                  placement="right"
                  trigger={["hover", "focus"]}
                >
                  <span className="d-inline-block" tabIndex={0}>
                    <CButton
                      color="success"
                      style={{
                        color: "white",
                        borderTopRightRadius: "0.375rem",
                        borderBottomRightRadius: "0.375rem",
                        borderTopLeftRadius: "0",
                        borderBottomLeftRadius: "0",
                      }}
                      onClick={() => setVisible(true)}
                      className="fw-bold"
                      disabled={users.length > 0} // Deshabilitar el botón si hay registros
                    >
                      Agregar un gerente
                    </CButton>
                  </span>
                </CPopover>
              ) : (
                <CButton
                  color="success"
                  style={{
                    color: "white",
                    borderTopRightRadius: "0.375rem",
                    borderBottomRightRadius: "0.375rem",
                    borderTopLeftRadius: "0",
                    borderBottomLeftRadius: "0",
                  }}
                  onClick={() => setVisible(true)}
                  className="fw-bold"
                  disabled={users.length > 0} // Deshabilitar el botón si hay registros
                >
                  Agregar un gerente
                </CButton>
              )}
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

        {/* Modal para crear nuevo gerente */}
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
                Ingresar los datos del gerente
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
                <Label htmlFor="nombres">Nombres</Label>
                <Input
                  id="nombres"
                  name="nombres"
                  type="text"
                  register={register}
                  validation={{ required: true }}
                />
                {errors.nombres && (
                  <p className="text-red-500">Los nombres son obligatorios</p>
                )}
              </div>
              <div className="mt-2">
                <Label htmlFor="apellidos">Apellidos</Label>
                <Input
                  id="apellidos"
                  name="apellidos"
                  type="text"
                  register={register}
                  validation={{ required: true }}
                />
                {errors.apellidos && (
                  <p className="text-red-500">Los apellidos son obligatorios</p>
                )}
              </div>
              <div className="mt-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  register={register}
                  validation={{ required: true }}
                />
                {errors.email && (
                  <p className="text-red-500">
                    El correo electrónico es obligatorio
                  </p>
                )}
              </div>
              <div className="mt-2">
                <Label htmlFor="password">Contraseña</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"} // Cambia el tipo según el estado
                    register={register}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}{" "}
                    {/* Cambia el ícono */}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>
              <div className="mt-2">
                <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"} // Cambia el tipo según el estado
                    register={register}
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}{" "}
                    {/* Cambia el ícono */}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
              {/* Campo de Rol */}
              <div className="mt-2">
                {/* Campo oculto para cod_rol */}
                <input
                  type="hidden"
                  id="cod_rol"
                  value="3"
                  {...register("cod_rol", {
                    required: "El rol es obligatorio",
                  })}
                />
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
              <CModalTitle className="fw-bold">
                Editar los datos del gerente
              </CModalTitle>
            </CModalHeader>
            <CModalBody>
              <div className="mt-2">
                <Label htmlFor="nombres">Nombres</Label>
                <Input
                  id="nombres"
                  name="nombres"
                  type="text"
                  register={registerEdit}
                />
                {editErrors.nombres && (
                  <p className="text-red-500">{editErrors.nombres.message}</p>
                )}
              </div>

              <div className="mt-2">
                <Label htmlFor="apellidos">Apellidos</Label>
                <Input
                  id="apellidos"
                  name="apellidos"
                  type="text"
                  register={registerEdit}
                />
                {editErrors.apellidos && (
                  <p className="text-red-500">{editErrors.apellidos.message}</p>
                )}
              </div>

              <div className="mt-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  register={registerEdit}
                />
                {editErrors.email && (
                  <p className="text-red-500">{editErrors.email.message}</p>
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
          aria-labelledby="DeleteUser Modal"
        >
          <CModalHeader>
            <CModalTitle id="DeleteUser Modal" className="fw-bold">
              Eliminar al gerente
            </CModalTitle>
          </CModalHeader>
          <CModalBody>
            <p>
              ¿Estás seguro de que deseas eliminar los datos de{" "}
              {currentUser?.nombres}?
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
      </CCard>
      <ToastContainer />
    </>
  );
};
