import React from "react";
import { useTheme } from "@emotion/react";
import { Box, Button, Container, Popper } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import accountApi from "../../api/modules/account.api";
import { useDispatch } from "react-redux";
import { setAccount } from "../../redux/features/accountSlice";

const Header = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleLogout = async (e) => {
    try {
      e.preventDefault();
      const res = await accountApi.logout();
      // console.log(res);
      if (res.response.data.message === "Đăng xuất thành công") {
        dispatch(setAccount(null));
        navigate("/");
      }
    } catch (error) {}
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  return (
    <header>
      <Container disableGutters={true} maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            maxHeight: "110px",
            img: {
              borderRadius: "50%",
            },
          }}
        >
          <Box
            sx={{
              width: "100%",
              padding: "12px 0",
              a: {
                img: {
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                },
              },
            }}
          >
            <Link to="/">
              <img src="https://res.cloudinary.com/dhypn6jgk/image/upload/v1682318111/IT_UTC2/Logo_Banner/319276402_573424818126346_7421643665744894014_n.jpg_xj4oc3.jpg" />
            </Link>
          </Box>
          <Box>
            <Button
              aria-describedby={id}
              variant="contained"
              onClick={handleClick}
              sx={{
                backgroundColor: theme.palette.primary.highlightText,
                fontWeight: "700",
                color: theme.palette.primary.main,
                "&:hover": {
                  backgroundColor: "rgb(94, 53, 177, 0.9)",
                },
              }}
            >
              Admin
            </Button>
            <Popper id={id} open={open} anchorEl={anchorEl}>
              <Box
                sx={{
                  marginTop: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ddd",
                  padding: "8px 18px",
                  backgroundColor: "#fff",
                  a: {
                    color: "rgb(94, 53, 177)",
                    fontWeight: "500",
                  },
                }}
              >
                <Link to="/" onClick={handleLogout}>
                  Đăng xuất
                </Link>
              </Box>
            </Popper>
          </Box>
        </Box>
      </Container>
    </header>
  );
};

export default Header;
