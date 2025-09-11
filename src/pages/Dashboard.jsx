import { useEffect, useState } from "react";
import api from "../services/api";

export default function Dashboard() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    api.get("/bookings")
      .then((res) => setBookings(res.data))
      .catch((err) => console.error("❌ Error al cargar reservas:", err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">📋 Mis Reservas</h1>
      {bookings.length > 0 ? (
        <ul className="space-y-4">
          {bookings.map((b) => (
            <li key={b.id} className="bg-white p-4 rounded shadow">
              <p className="font-semibold">{b.accommodationName}</p>
              <p>Fecha: {b.date}</p>
              <p>Precio: ${b.price}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tienes reservas.</p>
      )}
    </div>
  );
}
