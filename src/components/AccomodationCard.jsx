import React from 'react';

// Componente para mostrar una tarjeta de alojamiento con estilos mejorados
// Inspirado en diseños de Booking y Trivago, con hover y gradientes atractivos
const AccomodationCard = ({ accommodation }) => {
  // Datos de ejemplo si no se pasan props
  const defaultData = {
    name: accommodation?.name || "Hotel Ejemplo",
    location: accommodation?.location || "Ciudad Central",
    price: accommodation?.price || 100,
    rating: accommodation?.rating || 4.5,
    image: accommodation?.image || "https://via.placeholder.com/300x200?text=Hotel",
    description: accommodation?.description || "Habitación cómoda con vista a la ciudad"
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group">
      {/* Imagen del alojamiento con gradiente overlay */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={defaultData.image}
          alt={defaultData.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        {/* Gradiente overlay para mejor legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        {/* Rating en esquina superior derecha */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-sm font-semibold text-gray-800">
          ⭐ {defaultData.rating}
        </div>
      </div>

      {/* Contenido de la tarjeta */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
          {defaultData.name}
        </h3>
        <p className="text-sm text-gray-600 mb-2">
          📍 {defaultData.location}
        </p>
        <p className="text-sm text-gray-700 mb-3 line-clamp-2">
          {defaultData.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-green-600">
            ${defaultData.price}
            <span className="text-sm text-gray-500 font-normal"> /noche</span>
          </div>
          <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-md">
            Reservar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccomodationCard;
