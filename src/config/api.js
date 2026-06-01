const API_CONFIG = {
  BASE_URL: "http://localhost:5000",
  ENDPOINTS: {
    REGISTER: "/api/register",
    LOGIN: "/api/auth/login",
    LOGOUT: "/api/auth/logout",
    REFRESH_TOKEN: "/api/auth/refresh",

    CONTACTS: "/api/contacts",
    CONTACTS_SEARCH: "/api/contacts/search",

    SUPPLIERS_SEARCH: "/api/suppliers/search",
  },
};

export default API_CONFIG;
