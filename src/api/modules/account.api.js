import publicClient from "../client/public.client.js";

const accountEndpoints = {
  getAll: "account/getAll",
  getById: "account/getById",
  updateUser: "account/updateUser",
  register: "auth/register",
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
      const response = await publicClient.get(
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
};

export default accountApi;
