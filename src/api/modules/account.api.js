import publicClient from "../client/public.client.js";

const accountEndpoints = {
  login: "auth/login",
  register: "auth/register",
  // getInfo: "user/info",
  // passwordUpdate: "user/update-password",
};

const accountApi = {
  login: async ({ gmail, password }) => {
    try {
      const response = await publicClient.post(accountEndpoints.login, {
        gmail,
        password,
      });
      // console.log(response);
      return { response };
    } catch (err) {
      return { err };
    }
  },
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
  // getInfo: async ({}) => {
  //   try {
  //     const response = await privateClient.get(accountEndpoints.getInfo);
  //     return { response };
  //   } catch (err) {
  //     return { err };
  //   }
  // },
  // passwordUpdate: async ({ password, newPassword, confirmNewPassword }) => {
  //   try {
  //     const response = await privateClient.put(accountEndpoints.register, {
  //       password,
  //       newPassword,
  //       confirmNewPassword,
  //     });
  //     return { response };
  //   } catch (err) {
  //     return { err };
  //   }
  // },
};

export default accountApi;
