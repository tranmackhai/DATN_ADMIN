import React, { useEffect, useState } from "react";
import Title from "../components/common/Title";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
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
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import newsApi from "../api/modules/news.api";

const Recruitment = () => {
  const [data, setData] = useState({ rows: [], count: 0 });
  const navigate = useNavigate();
  const [query] = useSearchParams();
  const p = query.get("p") || 1;
  const handlePageChange = (page) => {
    navigate(`?p=${page}`);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await newsApi.getAll({
          type: "recruitment",
          limit: 5,
          p: p,
        });
        setData(response.data);
      } catch (error) {}
    };
    fetchData();
  }, [p]);

  return (
    <section className="recruitment">
      <Title title="Tuyển dụng">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Tiêu đề</TableCell>
                <TableCell align="center">Ảnh</TableCell>
                <TableCell align="center">Ngày đăng bài</TableCell>
                <TableCell align="center">Trạng thái</TableCell>
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
                    {item.createdAt}
                  </TableCell>
                  <TableCell align="center" width="166px">
                    {item.isActive ? (
                      <span style={{ color: "#5cb85c" }}>Đã duyệt</span>
                    ) : (
                      <span style={{ color: "#ffbb33" }}>Đang xét duyệt</span>
                    )}
                  </TableCell>
                  <TableCell align="center" width="120px">
                    <>
                      <IconButton
                        LinkComponent={Link}
                        to={`/recruitment/${item.slug}`}
                      >
                        <RemoveRedEyeIcon />
                      </IconButton>
                      <IconButton>
                        <DeleteIcon />
                      </IconButton>
                    </>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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

export default Recruitment;
