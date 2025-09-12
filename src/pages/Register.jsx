export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Crear Cuenta</h2>
        <form className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Nombre"
            className="border p-2 rounded"
          />
          <input
            type="email"
            placeholder="Correo"
            className="border p-2 rounded"
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="border p-2 rounded"
          />
          <button className="bg-green-600 text-white py-2 rounded hover:bg-green-700">
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}
