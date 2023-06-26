import React, { Fragment, useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import {
  IconButton,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import moment from "moment";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import categoryApi from "../../../api/modules/category.api";
import Title from "../../../components/common/Title";
import ConfirmDialog from "../../../components/common/ConfirmDialog";

const Category = () => {
  const [categorys, setCategorys] = useState([]);
  const [query] = useSearchParams();

  const p = query.get("p") || 1;
  const q = query.get("q") || "";
  const sortBy = query.get("sortBy") || "id";
  const sortType = query.get("sortType") || "DESC";
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState();
  const navigate = useNavigate();

  const deleteCategorys = async (item) => {
    setCurrent(item);
    setOpen(true);
  };

  const handleConfirm = async () => {
    if (current) {
      try {
        const response = await categoryApi.delete(current.id);
        console.log(response);
        if (response.status === 200) {
          const res = await categoryApi.getAll({
            limit: 5,
            p: p,
            sortBy: sortBy,
            sortType: sortType,
          });
          setCategorys(res.data);
        }
      } catch (error) {}
    }
  };

  const handlePageChange = (page) => {
    // console.log(page);
    navigate(`?p=${page}&q=${q}&sortBy=${sortBy}&sortType=${sortType}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      const params = {
        limit: 5,
        p: p,
        sortBy: sortBy,
        sortType: sortType,
        hidePosts: true,
      };
      try {
        const response = await categoryApi.getAll(params);
        setCategorys(response.data);
      } catch (error) {}
    };
    fetchData();
  }, [p, q, sortBy, sortType]);

  console.log(categorys);
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
              {categorys?.rows?.map((data, index) => {
                {
                  /* console.log(data); */
                }
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
                          <IconButton onClick={() => deleteCategorys(data)}>
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
        {open && (
          <ConfirmDialog
            onClose={() => setOpen(false)}
            onConfirm={() => handleConfirm()}
            open={open}
          />
        )}

        {categorys?.count > 0 && (
          <Pagination
            count={Math.ceil(categorys?.count / 5)}
            shape="rounded"
            onChange={(e, page) => {
              handlePageChange(page);
            }}
            sx={{
              marginTop: "24px",
              ul: { justifyContent: "center" },
            }}
          />
        )}
      </Title>
    </section>
  );
};

export default Category;
