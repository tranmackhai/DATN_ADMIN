import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import categoryApi from "../../../api/modules/category.api";
import Title from "../../../components/common/Title";
import { configSlugify } from "../../../utils/index.util";

const FormAddCategory = () => {
  const theme = useTheme();
  // const account = useSelector((state) => state.account.account);
  const [categorys, setCategorys] = useState([]);

  const categoryForm = useFormik({
    initialValues: {
      title: "",
      description: "",
      parentId: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Bạn phải nhập tiêu đề bài viết"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await categoryApi.create({
          ...values,
          parentId: values.parentId === "" ? null : values.parentId,
          slug: configSlugify(values.title),
        });
        if (response.status === 201) {
          toast.success("Thêm chủ đề thành công");
          setCategorys([response.data, ...categorys]);
          categoryForm.resetForm({ title: "" });
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await categoryApi.getAll();
        setCategorys(response.data.rows.filter((item) => !item.parentId));
      } catch (error) {}
    };
    fetchData();
  }, []);

  console.log(categorys);
  return (
    <section className="category">
      <Title title="Danh mục bài viết">
        <ToastContainer />
        <Box component="form" onSubmit={categoryForm.handleSubmit}>
          <Box>
            <Typography
              variant="h5"
              textTransform="uppercase"
              fontWeight="700"
              textAlign="center"
              padding="24px 0"
              noWrap
            >
              Thêm danh mục / chủ đề
            </Typography>
          </Box>
          <Stack
            spacing={3}
            margin="12px auto 48px auto"
            width="700px"
            justifyContent="center"
            sx={{
              textarea: {
                width: "100%",
                maxWidth: "100%",
              },
            }}
          >
            <TextField
              type="text"
              placeholder="Tên danh mục hoặc chủ đề"
              name="title"
              fullWidth
              value={categoryForm.values.title}
              onChange={categoryForm.handleChange}
              color="success"
              error={
                categoryForm.touched.title &&
                categoryForm.errors.title !== undefined
              }
              helperText={
                categoryForm.touched.title && categoryForm.errors.title
              }
            />
            <TextField
              type="text"
              placeholder="Mô tả"
              name="description"
              fullWidth
              value={categoryForm.values.description}
              onChange={categoryForm.handleChange}
              color="success"
              error={
                categoryForm.touched.description &&
                categoryForm.errors.description !== undefined
              }
              helperText={
                categoryForm.touched.description &&
                categoryForm.errors.description
              }
            />
            {categorys.length > 0 ? (
              <FormControl sx={{ m: 1, minWidth: 80 }}>
                <InputLabel id="demo-simple-select-autowidth-label">
                  Nhóm chủ đề
                </InputLabel>
                <Select
                  color="success"
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={categoryForm.values.parentId}
                  onChange={categoryForm.handleChange}
                  autoWidth
                  name="parentId"
                  label="Nhóm chủ đề"
                >
                  {categorys.map((data, index) => {
                    return (
                      <MenuItem key={index} value={data.id}>
                        {data.title}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            ) : (
              <></>
            )}
            <Typography color="red">
              *Lưu ý khi thêm danh mục bài viết không chọn nhóm chủ đề
            </Typography>
            <Button
              type="submit"
              variant="contained"
              color="success"
              style={{
                width: "120px",
                padding: "10px 0",
                borderRadius: "4px",
                outline: "none",
                cursor: "pointer",
                color: theme.palette.secondary.contrastText,
                fontWeight: "600",
                border: "none",
                textTransform: "uppercase",
                marginBottom: "48px",
              }}
            >
              Thêm
            </Button>
          </Stack>
        </Box>
      </Title>
    </section>
  );
};

export default FormAddCategory;
