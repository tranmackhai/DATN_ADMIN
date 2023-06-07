import React, { useEffect } from "react";
import UserOverview from "../../components/common/UserOverview";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import UserAddForm from "../../components/common/UserAddForm";
import { useTheme } from "@emotion/react";
import { useNavigate, useParams } from "react-router-dom";
import accountApi from "../../api/modules/account.api";
import { setCurrentUser } from "../../redux/features/accountSlice";

const UserDetail = () => {
  const theme = useTheme();
  const currentUser = useSelector((state) => state.account.currentAccount);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  useEffect(() => {
    if (!currentUser && id) {
      const fetchData = async () => {
        try {
          const response = await accountApi.getById(id);
          dispatch(setCurrentUser(response.data));
        } catch (error) {}
      };
      fetchData();
    }
  }, [id]);

  return (
    <section className="user-detail">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Box
          sx={{
            margin: "64px 0",
            background: "#fff",
            textAlign: "center",
            width: "100%",
            maxWidth: "600px",
            padding: 10,
            borderRadius: "4px",
            outline: "none",
            boxShadow: "rgba(0, 0, 0, 0.32) -3.67394e-16px 2px 8px 0px",
          }}
        >
          {currentUser ? <UserOverview data={currentUser} /> : <UserAddForm />}
          <button
            style={{
              width: "100%",
              padding: "12px 0",
              marginTop: "12px",
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
        </Box>
      </Box>
    </section>
  );
};

export default UserDetail;
