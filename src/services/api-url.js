const API_BASE_URL = 'https://online-library-api.herokuapp.com';

// Local
// const API_BASE_URL = 'http://localhost:5000';

export const ADMIN_API = {
  dashboard: `${API_BASE_URL}/admin/dashboard`,
  issuedBooks: `${API_BASE_URL}/admin/issuedBooks`,
  adminBooks: `${API_BASE_URL}/admin/adminBooks`
};

export const AUTHENTICATION_API = {
  register: `${API_BASE_URL}/register`,
  signIn: `${API_BASE_URL}/signin`,
  logout: `${API_BASE_URL}/logout`
};

export const BOOK_API = `${API_BASE_URL}/books/`;

export const LIBRARY_API = {
  library: `${API_BASE_URL}/library`,
  issueBook: `${API_BASE_URL}/issueBook`
};

export const USER_API = {
  base: `${API_BASE_URL}/users/`,
  dashboard: `${API_BASE_URL}/users/dashboard`,
  userBooks: `${API_BASE_URL}/users/userBooks`
};
