import { useTheme } from "@emotion/react";
import { Box, Container, Typography } from "@mui/material";
import React from "react";

const Title = ({ title, children }) => {
  const theme = useTheme();
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
          // display: "flex",
          // flexDirection: "column",
        }}
      >
        <Typography
          variant="h5"
          padding="12px"
          textTransform="capitalize"
          marginBottom="2rem"
          fontWeight="600"
        >
          {title}
        </Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: theme.palette.primary.main,
          borderRadius: "6px",
          // display: "flex",
          // flexDirection: "column",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Title;
