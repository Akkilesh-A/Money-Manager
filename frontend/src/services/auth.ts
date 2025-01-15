export const AuthService = {
  setToken(token: string) {
    localStorage.setItem("money-manager-token", token);
  },

  getToken() {
    return localStorage.getItem("money-manager-token");
  },

  getAuthHeader() {
    const token = this.getToken();
    return token ? `Bearer ${token}` : "";
  },

  clearToken() {
    localStorage.removeItem("money-manager-token");
  },
};
