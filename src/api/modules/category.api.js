import publicClient from "../client/public.client.js";
import privateClient from "../client/private.client.js";

const categoryEndpoints = {
  create: "category/create",
  getAll: "category/getAll",
  update: "category/update",
  delete: "category/",
  search: "category/search",
};

const categoryApi = {
  create: async (body) => {
    try {
      const response = await publicClient.post(categoryEndpoints.create, body);
      return response;
    } catch (err) {
      return err;
    }
  },

  getAll: async (params) => {
    try {
      const response = await publicClient.get(categoryEndpoints.getAll, {
        params: params,
      });
      return response;
    } catch (err) {
      return err;
    }
  },

  update: async (slug) => {
    try {
      const response = await publicClient.patch(
        `${categoryEndpoints.update}/${slug}`
      );
      return response;
    } catch (err) {
      return err;
    }
  },

  delete: async (id) => {
    try {
      const response = await privateClient.delete(
        categoryEndpoints.delete + id
      );
      return response;
    } catch (err) {
      return err;
    }
  },

  search: async (params) => {
    try {
      const response = await publicClient.get(categoryEndpoints.search, {
        params: params,
      });
      return response;
    } catch (err) {
      return err;
    }
  },
};

export default categoryApi;

export const category = [
  {
    id: "1",
    icon: "fa-solid fa-house",
    path: "/",
    title: "Trang chủ",
  },
  {
    id: "2",
    icon: "fa-regular fa-user",
    path: "/account",
    title: "Tài khoản",
  },
  {
    id: "3",
    icon: "fa-solid fa-blog",
    path: "/news",
    title: "Tin tức",
  },
  {
    id: "4",
    icon: "fa-brands fa-researchgate",
    path: "/scientific-research",
    title: "Nghiên cứu khoa học",
  },
  {
    id: "6",
    icon: "fa-solid fa-receipt",
    path: "/recruitment",
    title: "Tuyển dụng",
  },
  {
    id: "5",
    icon: "fa-brands fa-cuttlefish",
    path: "/category",
    title: "Danh mục, chủ đề bài viết",
  },

  {
    id: "8",
    icon: "fa-brands fa-usps",
    path: "/posts",
    title: "Bài viết",
  },

  {
    id: "7",
    icon: "fa-regular fa-comments",
    path: "/comments",
    title: "Bình luận",
  },
];
