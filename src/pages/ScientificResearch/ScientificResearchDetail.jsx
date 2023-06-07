import React, { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import { Box, Container, Grid, Typography } from "@mui/material";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import newsApi from "../../api/modules/news.api";
import Title from "../../components/common/Title";

const ScientificResearchDetail = () => {
  const theme = useTheme();
  const { slug } = useParams();
  const [news, setNews] = useState();
  // const user = useSelector((state) => state.account.account);
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  const handleSubmit = async () => {
    try {
      const response = await newsApi.updateStatus(slug);
      if (response.status === 200) {
        handleBack();
      }
    } catch (error) {}
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await newsApi.getAll({
          type: "scientificResearch",
          slug: slug,
        });
        setNews(response.data.rows[0]);
      } catch (error) {}
    };
    fetchData();
  }, [slug]);

  return (
    <section className="scientific-research_detail">
      <Title title="Chi tiết bài đăng">
        <Container disableGutters={true} maxWidth="lg">
          <Grid
            container
            spacing={2}
            sx={{
              backgroundColor: "#fff",
              padding: "2rem",
            }}
          >
            <Grid item xs={9}>
              <Box
                sx={{
                  span: {
                    color: theme.palette.primary.contrastText,
                    fontSize: "0.8rem",
                  },
                  img: {
                    objectFit: "cover",
                    width: "500",
                    height: "300px",
                    margin: "24px 0",
                  },
                }}
              >
                <Typography variant="h5" fontWeight={500} marginBottom="24px">
                  {news?.title}
                </Typography>
                <span>{moment(news?.createdAt).format("DD/MM/YYYY")}</span>
                <Box textAlign="center">
                  <img src={news?.thumbnail} />
                </Box>
                <div dangerouslySetInnerHTML={{ __html: news?.content }}></div>
              </Box>
            </Grid>
            <Grid item xs={3}>
              {!news?.isActive && (
                <button
                  style={{
                    width: "120px",
                    padding: "10px 0",
                    borderRadius: "4px",
                    outline: "none",
                    cursor: "pointer",
                    backgroundColor: "#5BF33D",
                    color: theme.palette.secondary.contrastText,
                    fontWeight: "600",
                    border: "none",
                    textTransform: "uppercase",
                    marginRight: "12px",
                  }}
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  Duyệt bài
                </button>
              )}
              <button
                style={{
                  width: "120px",
                  padding: "10px 0",
                  borderRadius: "4px",
                  outline: "none",
                  cursor: "pointer",
                  backgroundColor: "#767C75",
                  color: theme.palette.secondary.contrastText,
                  fontWeight: "600",
                  border: "none",
                  textTransform: "uppercase",
                }}
                onClick={() => {
                  handleBack();
                }}
              >
                Quay lại
              </button>
            </Grid>
          </Grid>
        </Container>
      </Title>
    </section>
  );
};

export default ScientificResearchDetail;
