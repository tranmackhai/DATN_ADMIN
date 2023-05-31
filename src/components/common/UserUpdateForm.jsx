import { LoadingButton } from "@mui/lab";
import { Box, Stack, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import accountApi from "../../api/modules/account.api";
import { setCurrentUser } from "../../redux/features/accountSlice";

const roles = [
  {
    label: "Sinh viên",
    value: "student",
  },
  {
    label: "Nhà tuyển dụng",
    value: "recruitment",
  },
  {
    label: "Giảng viên",
    value: "teacher",
  },
];
const sex = [
  {
    label: "Nam",
    value: true,
  },
  {
    label: "Nữ",
    value: false,
  },
];
const UserForm = () => {
  const [isRegisterRequest, setisRegisterRequest] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const currentUser = useSelector((state) => state.account.currentUser);

  const userForm = useFormik({
    initialValues: {
      name: currentUser ? currentUser.name : "",
      gmail: currentUser ? currentUser.gmail : "",
      phone: currentUser ? currentUser.phone : "",
      sex: currentUser ? currentUser.sex : true,
      role: currentUser ? currentUser.role : "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(4, "Họ và tên tối thiểu 4 ký tự ")
        .required("Bạn phải nhập tên"),
      gmail: Yup.string()
        .matches(
          /([a-zA-Z0-9]+)([\_\.\-{1}])?([a-zA-Z0-9]+)\@([a-zA-Z0-9]+)([\.])([a-zA-Z\.]+)/g,
          "Gmail không hợp lệ"
        )
        .required("Bạn phải nhập Gmail"),
      phone: Yup.string()
        .min(10, "Số điện thoại không hợp lệ")
        .matches(
          /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
          "Số điện thoại không hợp lệ"
        )
        .required("Bạn phải nhập số điện thoại"),
      sex: Yup.string().required("Chọn giới tính"),
      role: Yup.string().required("Chọn kiểu thành viên"),
    }),
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const formData = {
          name: values.name,
          gmail: values.gmail,
          phone: values.phone,
          sex: values.sex,
          role: values.role,
        };
        const res = await accountApi.updateUser(currentUser.id, formData);
        if (res.status === 200) {
          navigate("/account");
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  // console.log(userForm.values);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const response = await accountApi.getById(id);
          if (response.status === 200) {
            dispatch(setCurrentUser(response.data));
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [id]);

  // console.log(userForm.errors);
  return (
    <Box component="form" onSubmit={userForm.handleSubmit}>
      <Stack spacing={3}>
        <TextField
          type="text"
          placeholder="Nhập họ và tên"
          name="name"
          fullWidth
          value={userForm.values.name}
          onChange={userForm.handleChange}
          color="success"
          error={userForm.touched.name && userForm.errors.name !== undefined}
          helperText={userForm.touched.name && userForm.errors.name}
        />
        <TextField
          type="text"
          placeholder="Nhập gmail"
          name="gmail"
          fullWidth
          value={userForm.values.gmail}
          onChange={userForm.handleChange}
          color="success"
          error={userForm.touched.gmail && userForm.errors.gmail !== undefined}
          helperText={userForm.touched.gmail && userForm.errors.gmail}
        />
        <TextField
          type="text"
          placeholder="Nhập số điện thoại"
          name="phone"
          fullWidth
          value={userForm.values.phone}
          onChange={userForm.handleChange}
          color="success"
          error={userForm.touched.phone && userForm.errors.phone !== undefined}
          helperText={userForm.touched.phone && userForm.errors.phone}
        />
        <Box>
          <Typography
            sx={{ fontWeight: 500, fontSize: "1rem", marginBottom: "12px" }}
          >
            Giới tính
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              span: {
                display: "block",
                textAlign: "center",
                margin: "0 4px",
                width: "140px",
                padding: "8px 0",
                borderRadius: "6px",
                cursor: "pointer",
                backgroundColor: "#f8f8f8",
              },
            }}
          >
            {sex.map((item) => {
              return (
                <span
                  key={item.value}
                  style={
                    item.value === userForm.values.sex
                      ? {
                          border: "1px solid #fcaf17",
                          backgroundColor: "#fff",
                        }
                      : {}
                  }
                  onClick={() => {
                    userForm.setFieldValue("sex", item.value);
                  }}
                >
                  {item.label}
                </span>
              );
            })}
          </Box>
          <p
            className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained MuiFormHelperText-filled css-1wc848c-MuiFormHelperText-root"
            style={{ textAlign: "center" }}
          >
            {userForm.touched.role && userForm.errors.role}
          </p>
        </Box>
        <Box>
          <Typography
            sx={{ fontWeight: 500, fontSize: "1rem", marginBottom: "12px" }}
          >
            Loại thành viên
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              span: {
                display: "block",
                textAlign: "center",
                margin: "0 4px",
                width: "140px",
                padding: "8px 0",
                borderRadius: "6px",
                cursor: "pointer",
                backgroundColor: "#f8f8f8",
              },
            }}
          >
            {roles.map((item) => {
              return (
                <span
                  key={item.value}
                  style={
                    item.value === userForm.values.role
                      ? { border: "1px solid #fcaf17", backgroundColor: "#fff" }
                      : {}
                  }
                  onClick={() => {
                    userForm.setFieldValue("role", item.value);
                  }}
                >
                  {item.label}
                </span>
              );
            })}
          </Box>
          <p
            className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained MuiFormHelperText-filled css-1wc848c-MuiFormHelperText-root"
            style={{ textAlign: "center" }}
          >
            {userForm.touched.role && userForm.errors.role}
          </p>
        </Box>
        <LoadingButton
          type="submit"
          fullWidth
          size="large"
          color="success"
          variant="contained"
          loading={isRegisterRequest}
          sx={{
            marginTop: 4,
            fontWeight: "700",
          }}
        >
          Lưu
        </LoadingButton>
      </Stack>
    </Box>
  );
};

export default UserForm;
