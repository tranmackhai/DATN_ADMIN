import React, { useEffect, useState } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Paper from "@mui/material/Paper";
import moment from "moment";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import accountApi from "../../api/modules/account.api";
import Title from "../../components/common/Title";
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
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../redux/features/accountSlice";
import Search from "../../components/common/Search";

const UserPage = () => {
  const [data, setData] = useState({ rows: [], count: 0 });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [query] = useSearchParams();
  const p = query.get("p") || 1;
  const q = query.get("q") || "";
  const role = query.get("role") || "";
  const sortBy = query.get("sortBy") || "id";
  const sortType = query.get("sortType") || "DESC";

  const handleSearch = (keyword) => {
    navigate(`?p=${p}&q=${keyword}`);
  };

  const handlePageChange = (page) => {
    navigate(`?p=${page}&q=${q}&sortBy=${sortBy}&sortType=${sortType}`);
  };

  const handleFilter = async () => {
    let filterRole = "";
    if (role === "student") {
      filterRole = "recruitment";
    } else if (role === "recruitment") {
      filterRole = "teacher";
    } else {
      filterRole = "student";
    }
    navigate(
      `?p=${p}&q=${q}&sortBy=${sortBy}&sortType=${
        sortType === "DESC" ? "ASC" : "DESC"
      }&role=${filterRole}`
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      const params = {
        limit: 5,
        p: p,
        sortBy: sortBy,
        sortType: sortType,
        role: role,
      };
      try {
        const response = await accountApi.search({
          ...params,
          q: q,
        });
        setData(response.data);
        // console.log(response.data);
      } catch (error) {}
    };
    fetchData();
  }, [p, q, , sortBy, sortType, role]);
  // console.log(q);

  return (
    <section className="userpage">
      <Title title="Tài khoản" button="Thêm tài khoản" path="/account">
        <Search onSearch={handleSearch} />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Họ và tên</TableCell>
                <TableCell align="center">Số điện thoại</TableCell>
                <TableCell align="center">Gmail</TableCell>
                <TableCell align="center">Giới tính</TableCell>
                <TableCell align="center">
                  Loại tài khoản{" "}
                  <IconButton sx={{ padding: "0" }} onClick={handleFilter}>
                    <FilterAltIcon />
                  </IconButton>
                </TableCell>
                <TableCell align="center">Ngày tạo</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.rows.map((item, index) => {
                return (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      className="line_clamp"
                    >
                      {item.name}
                    </TableCell>
                    <TableCell align="center" width="160px">
                      {item.phone}
                    </TableCell>
                    <TableCell align="center" width="260px">
                      {item.gmail}
                    </TableCell>
                    <TableCell align="center" width="120px">
                      {item.sex ? (
                        <span style={{ color: "#5cb85c" }}>Nam</span>
                      ) : (
                        <span style={{ color: "#ffbb33" }}>Nữ</span>
                      )}
                    </TableCell>
                    <TableCell align="center" width="160px">
                      {item.role}
                    </TableCell>
                    <TableCell align="center" width="120px">
                      {moment(item.createdAt).format("MM/DD/YYYY")}
                    </TableCell>
                    <TableCell align="center" width="120px">
                      <>
                        <IconButton
                          LinkComponent={Link}
                          to={`/account/edit/${item.id}`}
                          onClick={() => {
                            dispatch(setCurrentUser(item));
                          }}
                        >
                          <RemoveRedEyeIcon />
                        </IconButton>
                      </>
                    </TableCell>
                  </TableRow>
                );
              })}
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

export default UserPage;
