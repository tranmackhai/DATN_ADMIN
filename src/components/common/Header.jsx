import { Box, Container } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
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
              borderRadius: "50%"
            }
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
            <Link to="/admin">
              <img src="https://res.cloudinary.com/dhypn6jgk/image/upload/v1682318111/IT_UTC2/Logo_Banner/319276402_573424818126346_7421643665744894014_n.jpg_xj4oc3.jpg" />
            </Link>
          </Box>
          <Box>
            <img src="https://lh3.googleusercontent.com/ogw/AOLn63EVtVhjVa8EcCWRFBeO8yBneBRaRIqS8ilcNrmo7g=s32-c-mo" />
          </Box>
        </Box>
      </Container>
    </header>
  );
};

export default Header;
