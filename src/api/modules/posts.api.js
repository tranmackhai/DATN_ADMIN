import publicClient from "../client/public.client.js";
import privateClient from "../client/private.client.js";

const postsEndpoints = {
  create: "posts/create",
  getAll: "posts/getAll",
  update: "posts/update",
  delete: "posts/",
  search: "posts/search",
};

const postsApi = {
  create: async (body) => {
    try {
      const response = await privateClient.post(postsEndpoints.create, body);
      return response;
    } catch (err) {
      return err;
    }
  },

  getAll: async (params) => {
    try {
      const response = await privateClient.get(postsEndpoints.getAll, {
        params: params,
      });
      return response;
    } catch (err) {
      return err;
    }
  },

  update: async (slug) => {
    try {
      const response = await privateClient.patch(
        `${postsEndpoints.update}/${slug}`
      );
      return response;
    } catch (err) {
      return err;
    }
  },

  delete: async (id) => {
    try {
      const response = await privateClient.delete(postsEndpoints.delete + id);
      return response;
    } catch (err) {
      return err;
    }
  },

  search: async (params) => {
    try {
      const response = await publicClient.get(postsEndpoints.search, {
        params: params,
      });
      return response;
    } catch (err) {
      return err;
    }
  },
};

export default postsApi;
