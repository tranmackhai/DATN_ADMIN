import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import categoryApi from "../../../api/modules/category.api";
import postsApi from "../../../api/modules/posts.api";
import * as shortid from "shortid";
import Title from "../../../components/common/Title";
import { configSlugify } from "../../../utils/index.util";
import { useSelector } from "react-redux";

const FormAddPosts = () => {
  const theme = useTheme();
  const account = useSelector((state) => state.account.account);
  const [categorys, setCategorys] = useState([]);

  const postsForm = useFormik({
    initialValues: {
      title: "",
      content: "",
      categoryId: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Nhập tiêu đề bài viết"),
      categoryId: Yup.string().required("Chọn danh mục bài viết"),
      content: Yup.string()
        .required("Nhập nội dung bài viết")
        .notOneOf(["<p><br></p>"], "Nhập nội dung bài viết"),
    }),

    onSubmit: async (values) => {
      // console.log(values);
      try {
        const response = await postsApi.create({
          ...values,
          categoryId: values.categoryId === "" ? null : values.categoryId,
          slug: configSlugify(values.title) + "-" + shortid.generate(),
        });
        if (response.status === 201) {
          toast.success("Thêm bài viết thành công");
          postsForm.resetForm({ title: "", content: "" });
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleReset = () => {
    postsForm.resetForm({
      title: "",
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await categoryApi.getAll({ parentId: "null" });
        setCategorys(response.data.rows);
      } catch (error) {}
    };
    fetchData();
  }, []);
  // console.log(categorys);

  return (
    <Title title="Tiêu đề bài viết">
      <ToastContainer />
      <Box component="form" onSubmit={postsForm.handleSubmit}>
        <Box>
          <Typography
            variant="h5"
            textTransform="uppercase"
            fontWeight="700"
            textAlign="center"
            padding="24px 0"
            noWrap
          >
            Thêm Bài Viết
          </Typography>
        </Box>
        <Grid
          container
          spacing={4}
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
          <Grid item xs={12}>
            <TextField
              type="text"
              placeholder="Tên chủ đề"
              name="title"
              fullWidth
              value={postsForm.values.title}
              onChange={postsForm.handleChange}
              color="success"
              error={
                postsForm.touched.title && postsForm.errors.title !== undefined
              }
              helperText={postsForm.touched.title && postsForm.errors.title}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-autowidth-label">
                Danh mục bài viết
              </InputLabel>
              <Select
                variant="outlined"
                color="success"
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={postsForm.values.categoryId}
                onChange={postsForm.handleChange}
                name="categoryId"
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
              <p
                className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained MuiFormHelperText-filled css-1wc848c-MuiFormHelperText-root"
                style={{ color: "red" }}
              >
                {postsForm.touched.categoryId && postsForm.errors.categoryId}
              </p>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <ReactQuill
              placeholder="Nhập nội dung bài viết"
              theme="snow"
              value={postsForm.values.content}
              onChange={(value) => {
                postsForm.setFieldValue("content", value);
              }}
            />
            {postsForm.touched.content && postsForm.errors.content ? (
              <p
                className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained MuiFormHelperText-filled css-1wc848c-MuiFormHelperText-root"
                style={{ color: "red" }}
              >
                {postsForm.touched.content && postsForm.errors.content}
              </p>
            ) : (
              <></>
            )}
          </Grid>
          <Box display="flex">
            <Button
              type="submit"
              variant="contained"
              color="success"
              sx={{
                width: "120px",
                padding: "10px 0",
                borderRadius: "4px",
                outline: "none",
                cursor: "pointer",
                color: theme.palette.secondary.contrastText,
                fontWeight: "600",
                border: "none",
                textTransform: "uppercase",
                margin: "32px 12px 32px 0",
              }}
            >
              Thêm bài viết
            </Button>
            <Button
              variant="contained"
              onClick={() => handleReset()}
              sx={{
                width: "120px",
                padding: "10px 0",
                borderRadius: "4px",
                outline: "none",
                cursor: "pointer",
                backgroundColor: "#767C75",
                color: theme.palette.secondary.contrastText,
                fontWeight: "600",
                border: "none",
                textTransform: "uppercase",
                margin: "32px 0",
                "&:hover": {
                  backgroundColor: "rgb(118,124,117, 0.9)",
                },
              }}
            >
              Huỷ
            </Button>
          </Box>
        </Grid>
      </Box>
    </Title>
  );
};

export default FormAddPosts;
