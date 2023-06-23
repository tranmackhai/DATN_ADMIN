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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Link } from "react-router-dom";

const Posts = () => {
  const theme = useTheme();
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState();

  console.log(posts);

  const deleteNews = async (item) => {
    setCurrent(item);
    setOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await postsApi.getAll({ onlyParent: true });
        setPosts(response.data.rows);
      } catch (error) {}
    };
    fetchData();
  }, []);

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
            {posts?.map((data, index) => {
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
  );
};

export default Posts;
