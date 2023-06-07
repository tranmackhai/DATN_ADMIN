import { Box, Stack, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";

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
const UserForm = ({ data }) => {
  const [isRegisterRequest, setisRegisterRequest] = useState(false);

  const userForm = useFormik({
    initialValues: {
      name: data.name,
      gmail: data.gmail,
      phone: data.phone,
      sex: data.sex,
      role: data.role,
    },

    enableReinitialize: true,
    onSubmit: async (values) => {},
  });

  console.log(data);

  // console.log(userForm.values);
  // console.log(userForm.errors);
  return (
    <Box component="form" onSubmit={userForm.handleSubmit}>
      <Stack spacing={3}>
        <TextField
          InputProps={{
            readOnly: true,
          }}
          type="text"
          placeholder="Nhập họ và tên"
          name="name"
          fullWidth
          value={userForm.values.name}
          onChange={userForm.handleChange}
          color="success"
        />
        <TextField
          InputProps={{
            readOnly: true,
          }}
          type="text"
          placeholder="Nhập gmail"
          name="gmail"
          fullWidth
          value={userForm.values.gmail}
          onChange={userForm.handleChange}
          color="success"
        />
        <TextField
          InputProps={{
            readOnly: true,
          }}
          type="text"
          placeholder="Nhập số điện thoại"
          name="phone"
          fullWidth
          value={userForm.values.phone}
          onChange={userForm.handleChange}
          color="success"
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
                >
                  {item.label}
                </span>
              );
            })}
          </Box>
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
                >
                  {item.label}
                </span>
              );
            })}
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default UserForm;
