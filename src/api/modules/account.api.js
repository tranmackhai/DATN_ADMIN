import publicClient from "../client/public.client.js";
import privateClient from "../client/private.client.js";

const accountEndpoints = {
  login: "auth/loginAdmin",
  register: "auth/register",
  logout: "auth/logout",
  getAll: "account/getAll",
  getById: "account/getById",
  search: "account/search",
  updateUser: "account/updateUser",
  updatePassword: "auth/changePassword",
  getProfile: "auth/getProfile",
  refreshToken: "auth/refreshToken",
  changeProfile: "auth/changeProfile",
};

const accountApi = {
  register: async ({ name, password, gmail, phone, role }) => {
    try {
      const response = await publicClient.post(accountEndpoints.register, {
        gmail,
        password,
        name,
        phone,
        role,
      });
      return response;
    } catch (err) {
      return { err };
    }
  },

  login: async ({ gmail, password }) => {
    const response = await publicClient.post(accountEndpoints.login, {
      gmail,
      password,
    });
    // console.log(response);
    return { response };
  },

  logout: async () => {
    try {
      const response = await publicClient.post(accountEndpoints.logout);
      // console.log(response);
      return { response };
    } catch (err) {
      return { err };
    }
  },

  getAll: async (params) => {
    try {
      const response = await publicClient.get(accountEndpoints.getAll, {
        params: params,
      });
      return response;
    } catch (err) {
      return err;
    }
  },

  getById: async (id) => {
    try {
      const response = await privateClient.get(
        `${accountEndpoints.getById}/${id}`
      );
      return response;
    } catch (err) {
      return err;
    }
  },

  updateUser: async (id, body) => {
    try {
      const response = await publicClient.patch(
        `${accountEndpoints.updateUser}/${id}`,
        body
      );
      return response;
    } catch (err) {
      return err;
    }
  },
  refreshToken: async () => {
    try {
      const response = await privateClient.post(accountEndpoints.refreshToken);
      // console.log(response);
      return { response };
    } catch (err) {
      return { err };
    }
  },

  getProfile: async () => {
    try {
      const response = await privateClient.get(accountEndpoints.getProfile);
      return { response };
    } catch (err) {
      return { err };
    }
  },

  changeProfile: async (body) => {
    try {
      const response = await privateClient.patch(
        accountEndpoints.changeProfile,
        body
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },

  search: async (params) => {
    try {
      const response = await privateClient.get(accountEndpoints.search, {
        params: params,
      });
      return response;
    } catch (err) {
      return { err };
    }
  },

  updatePassword: async (body) => {
    try {
      const response = await privateClient.patch(
        accountEndpoints.updatePassword,
        body
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default accountApi;
