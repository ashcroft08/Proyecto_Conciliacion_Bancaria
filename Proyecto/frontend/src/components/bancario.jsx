import { useState } from "react";

export const ExtractosBancarios = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      // Lógica para procesar el archivo y guardar los datos en la base de datos
      console.log("Archivo importado:", file);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Importar Extracto Bancario</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Seleccionar Archivo
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Importar Extracto
        </button>
      </form>
    </div>
  );
};

export default ExtractosBancarios;