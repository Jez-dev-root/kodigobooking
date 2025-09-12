import axios from "axios";

const api = axios.create({
  baseURL: "https://apibookingsaccomodations-production.up.railway.app/api",
  headers: { "Content-Type": "application/json" },
});

// Optional: handle 401 globally to remove invalid tokens
api.interceptors.response.use(
  (r) => r,
  (error) => {
    if (error?.response?.status === 401) {
      // If unauthorized, clear token so UI can react
      localStorage.removeItem("token");
      delete api.defaults.headers.common["Authorization"];
    }
    return Promise.reject(error);
  }
);

// ---- Dev mocks (enabled with VITE_USE_MOCKS=true) ----
const useMocks = typeof import.meta !== "undefined" && import.meta.env?.VITE_USE_MOCKS === "true";
const MOCK_TOKEN = "mock-jwt-test";
const MOCK_USER = {
  id: 1,
  name: "test",
  email: "test@example.com",
  role: "user",
};
const MOCK_BOOKINGS = [
  {
    id: 101,
    accommodationName: "Hotel Demo Central",
    checkIn: new Date().toISOString(),
    checkOut: new Date(Date.now() + 2 * 86400000).toISOString(),
    guests: 2,
    total: 180,
    status: "confirmada",
    roomType: "Doble",
    reference: "DEMO-101",
  },
  {
    id: 102,
    accommodationName: "Suite Vista Mar",
    startDate: new Date(Date.now() + 7 * 86400000).toISOString(),
    endDate: new Date(Date.now() + 10 * 86400000).toISOString(),
    guestsCount: 3,
    price: 450,
    status: "confirmada",
    roomType: "Suite",
    reference: "DEMO-102",
  },
];

// Convenience API helpers (adapt endpoints as needed)
export const AuthAPI = {
  login: (credentials) => {
    if (useMocks) {
      const okUser =
        (credentials?.email === "test" || credentials?.email === "test@example.com") &&
        credentials?.password === "test";
      return okUser
        ? Promise.resolve({ data: { token: MOCK_TOKEN } })
        : Promise.reject({ response: { status: 401, data: { message: "Invalid" } } });
    }
    return api.post("/auth/login", credentials);
  },
  me: () => {
    if (useMocks) {
      const token = localStorage.getItem("token");
      return token === MOCK_TOKEN
        ? Promise.resolve({ data: MOCK_USER })
        : Promise.reject({ response: { status: 401 } });
    }
    return api.get("/auth/me");
  },
};

export const BookingsAPI = {
  list: () => {
    if (useMocks) {
      const token = localStorage.getItem("token");
      return token === MOCK_TOKEN
        ? Promise.resolve({ data: MOCK_BOOKINGS })
        : Promise.reject({ response: { status: 401 } });
    }
    return api.get("/bookings");
  },
  get: (id) => {
    if (useMocks) {
      const token = localStorage.getItem("token");
      const item = MOCK_BOOKINGS.find((b) => String(b.id) === String(id));
      return token === MOCK_TOKEN && item
        ? Promise.resolve({ data: item })
        : Promise.reject({ response: { status: 404 } });
    }
    return api.get(`/bookings/${id}`);
  },
};

export default api;
