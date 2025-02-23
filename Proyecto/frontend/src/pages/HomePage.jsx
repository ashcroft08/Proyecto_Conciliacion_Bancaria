import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-6">
      {/* Contenedor principal */}
      <div className="max-w-6xl w-full bg-white rounded-lg shadow-2xl p-8 text-center">
        {/* Título principal */}
        <h1 className="text-5xl font-bold text-blue-900 mb-4">
          Bienvenido al Sistema de Conciliación Bancaria
        </h1>
<br />
        {/* Subtítulo */}
        <p className="text-xl text-gray-700 mb-8">
          Simplificamos la gestión financiera para tu negocio. Accede a
          herramientas poderosas para conciliar tus transacciones bancarias de
          manera eficiente.
        </p>

        {/* Botón de acción */}
        <Link
          to="/login"
          className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Ir al Login
          <FaArrowRight className="ml-2" />
        </Link>

        {/* Sección de características */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Característica 1 */}
          <div className="bg-blue-50 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-blue-900 mb-3">
              Automatización
            </h2>
            <p className="text-gray-700">
              Automatiza tus procesos de conciliación y ahorra tiempo.
            </p>
          </div>

          {/* Característica 2 */}
          <div className="bg-blue-50 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-blue-900 mb-3">Seguridad</h2>
            <p className="text-gray-700">
              Tus datos están protegidos con los más altos estándares de
              seguridad.
            </p>
          </div>

          {/* Característica 3 */}
          <div className="bg-blue-50 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-blue-900 mb-3">Reportes</h2>
            <p className="text-gray-700">
              Genera reportes detallados para una mejor toma de decisiones.
            </p>
          </div>
        </div>
      </div>

      {/* Pie de página */}
      <footer className="mt-12 text-center text-gray-600">
        <p>
          © 2023 Sistema de Conciliación Bancaria. Todos los derechos
          reservados.
        </p>
      </footer>
    </div>
  );
}

export default HomePage;
