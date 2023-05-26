import publicClient from "../client/public.client.js";

const newsEndpoints = {
  getAll: "news/getAll",
  updateStatus: "news/updateStatus",
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
};

export default newsApi;
