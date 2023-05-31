import React from "react";
import UserUpdateForm from "../../components/common/UserUpdateForm";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import UserAddForm from "../../components/common/UserAddForm";

const UserDetail = () => {
  const currentUser = useSelector((state) => state.account.currentUser);
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
          {currentUser ? <UserUpdateForm /> : <UserAddForm />}
        </Box>
      </Box>
    </section>
  );
};

export default UserDetail;
