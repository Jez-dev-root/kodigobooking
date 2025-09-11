import { useEffect, useState } from "react";
import api from "../services/api";

export default function Home() {
  const [accommodations, setAccommodations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/accomodations")
      .then((res) => setAccommodations(res.data))
      .catch((err) => console.error("❌ Error al cargar alojamientos:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return <p className="p-6 text-gray-600 text-center">Cargando alojamientos...</p>;

  return (
    <div>
      {/* Banner principal */}
      <section className="relative h-96 bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-center text-white">
        <div className="px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Encuentra tu próximo destino
          </h1>
          <p className="text-lg md:text-2xl mb-6">
            Hoteles y habitaciones disponibles al mejor precio
          </p>
          <button className="bg-white text-indigo-600 font-bold px-6 py-3 rounded-full shadow-lg hover:bg-gray-100 transition">
            Explorar ahora
          </button>
        </div>
      </section>

      {/* Cards de alojamientos */}
      <section className="p-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">🏨 Hoteles y Habitaciones</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {accommodations.length > 0 ? (
            accommodations.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={item.image || "https://via.placeholder.com/400x250?text=Hotel"}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-gray-500">{item.location}</p>
                  <p className="mt-2 text-indigo-600 font-bold">Desde ${item.price || 50} / noche</p>
                  <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
                    Reservar
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No se encontraron alojamientos.</p>
          )}
        </div>
      </section>
    </div>
  );
}
