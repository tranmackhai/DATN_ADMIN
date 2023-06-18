import { useTheme } from "@emotion/react";
import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import "react-toastify/dist/ReactToastify.css";
import postsApi from "../../../api/modules/category.api";
import Title from "../../../components/common/Title";

const Posts = () => {
  const theme = useTheme();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await postsApi.getAll({ parentId: "null" });
        setPosts(response.data.rows);
      } catch (error) {}
    };
    fetchData();
  }, []);

  // console.log(categorys);
  return (
    <Title title="Chủ đề bài viết" button="Thêm bài viết" path="/posts"></Title>
  );
};

export default Posts;
