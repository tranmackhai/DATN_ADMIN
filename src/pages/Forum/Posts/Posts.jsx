import { useTheme } from "@emotion/react";
import React, { Fragment, useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import "react-toastify/dist/ReactToastify.css";
import postsApi from "../../../api/modules/posts.api";
import DeleteIcon from "@mui/icons-material/Delete";
import Paper from "@mui/material/Paper";
import moment from "moment";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Title from "../../../components/common/Title";
import ReactQuill from "react-quill";
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
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import ConfirmDialog from "../../../components/common/ConfirmDialog";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const [query] = useSearchParams();

  const p = query.get("p") || 1;
  const q = query.get("q") || "";
  const sortType = query.get("sortType") || "DESC";
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState();

  const deletePosts = async (item) => {
    setCurrent(item);
    setOpen(true);
  };

  const handleConfirm = async () => {
    if (current) {
      try {
        const response = await postsApi.delete(current.id);
        console.log(response);
        if (response.status === 200) {
          const res = await postsApi.getAll({
            limit: 5,
            p: p,
            sortType: sortType,
          });
          setPosts(res.data);
        }
      } catch (error) {}
    }
  };

  const handlePageChange = (page) => {
    // console.log(page);
    navigate(`?p=${page}&q=${q}&sortType=${sortType}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      const params = {
        limit: 5,
        p: p,
        sortType: sortType,
        onlyParent: true,
      };
      try {
        const response = await postsApi.getAll(params);
        setPosts(response.data);
      } catch (error) {}
    };
    fetchData();
  }, [p, q, sortType]);
  // console.log(posts);

  return (
    <Title title="Bài viết" button="Thêm bài viết" path="/posts">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tiêu đề bài viết</TableCell>
              <TableCell align="center">Nội dung</TableCell>
              <TableCell align="center">Thuộc nhóm chủ đề</TableCell>
              <TableCell align="center">Ngày tạo</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts?.rows?.map((data, index) => {
              {
                /* console.log(data); */
              }
              return (
                <Fragment key={index}>
                  <TableRow>
                    <TableCell
                      className="line_clamp"
                      sx={{
                        span: {
                          border: "none",
                          color: "#000",
                          fontSize: "1rem",
                        },
                      }}
                    >
                      <span className="line_clamp">{data?.title}</span>
                    </TableCell>
                    <TableCell align="center" width="440px">
                      <span
                        className="line_clamp content"
                        dangerouslySetInnerHTML={{ __html: data?.content }}
                      ></span>
                    </TableCell>
                    <TableCell align="center" width="220px">
                      {data?.category?.title}
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
                        <IconButton onClick={() => deletePosts(data)}>
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

      {posts?.count > 0 && (
        <Pagination
          count={Math.ceil(posts?.count / 5)}
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
  );
};

export default Posts;
