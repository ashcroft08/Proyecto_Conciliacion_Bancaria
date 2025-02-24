import { useState, useEffect } from "react";

const RevisarLibroMayor = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Lógica para obtener las transacciones desde la base de datos
    const fetchTransactions = async () => {
      const response = await fetch("/api/transactions");
      const data = await response.json();
      setTransactions(data);
    };

    fetchTransactions();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Revisar Libro Mayor</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Fecha</th>
            <th className="py-2 px-4 border-b">Asiento</th>
            <th className="py-2 px-4 border-b">Descripción</th>
            <th className="py-2 px-4 border-b">Débito</th>
            <th className="py-2 px-4 border-b">Crédito</th>
            <th className="py-2 px-4 border-b">Saldo</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b">{transaction.fecha}</td>
              <td className="py-2 px-4 border-b">{transaction.asiento}</td>
              <td className="py-2 px-4 border-b">{transaction.descripcion}</td>
              <td className="py-2 px-4 border-b">{transaction.debito}</td>
              <td className="py-2 px-4 border-b">{transaction.credito}</td>
              <td className="py-2 px-4 border-b">{transaction.saldo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RevisarLibroMayor;
