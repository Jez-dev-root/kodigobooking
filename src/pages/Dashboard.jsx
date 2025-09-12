import { useEffect, useState } from "react";
import { BookingsAPI } from "../api/api";

export default function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setError("");
      setLoading(true);
      try {
        const { data } = await BookingsAPI.list();
        setBookings(Array.isArray(data) ? data : data?.bookings || []);
      } catch (e) {
        setError("No se pudo cargar tu historial de reservas");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-[calc(100vh-56px)] bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Tu historial de reservas</h1>

        {loading && <p className="text-gray-600">Cargando reservas...</p>}
        {error && (
          <div className="text-red-700 bg-red-50 border border-red-200 p-3 rounded mb-4">
            {error}
          </div>
        )}

        {!loading && !error && bookings.length === 0 && (
          <p className="text-gray-700">Aún no tienes reservas.</p>
        )}

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bookings.map((b) => (
            <li key={b.id} className="bg-white shadow-sm rounded p-4 border">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{b.accommodationName || b.hotel?.name || "Alojamiento"}</h3>
                  <p className="text-sm text-gray-600">
                    Check-in: {formatDate(b.checkIn || b.startDate)} · Check-out: {formatDate(b.checkOut || b.endDate)}
                  </p>
                  <p className="text-sm text-gray-600">Huéspedes: {b.guests || b.guestsCount || 1}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${formatPrice(b.total || b.price)}</p>
                  <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                    {b.status || "confirmada"}
                  </span>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => setSelected(b)}
                  className="px-3 py-1.5 rounded bg-blue-600 text-white hover:bg-blue-700"
                >
                  Ver detalles
                </button>
              </div>
            </li>
          ))}
        </ul>

        {selected && (
          <DetailModal booking={selected} onClose={() => setSelected(null)} />)
        }
      </div>
    </div>
  );
}

function DetailModal({ booking, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 grid place-items-center p-4 z-50">
      <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-5">
        <div className="flex items-start justify-between mb-3">
          <h2 className="text-xl font-bold">Detalles de la reserva</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>
        <div className="space-y-2 text-sm">
          <p>
            <span className="font-semibold">Alojamiento: </span>
            {booking.accommodationName || booking.hotel?.name || "-"}
          </p>
          <p>
            <span className="font-semibold">Fechas: </span>
            {formatDate(booking.checkIn || booking.startDate)} — {formatDate(booking.checkOut || booking.endDate)}
          </p>
          <p>
            <span className="font-semibold">Huéspedes: </span>
            {booking.guests || booking.guestsCount || 1}
          </p>
          <p>
            <span className="font-semibold">Total: </span>${formatPrice(booking.total || booking.price)}
          </p>
          <p>
            <span className="font-semibold">Estado: </span>{booking.status || "confirmada"}
          </p>
          {booking.roomType && (
            <p>
              <span className="font-semibold">Tipo de habitación: </span>{booking.roomType}
            </p>
          )}
          {booking.reference && (
            <p>
              <span className="font-semibold">Referencia: </span>{booking.reference}
            </p>
          )}
        </div>
        <div className="mt-4 text-right">
          <button onClick={onClose} className="px-3 py-1.5 rounded bg-gray-100 hover:bg-gray-200">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

function formatDate(value) {
  if (!value) return "-";
  try {
    const d = new Date(value);
    return d.toLocaleDateString();
  } catch {
    return String(value);
  }
}

function formatPrice(value) {
  if (!value && value !== 0) return "-";
  try {
    const n = Number(value);
    return n.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  } catch {
    return String(value);
  }
}

