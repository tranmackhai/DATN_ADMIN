import { Box, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";

const Footer = () => {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <footer>
      <Box
        textAlign="center"
        sx={{
          backgroundColor: theme.palette.secondary.main,
        }}
      >
        {visible && (
          <button
            className="btn-backtop"
            onClick={scrollToTop}
            style={{
              position: "fixed",
              textAlign: "center",
              zindex: "5",
              right: "16px",
              bottom: "15%",
              fontSize: "1.2rem",
              width: "42px",
              height: "42px",
              backgroundColor: "#7a7a9d80",          
              color: "#fff",
              borderRadius: "50%",
              border: "none",
              cursor: "pointer"
            }}
          >
            <i className="fa-solid fa-arrow-up-long"></i>
          </button>
        )}
        <Box padding="24px 0" color={theme.palette.secondary.contrastText}>
          <Typography variant="h5" fontWeight={500} paddingBottom="12px">
            BỘ MÔN CÔNG NGHỆ THÔNG TIN - TRƯỜNG ĐẠI HỌC GIAO THÔNG VẬN TẢI PHÂN
            HIỆU TP.HCM
          </Typography>
          <Typography paddingBottom="12px">
            PHÒNG 3, DÃY E10, 450-451 LÊ VĂN VIỆT, PHƯỜNG TĂNG NHƠN PHÚ A, TP.
            THỦ ĐỨC, TP. HỒ CHÍ MINH
          </Typography>
          <Typography paddingBottom="12px">
            Emai: banbientap@utc2.edu.vn
          </Typography>
          <Typography>Website: http://it.utc2.edu.vn</Typography>
        </Box>
      </Box>
      <Box
        textAlign="center"
        sx={{
          backgroundColor: "#5b5b5b",
        }}
      >
        <Box padding="16px 0" color="#acacac">
          <Typography fontWeight={500}>
            Copyright 2023 © BỘ MÔN CÔNG NGHỆ THÔNG TIN
          </Typography>
        </Box>
      </Box>
    </footer>
  );
};

export default Footer;
