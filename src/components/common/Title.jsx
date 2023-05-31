import { useTheme } from "@emotion/react";
import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setCurrentUser } from "../../redux/features/accountSlice";

const Title = ({ title, children, button }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const handleSetCurrentUser = () => {
    dispatch(setCurrentUser(null));
  };
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.secondary.background,
        borderRadius: "6px",
        padding: "24px",
      }}
    >
      <Box
        sx={{
          backgroundColor: theme.palette.primary.main,
          borderRadius: "6px",
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "1px solid rgb(54, 65, 82)",
          alignItems: "center",
          padding: "1rem"
        }}
      >
        <Typography
          variant="h5"
          padding="12px"
          textTransform="capitalize"
          fontWeight="600"
        >
          {title}
        </Typography>
        {button && (
          <Button
            onClick={handleSetCurrentUser}
            component={Link}
            to="/account/add"
            sx={{
              marginTop: 1,
              fontWeight: "600",
              color: "rgb(94, 53, 177)",
              backgroundColor: "rgb(237, 231, 246)",
              height: "3rem",
              marginRight: "12px",
              "&:hover": {
                backgroundColor: "rgb(237, 231, 246)",
              },
            }}
          >
            Thêm tài khoản
          </Button>
        )}
      </Box>
      <Box
        sx={{
          backgroundColor: theme.palette.primary.main,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Title;
