export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md p-4">
        <h1 className="text-2xl font-bold text-blue-600">KodigoBooking 🏨</h1>
      </header>

      <main className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold">Hotel Ejemplo</h2>
          <p className="text-gray-600">Habitación doble · $100</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold">Hotel Demo</h2>
          <p className="text-gray-600">Suite · $150</p>
        </div>
      </main>
    </div>
  );
}
