import { useTheme } from "@emotion/react";
import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setCurrentUser } from "../../redux/features/accountSlice";

const Title = ({ title, children, path, path2, button, button2 }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const handleSetCurrentUser = () => {
    dispatch(setCurrentUser(null));
  };
  // console.log(path);
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
          backgroundColor: theme.palette.primary.backgroundMain,
          borderRadius: "6px",
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "1px solid rgb(54, 65, 82)",
          alignItems: "center",
          padding: "1rem",
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
        <Box>
          {button && (
            <Button
              onClick={handleSetCurrentUser}
              component={Link}
              to={`${path}/add`}
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
              {button}
            </Button>
          )}
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: theme.palette.primary.backgroundMain,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Title;
