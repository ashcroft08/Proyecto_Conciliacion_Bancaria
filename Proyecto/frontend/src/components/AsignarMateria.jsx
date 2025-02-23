import { useEffect, useState, useRef } from "react";
import {
  CCard,
  CCardHeader,
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CFormInput,
  CFormSelect,
} from "@coreui/react";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import CustomToast from "./ui/CustomToast";
import Label from "./ui/Label";
import { useMateria } from "../context/MateriaContext"; // Asegúrate de importar el contexto de materia
import { useCurso } from "../context/CursoContext"; // Importa el contexto de curso

export function AsignarMateria() {
  const { registerMateria } = useMateria();
  const { cursos, getCursos } = useCurso(); // Obtén los cursos del contexto
  const hasFetchedCursos = useRef(false);
  const { register, handleSubmit, reset } = useForm();
  const [visible, setVisible] = useState(false);

  // Cargar cursos inicialmente
  useEffect(() => {
    const fetchCursos = async () => {
      if (!hasFetchedCursos.current) {
        // Solo llama a la API si no se ha hecho antes
        await getCursos();
        hasFetchedCursos.current = true; // Marca que ya se han obtenido los cursos
      }
    };
    fetchCursos();
  }, [getCursos]); // Solo se ejecuta una vez al montar el componente

  // Asignar una materia a un curso
  const handleAssign = async (data) => {
    const { nombre_materia, cod_curso } = data;

    // Crear un objeto para la nueva materia
    const nuevaMateria = {
      nombre_materia, // Aquí se obtiene el nombre de la materia del input
      cod_curso: Number(cod_curso), // Asegúrate de que sea un número
    };

    const success = await registerMateria(nuevaMateria); // Llama a la función del contexto

    if (success) {
      CustomToast("Materia asignada correctamente", "success");
      setVisible(false);
      reset();
    } else {
      CustomToast("Error al asignar materia", "error");
    }
  };

  return (
    <>
      <CCard>
        <CCardHeader>
          <CButton color="primary" onClick={() => setVisible(true)}>
            Asignar Materia a Curso
          </CButton>
        </CCardHeader>
      </CCard>

      <CModal
        backdrop="static"
        alignment="center"
        visible={visible}
        onClose={() => setVisible(false)}
      >
        <CModalHeader>
          <CModalTitle>Asignar Materia a un Curso</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <form onSubmit={handleSubmit(handleAssign)}>
            <Label htmlFor="nombre_materia">Nombre de la materia</Label>
            <CFormInput
              type="text"
              id="nombre_materia"
              {...register("nombre_materia", { required: true })}
              required
            />

            <Label htmlFor="cod_curso">Selecciona un curso</Label>
            <CFormSelect {...register("cod_curso")} required>
              <option value="">-- Selecciona un curso --</option>
              {cursos.map((curso) => (
                <option key={curso.cod_curso} value={curso.cod_curso}>
                  {curso.nombre_curso}
                </option>
              ))}
            </CFormSelect>

            <CModalFooter>
              <CButton color="secondary" onClick={() => setVisible(false)}>
                Cancelar
              </CButton>
              <CButton type="submit" color="primary">
                Asignar
              </CButton>
            </CModalFooter>
          </form>
        </CModalBody>
      </CModal>

      <ToastContainer />
    </>
  );
}

export default AsignarMateria;
