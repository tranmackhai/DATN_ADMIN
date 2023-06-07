import React, { useEffect, useState } from "react";
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
import newsApi from "../../api/modules/news.api";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import Title from "../../components/common/Title";
import Search from "../../components/common/Search";

const ScientificResearch = () => {
  const [data, setData] = useState({ rows: [], count: 0 });
  const navigate = useNavigate();
  const [query] = useSearchParams();
  const p = query.get("p") || 1;
  const q = query.get("q") || "";
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState();

  const handlePageChange = (page) => {
    navigate(`?p=${page}`);
  };

  const handleSearch = (keyword) => {
    // console.log(keyword);
    navigate(`?p=${p}&q=${keyword}`);
  };

  const handleConfirm = async () => {
    if (current) {
      try {
        const response = await newsApi.delete(current.id);
        console.log(response);
        if (response.status === 200) {
          const res = await newsApi.getAll({
            type: "scientificResearch",
            limit: 5,
            p: p,
          });
          setData(res.data);
        }
      } catch (error) {}
    }
  };

  const deleteNews = (item) => {
    setCurrent(item);
    setOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      const params = {
        type: "scientificResearch",
        limit: 5,
        p: p,
      };
      try {
        if (q === "") {
          const response = await newsApi.getAll(params);
          setData(response.data);
        } else {
          const response = await newsApi.search({ ...params, q: q });
          setData(response.data);
          console.log(response.data);
        }
      } catch (error) {}
    };
    fetchData();
  }, [p, q]);

  return (
    <section className="scientific-research">
      <Title title="Nghiên cứu khoa học">
        <Search onSearch={handleSearch} />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Tiêu đề</TableCell>
                <TableCell align="center">Ảnh</TableCell>
                <TableCell align="center">Ngày đăng bài</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.rows.map((item, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" className="line_clamp">
                    {item.title}
                  </TableCell>
                  <TableCell align="center" width="300px">
                    <img
                      src={item.thumbnail}
                      alt=""
                      style={{
                        width: "120px",
                        height: "60px",
                        objectFit: "cover",
                      }}
                    />
                  </TableCell>
                  <TableCell align="center" width="266px">
                    {moment(item.createdAt).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell align="center" width="120px">
                    <>
                      <IconButton
                        LinkComponent={Link}
                        to={`/scientific-research/${item.slug}`}
                      >
                        <RemoveRedEyeIcon />
                      </IconButton>
                      <IconButton onClick={() => deleteNews(item)}>
                        <DeleteIcon />
                      </IconButton>
                    </>
                  </TableCell>
                </TableRow>
              ))}
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
        {data?.count > 0 && (
          <Pagination
            count={Math.ceil(data.count / 5)}
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

export default ScientificResearch;
