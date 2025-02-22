import React from "react";

function ErrorMessages({ errors }) {
  if (!errors) return null; // Si no hay errores, no se renderiza nada

  if (Array.isArray(errors)) {
    return (
      <>
        {errors.map((error, index) => (
          <div
            key={index}
            className="bg-red-500 p-2 text-white text-center my-2"
          >
            {error}
          </div>
        ))}
      </>
    );
  }

  return (
    <div className="bg-red-500 p-2 text-white text-center my-2">{errors}</div>
  );
}

export default ErrorMessages;
