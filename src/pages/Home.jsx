import React, { useState, useEffect } from 'react';
import Slider from '../components/Slider';
import AccomodationCard from '../components/AccomodationCard';

// Página principal de KodigoBooking
// Incluye banner, filtros de búsqueda, slider de destacados, lista de alojamientos con paginación
export default function Home() {
  // Estado para filtros de búsqueda
  const [filters, setFilters] = useState({
    location: '',
    minPrice: '',
    maxPrice: '',
    stars: ''
  });

  // Estado para paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Datos mock de alojamientos (simulando API)
  const mockAccommodations = [
    { id: 1, name: "Hotel Central Plaza", location: "Centro Ciudad", price: 120, rating: 4.8, image: "https://via.placeholder.com/300x200?text=Hotel+1", description: "Hotel de lujo en el corazón de la ciudad" },
    { id: 2, name: "Resort Marina Beach", location: "Playa del Mar", price: 200, rating: 4.9, image: "https://via.placeholder.com/300x200?text=Hotel+2", description: "Resort frente al mar con actividades acuáticas" },
    { id: 3, name: "Boutique Hotel Roma", location: "Barrio Histórico", price: 150, rating: 4.7, image: "https://via.placeholder.com/300x200?text=Hotel+3", description: "Hotel boutique con diseño moderno" },
    { id: 4, name: "Mountain Lodge", location: "Sierra Nevada", price: 180, rating: 4.6, image: "https://via.placeholder.com/300x200?text=Hotel+4", description: "Cabaña de montaña con chimenea" },
    { id: 5, name: "Urban Stay Hotel", location: "Centro Ciudad", price: 90, rating: 4.2, image: "https://via.placeholder.com/300x200?text=Hotel+5", description: "Hotel urbano económico y cómodo" },
    { id: 6, name: "Paradise Resort", location: "Playa del Mar", price: 250, rating: 4.9, image: "https://via.placeholder.com/300x200?text=Hotel+6", description: "Resort de lujo con spa y piscina infinita" },
    { id: 7, name: "Historic Inn", location: "Barrio Histórico", price: 110, rating: 4.4, image: "https://via.placeholder.com/300x200?text=Hotel+7", description: "Posada histórica con encanto único" },
    { id: 8, name: "Alpine Chalet", location: "Sierra Nevada", price: 160, rating: 4.5, image: "https://via.placeholder.com/300x200?text=Hotel+8", description: "Chalet alpino con vistas espectaculares" },
    { id: 9, name: "City View Suites", location: "Centro Ciudad", price: 140, rating: 4.3, image: "https://via.placeholder.com/300x200?text=Hotel+9", description: "Suites modernas con vista a la ciudad" },
    { id: 10, name: "Beachfront Villa", location: "Playa del Mar", price: 300, rating: 5.0, image: "https://via.placeholder.com/300x200?text=Hotel+10", description: "Villa privada frente a la playa" }
  ];

  // Filtrar alojamientos según criterios
  const filteredAccommodations = mockAccommodations.filter(acc => {
    const matchesLocation = !filters.location || acc.location.toLowerCase().includes(filters.location.toLowerCase());
    const matchesMinPrice = !filters.minPrice || acc.price >= parseInt(filters.minPrice);
    const matchesMaxPrice = !filters.maxPrice || acc.price <= parseInt(filters.maxPrice);
    const matchesStars = !filters.stars || acc.rating >= parseInt(filters.stars);

    return matchesLocation && matchesMinPrice && matchesMaxPrice && matchesStars;
  });

  // Calcular paginación
  const totalPages = Math.ceil(filteredAccommodations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAccommodations = filteredAccommodations.slice(startIndex, startIndex + itemsPerPage);

  // Manejar cambios en filtros
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setCurrentPage(1); // Resetear a primera página al filtrar
  };

  // Limpiar filtros
  const clearFilters = () => {
    setFilters({ location: '', minPrice: '', maxPrice: '', stars: '' });
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Banner principal */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Encuentra tu alojamiento perfecto
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Reserva hoteles, resorts y más con las mejores ofertas
          </p>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto">
            <p className="text-lg">
              Miles de opciones disponibles en todo el mundo
            </p>
          </div>
        </div>
        {/* Elementos decorativos */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full"></div>
          <div className="absolute top-20 -right-10 w-60 h-60 bg-white/5 rounded-full"></div>
        </div>
      </section>

      {/* Filtros de búsqueda */}
      <section className="bg-white shadow-lg py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Filtrar alojamientos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              name="location"
              placeholder="Ubicación"
              value={filters.location}
              onChange={handleFilterChange}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              name="minPrice"
              placeholder="Precio mínimo"
              value={filters.minPrice}
              onChange={handleFilterChange}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              name="maxPrice"
              placeholder="Precio máximo"
              value={filters.maxPrice}
              onChange={handleFilterChange}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              name="stars"
              value={filters.stars}
              onChange={handleFilterChange}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todas las estrellas</option>
              <option value="3">3+ estrellas</option>
              <option value="4">4+ estrellas</option>
              <option value="5">5 estrellas</option>
            </select>
          </div>
          <div className="text-center mt-4">
            <button
              onClick={clearFilters}
              className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Limpiar filtros
            </button>
          </div>
        </div>
      </section>

      {/* Slider de hoteles destacados */}
      <Slider />

      {/* Lista de alojamientos */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Alojamiento disponible ({filteredAccommodations.length})
        </h2>

        {paginatedAccommodations.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No se encontraron alojamientos que coincidan con tus criterios.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedAccommodations.map(acc => (
                <AccomodationCard key={acc.id} accommodation={acc} />
              ))}
            </div>

            {/* Paginación */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-12 space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Anterior
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      currentPage === page
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Siguiente
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}

