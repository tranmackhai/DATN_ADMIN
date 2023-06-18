import { useTheme } from "@emotion/react";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import moment from "moment";
import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import categoryApi from "../../../api/modules/category.api";
import Title from "../../../components/common/Title";

const Category = () => {
  const theme = useTheme();
  const [categorys, setCategorys] = useState([]);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState();

  const deleteNews = async (item) => {
    setCurrent(item);
    setOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await categoryApi.getAll({ sortType: "ASC" });
        setCategorys(response.data.rows);
      } catch (error) {}
    };
    fetchData();
  }, []);

  // console.log(categorys);
  return (
    <section className="category">
      <Title
        title="Danh mục, chủ đề bài viết"
        button="Thêm danh mục"
        path="/category"
      >
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Danh mục</TableCell>
                <TableCell align="center">Mô tả</TableCell>
                <TableCell align="center">Danh mục cha</TableCell>
                <TableCell align="center">Ngày tạo</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categorys?.map((data, index) => {
                console.log(data);
                return (
                  <Fragment key={index}>
                    <TableRow>
                      <TableCell
                        sx={{
                          border: "none",
                          color: "#000",
                          fontSize: "1rem",
                        }}
                      >
                        {data.title}
                      </TableCell>
                      <TableCell align="center" width="440px">
                        <span className="line_clamp">{data.description}</span>
                      </TableCell>
                      <TableCell align="center" width="220px">
                        {data.parent?.title}
                      </TableCell>
                      <TableCell align="center" width="200px">
                        {moment(data.createdAt).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell align="center" width="120px">
                        <>
                          <IconButton
                            LinkComponent={Link}
                            to={`/topic/${data.slug}`}
                          >
                            <RemoveRedEyeIcon />
                          </IconButton>
                          <IconButton onClick={() => deleteNews(data)}>
                            <DeleteIcon />
                          </IconButton>
                        </>
                      </TableCell>
                    </TableRow>
                  </Fragment>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Title>
    </section>
  );
};

export default Category;
