import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Profile() {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-[calc(100vh-56px)] bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white border rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold mb-4">Perfil de usuario</h1>
        {!user ? (
          <p className="text-gray-600">Cargando datos de usuario...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <Field label="Nombre" value={user.name || user.fullName || "-"} />
            <Field label="Correo" value={user.email || "-"} />
            <Field label="Teléfono" value={user.phone || "-"} />
            <Field label="Rol" value={user.role || "-"} />
            <div className="md:col-span-2">
              <Field label="Dirección" value={user.address || "-"} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, value }) {
  return (
    <div className="space-y-1">
      <div className="text-gray-500 text-xs uppercase tracking-wide">{label}</div>
      <div className="text-gray-900">{value}</div>
    </div>
  );
}

