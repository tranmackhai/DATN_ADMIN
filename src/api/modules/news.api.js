import publicClient from "../client/public.client.js";
import privateClient from "../client/private.client.js";

const newsEndpoints = {
  getAll: "news/getAll",
  updateStatus: "news/updateStatus",
  delete: "news/",
  search: "news/search",
};

const newsApi = {
  getAll: async (params) => {
    try {
      const response = await publicClient.get(newsEndpoints.getAll, {
        params: params,
      });
      return response;
    } catch (err) {
      return err;
    }
  },

  updateStatus: async (slug) => {
    try {
      const response = await publicClient.patch(
        `${newsEndpoints.updateStatus}/${slug}`
      );
      return response;
    } catch (err) {
      return err;
    }
  },

  delete: async (id) => {
    try {
      const response = await privateClient.delete(newsEndpoints.delete + id);
      return response;
    } catch (err) {
      return err;
    }
  },

  search: async (params) => {
    try {
      const response = await publicClient.get(newsEndpoints.search, {
        params: params,
      });
      return response;
    } catch (err) {
      return err;
    }
  },
};

export default newsApi;
