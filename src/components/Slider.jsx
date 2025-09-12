import React, { useState, useEffect } from 'react';
import AccomodationCard from './AccomodationCard';

// Componente de slider para hoteles destacados
// Muestra alojamientos en un carrusel interactivo con navegación
const Slider = () => {
  // Datos mock de hoteles destacados
  const featuredHotels = [
    {
      id: 1,
      name: "Hotel Central Plaza",
      location: "Centro Ciudad",
      price: 120,
      rating: 4.8,
      image: "https://via.placeholder.com/400x250?text=Hotel+Central",
      description: "Hotel de lujo en el corazón de la ciudad con spa y piscina"
    },
    {
      id: 2,
      name: "Resort Marina Beach",
      location: "Playa del Mar",
      price: 200,
      rating: 4.9,
      image: "https://via.placeholder.com/400x250?text=Resort+Marina",
      description: "Resort frente al mar con actividades acuáticas y gastronomía"
    },
    {
      id: 3,
      name: "Boutique Hotel Roma",
      location: "Barrio Histórico",
      price: 150,
      rating: 4.7,
      image: "https://via.placeholder.com/400x250?text=Boutique+Roma",
      description: "Hotel boutique con diseño moderno y vistas panorámicas"
    },
    {
      id: 4,
      name: "Mountain Lodge",
      location: "Sierra Nevada",
      price: 180,
      rating: 4.6,
      image: "https://via.placeholder.com/400x250?text=Mountain+Lodge",
      description: "Cabaña de montaña con chimenea y actividades de aventura"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  // Ajustar items por vista según el tamaño de pantalla
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  // Navegación automática cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex >= featuredHotels.length - itemsPerView ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [itemsPerView, featuredHotels.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= featuredHotels.length - itemsPerView ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? featuredHotels.length - itemsPerView : prevIndex - 1
    );
  };

  const visibleHotels = featuredHotels.slice(currentIndex, currentIndex + itemsPerView);

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 py-8">
      {/* Título del slider */}
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Hoteles Destacados
      </h2>

      {/* Contenedor del slider */}
      <div className="relative overflow-hidden">
        <div className="flex gap-6 transition-transform duration-500 ease-in-out"
             style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}>
          {featuredHotels.map((hotel) => (
            <div key={hotel.id} className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3">
              <AccomodationCard accommodation={hotel} />
            </div>
          ))}
        </div>

        {/* Botones de navegación */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-10"
          aria-label="Anterior"
        >
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-10"
          aria-label="Siguiente"
        >
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Indicadores */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: Math.ceil(featuredHotels.length / itemsPerView) }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index * itemsPerView)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              Math.floor(currentIndex / itemsPerView) === index
                ? 'bg-blue-600 scale-125'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Ir a slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
